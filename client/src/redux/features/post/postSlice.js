import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
    posts: [],
    popularPosts: [],
    loading:false
}

export const createPost = createAsyncThunk('post/createPost',
    async (params) => {
    try {
        const { data } = await axios.post('/posts', params)
        return data
    } catch (error) {
        throw new error(error)
    }
})

export const getAllposts = createAsyncThunk('post/getAllPosts',
    async () => {
    try {
        const { data } = await axios.get('/posts')
        return data
    } catch (error) {
        throw new error(`problem with fetching all posts`)
    }
}
)

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [createPost.pending]: (state) => {
      state.loading = true
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false
      state.posts.push(action.payload)
    },
    [createPost.rejected]: (state) => {
      state.loading = false
    },
//for all posts
    [getAllposts.pending]: (state) => {
      state.loading = true
    },
    [getAllposts.fulfilled]: (state, action) => {
      state.loading = false
        state.posts = action.payload.posts
        state.popularPosts = action.payload.popularPosts
    },
    [getAllposts.rejected]: (state) => {
      state.loading = false
    },
  },
});
    
export default postSlice.reducer