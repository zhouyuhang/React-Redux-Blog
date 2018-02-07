import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';

const BASE_URL = 'https://reduxblog.herokuapp.com/api';
const API_KEY = '?key=danqzera';

/**
 * fetch all current posts from the API
 * @returns {Object} - action with API request
 */
export function fetchPosts() {
	const url = `${BASE_URL}/posts${API_KEY}`;
	// axios.get() returns a promise
	// redux-promise middleware will handle this promise for us and return a new action with the fullfilled promise
	const request = axios.get(url);

	return {
		type: FETCH_POSTS,
		payload: request
	}
}

/**
 * fetch an individual post from the API
 * @param {Number} id - id of the post to be fetched
 * @returns {Object} - action with API request
 */
export function fetchPost(id) {
	const url = `${BASE_URL}/posts/${id}${API_KEY}`;
	const request = axios.get(url);

	return {
		type: FETCH_POST,
		payload: request
	}
}

// we pass a callback function to our action creator
// this callback gets called in the .then() of our API request
// it changes our <Route /> location IF OUR POST REQUEST SUCCEEDS
export function createPost(blogPost, callback) {
	console.log('createPost action creator hit', blogPost);
	const url = `${BASE_URL}/posts${API_KEY}`
	const request = axios.post(url, blogPost)
		.then(() => callback());

	return {
		type: CREATE_POST,
		payload: request
	}
}

/**
 * Sends a request to the API to delete a blog post.
 * @param {Number} id - id of the post to be deleted
 * @returns {Object} action of type DELETE_POST with payload of the request
 */
export function deletePost(id, callback) {
	const url = `${BASE_URL}/posts/${id}${API_KEY}`;
	const request = axios.delete(url)
		.then((res) => {
			callback();
			// when using a .then(), if you still want to return the request as the payload
			// need to return something in the .then(), in this case the API response
			// otherwise undefined will be returned and the action won't be caught by redux-promise
			return res;
		});

	return {
		type: DELETE_POST,
		payload: id
	}
}
