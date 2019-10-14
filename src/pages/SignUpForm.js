import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import axios from 'axios';
import { signupUser } from '../redux/actions/userActions';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, NavLink, Switch } from 'react-router-dom';


class SignUpForm extends Component {
    constructor() {
        super();

        this.state = {
            
            name: '',
            hasAgreed: false,
			email: '',
			password: ''
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
          email: this.state.email,
          password: this.state.password,
          username: this.state.username,
          fullname: this.state.name
        };
      
        this.props.signupUser(userData, this.props.history);
        //this.login();
    }
	
// 	login(){

//   let signup = {}
//   signup.username = this.state.username;
//   signup.password = this.state.password;
//   signup.email = this.state.email;
//   signup.fullname = this.state.name;
  
//   if (signup.username ==="" || signup.password === "")return;	
  
//   //let json = JSON.stringify(obj);
// // axios.post('http://10.10.11.115:8080/signup', {
// //     signup
// // }).then(function (response) {

// //   if (response.data.Result === "Success"){
// //     window.location.href = "http://localhost:3000/#/react-auth-ui/signin";
   
// //    }else{
// //      alert(response.data.Massege);
// //    }
  
// //   console.log(response.statusText);

// //    }).then((res) => {
    
// //   })

// //   .catch(function (error) {
// //       console.log(error);
// //     });
// 	}

    render() {
      
        return (
        <div>
          <div className="PageSwitcher">
            <NavLink exact to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
            <NavLink to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
          </div>
          <div className="FormTitle">
            <NavLink to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/sign-up" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
          </div>
          <div className="FormCenter">
              <form onSubmit={this.handleSubmit} className="FormFields">
                <div className="FormField">
                  <label className="FormField__Label" htmlFor="name">Full Name</label>
                  <input type="text" id="name" className="FormField__Input" placeholder="Enter your full name" name="name" value={this.state.name} onChange={this.handleChange} />
                </div>
                <div className="FormField">
                  <label className="FormField__Label" htmlFor="password">Password</label>
                  <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
                </div>
                <div className="FormField">
                  <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                  <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
                </div>


                <div className="FormField">
                  <label className="FormField__Label" htmlFor="username">Username</label>
                  <input type="text" id="username" className="FormField__Input" placeholder="Enter your username" name="username" value={this.state.username} onChange={this.handleChange} />
                </div>

                <div className="FormField">
                  <label className="FormField__CheckboxLabel">
                      <input className="FormField__Checkbox" type="checkbox" name="hasAgreed" value={this.state.hasAgreed} onChange={this.handleChange} /> I agree all statements in <a href="" className="FormField__TermsLink">terms of service</a>
                  </label>
                </div>

                <div className="FormField">
                    <button className="FormField__Button mr-20">Sign Up</button> <Link to="/sign-in" className="FormField__Link">I'm already member</Link>
                </div>
              </form>
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { signupUser }
)(SignUpForm);
