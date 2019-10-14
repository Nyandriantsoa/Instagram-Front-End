import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ
} from '../types';
import axios from 'axios';

export const login = ( userData , history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/signin', {login : userData})
    .then((res) => {
      if(res.data.Result === 'Fail'){
        return;
      }
      setAuthorizationHeader(res.data.Token);
      dispatch(getUserData(res.data));
      dispatch({ type: CLEAR_ERRORS });
      history.push('/home');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.data
      });
    });
}

// export const loginUser = (userData, history) => (dispatch) => {
//   dispatch({ type: LOADING_UI });
//   axios
//     .post('/login', userData)
//     .then((res) => {
//       setAuthorizationHeader(res.data.token);
//       dispatch(getUserData());
//       dispatch({ type: CLEAR_ERRORS });
//       history.push('/');
//     })
//     .catch((err) => {
//       dispatch({
//         type: SET_ERRORS,
//         payload: err.response.data
//       });
//     });
// };

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/signup', {signup : newUserData})
    .then((res) => {
      console.log(res)
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData(res.data));
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('Token'); //FBIdToken
  localStorage.removeItem('user');
  delete axios.defaults.headers.common['Authorization'];
  window.location.href = '/';
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = (data) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  const user = { credentials : { handle : data.username, createdAt : '', imageUrl : '', bio :'', website :'', location :'' }}
  localStorage.setItem('user' , user);
  dispatch({
    type: SET_USER,
    payload: user
    // payload: data.user
  });
};

// export const getUserData = () => (dispatch) => {
//   dispatch({ type: LOADING_USER });
//   axios
//     .get('/user')
//     .then((res) => {
//       dispatch({
//         type: SET_USER,
//         payload: res.data
//       });
//     })
//     .catch((err) => console.log(err));
// };

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post('/user/image', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post('/user', userDetails)
    .then((data) => {
      dispatch(getUserData(data));
    })
    .catch((err) => console.log(err));
};

export const markNotificationsRead = (notificationIds) => (dispatch) => {
  axios
    .post('/notifications', notificationIds)
    .then((res) => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ
      });
    })
    .catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
  //const FBIdToken = `Bearer ${token}`;
  const FBIdToken = token;
  localStorage.setItem('Token', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};
