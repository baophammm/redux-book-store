import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pagesRedux/HomePage';
import ReadingPage from './pagesRedux/ReadingPage';
import NotFoundPage from './pagesRedux/NotFoundPage';
import BookDetailPage from './pagesRedux/BookDetailPage';
import PublicLayout from './layout/PublicLayout';
import MThemeProvider from './theme/MThemeProvider';

function App() {
  return (
    <BrowserRouter>
      <MThemeProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="books/:id" element={<BookDetailPage />} />
            <Route path="reading" element={<ReadingPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </MThemeProvider>
    </BrowserRouter>
  );
}

export default App;
