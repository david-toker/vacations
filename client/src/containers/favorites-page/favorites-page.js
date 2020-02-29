import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import UserCard from '../../components/user-card/user-card';

class FavoritesPage extends Component {

    render () {

        const { folowedVacations } = this.props.personalData;
       
        const pageHeader = folowedVacations.length ? <h3>Your Favorites Vacations</h3> : <h3>nothing added yet</h3>

        let folowed = folowedVacations.map(v => ({...v,isFollowed: true}));

        const renderdVacations = folowed.map(v => (
            <UserCard key={v.id} {...v}  actionWithFavorites={() =>
                {
                    this.props.onUnfollowVacation(this.props.username, v.id);
                    this.props.onFetchPersonalData()
                }}/>
        ));
        return (
            <div>
                <Container>
                {pageHeader}

                <Grid container
                    direction="row"
                    justify="space-around"
                    alignItems="stretch"
                    spacing={3}>
                        {renderdVacations}
                </Grid> 
                </Container>
            </div>
            
        )
    }
};

const mapStateToProps = state => {
    return {
        personalData: state.profile.personalData,
        isAdmin: state.profile.admin !== 0,
        isAuthenticated: state.auth.user !== null,
        username: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
       onUnfollowVacation: (user, id) => dispatch(actions.unfollowVacation(user, id)),
       onFetchPersonalData: () => dispatch(actions.fetchPersonalData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);