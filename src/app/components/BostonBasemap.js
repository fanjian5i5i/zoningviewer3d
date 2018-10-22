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
        loadModules(["esri/layers/TileLayer","esri/widgets/BasemapToggle","esri/Basemap"]).then(([ TileLayer,BasemapToggle, Basemap ]) => {

          var bostonBasemapLayer = new TileLayer({
              url: "https://tiles.arcgis.com/tiles/Imiq6naek6ZWdour/arcgis/rest/services/BPDA_Detailed_Basemap_UC_2018/MapServer"
          });
          var bostonBasemapDoITLayer = new TileLayer({
              url: "https://awsgeo.boston.gov/arcgis/rest/services/Basemaps/BostonCityBasemap_WM/MapServer/"
          });
          var bostonBasemap = new Basemap({
            baseLayers: [ bostonBasemapLayer ],
            title: "BPDA Basemap",
            id: "bostonBasemap",
            thumbnailUrl: "http://boston.maps.arcgis.com/sharing/rest/content/items/68dc7752914c4a678d7c861e3155afa0/info/thumbnail/thumbnail1536330904603.png"
          });
          var bostonBasemapDoIT = new Basemap({
            baseLayers: [ bostonBasemapDoITLayer ],
            title: "Boston Basemap",
            id: "bostonBasemap",
            thumbnailUrl: "http://boston.maps.arcgis.com/sharing/rest/content/items/0097a4a47d8e439f860d3a7685ecfe39/info/thumbnail/ago_downloaded.png"
          });

          var toggle = new BasemapToggle({
              // 2 - Set properties
              view: this.props.view, // view that provides access to the map's 'topo' basemap
              nextBasemap: bostonBasemap  // allows for toggling to the 'hybrid' basemap
            });
            this.setState({ "basemap":bostonBasemapDoIT});

            this.props.map.basemap  = this.state.basemap;
            this.props.view.ui.add(toggle, "top-left");

          });
    }

    componentWillUnmount() {
        this.props.map.basemap = null;
    }
}
