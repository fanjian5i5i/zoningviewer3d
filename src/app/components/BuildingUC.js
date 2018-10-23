import * as React from 'react';
import { loadModules } from 'react-arcgis';
export default class BuildingUC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sceneLayer: null
        };
    }

    render() {
        return null;
    }
    componentDidUpdate(){
        var that = this;

        if(this.props.template && this.state.sceneLayer){
          this.state.sceneLayer.popupTemplate = this.props.template
        }


    }
    componentDidMount() {
        var that = this;

        loadModules(['esri/layers/SceneLayer']).then(([ SceneLayer ]) => {

          const symbol = {
            type: "mesh-3d", // autocasts as new MeshSymbol3D()
            symbolLayers: [{
              type: "fill", // autocasts as new FillSymbol3DLayer()
              // If the value of material is not assigned, the default color will be grey
              material: {
                color:[238, 40, 59,0.7],
                colorMixMode: "replace"

              },
              edges: {
                type: 'solid',
                color: [0, 0, 0, 0.7],
                size: 0.5
              }
            }]
          };
            // Add the geometry and symbol to a new graphic
            // console.log(that.props.SQLstr.toString())
            const sceneLayer = new SceneLayer({
              portalItem: {
                id: "6bf84d76f1ea4b869272978ce7ed5d5e"
              },
              popupEnabled: true,
              legendEnabled:true,
              title:"Permitted / Under Construction",
              // popupTemplate:this.state.template
              definitionExpression: "Par_GIS_ID <> 0 AND Centr_Lat <> 0 AND Centr_Lon <> 0"
              });

            this.setState({ sceneLayer });
            sceneLayer.renderer = {
                type: "simple", // autocasts as new SimpleRenderer()
                symbol: symbol
              };
            this.props.map.add(sceneLayer);
        })
    }

    componentWillUnmount() {
        this.props.map.remove(this.state.sceneLayer);
    }
}
