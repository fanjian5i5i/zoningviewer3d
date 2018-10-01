import * as React from 'react';
import { loadModules } from 'react-arcgis';

export default class SearchWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchWidget: null
        };
    }

    render() {
        return null;
    }

    componentWillMount() {
        loadModules(["esri/widgets/Search", "esri/layers/FeatureLayer","esri/tasks/Locator"]).then(([ Search,FeatureLayer,Locator ]) => {


          var sources = [
            {
  locator: new Locator({ url: "http://gis.cityofboston.gov/arcgis/rest/services/Locators/SAM_DualRange_Locator/GeocodeServer" }),
  singleLineFieldName: "Single Line Input",
  outFields: ["*"],
  name: "BOSTON Geocoding Service",
  localSearchOptions: {
    minScale: 300000,
    distance: 50000
  },

},
              {
                featureLayer: new FeatureLayer({
                  url: "http://gis.cityofboston.gov/arcgis/rest/services/Parcels/Parcels17/MapServer/0",
                  outFields: ["*"]
                }),
                searchFields: ["PID_LONG"],
                placeholder: "Expample: 0803069000",
                name: "Search By PID",
                prefix: "",
                suffix: "",
                maxResults: 1,
                maxSuggestions: 6,
                exactMatch: false,
                displayField: "PID_LONG", // defaults to FeatureLayer.displayField
                minSuggestCharacters: 0
              }];
              var searchWidget = new Search({
                  view: this.props.view,
                  sources:sources,
                  // includeDefaultSources:false
                });
            this.setState({ searchWidget });

            this.props.view.ui.add(searchWidget, {
                position: "top-right",
                index: 0
              });
          })
    }

    componentWillUnmount() {
        this.props.view.ui.remove(this.state.searchWidget);
    }
}
