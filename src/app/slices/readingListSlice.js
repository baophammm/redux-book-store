import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../apiService';
import { toast } from 'react-toastify';

const initialState = {
  books: [],
  loading: false,
  removedBookId: '',
  errorMessage: '',
};

export const getReadingListBooks = createAsyncThunk(
  'readingList/getReadingListBooks',
  async () => {
    const res = await api.get(`favorites`);
    return res.data;
  }
);

export const removeBookFromReadingList = createAsyncThunk(
  'readingList/removeBookFromReadingList',
  async removedBookId => {
    const res = await api.delete(`/favorites/${removedBookId}`);
    toast.success('The book has been removed');
    return res.data;
  }
);
export const readingListSlice = createSlice({
  name: 'readingList',
  initialState,
  reducers: {
    setRemovedBookId: (state, action) => {
      state.removedBookId = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getReadingListBooks.pending, state => {
        state.loading = true;
      })
      .addCase(getReadingListBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(getReadingListBooks.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message;
      });

    builder
      .addCase(removeBookFromReadingList.pending, state => {
        state.loading = true;
      })
      .addCase(removeBookFromReadingList.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.filter(book => book.id !== action.payload);
      })
      .addCase(removeBookFromReadingList.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { setRemovedBookId } = readingListSlice.actions;
export default readingListSlice.reducer;
