import * as React from 'react';
import { loadModules } from 'react-arcgis';

export default class BostonBasemap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "basemap": null
        };
    }

    render() {
        return null;
    }

    componentWillMount() {
        loadModules(["esri/layers/TileLayer","esri/Basemap"]).then(([ TileLayer,Basemap ]) => {

          var bostonBasemapLayer = new TileLayer({
                  // url: "https://awsgeo.boston.gov/arcgis/rest/services/Basemaps/BostonCityBasemap_WM/MapServer/",
                  url: "https://tiles.arcgis.com/tiles/Imiq6naek6ZWdour/arcgis/rest/services/BPDA_Detailed_Basemap_UC_2018/MapServer"

                });
          var bostonBasemap = new Basemap({
            baseLayers: [ bostonBasemapLayer ],
            title: "Boston Basemap",
            id: "bostonBasemap",
            // thumbnailUrl: "https://stamen-tiles.a.ssl.fastly.net/terrain/10/177/409.png"
          });
            this.setState({ "basemap":bostonBasemap });

            this.props.map.basemap  = this.state.basemap;
          });
    }

    componentWillUnmount() {
        this.props.map.basemap = null;
    }
}
