import * as React from 'react';
import { loadModules } from 'react-arcgis';

export default class BermudaTriangle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sceneLayer: null
        };
    }

    render() {
        return null;
    }

    componentWillMount() {
        loadModules(['esri/layers/SceneLayer']).then(([ SceneLayer ]) => {
          const template = {  // autocasts as new PopupTemplate()
            title: "Parcl ID: {Par_GIS_ID}",
            content: [{
              type: "fields",
              fieldInfos: [{
                fieldName: "Parcel_Use",
                label: "Use",
                visible: true
              }, {
                fieldName: "Centr_Lat",
                label: "Latitude",
                visible: true
              }, {
                fieldName: "Centr_Lon",
                label: "Longitude",
                visible: true
              }]
            }]
          };
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
            const sceneLayer = new SceneLayer({
              portalItem: {
                id: "b06941ebb6b0460c9cfa31b35885c787"
              },
              popupEnabled: true
            });

            this.setState({ sceneLayer });
            sceneLayer.renderer = {
                type: "simple", // autocasts as new SimpleRenderer()
                symbol: symbol
              };
            sceneLayer.popupTemplate = template;
            this.props.map.add(sceneLayer);
        })
    }

    componentWillUnmount() {
        this.props.map.remove(this.state.sceneLayer);
    }
}
