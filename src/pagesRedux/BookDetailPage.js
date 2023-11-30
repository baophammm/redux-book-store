import React, { useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Button, Box, Grid, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  addToReadingList,
  getBook,
  setAddingBook,
} from '../app/slices/bookSlice';

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const BookDetailPage = () => {
  const params = useParams();
  const bookId = params.id;
  const { book, loading, addingBook, errorMessage } = useSelector(
    state => state.book
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBook(bookId));
  }, [dispatch, bookId]);

  useEffect(() => {
    if (!addingBook) return;
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(setAddingBook(null));
    }
  }, [dispatch, addingBook, errorMessage]);

  return (
    <Container>
      {loading ? (
        <Box sx={{ textAlign: 'center', color: 'primary.main' }}>
          <ClipLoader color="#inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          p={4}
          mt={5}
          sx={{ border: '1px solid black' }}
        >
          <Grid item md={4}>
            {book && (
              <img
                width="100%"
                src={`${BACKEND_API}/${book.imageLink}`}
                alt=""
              />
            )}
          </Grid>
          <Grid item md={8}>
            {book && (
              <Stack>
                <h2>{book.title}</h2>
                <Typography variant="body1">
                  <strong>Author:</strong> {book.author}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {book.year}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {book.country}
                </Typography>
                <Typography variant="body1">
                  <strong>Pages:</strong> {book.pages}
                </Typography>
                <Typography variant="body1">
                  <strong>Language:</strong> {book.language}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ width: 'fit-content' }}
                  disabled={
                    errorMessage === 'Error: Insert failed, duplicate id'
                      ? true
                      : false
                  }
                  onClick={() => {
                    dispatch(addToReadingList(book));
                  }}
                >
                  Add to Reading List
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BookDetailPage;
