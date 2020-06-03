import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { addUserAction } from '../../actions/users/newUserAction';
import axios from 'axios';
import moment from 'moment';


import NavbarContainer from '../../containers/NavbarContainer';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import swal from 'sweetalert';
import AllUserList from './AllUserList';
import 'date-fns';




class CreateAdminUser extends Component {
    constructor() {
        super();

        this.state = {
          
            showChild: true,
            open: false,

            driver_name: '',
            contact_no: '',
            address: '',
           
        }


    }

    handleDateChange = (date) => {
        this.setState({ selectedDate: date })
      }
    
      handleTimeChange = (time) => {
        this.setState({ selectedTime: time })
      }

    reloadChild = () => {
        this.setState({
            showChild: false
        })

        setTimeout(() => {
            this.setState({
                showChild: true
            })
        }, 100);

        console.log("Reload Child Invoked")
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });

    };




    handleAppointDateChange(date) {
        this.setState({ appoint_date: date })
    }

    handleMeetingDateChange(date) {
        this.setState({ meeting_date: date })
    }

    handleFollowupDateChange(date) {
        this.setState({ followup_date: date })
    }

    handleFollowupTimeChange(time) {
        this.setState({ followup_time: time })
    }



    handleInputChangeValue(event) {
        let nam = event ? event.target.name : event;
        let val = event ? event.target.value : event;
        console.log(nam, ":", val);
        this.setState({ [nam]: val });
    }

    qrCodeReader = () => {

        if (this.state.routes === this.state.authroute)
            return true
        else
            return false

    }

  

    handleSubmit = event => {
        event.preventDefault();

        if (this.qrCodeReader()) {

        const user = {
            

            user_name: this.state.user_name,
            contact_no: this.state.contact_no,
            address: this.state.address,
           
           
        };

        
        this.props.addUserAction(user);

        this.resetField();
        this.handleClose();
    }
    else {
        swal("Invalid Route : Permission not granted")
        this.resetField();
    }

    }

    resetField = () => {
        this.setState({
            user_name: '',
            contact_no: '',
            address: '',
         


        });


    }




    render() {



        const stylesForm = {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '5%'


        };

        const stylesBotton = {
            marginTop: 20
        };

        const modalClose = {
            float: 'right',
        }

        const styles1 = {


            paddingTop: 2,
            alignItems: 'center',
            justifyContent: 'center',

        };

        const textfieldHeight = {
            width: 300,
            height: 50,
            marginLeft: 4,
            marginRight: 4,
            marginTop: 5,
        };

        const textfieldAmount = {
            width: 100,
            height: 40,
            marginLeft: 2,
            marginRight: 2,
            marginTop: 2,
            marginBottom: 15,
        };


        return (

            <div>
                 <NavbarContainer/>
           
            <div style={styles1}>


                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" onClose={this.handleClose}>Create User
                    <IconButton aria-label="close" onClick={this.handleClose} style={modalClose}>
                            <CloseIcon />
                        </IconButton><br /><br />
                        <hr />
                    </DialogTitle>
                    <DialogContent>

                        <form className="reg" noValidate style={stylesForm}>

                            <Typography variant="h5" gutterBottom paragraph>
                                User Details
                    </Typography>

                            <div style={stylesForm}>

                                <div>
                                    <TextField style={textfieldHeight}
                                        variant="outlined"
                                        margin="dense"
                                        required

                                        id="user_name"
                                        label="User Name"
                                        name="user_name"
                                        value={this.state.user_name}
                                        onChange={(ev) => this.handleInputChangeValue(ev)}
                                    />
                                </div>
                                <div>
                                    <TextField style={textfieldHeight}
                                        variant="outlined"
                                        margin="dense"
                                        required
                                        id="contact_no"
                                        label="Contact No"
                                        name="contact_no"
                                        value={this.state.contact_no}
                                        onChange={(ev) => this.handleInputChangeValue(ev)}
                                    />
                                </div>
                                <div>
                                    <TextField style={textfieldHeight}
                                        variant="outlined"
                                        margin="dense"
                                        required

                                        name="address"
                                        label="Address"
                                        id="address"
                                        value={this.state.address}
                                        onChange={(ev) => this.handleInputChangeValue(ev)}
                                    />
                                </div>
                               </div>
                            <div style={stylesForm}>
                                <Button style={stylesBotton}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                  
                                    onClick={this.handleSubmit}>
                                    Submit
                                </Button>
                            </div>
                        </form>

                    </DialogContent>

                </Dialog>

                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Create New User
                </Button>
                <br /><br />
              
                <AllUserList />
            </div> </div>
        );
    }
}

CreateAdminUser.propTypes = {
    //classes: PropTypes.object.isRequired,
    addUserAction: PropTypes.func.isRequired,

    //   auth: PropTypes.object.isRequired
};



const mapDispatchToProps  = {
    addUserAction
}

export default connect(null,mapDispatchToProps)(CreateAdminUser);
