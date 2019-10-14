import React from 'react';
import { HashRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import SignUpForm from './pages/SignUpForm';
import SignInForm from './pages/SignInForm';
import ForgotPwd from './pages/ForgotPwd';
import Home from './pages/home';
import Intro from './pages/introduction';
import { Provider } from 'react-redux';
import store from './redux/store';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { logoutUser } from './redux/actions/userActions'; //, getUserData 
import { SET_AUTHENTICATED } from './redux/types';
import Navbar from './components/layout/Navbar'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeObject from './util/theme';

import './App.css';

const theme = createMuiTheme(themeObject);

axios.defaults.baseURL =
  'http://172.19.144.24:8080';

const token = localStorage.Token;
// if (!token) {
//   // const decodedToken = jwtDecode(token);
//   // if (decodedToken.exp * 1000 < Date.now()) {
//   //   store.dispatch(logoutUser());
//   //   window.location.href = '/';
//   // } else {
//   //   store.dispatch({ type: SET_AUTHENTICATED });
//   //   axios.defaults.headers.common['Authorization'] = token;
//   //   window.location.href = '/home';
//   //   //store.dispatch(getUserData());
//   // }
//   window.location.href = '/';
// }
if (token) {
  const decodedToken = token;
  if (decodedToken) {
    store.dispatch(logoutUser());
    window.location.href = '/';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    //store.dispatch(getUserData());
  }
}



class App extends React.Component {
  render() {
    const showIntro = localStorage.getItem('user') ? <div></div> : (
  <div className="App__Aside">
                <div className="App_left_item">
                  <Intro />
                </div>
              </div>
)

    return (
      <MuiThemeProvider theme={theme}>
      <Provider store = {store}>
        <Router>
          {/* <Navbar /> */}
          <div className="container">
            <div className="App">
              {showIntro}
              <div className="App__Form">
                
                <Switch>
                  <Route exact path="/" component={SignInForm}></Route>
                  <Route exact path="/sign-up" component={SignUpForm}></Route>
                  <Route exact path="/forgot" component={ForgotPwd}></Route>
                  <Route exact path="/home" component={Home}></Route>
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
