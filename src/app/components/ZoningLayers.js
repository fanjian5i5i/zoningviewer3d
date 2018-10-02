import * as React from 'react';
import { loadModules } from 'react-arcgis';

export default class LayerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            layers: []
        };
    }

    render() {
        return null;
    }

    componentWillMount() {
        loadModules(["esri/layers/FeatureLayer",]).then(([ FeatureLayer]) => {


            const zoningDistrict = new FeatureLayer({
              // URL to the service
              url: "http://mapservices.bostonredevelopmentauthority.org/arcproxy/arcgis/rest/services/Maps/Bos_Zoning_Viewer_WGS/MapServer/0"
            });
            const zoningSubDistrict = new FeatureLayer({
              // URL to the service
              url: "http://mapservices.bostonredevelopmentauthority.org/arcproxy/arcgis/rest/services/Maps/Bos_Zoning_Viewer_WGS/MapServer/1",
              minScale:3000
            });
            this.setState({ layers: [zoningSubDistrict,zoningDistrict]});

            this.props.map.addMany(this.state.layers);
          });
    }

    componentWillUnmount() {
        this.props.map.remove(this.state.layers);
    }
}
