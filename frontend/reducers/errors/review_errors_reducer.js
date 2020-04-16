import { RECEIVE_REVIEW_ERRORS, CLEAR_REVIEW_ERRORS } from "../../actions/review_actions";
import { CLEAR_ALL_ERRORS } from "../../actions/session_actions";

const _defaultState = [];

const reviewErrorReducer = (state = _defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_REVIEW_ERRORS:
      return action.errors;
    case CLEAR_REVIEW_ERRORS:
      return _defaultState;
    case CLEAR_ALL_ERRORS:
      return _defaultState
    default:
      return state;
  }
}

export default reviewErrorReducer;