import { combineReducers } from 'redux';
// can alias imports, as done here
// formReducer is the variable name we use to reference the imported functionality from redux-form
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
  posts: PostsReducer,
  // MUST USE THE KEYWORD OF "form" AS OUR KEY NAME FOR formReducer WHEN WIRING IT INTO OUR REDUCERS
  // all different forms that we hook up in our components will assume that the formReducer is being applied to the "form" piece of state
  form: formReducer
});

export default rootReducer;
