import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';
import _ from 'lodash';

// since we are ultimately going to store our state in an object, we default state to an empty object
export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_POSTS:
			console.log('FETCH_POSTS action data', action.payload.data);
			// use lodash function _.mapKeys() to generate a new object with desired key-value pairs of "id: postObject"
			// the second parameter can either be the key name that you want to use the value of for the new object's key name
			// or it can be a callback function that determines the values of the key names, i.e. (value, key, object) => { }
			// where value is the current element / key-value, key is the index/key of the current element, and object is the entire original object (or array)
			const posts = _.mapKeys(action.payload.data, 'id');
			console.log('posts mapped to object', posts);
			return posts;
		// include an additional case for the instance of fetching a single post as opposed to fetching the entire list of posts
		case FETCH_POST:
			console.log('FETCH_POST action', action);
			// return an object with the individually fetched post along with all of the original posts data, if any
			// LONG FORM
			// const post = action.payload.data;
			// const newState = {...state};
			// newState[post.id] = post;
			// return newState;
			// SHORT FORM WITH MORE ES6...can combine the above steps
			// [A]:B create a new Key:Value pair
			return {...state, [action.payload.data.id]: action.payload.data};
		case DELETE_POST:
			console.log('DELETE_POST action', action);
			console.log('current state', state);
			// use lodash _.omit() function to return new state without the specified key (the id of the post we deleted in this case)
			console.log('omitting', id, _.omit(state, id));
			return _.omit(state, action.payload);
		default:
			return state;
	}
}
