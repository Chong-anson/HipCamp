import {fetchCampsites} from "./campsite_actions";
export const UPDATE_FILTER = "UPDATE_FILTER";
// export const UPDATE_APPLIED_FILTER = "UPDATE_APPLIED_FILTER";
export const UPDATE_TAGS = "UPDATE_TAGS";

export const updateFilter = (filter, value) => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_FILTER,
            filter,
            value 
        })
        if (filter === "bounds" )
          return (fetchCampsites(getState().ui.filter)(dispatch));
    }
};

// export const updateTags = ( tags, selectedCampsites ) => ({
//     type: UPDATE_TAGS, 
//     tags, 
//     selectedCampsites
// });




