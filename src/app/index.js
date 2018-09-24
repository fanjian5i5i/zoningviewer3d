import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Scene } from 'react-arcgis';
import BuildingScene from './components/BuildingScene';

ReactDOM.render(
  <div>
      <Scene
          style={{ width: '100vw', height: '100vh' }}
          mapProperties={{ basemap: 'topo' }}
          viewProperties={{
            camera: {
              position: [-71.0589, 42.35, 707],
              tilt: 55,
              heading: 0
            }
          }}
      >
      <BuildingScene />
      </Scene>
  </div>,
  document.getElementById('app')
);
