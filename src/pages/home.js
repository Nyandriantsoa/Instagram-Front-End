import React, { Component } from 'react';
//import { Redirect } from 'react-router-dom';
import Posting from '../components/post/Post'
import PostSkeleton from '../util/PostSkeleton';
import Profile from '../components/profile/Profile';
//import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';
import PostPost from '../components/post/PostPost';

class Home extends Component {
    constructor(props) {
        super(); 
        this.state = {
            token: localStorage.getItem('Token') || null
        };
    }

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
            this.props.history.push('/');
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
                <div>
                    <PostPost />
                </div>
                <div >
                    {recentPostMarkup}
                </div>
                <div>
                    <Profile />
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
    { getPosts }
  )(Home);
