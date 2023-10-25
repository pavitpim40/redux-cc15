const { createStore } = require('redux');

/**
 * post = {id:number, title : string }
 * posts = Array<post> == Array<{id:number, title : string }>
 */

// initialState
const initialState = {
  posts: [],
};

// Action
// - Action Type
const ADD_POST = 'ADD_POST';
const EDIT_POST = 'EDIT_POST';
const DELETE_POST = 'DELETE_POST';

// - Action Creator
const addPostAction = (post) => {
  return {
    type: ADD_POST,
    payload: post,
  };
};

// Reducer - FN 2 Parameter
const postsReducer = (state = initialState, action) => {
  if (action.type === ADD_POST) {
    return { posts: [...state.posts, action.payload] };
  }
};
// Store
const store = createStore(postsReducer);

store.subscribe(() => {
  const state = store.getState();
  console.log(' >> ', state);
});

store.dispatch(addPostAction({ id: 1, title: 'HTML' }));
store.dispatch(addPostAction({ id: 2, title: 'CSS' }));
