import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';



import './login.css';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/spinner/spinner';


class Login extends Component {

    state = {
        loginForm: {
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
            }
        },
        showPassword: false,
        formIsValid: false
    }

    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    };
    
    handleMouseDownPassword = event => {
        event.preventDefault();
    };


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
        const updatedLoginForm = {
            ...this.state.loginForm
        }
        const updatedFormElement = {
            ...updatedLoginForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedLoginForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedLoginForm) {
            formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            loginForm: updatedLoginForm,
            formIsValid: formIsValid
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        const {email, password} = this.state.loginForm
        this.props.onAuth(email.value, password.value);
    }

    signin = () => {
        const {email, password} = this.state.loginForm;
        this.props.onAuth(email.value, password.value);
    }
    
    render () {
        const {email, password} = this.state.loginForm;
        let form = (
            <div>
                <TextField
                    error={!this.state.loginForm.email.valid && this.state.loginForm.email.touched}
                    className="textField"
                    label="Mail Address"
                    variant="outlined"
                    name="email"
                    value={email.value}
                    type="text"
                    onChange={(event) => this.inputChangedHandler(event, 'email')}/>
                <br/>
                <br/>

                <FormControl className="textField" variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                    error={!this.state.loginForm.password.valid && this.state.loginForm.password.touched}
                    id="outlined-adornment-password"
                    type={this.state.showPassword ? 'text' : 'password'}
                    name="password"
                    value={password.value}
                    onChange={(event) => this.inputChangedHandler(event, 'password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                            edge="end"
                            >
                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    labelWidth={70}
                    />
                </FormControl>
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
                {this.props.error ? <h6 style={{"color": "red"}}>The email address or password entered is incorrect. Please try again.</h6>: null}
                <Button disabled={!this.state.formIsValid} variant="contained" color="primary" onClick={this.signin}>
                    SIGNIN
                </Button>
            </form>
            <h4>Not a member?</h4>
            <Button color="primary" component={RouterLink} to="/signup">
                Join for free
            </Button>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.errorLogin !== null,
        isAuthenticated: state.auth.user !== null,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/collection'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);