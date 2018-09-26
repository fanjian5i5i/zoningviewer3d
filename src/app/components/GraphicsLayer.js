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
      var geometry = {};
      that.state.graphicsLayer.removeAll();
      var fillSymbol = {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [227, 139, 79, 0.3],
          outline: { // autocasts as new SimpleLineSymbol()
            color: [227, 139, 79],
            width: 2
          }
        };
        if(that.props.parcel!=null){
          geometry = that.props.parcel.geometry;
        }
      loadModules(["esri/layers/GraphicsLayer","esri/Graphic"]).then(([ GraphicsLayer,Graphic ]) => {

        var polygonGraphic = new Graphic({
          geometry: geometry,
          symbol: fillSymbol
        });

       that.state.graphicsLayer.graphics.add(polygonGraphic);
        });

    }
    componentWillMount() {
        loadModules(["esri/layers/GraphicsLayer","esri/Graphic"]).then(([ GraphicsLayer,Graphic ]) => {

          var graphicsLayer = new GraphicsLayer();

            this.setState({ "graphicsLayer":graphicsLayer });

            this.props.map.add(graphicsLayer);
          });
    }

    componentWillUnmount() {
        this.props.map.remove(this.state.graphicsLayer)
    }
}
