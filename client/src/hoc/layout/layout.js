import React, { Component } from 'react';
import { connect } from 'react-redux';

import './layout.css';
import Aux from '../auxilary-hoc/Auxilary-hoc'
import Toolbar from '../../components/navigation/toolbar/toolbar';
import SideDrawer from '../../components/navigation/side-drawer/side-drawer';

class Layout extends Component {
    constructor(props){
        super(props);
        this.state = {
          showSideDrawer: false  
        }
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState)=>{
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        })
    }

    render () {
        return (
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    isAdmin={this.props.isAdmin}
                    drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    isAdmin={this.props.isAdmin}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}/>
               <main className="Content">
                    {this.props.children}
                </main> 
            </Aux>
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.user !== null,
        isAdmin: state.profile.admin !== 0
    };
};


export default connect(mapStateToProps)(Layout);