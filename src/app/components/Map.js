import * as React from 'react';
import { Scene } from 'react-arcgis';
import BuildingScene from './BuildingScene';
import BuildingUnderConstruction from './BuildingUnderConstruction';
import BuildingPermitted from './BuildingPermitted';
import SearchWidget from './SearchWidget';
import BostonBasemap from './BostonBasemap';
import GraphicsLayer from './GraphicsLayer';
import { loadModules } from 'react-arcgis';
export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            graphicsLayer: null,
            parcel:null
        };
    }
    handleOnClick(e){
      var that = this;
      loadModules(["esri/tasks/QueryTask", "esri/tasks/support/Query"]).then(([ QueryTask,Query ]) => {
        // console.log(Query)
        var parcelURL = "https://services.arcgis.com/sFnw0xNflSi8J0uh/ArcGIS/rest/services/parcels_full_18/FeatureServer/0";
        var queryTask = new QueryTask({
           url: parcelURL
         });
        var query = new Query();
         query.returnGeometry = true;
         query.outFields = ["*"];
         query.geometry = e.mapPoint;
         query.spatialRelationship = "intersects";
         // When resolved, returns features and graphics that satisfy the query.
         queryTask.execute(query).then(function(results){

           that.setState({parcel:results.features[0] });
           // console.log(that.state)
           // var polygonGraphic = new Graphic({
           //    geometry: results.features[0].geometry ,
           //    symbol: fillSymbol
           //  });
           //  console.log(polygonGraphic)
           // gLayer.graphics.add(polygonGraphic);

         });
      })
      // console.log(event.mapPoint);
      // gLayer.removeAll();
      // var parcelURL = "https://services.arcgis.com/sFnw0xNflSi8J0uh/arcgis/rest/services/Parcels_2018/FeatureServer/0";
      // var queryTask = new QueryTask({
      //    url: parcelURL
      //  });

    }
    componentWillMount() {

    }
    render() {
        return (
          <Scene
              style={{ width: '100vw', height: '100vh' }}
              // mapProperties={{ basemap: 'topo' }}
              viewProperties={{
                camera: {
                  position: [-71.0589, 42.35, 707],
                  tilt: 55,
                  heading: 0
                }
              }}
              onClick = {this.handleOnClick.bind(this)}
          >
          <BuildingScene parcel={this.state.parcel}/>
          <BuildingUnderConstruction parcel={this.state.parcel}/>
          <BuildingPermitted parcel={this.state.parcel}/>
          <SearchWidget/>
          <BostonBasemap/>
          <GraphicsLayer parcel={this.state.parcel}/>
          </Scene>
        );
    }
}
