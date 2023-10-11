import  * as actionTyes  from "../actions/other/otherActionTypes";

const defaultState = {
  somethingChanged: false,
  editIsActive: false,
};

const otherReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTyes.SET_SOMETHING_CHANGED: {
      return {
        ...state,
        somethingChanged: action.value,
      };
    }

    case actionTyes.SET_EDIT_IS_ACTIVE: {
      return {
        ...state,
        editIsActive: action.value,
      };
    }

    default:
      return state;
  }
};

export default otherReducer;
