import fetchCampsites from "./campsite_actions";
export const UPDATE_FILTER = "UPDATE_FILTER";

export const updateFilter = (filter, value) => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_FILTER,
            filter,
            value 
        })
        return (fetchCampsites(getState().ui.filter)(dispatch));
    }
}
