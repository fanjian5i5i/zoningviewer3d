import * as React from 'react';
import { loadModules } from 'react-arcgis';

export default class GraphicsLayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "graphicsLayer": null
        };
    }

    render() {
        return null;
    }
    componentDidUpdate(){
      var that = this;
      
      loadModules(["esri/layers/GraphicsLayer","esri/Graphic"]).then(([ GraphicsLayer,Graphic ]) => {
        var geometry = {};
        var pid = "";
        var title = "";
        var address = "";
        var owner = "";
        var zoningDistrict = "";
        var zoningSubDistrict = "";
        var overlays = "";
        var fillSymbol = {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: [227, 139, 79, 0.3],
            outline: { // autocasts as new SimpleLineSymbol()
              color: [227, 139, 79],
              width: 2
            }
          };

          if(that.props.parcel!=null){
            that.state.graphicsLayer.removeAll();
            geometry = that.props.parcel.geometry;
            pid = that.props.parcel.attributes.PID_LONG
            title = that.props.parcel.attributes.PID_LONG;
            address = that.props.parcel.attributes.FULL_ADDRESS;
            owner = that.props.parcel.attributes.OWNER;
            
            
            
          }
          if(that.props.zoningDistrict){
            zoningDistrict = that.props.zoningDistrict;
          }
          if(that.props.zoningSubDistrict){
            zoningSubDistrict = that.props.zoningSubDistrict;
          }
          if(that.props.overlays){
            overlays = that.props.overlays;
          }
              
            
        var polygonGraphic = new Graphic({
          geometry: geometry,
          symbol: fillSymbol,
          // popupTemplate:template
        });

        that.state.graphicsLayer.graphics.add(polygonGraphic);

        if(that.props.view.popup.visible == false){
          that.props.view.popup.open({
            location:that.props.mapPoint,
            title:"Parcel ID: "+pid,
            content:
            "<div class='esri-feature'>\
              <div class='esri-feature__size-container'>\
              <div class='esri-feature__main-container'>\
                <div>\
                  <div class='esri-feature__text esri-feature__content-element'>\
                    <header class='esri-popup__header'><h2>Assessing</h2></header>\
                  </div>\
                  <div class='esri-feature__text esri-feature__content-element'>\
                  <table class='esri-widget__table'><tbody>\
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
                        </tbody>\
                  </table>\
                  </div>\
                  <div class='esri-feature__text esri-feature__content-element'>\
                  <header class='esri-popup__header'><h2>Zoning</h2></header>\
                  </div>\
                  <div class='esri-feature__text esri-feature__content-element'>\
                  <table class='esri-widget__table'><tbody>\
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
                        </tbody></table>\
                      </div>\
                <div>\
              </div>\
              </div>"
            
          })

        }


        });

    }
    componentWillMount() {
        loadModules(["esri/layers/GraphicsLayer","esri/Graphic"]).then(([ GraphicsLayer,Graphic ]) => {

          var graphicsLayer = new GraphicsLayer({
            "title":"Parcel Selected"
          });

            this.setState({ "graphicsLayer":graphicsLayer });

            this.props.map.add(graphicsLayer);
          });
    }

    componentWillUnmount() {
        this.props.map.remove(this.state.graphicsLayer)
    }
}
