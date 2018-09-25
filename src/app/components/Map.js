import * as React from 'react';
import { Scene } from 'react-arcgis';
import BuildingScene from './BuildingScene';
import SearchWidget from './SearchWidget';
import BostonBasemap from './BostonBasemap';
export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null
        };
    }
    handleOnClick(e){
      console.log(e);
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
              onClick = {this.handleOnClick}
          >
          <BuildingScene />
          <SearchWidget/>
          <BostonBasemap/>
          </Scene>
        );
    }
}
