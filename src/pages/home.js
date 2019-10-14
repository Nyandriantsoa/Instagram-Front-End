import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import Posting from '../components/post/Post'
import PostSkeleton from '../util/PostSkeleton';
import Profile from '../components/profile/Profile';
//import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';
import PostPost from '../components/post/PostPost';
import { logoutUser } from '../redux/actions/userActions';
import MyButton from '../util/MyButton';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

class Home extends Component {
    constructor(props) {
        super(); 
        this.state = {
            token: localStorage.getItem('Token') || null
        };
    }

    handleLogout = () => {
        this.props.logoutUser(); //this.props.history
    };

    componentDidMount() {
        const userData = {
            email: 'this.state.username',
            password: 'this.state.password'
          };
        console.log('here')
        this.props.getPosts(userData);
    }
    render() {
        if(!this.state.token) {
            //this.props.history.push('/');
            this.props.logoutUser();
        }
        const { posts, loading } = this.props.data;
        let recentPostMarkup = !loading ? (
            Array.from(posts).map((post) => <Posting key={post.postId} post={post} />)
        ) : (
            // <div></div>
            <PostSkeleton />
        );

        return (
            <div >
                <div className="app-bar">
                    <div className="post">
                        <PostPost />
                    </div>
                    <div className="logout">
                        {/* //utton className="log-out-btn" onClick={this.handleLogout} >Log Out</button> */}
                        <MyButton tip="Logout" onClick={this.handleLogout}>
                            <KeyboardReturn color="primary" />
                        </MyButton>
                    </div>
                </div>
                
                <div className = "profile">
                    <Profile />
                </div>

                <div >
                    {recentPostMarkup}
                </div>
            </div>

            // <Grid container spacing={16}>
            // <Grid item sm={8} xs={12}>
            //     {recentPostMarkup}
            // </Grid>
            //     <Grid item sm={4} xs={12}>
            //         <Profile />
            //     </Grid>
            // </Grid>
        );
    }
    
    // render() {
    //     const {token} = this.state;

    //     if(!token) return <Redirect to="/" />
    //     return (
    //     <div className="afterr">
    //         Cat Videos are comming
    //           </div>
			  
    //     );
    // }
}
const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(
    mapStateToProps,
    { getPosts , logoutUser}
  )(Home);
