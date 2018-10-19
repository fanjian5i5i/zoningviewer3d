import * as React from 'react';
import { loadModules } from 'react-arcgis';
export default class BuildingScene extends React.Component {
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
        var sqlStr = ""
        if(this.state.sceneLayer && this.props.SQLstr){
          console.log(this.props.SQLstr.toString())
          // this.props.SQLstr.forEach(function(str){
          //   sqlStr+="'"+str+"'";
          // })
          const sqlStr = that.props.SQLstr.map(str => "'" + str +"'");
          console.log(sqlStr.toString())
          this.state.sceneLayer.definitionExpression = "Par_GIS_ID IN ("+sqlStr+")"

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
                color:"#ffffff",
                colorMixMode: "replace"

              },
              edges: {
                type: 'solid',
                color: [0, 0, 0, 1],
                size: 0.5
              }
            }]
          };
            // Add the geometry and symbol to a new graphic
            // console.log(that.props.SQLstr.toString())
            const sceneLayer = new SceneLayer({
              portalItem: {
                id: "b06941ebb6b0460c9cfa31b35885c787"
              },
              popupEnabled: true,
              legendEnabled:true,
              // definitionExpression: "Par_GIS_ID IN ('"+ that.props.SQLstr.toString()+"')"
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
