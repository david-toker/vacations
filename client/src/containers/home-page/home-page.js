import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import UserMode from './user-mode/user-mode';
import AdminMode from './admin-mode/admin-mode';

import Container from '@material-ui/core/Container';

class HomePage extends Component {
    
    componentDidMount () {
        this.props.onFetchPersonalData();
    }

    render () {

        let profile = (<div>Colection of Vacations</div>)
        if (this.props.isAuthenticated) {
            profile = this.props.isAdmin ? <AdminMode/> : <UserMode userData={this.props.personalData}/>
        }
        return (
            <div>
                <Container>
                    {profile}
                </Container>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        personalData: state.profile.personalData,
        isAdmin: state.profile.admin !== 0,
        isAuthenticated: state.auth.user !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPersonalData: () => dispatch(actions.fetchPersonalData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);