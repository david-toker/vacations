import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import UserCard from '../../../components/user-card/user-card';
import * as actions from '../../../store/actions';

class UserMode extends Component {
    render () {
        const {first, last} = this.props.userData.user[0];

        const {folowedVacations, allVacations} = this.props.userData;

        const idOfFolowedVacations = folowedVacations.map(v => v.id);
        let allVacationList = allVacations.map(v => ({...v,isFollowed: idOfFolowedVacations.some(idOfFol => idOfFol===v.id)}));
        

        const renderdVacations = allVacationList.map(v => (
            <UserCard key={v.id} {...v}  actionWithFavorites={()=>{
                if(v.isFollowed) {
                    this.props.onUnfollowVacation(this.props.username, v.id);
                    this.props.onFetchPersonalData()
                } else {
                    this.props.onFollowVacation(this.props.username, v.id);
                    this.props.onFetchPersonalData()
                }
                
            }}/>
        ));
        return (
            <div>
                <h1>Hello {first} {last}</h1>
                <Grid container
                    direction="row"
                    justify="space-around"
                    alignItems="stretch"
                    spacing={3}>
                        {renderdVacations}
                </Grid> 
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        username: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
       onUnfollowVacation: (user, id) => dispatch(actions.unfollowVacation(user, id)),
       onFollowVacation: (user, id) => dispatch(actions.followVacation(user, id)),
       onFetchPersonalData: () => dispatch(actions.fetchPersonalData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMode);