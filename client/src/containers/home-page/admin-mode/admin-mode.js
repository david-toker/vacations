import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import * as actions from '../../../store/actions';
import AdminCard from '../../../components/admin-card/admin-card';
import Modal from '../../../components/UI/modal/modal';
import Aux from '../../../hoc/auxilary-hoc/Auxilary-hoc';
import VacationForm from '../../../components/vacation-form/vacation-form';

class AdminMode extends Component {
    constructor(props){
        super(props);
        this.state = {
            editing: false,
            vacationForEdit: null,
            creating: true
        }
    };


    editHandler = (vacation) => {
        if (this.props.isAuthenticated) {
            this.setState({
                creating: false,
                vacationForEdit: vacation,
                editing: true
            })
        } else {
            this.props.history.push('/auth');
        } 
    };

    createNewVcation = () => {
        if (this.props.isAuthenticated) {
            this.setState({
                creating: true,
                editing: true
            })
        } else {
            this.props.history.push('/auth');
        } 
    }

    editCancelHandler = () => {
        this.setState({
            vacationForEdit: null,
            editing: false
        })
    }
    
    render () {
        
        let editForm = (<div>
            <h2>EDIT FORM:</h2>
            <VacationForm vacation={this.state.vacationForEdit} cancelClicked={this.editCancelHandler} createForm={this.state.creating} />
        </div>);

        if(!this.props.vacations) {
            return null;
        }

        const vacationsList = this.props.vacations.map(v => <AdminCard key={v.id} {...v} delete={()=>this.props.onDelete(v.id)} edit={() => this.editHandler(v)} />)

        
        return (
            <Aux>
                <Modal show={this.state.editing} modalClosed={this.editCancelHandler}>
                    {editForm}
                </Modal>
                <h3>Admin Mode</h3>
                <div style={{'marginBottom': '10px'}}>
                <Button variant="contained" color="primary" onClick={this.createNewVcation} >
                    Add new vacation
                </Button>
                </div>
                <Grid container
                    direction="row"
                    justify="space-around"
                    alignItems="stretch"
                    spacing={3}>
                        {vacationsList}
                </Grid> 
            </Aux>
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.user !== null,
        vacations: state.profile.vacations,
        username: state.auth.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPersonalData: () => dispatch(actions.fetchPersonalData()),
        onDelete: (id) => dispatch(actions.deleteVacation(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminMode);