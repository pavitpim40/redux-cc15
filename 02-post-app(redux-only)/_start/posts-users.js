const { createStore, combineReducers } = require('redux');

/**
 * post = {id:number, title : string }
 * posts = Array<post> == Array<{id:number, title : string }>
 */

// initialState
const initialState = {
  posts: [],
};
const initialUsersState = {
  users: [], // Array<{id:number, name:string}>
};
// Action
const ADD_USER = 'ADD_USER';
const DELETE_USER = 'DELETE_USER';

const addUserAction = (id, name) => {
  return {
    type: ADD_USER,
    payload: { id: id, name: name },
  };
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

const deletePostAction = (postId) => {
  return {
    type: DELETE_POST,
    payload: postId,
  };
};

// const editPostAction = (updatePost) => {
//   return {
//     type: EDIT_POST,
//     payload: updatePost,
//   };
// };

const editPostAction = (id, newTitle) => {
  return {
    type: EDIT_POST,
    payload: { id: id, title: newTitle },
  };
};

// Reducer - FN 2 Parameter
const postsReducer = (state = initialState, action) => {
  if (action.type === ADD_POST) {
    console.log(state.posts);
    return { posts: [...state.posts, action.payload] };
  } else if (action.type === DELETE_POST) {
    const newPosts = state.posts.filter((post) => post.id !== action.payload);
    return { posts: newPosts };
  } else if (action.type === EDIT_POST) {
    const updatedPosts = state.posts.map((post) =>
      post.id === action.payload.id ? action.payload : post
    );
    return { posts: updatedPosts };
  }
  return state;
};

// users Reducer
const usersReducer = (state = initialUsersState, action) => {
  switch (action.type) {
    case ADD_USER:
      return { users: [...state.users, action.payload] };
    default:
      return state;
  }
};

// Combined Reducer
const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
});

// Store
const store = createStore(rootReducer);

// console.log(store.getState());
store.subscribe(() => {
  const state = store.getState();
  console.log(' >> ', state.posts);
  console.log(' >>> ', state.users);
});

store.dispatch(addPostAction({ id: 1, title: 'HTML' }));
store.dispatch(addUserAction(1, 'CodeCamp'));
store.dispatch(addUserAction(2, 'John Doe'));
store.dispatch(addPostAction({ id: 2, title: 'CSS' }));
// store.dispatch(addPostAction({ id: 3, title: 'REACT' }));
// store.dispatch(deletePostAction(2));
// store.dispatch(deletePostAction(3));
// store.dispatch(editPostAction(2, 'Prisma'));
// store.dispatch(editPostAction(1, 'Express'));
