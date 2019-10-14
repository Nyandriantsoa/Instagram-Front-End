import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom' //Route, Switch, 
import { login } from '../redux/actions/userActions';
import { connect } from 'react-redux';
//import axios from 'axios';
import { HashRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import Intro from './introduction';

// const emailRegex = RegExp(
//   /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
// );

// const Comp1 = () => (
//   <div>
//     <Link to="/afterL">To Home</Link>
//   </div>
// )

// const usernameRegex = RegExp(
//   / ^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/
// );


// const formValid = ({ formErrors, ...rest }) => {
//   let valid = true;


//   // validate form errors being empty
//   Object.values(formErrors).forEach(val => {
//     val.length > 0 && (valid = false);
//   });



//   // validate the form was filled out
//   Object.values(rest).forEach(val => {
//     val === null && (valid = false);
//   });



//   return valid;



// };


class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      errors: {},
      token: null,
      formErrors: {
        email: "",
        password: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    if (userData.username === "" || userData.password === "") return;
    this.props.login(userData, this.props.history);

    //this.login();
  }



  // login() {
  //   let login = {}
  //   login.username = this.state.username;
  //   login.password = this.state.password;

  //   if (login.username === "" || login.password === "") return;

  //   //let json = JSON.stringify(obj);
  //   // axios.post('http://localhost:8080/signin', {
  //   //   login
  //   // }).then((response) => {

  //   //   if (response.data.Result == "Success") {
  //   //     const { token } = response.data;
  //   //     this.setState({ token:token });
  //   //     localStorage.setItem('token', token);
  //   //   } else {
  //   //     alert("Invalid Username or Password");
  //   //   }

  //   //   console.log(response.statusText);

  //   // }).then((res) => {

  //   // }).catch(function (error) {
  //   //   console.log(error);
  //   // });


  // }

  render() {
    // const { token } = this.state;
    // if (token) {
    //   return (
    //     <Redirect to={{
    //       pathname: "/home",
    //       state: { token }
    //     }}
    //     />
    //   );
    // }
    
    return (
      <div>
        <div className="left"> {/*className="App__Aside"*/}
          <div > {/*className="App_left_item"*/}
            <Intro />
          </div>
        </div>
        <div className="right">
        {/* <div className="PageSwitcher">
          <NavLink exact to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
          <NavLink to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
        </div> */}
        <div className="FormTitle">
          <NavLink to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/sign-up" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
        </div>
        <div className="FormCenter">
        <div className="form-content">
          <form onSubmit={this.handleSubmit} className="FormFields" >
            <div className="FormField">
              <label className="FormField__Label" htmlFor="text">Username</label>
              <input type="text" onChange={this.handleChange} id="username" className="FormField__Input" placeholder="Enter your username or email" name="username" value={this.state.username} />
            </div>

            <div className="FormField">
              <label className="FormField__Label" htmlFor="password">Password</label>
              <input type="password" id="pasPasswordsword" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
            </div>

            <div className="FormField">
              <button className="FormField__Button mr-20" type="submit" >Sign In</button>
              {/* <Link to="/" className="FormField__Link">Create an account</Link> */}
            </div>

            {/* <div className="FormField">
              <Link to="/forgot" className="FormField__Link">Forgot Your Password?</Link>
            </div> */}

          </form>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  
});

const mapActionsToProps = {
  login
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SignInForm);
