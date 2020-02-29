import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/layout/layout';
import Logout from './containers/auth/logout/logout';
import * as actions from './store/actions';

const asyncSignupPage = asyncComponent(() => {
  return import('./containers/auth/registration/registration');
});

const asyncLoginPage = asyncComponent(() => {
  return import('./containers/auth/login');
});

const asyncStartPage = asyncComponent(() => {
  return import('./containers/start-page/start-page');
});

const asyncHomePage = asyncComponent(() => {
  return import('./containers/home-page/home-page');
});

const asyncFavoritePage = asyncComponent(() => {
  return import('./containers/favorites-page/favorites-page');
});

const asyncLiveReport = asyncComponent(() => {
  return import('./containers/live-reports/live-reports');
});

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  };

  render () {

    let routes = (
      <Switch>
        <Route path="/auth" component={asyncLoginPage}/>
        <Route path="/signup" component={asyncSignupPage}/>
        <Route path="/" exact component={asyncStartPage}/>
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/collection" component={asyncHomePage}/>
          <Route path="/my-favorite-list" component={asyncFavoritePage}/>
          <Route path="/follow-statistics" component={asyncLiveReport}/>
          <Route path="/signout" component={Logout}/>
          <Redirect to="/collection" />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
  
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.user !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
