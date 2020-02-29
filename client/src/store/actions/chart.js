import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const drawChartSuccess = (followVacation) => {
    return {
        type: actionTypes.DRAW_CHART_SUCCESS,
        followVacation: followVacation
    }
};

export const drawChartFail = (error) => {
    return {
        type: actionTypes.DRAW_CHART_FAIL,
        error: error
    };
};

export const drawChartStart = () => {
    return {
        type: actionTypes.DRAW_CHART_START
    };
};

export const drawChart = () => {
    return dispatch => {
        dispatch(drawChartStart());
        axios.get('/myprofile/chart')
            .then(res => {
                dispatch(drawChartSuccess(res.data.sumOfFolowed));
            })
            .catch(err => {
                dispatch(drawChartFail(err));
            })
    }
};