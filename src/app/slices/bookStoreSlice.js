import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../apiService';

const initialState = {
  books: [],
  pageNum: 1,
  loading: false,
  query: '',
  errorMessage: '',
};

export const getBooks = createAsyncThunk(
  'bookStore/getBooks',
  async (pageNum, limit, query) => {
    let url = `/books?_page=${pageNum}$_limit=${limit}`;
    if (query) {
      url += `&q=${query}`;
    }
    console.log(url);
    const response = await api.get(url);
    return response.data;
  }
);

export const bookStoreSlice = createSlice({
  name: 'bookStore',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.pageNum = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getBooks.pending, state => {
        state.loading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { setPage, setQuery } = bookStoreSlice.actions;
export default bookStoreSlice.reducer;
