import * as actionTypes from '../actions/actionTypes';

const initialState = {
    followVacation: null,
    loading: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.DRAW_CHART_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.DRAW_CHART_SUCCESS:
            return {
                ...state,
                loading: false,
                followVacation: action.followVacation
            };
        case actionTypes.DRAW_CHART_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default reducer;