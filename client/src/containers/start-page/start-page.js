import React, { Component } from 'react';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Spinner from '../../components/UI/spinner/spinner';
import StartPageCard from '../../components/start-page-card/start-page-card';
import * as actions from '../../store/actions';

class StartPage extends Component {

    componentDidMount () {
        this.props.onFetchVacationCollection();
        this.props.onDeleteData()
    };

    render () {
        let vacations = <Spinner/>;
        if (!this.props.loading && this.props.vacations) {
            vacations = this.props.vacations.slice(0, 6).map(vac => <StartPageCard key={vac.id} {...vac}/>)
        }
        return (
            <div>
                <Container>
                <h1>Latest Deals</h1>
                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="stretch"
                    spacing={3}>
                    {vacations}
                </Grid>  
            </Container>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        vacations: state.collection.vacations,
        loading: state.collection.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchVacationCollection: () => dispatch(actions.fetchVacationCollection()),
        onDeleteData: () => dispatch(actions.deletePersonalData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);