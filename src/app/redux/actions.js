import * as ActionTypes from './actionTypes';

export function updateAppBarState(newState) {
  return {
    type: ActionTypes.UPDATE_APPBAR,
    newState: newState,
  };
}

export function showHideLegend() {
  return {
    type: ActionTypes.SHOW_HIDE_LEGEND,
  };
}

export function showHideLayers() {
  return {
    type: ActionTypes.SHOW_HIDE_LAYERS,
  };
}
