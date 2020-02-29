import * as actionTypes from '../actions/actionTypes';

const initialState = {
    personalData: null,
    loading: false,
    admin: false,
    vacations: null
};

const updateVacations = (arr, idx) => {
    return [
        ...arr.slice(0, idx),
        ...arr.slice(idx+1)
    ]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DATA_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_DATA_SUCCESS:
            return {
                ...state,
                personalData: action.personalData,
                admin: action.admin,
                vacations: action.vacations,
                loading: false
            };
        case actionTypes.FETCH_DATA_FAIL:
            return {
                ...state,
                loading: false
            };
        case actionTypes.DELETE_PERSONAL_DATA:
            return {
                ...state,
                personalData: null,
                admin: false
            };
        case actionTypes.ADD_TO_FAVORITES:
            return {
                ...state
            };
        case actionTypes.REMOVE_FROM_FAVORITES:
            return {
                ...state
            };    
        case actionTypes.EDIT_VACATION:
            return {
                ...state
            };    
        case actionTypes.EDIT_VACATION_FAIL:
            return {
                ...state
            };    
        case actionTypes.DELETE_VACATION:
            const itemIndex = state.vacations.findIndex(({id}) => id === action.idVacation);
            ;
            return {
                ...state,
                vacations: updateVacations(state.vacations, itemIndex)
            };    
        default:
            return state;
    }
};

export default reducer;