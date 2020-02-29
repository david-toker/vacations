import * as actionTypes from '../actions/actionTypes';

const initialState = {
    vacations: null,
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_COLLECTION_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_COLLECTION_SUCCESS:
            return {
                ...state,
                vacations: action.vacations,
                loading: false
            };
        case actionTypes.FETCH_DATA_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
};

export default reducer;