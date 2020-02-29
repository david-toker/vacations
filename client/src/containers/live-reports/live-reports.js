import React, { Component } from 'react';
import { connect } from 'react-redux';

import _ from 'lodash';
import { Bar } from 'react-chartjs-2';

import * as actions from '../../store/actions'
class LiveReport extends Component {

    componentDidMount() {
        this.props.onDrawChart()
    }

    render() {
        if(!this.props.followedVacation) {
            return null;
        }
        return (
            <div>
            <Bar
                data={{
                    labels: Object.keys(_.countBy(_.map(this.props.followedVacation, 'destination'))),
                    datasets: [{
                        label:'Folowers',
                        data: Object.values(_.countBy(_.map(this.props.followedVacation, 'destination'))),
                        backgroundColor: "rgba(255,99,132,0.4)"
                    }]
                }}
                options = {{
                title: {
                    display: true,
                    text:'Folowers to Vacations',
                    fontSize: 25
                },
                // legend:{
                //   display:true,
                //   position:"right"
                // },
                scales: {
                    yAxes: [{
                        ticks: {
                            //  max: 10,
                            min: 0,
                            stepSize: 1
                        }
                    }]
                }
                }}
            />
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        followedVacation: state.chart.followVacation
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onDrawChart: () => dispatch(actions.drawChart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveReport);