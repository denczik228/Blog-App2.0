import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
    comments: [],
    loading:false
}

export const createComment = createAsyncThunk('comment/createComment',
    async ({ postId, comment }) => {
        try {
            const { data } = await axios.post(`/comments/${postId}`, {
                postId,
                comment
            })
            return data
        } catch (error) {
          console.log(error)
          throw error;
        }
    }
);

export const removeComment = createAsyncThunk(
  "comment/removeComment",
  async ({ postId, commentId }, { dispatch }) => {
    try {
      await axios.delete(`/posts/${postId}/comments/${commentId}`);
      dispatch(delComment({ postId, commentId }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const getPostComments = createAsyncThunk('comment/getPostComments',
  async (postId) => {
    try {
      const { data } = await axios.get(`/posts/comments/${postId}`)
      return data
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    delComment: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload.commentId
      );
    },
  },
  extraReducers: {
    [createComment.pending]: (state) => {
      state.loading = true;
    },
    [createComment.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments.push(action.payload);
    },
    [createComment.rejected]: (state) => {
      state.loading = false;
    },
    //getting post comments
    [getPostComments.pending]: (state) => {
      state.loading = true;
    },
    [getPostComments.fulfilled]: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },
    [getPostComments.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { delComment } = commentSlice.actions;
export default commentSlice.reducer