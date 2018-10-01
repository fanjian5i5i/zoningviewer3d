import * as React from 'react';
import { loadModules } from 'react-arcgis';

export default class LayerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            layers: null
        };
    }

    render() {
        return null;
    }

    componentWillMount() {
        loadModules(["esri/layers/FeatureLayer",]).then(([ FeatureLayer]) => {


            const layer = new FeatureLayer({
              // URL to the service
              url: "http://mapservices.bostonredevelopmentauthority.org/arcproxy/arcgis/rest/services/Maps/Bos_Zoning_Viewer_WGS/MapServer/0"
            });
            this.setState({ layers: layer});

            this.props.map.add(layer);
          });
    }

    componentWillUnmount() {
        this.props.map.remove(this.state.layers);
    }
}
