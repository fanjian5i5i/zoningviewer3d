import * as React from 'react';
import { loadModules } from 'react-arcgis';

export default class BuildingByLU extends React.Component {
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
      var title = "";
      var address = "";
      var owner = "";

      if(that.props.parcel!=null){
        title = that.props.parcel.attributes.PID_LONG;
        address = that.props.parcel.attributes.FULL_ADDRESS;
        owner = that.props.parcel.attributes.OWNER;
        const template = {  // autocasts as new PopupTemplate()
          title: "Parcl ID: "+title,
          content: [
            {
                type:"text",
                text:"<header class='esri-popup__header'><h2>Assessing</h2></header>"
            },
            {
              type:"text",
              text:"<table class='esri-widget__table'><tbody>\
                    <tr>\
                    <th class='esri-feature__field-header'>PID</th>\
                    <td class='esri-feature__field-data'>"+title+"</td>\
                    </tr>\
                    <tr>\
                    <th class='esri-feature__field-header'>Address</th>\
                    <td class='esri-feature__field-data'>"+address+"</td>\
                    </tr>\
                    <tr>\
                    <th class='esri-feature__field-header'>Owner</th>\
                    <td class='esri-feature__field-data'>"+owner+"</td>\
                    </tr>\
                    <tr>\
                    <th class='esri-feature__field-header'>More Info</th>\
                    <td class='esri-feature__field-data'><a target='_blank' href='http://www.cityofboston.gov/assessing/search/?pid="+title+"'>Assessor's Report</a></td>\
                    </tr>\
                    <tr>\
                    <th class='esri-feature__field-header'>See Also</th>\
                    <td class='esri-feature__field-data'><a target='_blank' href='http://app01.cityofboston.gov/ParcelViewer/?pid="+title+"'>Property Viewer</a></td>\
                    </tr>\
                    </tbody></table>"
            },
            {
                type:"text",
                text:"<header class='esri-popup__header'><h2>Zoning</h2></header>"
            },
            {
              type:"text",
              text:"<table class='esri-widget__table'><tbody>\
                    <tr>\
                    <th class='esri-feature__field-header'>PID</th>\
                    <td class='esri-feature__field-data'>"+title+"</td>\
                    </tr>\
                    </tbody></table>"
            },
            {
                type:"text",
                text:"<header class='esri-popup__header'><h2>Building</h2></header>"
            },

            {
            type: "fields",
            fieldInfos: [{
              fieldName: "LandUse",
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
            },
            {
              fieldName: "Par_GIS_ID",
              label: "GIS ID",
              visible: true
            }]
          }
          ]
        };
        that.state.sceneLayer.popupTemplate = template;
      }

    }
    componentDidMount() {
        var that = this;

        loadModules(['esri/layers/SceneLayer']).then(([ SceneLayer ]) => {

          const symbol =  {
            type: "mesh-3d", // autocasts as new MeshSymbol3D()
            symbolLayers: [{
              type: "fill", // autocasts as new FillSymbol3DLayer()
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
                id: "49f1121b57fd4381a42fe784638fc00b"
              },
              popupEnabled: true,
              legendEnabled:true,
              visible:false
              });

            this.setState({ sceneLayer });
            // sceneLayer.renderer = {
            //     type: "simple", // autocasts as new SimpleRenderer()
            //     symbol: symbol
            //   };
            this.props.map.add(sceneLayer);
        })
    }

    componentWillUnmount() {
        this.props.map.remove(this.state.sceneLayer);
    }
}
