import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link as RouterLink } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './registration.css';
import * as actions from '../../../store/actions';
import Spinner from '../../../components/UI/spinner/spinner';


class Registration extends Component {

    state = {
        signupForm: {
            first: {
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            last: {
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedSignupForm = {
            ...this.state.signupForm
        }
        const updatedFormElement = {
            ...updatedSignupForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedSignupForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedSignupForm) {
            formIsValid = updatedSignupForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            signupForm: updatedSignupForm,
            formIsValid: formIsValid
        })
    }


    submitHandler = (event) => {
        event.preventDefault();
        const {first, last, email, password} = this.state.signupForm
        this.props.onSignup(first.value, last.value, email.value, password.value);
    }

    signup = () => {
        const {first, last, email, password} = this.state.signupForm
        this.props.onSignup(first.value, last.value, email.value, password.value);
    }
    
    render () {

        let form = (
            <div>
                <TextField
                    error={!this.state.signupForm.first.valid && this.state.signupForm.first.touched}
                    label="First Name"
                    variant="outlined"
                    name="fname"
                    value={this.state.signupForm.first.value}
                    type="text"
                    required
                    onChange={(event) => this.inputChangedHandler(event, 'first')}/>
                <br/>
                <br/>
                <TextField
                    error={!this.state.signupForm.last.valid && this.state.signupForm.last.touched}
                    label="Last Name"
                    variant="outlined"
                    name="lname"
                    value={this.state.signupForm.last.value}
                    type="text"
                    required
                    onChange={(event) => this.inputChangedHandler(event, 'last')}/>
                <br/>
                <br/>
                <TextField
                    error={!this.state.signupForm.email.valid && this.state.signupForm.email.touched}
                    label="Mail Address"
                    variant="outlined"
                    name="email"
                    value={this.state.signupForm.email.value}
                    type="text"
                    required
                    onChange={(event) => this.inputChangedHandler(event, 'email')}/>
                <br/>
                <br/>
                <TextField
                    error={!this.state.signupForm.password.valid && this.state.signupForm.password.touched}
                    label="Password"
                    variant="outlined"
                    name="password"
                    value={this.state.signupForm.password.value}
                    type="password"
                    required
                    onChange={(event) => this.inputChangedHandler(event, 'password')}
                     />
                <br/>
                <br/>
            </div>
        )

        if (this.props.loading) {
            form = <Spinner/>
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return (
            <div className="Auth">
            {authRedirect}
            <form >
                {form}
                {this.props.error ? <h6 style={{"color": "red"}}>this user already exist</h6>: null}
                <Button disabled={!this.state.formIsValid} variant="contained" color="primary" onClick={this.signup}>
                    SIGN UP
                </Button>
            </form>
            <h4>Already a member?</h4>
            <Button color="primary" component={RouterLink} to="/auth">
                Sign in
            </Button>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.errorSignup !== null,
        isAuthenticated: state.auth.user !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignup: (first, last, email, password) => dispatch(actions.registration(first, last, email, password)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/collection'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);