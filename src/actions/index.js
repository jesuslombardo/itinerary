import shipWell from '../apis/shipWell';

export const addItinerary = (newStop) => async dispatch => {

    try {
        const params = {
            "formatted_address": newStop.stopAdress
        }

        const response = await shipWell.post(`/v2/locations/addresses/validate/`, params);

        dispatch({
            type: 'ADD_ITINERARY',
            payload: {
                'adress' : response.data,
                'name' : newStop.stopName,
                'complete' : false
            }
        });
        dispatch({type: 'DELETE_ERROR',});
        
    } catch (err) {
        dispatch({
            type: 'ERROR_ADRESS',
            payload: err.response.data.non_field_errors
        });
    }

};

export const completeItenerary = (id) => async dispatch => {
    dispatch({
        type: 'COMPLETE_ITINERARY',
        id: id
    });
}

export const editItinerary = (id, stopName, term) => async dispatch => {
    const params = {
        "formatted_address": term
    }

    try {
        const response = await shipWell.post(`/v2/locations/addresses/validate/`, params)
        dispatch({
            type: 'EDIT_ITINERARY',
            id: id,
            payload: {
                'adress' : response.data,
                'name' : stopName
            }
        });
        dispatch({type: 'DELETE_ERROR',});
        
    } catch (err) {
        dispatch({
            type: 'ERROR_ADRESS',
            payload: err.response.data.non_field_errors
        });
    }


};

export const deleteItinerary = (id) => async dispatch => {
    dispatch({
        type: 'DELETE_ITINERARY',
        id: id
    });
};
