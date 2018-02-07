import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class ShowPost extends Component {
	componentDidMount() {
		// THIS IS WHERE WE FETCH OUR DATA!!!
		// action creator & reducer handle the assigning of data to our state
		// and mapStateToProps taps into the Redux store to get access to the state changes
		// so no need for a .then callback to handle the API response here
		// THIS IS HOW WE ACCESS OUR URL PARAMS
		// (using more ES6 destructuring to pull the id off of the route params object)
    if(!this.props.post){
      const { id } = this.props.match.params;
  		this.props.fetchPost(id);  
    }
		// NOTE: if we were concerned with network usage for whatever reason
		// we could wrap the above statements in an if statement in order to prevent data from being fetched
		// i.e. if (!this.props.post)
		// in the case of the user having already retrieved the post via the list of all posts on the index page, for example
		// however, it is generally good practice to assume data is stale when changing pages
		// and to fetch it anew
	}

	onDeleteClick() {
		const userConfirms = confirm('Are you absolutely 100% certain that you would like to delete this post?');
		if (userConfirms) {
			alert('DELETING THE POST!!!');
			// better NOT to assume that this.props.post exists
			// this.props.match.params will definitely exist, there will be a delay with this.props.post
			const { id } = this.props.match.params;
			this.props.deletePost(id, () => {
				this.props.history.push('/');
			});
		} else {
			alert('OK, we\'ll keep the post...');
		}
	}

	render() {
		console.log('this.props in ShowPost', this.props);
		console.log('url params in ShowPost', this.props.match.params);
		const { post } = this.props;
		// conditionally show loading message  until content is returned from the API
		if (!post) {
			return <div>Loading...</div>;
		}

		// can also bind the context of 'this' inline as done here for the onClick function
		return (
			<div>
				<Link to="/" className="btn btn-primary">All Posts</Link>
				<h3>{post.title}</h3>
				<h6>Categories: {post.categories}</h6>
				<p>{post.content}</p>
				<button className="btn btn-danger pull-xs-right"
					onClick={this.onDeleteClick.bind(this)}>Delete Post</button>
			</div>
		);
	}
}

/**
 *
 * @param {Object} posts - using destructuring to pull the posts object out of the state object (don't need the whole state object)
 * @param {Object} ownProps - THERE'S ALSO A SECOND ARGUMENT in mapStateToProps called 'ownProps' by convention; corresponds to the props that are going/headed to the component
 */
function mapStateToProps({ posts }, ownProps) {
	console.log('posts in ShowPost', posts);
	console.log('ownProps in ShowPost', ownProps);
	// can use own props to send back only the post that we want to show (provided by the id <Route /> param)
	return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(ShowPost);
