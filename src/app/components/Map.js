import * as React from 'react';
import { Scene } from 'react-arcgis';
import BuildingConstructionComplete from './BuildingConstructionComplete';
import BuildingUnderConstruction from './BuildingUnderConstruction';
import BuildingBoardApproved from './BuildingBoardApproved';
import BuildingUnderReview from './BuildingUnderReview';
import BuildingLetterOfIntent from './BuildingLetterOfIntent';
// import BuildingPermitted from './BuildingPermitted';
// import BuildingByLU from './BuildingByLU';
import Art80 from './Art80';
import SearchWidget from './SearchWidget';
import LegendWidget from './LegendWidget';
import BostonBasemap from './BostonBasemap';
import GraphicsLayer from './GraphicsLayer';
import LayerControl from './LayerControl';
import ZoningLayers from './ZoningLayers';
import { loadModules } from 'react-arcgis';
import { connect } from 'react-redux';
import { showHideLegend } from '../redux/actions';


import * as cms_docs from '../cms_docs';


const styles = {
  legend:{
    display:"none"
  }
}
class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            view:null,
            graphicsLayer: null,
            parcel:null,
            mapPoint:{},
            projects:cms_docs.getCmsDocs().cms_documents[0].BRA_Project,
            template:null
        };

        this.handleMapLoad = this.handleMapLoad.bind(this)
    }

    handleMapLoad(map, view) {
        this.setState({ map,view });
    }
    handleOnClick(e){
      var that = this;
      console.log(e.mapPoint)
      that.state.view.hitTest(e)
            .then(function(response) {
              console.log(response.results);
              var lat = response.results[0].graphic.attributes.Centr_Lat.toFixed(3);
              var lon = response.results[0].graphic.attributes.Centr_Lon.toFixed(3);
              // console.log(that.state.projects)
              var template = {
                title: "PID: "+response.results[0].graphic.attributes.Par_GIS_ID,
                content:"Lat Lon are not matching"
              };
              that.setState({template:template})
              that.state.projects.forEach(function(project){
                // console.log(parseFloat(project.BRALatitude).toFixed(4))
                if(parseFloat(project.BRALatitude).toFixed(3) == lat && parseFloat(project.BRALongitude).toFixed(3) == lon){
                  console.log(project);

                  // console.log(e.mapPoint)
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
                      text: "<a href='http://www.bostonplans.org/mapRedirect?id=" + project.BRAProjectID + "&type=2'>"+project.BRAProjectDescription+"</a>"
                    }]

                  };
                  that.setState({template:template})
                  // if(that.state.view.popup.visible == false){
                  // that.state.view.popup.visible = true;
                  //   that.state.view.popup.open({
                  //     // location:e.mapPoint,
                  //     title:"Parcel ID: ",
                  //     content:"123"
                  //   })
                  // }
                }else{

                }
              })
            });

         // <BuildingByLU parcel={this.state.parcel}/>
         // <BuildingPermitted parcel={this.state.parcel}/>
         // <BuildingUnderConstruction parcel={this.state.parcel}/>
