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
      console.log(that.props.parcel);
      var title = "";
      var address = "";
      var owner = "";
      var zoningDistrict = "";
      var zoningSubDistrict = "";
      var overlays = "";

      if(that.props.parcel!=null){
        title = that.props.parcel.attributes.PID_LONG;
        address = that.props.parcel.attributes.FULL_ADDRESS;
        owner = that.props.parcel.attributes.OWNER;
        zoningDistrict = that.props.zoningDistrict;
        zoningSubDistrict = that.props.zoningSubDistrict;
        overlays = that.props.overlays;
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
                    <th class='esri-feature__field-header'>Zoning District</th>\
                    <td class='esri-feature__field-data'>"+zoningDistrict+"</td>\
                    </tr>\
                    <tr>\
                    <th class='esri-feature__field-header'>Zoning SubDistrict</th>\
                    <td class='esri-feature__field-data'>"+zoningSubDistrict+"</td>\
                    </tr>\
                    <tr>\
                    <th class='esri-feature__field-header'>Zoning Overlays</th>\
                    <td class='esri-feature__field-data'>"+overlays+"</td>\
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
              popupEnabled: true,
              legendEnabled:true
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
