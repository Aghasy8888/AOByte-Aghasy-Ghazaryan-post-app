import { SET_SOMETHING_CHANGED } from "../actions/other/otherActionTypes";

const defaultState = {
    somethingChanged: false,
  };

  const otherReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_SOMETHING_CHANGED: {
            return {
                somethingChanged: action.value,
            }
        }    
            default:
                return state;
    }
  }

  export default otherReducer;