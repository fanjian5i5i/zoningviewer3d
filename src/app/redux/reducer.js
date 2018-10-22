import { combineReducers } from 'redux';
import * as ActionTypes from './actionTypes';

const initAppBarState = {
  // loginText: '',
  showLegend: true,
  showLayers:false
  // editor:false,
  // showConveyed: false,
  // lastFilter:{},
  // counter: 1,
};

function appBar(state = initAppBarState, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  console.log(action.type)
  switch (action.type) {
    // case ActionTypes.UPDATE_LOGINTEXT:
    //   return {
    //     ...state,
    //     loginText: action.loginText,
    //   };
    case ActionTypes.SHOW_HIDE_LEGEND:
      return {
        ...state,
        showLegend: !state.showLegend,
      };
    case ActionTypes.SHOW_HIDE_LAYERS:
      return {
        ...state,
        showLayers: !state.showLayers,
      };
    default:
      return state;
    }

}

const reducer = combineReducers({
  appBar,
});

export default reducer;