// <BuildingScene parcel={this.state.parcel} zoningDistrict={this.state.zoningDistrict} zoningSubDistrict={this.state.zoningSubDistrict} overlays={this.state.overlays}/>
// <GraphicsLayer parcel={this.state.parcel} mapPoint={this.state.mapPoint} zoningDistrict={this.state.zoningDistrict} zoningSubDistrict={this.state.zoningSubDistrict} overlays={this.state.overlays}/>
          // <Art80/>
          // <ZoningLayers/>

    }
    componentDidMount() {
      var that=this;
      loadModules(["esri/tasks/QueryTask",
      "esri/tasks/support/Query","esri/geometry/Point"]).then(([ QueryTask,Query,Point]) => {
        var SQLstrConComp = [];
        var SQLstrUndCon = [];
        var SQLstrBoardApp = [];
        var SQLstrUnderReview = [];
        var SQLstrLOI= [];
        that.state.projects.forEach(function(project){
            console.log(project.BRAProjectStatus);
            if(project.BRAProjectStatus=="Construction Complete"){
              var point = new Point({
                  longitude: parseFloat(project.BRALongitude),
                  latitude: parseFloat(project.BRALatitude)
                })
                var parcelURL = "https://services.arcgis.com/sFnw0xNflSi8J0uh/ArcGIS/rest/services/parcels_full_18/FeatureServer/0";
                var queryTask = new QueryTask({
                   url: parcelURL
                 });
                var query = new Query();
                 query.returnGeometry = false;
                 query.outFields = ["*"];
                 query.geometry = point;
                 query.spatialRelationship = "intersects";
                 // When resolved, returns features and graphics that satisfy the query.
                 queryTask.execute(query).then(function(results){

                   SQLstrConComp.push(results.features[0].attributes.PID_LONG);
                   // consol.log(SQLstr);
                 })
            }else if(project.BRAProjectStatus=="Permitted / Under Construction"){
              var point = new Point({
                  longitude: parseFloat(project.BRALongitude),
                  latitude: parseFloat(project.BRALatitude)
                })
                var parcelURL = "https://services.arcgis.com/sFnw0xNflSi8J0uh/ArcGIS/rest/services/parcels_full_18/FeatureServer/0";
                var queryTask = new QueryTask({
                   url: parcelURL
                 });
                var query = new Query();
                 query.returnGeometry = false;
                 query.outFields = ["*"];
                 query.geometry = point;
                 query.spatialRelationship = "intersects";
                 // When resolved, returns features and graphics that satisfy the query.
                 queryTask.execute(query).then(function(results){

                   SQLstrUndCon.push(results.features[0].attributes.PID_LONG);
                   // consol.log(SQLstr);
                 })
            }else if(project.BRAProjectStatus=="Board Approved"){
              var point = new Point({
                  longitude: parseFloat(project.BRALongitude),
                  latitude: parseFloat(project.BRALatitude)
                })
                var parcelURL = "https://services.arcgis.com/sFnw0xNflSi8J0uh/ArcGIS/rest/services/parcels_full_18/FeatureServer/0";
                var queryTask = new QueryTask({
                   url: parcelURL
                 });
                var query = new Query();
                 query.returnGeometry = false;
                 query.outFields = ["*"];
                 query.geometry = point;
                 query.spatialRelationship = "intersects";
                 // When resolved, returns features and graphics that satisfy the query.
                 queryTask.execute(query).then(function(results){

                   SQLstrBoardApp.push(results.features[0].attributes.PID_LONG);
                   // consol.log(SQLstr);
                 })
            }else if(project.BRAProjectStatus=="Under Review"){
              var point = new Point({
                  longitude: parseFloat(project.BRALongitude),
                  latitude: parseFloat(project.BRALatitude)
                })
                var parcelURL = "https://services.arcgis.com/sFnw0xNflSi8J0uh/ArcGIS/rest/services/parcels_full_18/FeatureServer/0";
                var queryTask = new QueryTask({
                   url: parcelURL
                 });
                var query = new Query();
                 query.returnGeometry = false;
                 query.outFields = ["*"];
                 query.geometry = point;
                 query.spatialRelationship = "intersects";
                 // When resolved, returns features and graphics that satisfy the query.
                 queryTask.execute(query).then(function(results){

                   SQLstrUnderReview.push(results.features[0].attributes.PID_LONG);
                   // consol.log(SQLstr);
                 })
            }
            else if(project.BRAProjectStatus=="Letter of Intent"){
              var point = new Point({
                  longitude: parseFloat(project.BRALongitude),
                  latitude: parseFloat(project.BRALatitude)
                })
                var parcelURL = "https://services.arcgis.com/sFnw0xNflSi8J0uh/ArcGIS/rest/services/parcels_full_18/FeatureServer/0";
                var queryTask = new QueryTask({
                   url: parcelURL
                 });
                var query = new Query();
                 query.returnGeometry = false;
                 query.outFields = ["*"];
                 query.geometry = point;
                 query.spatialRelationship = "intersects";
                 // When resolved, returns features and graphics that satisfy the query.
                 queryTask.execute(query).then(function(results){

                   SQLstrLOI.push(results.features[0].attributes.PID_LONG);
                   // consol.log(SQLstr);
                 })
            }



        });
        setTimeout(function () {
          // console.log(SQLstr)
          that.setState({"SQLstrUndCon":SQLstrUndCon,"SQLstrConComp":SQLstrConComp,"SQLstrBoardApp":SQLstrBoardApp,"SQLstrUnderReview":SQLstrUnderReview,"SQLstrLOI":SQLstrLOI})
        }, 3000);
      });


    }
    render() {

        return (
          <div>
          <Scene
              style={{ width: '100vw', height: '93vh' }}
              // mapProperties={{ basemap: 'topo' }}
              viewProperties={{
                camera: {
                  position: [-71.0589, 42.35, 707],
                  tilt: 55,
                  heading: 0
                }
              }}
              onClick = {this.handleOnClick.bind(this)}
              onLoad={this.handleMapLoad.bind(this)}
          >
          <BuildingConstructionComplete parcel={this.state.parcel} zoningDistrict={this.state.zoningDistrict} zoningSubDistrict={this.state.zoningSubDistrict} overlays={this.state.overlays} SQLstrConComp={this.state.SQLstrConComp} template={this.state.template}/>
          <BuildingUnderConstruction parcel={this.state.parcel} zoningDistrict={this.state.zoningDistrict} zoningSubDistrict={this.state.zoningSubDistrict} overlays={this.state.overlays} SQLstrUndCon={this.state.SQLstrUndCon} template={this.state.template}/>

          <BuildingBoardApproved parcel={this.state.parcel} zoningDistrict={this.state.zoningDistrict} zoningSubDistrict={this.state.zoningSubDistrict} overlays={this.state.overlays} SQLstrBoardApp={this.state.SQLstrBoardApp} template={this.state.template}/>
          <BuildingUnderReview parcel={this.state.parcel} zoningDistrict={this.state.zoningDistrict} zoningSubDistrict={this.state.zoningSubDistrict} overlays={this.state.overlays} SQLstrUnderReview={this.state.SQLstrUnderReview} template={this.state.template}/>
          <BuildingLetterOfIntent parcel={this.state.parcel} zoningDistrict={this.state.zoningDistrict} zoningSubDistrict={this.state.zoningSubDistrict} overlays={this.state.overlays} SQLstrLOI={this.state.SQLstrLOI} template={this.state.template}/>



          <SearchWidget/>
          <BostonBasemap/>
          <Art80/>
          {this.props.appBarState.showLegend ? <LegendWidget />:[]}
          {this.props.appBarState.showLayers ? <LayerControl/>:[]}

          </Scene>
          </div>
        );
    }
}
const mapStateToProps = state => ({
  appBarState: state.appBar,
});
export default connect(mapStateToProps)(Map);
