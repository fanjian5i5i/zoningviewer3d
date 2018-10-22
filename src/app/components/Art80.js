import * as React from 'react';
import { loadModules } from 'react-arcgis';
import * as cms_docs from '../cms_docs';
export default class GraphicsLayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "graphicsLayer": null,
            "projects":cms_docs.getCmsDocs().cms_documents[0].BRA_Project
        };
    }

    render() {
        return null;
    }
    componentDidMount(){

      // var that = this;
      // loadModules(["esri/layers/GraphicsLayer","esri/Graphic"]).then(([ GraphicsLayer,Graphic ]) => {
      //   var geometry = {};
      //   var graphicsLayer = new GraphicsLayer({
      //     "title":"Development Projects"
      //   });
      //   var symbol = {
      //     type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      //     color: [226, 119, 40],
      //     outline: { // autocasts as new SimpleLineSymbol()
      //       color: [255, 255, 255],
      //       width: 2
      //     }
      //   };
      //   // console.log(cms_docs.getCmsDocs())
      //   cms_docs.getCmsDocs().cms_documents[0].BRA_Project.forEach(function(project){
      //     // console.log(project)
      //     var lat = parseFloat(project.BRALatitude);
      //     var long = parseFloat(project.BRALongitude);
      //
      //     var point = {
      //       type: "point", // autocasts as new Point()
      //       latitude: lat,
      //       longitude: long
      //     };
      //     var pointGraphic = new Graphic({
      //       geometry: point,
      //       symbol: symbol,
      //       // popupTemplate:template
      //     });
      //     that.state.graphicsLayer.graphics.add(pointGraphic);
      //   });
      //
      //   });
    }
    componentWillMount() {
      var that = this;

        loadModules(["esri/layers/GraphicsLayer","esri/Graphic"]).then(([ GraphicsLayer,Graphic ]) => {

              var symbol = {
                  type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                  color: [226, 119, 40],
                  outline: { // autocasts as new SimpleLineSymbol()
                    color: [255, 255, 255],
                    width: 2
                  }
                };
              that.state.projects.forEach(function(project){
                var point = {
                      type: "point", // autocasts as new Point()
                      longitude: parseFloat(project.BRALongitude),
                      latitude: parseFloat(project.BRALatitude)
                    };
                    // console.log(project)
                    var template = {
                      title: project.Title,
                      content: [{
                         type: "media",
                         mediaInfos: [{
                           type: "image",
                           value: {
                             sourceURL: "http://www.bostonplans.org/getattachment/"+project.MenuItemTeaserImage
                           }
                         }]
                      },{
                        type: "text",
                        text: project.BRAProjectDescription
                      }]

                    };
                    var pointGraphic = new Graphic({
                      geometry: point,
                      symbol: symbol,
                      popupTemplate:template
                    });
                    that.props.view.graphics.add(pointGraphic);
              });




          });
    }

    componentWillUnmount() {
        this.props.map.remove(this.state.graphicsLayer)
    }
}
