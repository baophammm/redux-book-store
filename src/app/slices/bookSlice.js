import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../apiService';
import { toast } from 'react-toastify';

const initialState = {
  book: null,
  loading: false,
  addingBook: null,
  errorMessage: '',
};

export const getBook = createAsyncThunk('book/getBook', async bookId => {
  const res = await api.get(`books/${bookId}`);
  return res.data;
});

export const addToReadingList = createAsyncThunk(
  'book/addToReadingList',
  async book => {
    const res = await api.post(`/favorites`, book);
    toast.success('The book has been added to the reading list!');
    return res.data;
  }
);

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setAddingBook: (state, action) => {
      state.addingBook = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getBook.pending, state => {
        state.loading = true;
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
        state.errorMessage = '';
      })
      .addCase(getBook.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error?.message;
      });

    builder
      .addCase(addToReadingList.pending, state => {
        state.loading = true;
      })
      .addCase(addToReadingList.fulfilled, (state, action) => {
        state.loading = false;
        state.addingBook = action.payload;
        state.errorMessage = '';
      })
      .addCase(addToReadingList.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error?.message;
      });
  },
});
export const { setAddingBook, setErrorMessage } = bookSlice.actions;
export default bookSlice.reducer;
