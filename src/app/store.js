import { combineReducers, configureStore } from '@reduxjs/toolkit';
import bookStoreSliceReducer from './slices/bookStoreSlice';
import bookSliceReducer from './slices/bookSlice';
import readingListSliceReducer from './slices/readingListSlice';
export const store = configureStore({
  reducer: combineReducers({
    bookStore: bookStoreSliceReducer,
    book: bookSliceReducer,
    readingList: readingListSliceReducer,
  }),
});
