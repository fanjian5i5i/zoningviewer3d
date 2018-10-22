import * as React from 'react';
import { loadModules } from 'react-arcgis';

export default class LegendWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            legendWidget: null
        };
    }

    render() {
        return null;
    }

    componentWillMount() {
        loadModules(["esri/widgets/Legend"]).then(([ Legend]) => {
          var legend = new Legend({
              view: this.props.view,
              layerInfos: [{
                layer: this.props.map.layers.getItemAt(0),
                // title: "Parcel Selected"
              },{
                layer: this.props.map.layers.getItemAt(1),
                // title: "Buildings By Landuse"
              },
              {
                layer: this.props.map.layers.getItemAt(2),
                // title: "Buildings Permitted"
              },
              {
                layer: this.props.map.layers.getItemAt(3),
                // title: "Buildings Under Construction"
              },
              {
                layer: this.props.map.layers.getItemAt(4),
                // title: "Current Buildings"
              }
              ]
              });
            this.setState({ legendWidget:legend });

            this.props.view.ui.add(legend, {
                position: "bottom-right",
                index: 0
              });
          })
    }

    componentWillUnmount() {
        this.props.view.ui.remove(this.state.legendWidget);
    }
}
