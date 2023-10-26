import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiUrl from '../../utils/apiURL';

// interface postSliceData {
//   postsData: Array<{}>;
//   loading: boolean;
//   error: string;
// }
const initialState = {
  postsData: [],
  loading: false,
  error: '',
};

// thunk action creator => 1 fn มาจาก 3 fn ย่อย = 4fn (Redux Only)
// thunk action creator => 1 fn only (Redux toolkit + createAsyncThunk)

// AutoGenerate 3 State of Promise
// posts/fetchPosts/pending
// posts/fetchPosts/fulfilled
// posts/fetchPosts/rejected

// fetchPosts == Thunk Action Creator =  Async Action Creator
export const fetchPostsAction = createAsyncThunk('posts/fetchPosts', async (payload, thunkAPI) => {
  console.log('PAYLOAD', payload);
  try {
    // Make HTTP Request
    const response = await axios.get(apiUrl);
    // console.log(response.data);
    return response.data; // return  action.payload ของ case fulfilled
  } catch (error) {
    // console.log(error);
    return thunkAPI.rejectWithValue(error.message); // return action.payload ของ case rejected
  }
});

const postSlice = createSlice({
  name: 'postSlice',
  initialState: initialState,
  reducers: {
    // method : SYNC operation
  },
  // Async operation
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAction.pending, (state, action) => {
        state.postsData = [];
        // state.p = []; // TS Detect Error
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchPostsAction.fulfilled, (state, action) => {
        // console.log('FF', action.payload);
        state.postsData = action.payload;
        state.loading = false;
        state.error = '';
      })
      .addCase(fetchPostsAction.rejected, (state, action) => {
        state.postsData = [];
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// gen postReducer
const postReducer = postSlice.reducer;
export default postReducer;
