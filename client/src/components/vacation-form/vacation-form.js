import React, { Component } from 'react';
import { connect } from 'react-redux';
import './vacation-form.css';

import _ from 'lodash';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import DatePicker from './date-pick/date-pick'
import UploadButtons from './upload-picture.js/upload-picture';

import * as actions from '../../store/actions';

class VacationForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            destination: '',
            description: '',
            start_date: '',
            end_date: '',
            price: 0,
            id: 0,
            vacationImg: '',
            imgError: null
        }
    }

    componentDidUpdate(prevProps,prevState) {
        if(prevProps.vacation !== this.props.vacation && !_.isEmpty(this.props.vacation)) {
            this.setState({
                destination: this.props.vacation.destination,
                description: this.props.vacation.description,
                start_date: this.props.vacation.start_date,
                end_date: this.props.vacation.end_date,
                price: this.props.vacation.price,
                id: this.props.vacation.id,
                vacationImg: '',
                imgError: null
            })
        }
    }


    onChange = (field, value) => {
        this.setState({
            [field]: value
        })
    };

    changeDateOfVacat = (field, date) => {
        this.setState({
            [field]: date
        })
    };

    submitEditHandler = (event) => {
        event.preventDefault();
        const vacationFormBody = {
            idVacation: this.state.id,
            destination: this.state.destination,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            price: this.state.price
        };
        const dataUp = new FormData();
        dataUp.append('vacatImg', this.state.vacationImg);
        dataUp.append('vacationText', JSON.stringify(vacationFormBody));
        if (this.props.createForm) {
            if(this.state.vacationImg){
                this.setState({
                    imgError: null
                });
                this.props.onCreateVacation(dataUp);
                this.resetAndClose();
            } else {
                this.setState({
                    imgError: "Upload image"
                })
            }
            
        } else {
            this.props.onEditVacation(dataUp);
            this.resetAndClose();
        }
    }

    resetAndClose = () => {
        this.setState({
            destination: '',
            description: '',
            start_date: '',
            end_date: '',
            price: 0,
            id: 0,
            vacationImg: ''
        })
        this.props.cancelClicked();
    }

    render() {
        const {destination, description, price, start_date, end_date} = this.state;
        return (
            <div>
                <form onSubmit={this.submitEditHandler}>
                <TextField className="Input" label="Destination" value={destination} type="text" onChange={({target}) => this.onChange('destination',target.value)} />
                
                <TextField className="Input" label="Description" value={description} type="text" onChange={({target}) => this.onChange('description',target.value)} />
               
                <TextField label="Price" value={price} type="number" onChange={({target}) => this.onChange('price',target.value)} />
                <br/>
                <br/>
            
                <Grid justify="flex-start">
                <DatePicker vacationDate={Date.parse(start_date)} dateLabel='Chech-in' changeDate={(date) => this.changeDateOfVacat('start_date',date)} />

                <DatePicker vacationDate={Date.parse(end_date)} minimalDate={Date.parse(start_date)} dateLabel='Chech-out' changeDate={(date) => this.changeDateOfVacat('end_date',date)}  />
                </Grid>
                
                <UploadButtons uploaded={(img)=>this.setState({vacationImg: img})} />
                <p style={{"color": "red"}}>{this.state.imgError}</p>
                <br/>
                <Button onClick={this.submitEditHandler} variant="outlined" color="primary">
                    Edit
                </Button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEditVacation: (vacation) => dispatch(actions.editVacation(vacation)),
        onCreateVacation: (vacation) => dispatch(actions.createVacation(vacation))
    }
}

export default connect(null, mapDispatchToProps)(VacationForm);