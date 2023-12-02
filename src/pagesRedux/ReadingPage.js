import React, { useEffect } from 'react';
import {
  Container,
  Box,
  Card,
  Stack,
  CardMedia,
  CardActionArea,
  Typography,
  CardContent,
} from '@mui/material';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  getReadingListBooks,
  removeBookFromReadingList,
  setRemovedBookId,
} from '../app/slices/readingListSlice';

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const ReadingPage = () => {
  const { books, loading, removedBookId, errorMessage } = useSelector(
    state => state.readingList
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleClickBook = bookId => {
    navigate(`/books/${bookId}`);
  };

  useEffect(() => {
    if (removedBookId) return;
    dispatch(getReadingListBooks());
  }, [dispatch, removedBookId]);

  useEffect(() => {
    if (!removedBookId) return;
    dispatch(removeBookFromReadingList(removedBookId));
    dispatch(setRemovedBookId(''));
  }, [dispatch, removedBookId]);

  return (
    <Container>
      <Typography variant="h3" sx={{ textAlign: 'center' }} m={3}>
        Book Store
      </Typography>
      {loading ? (
        <Box sx={{ textAlign: 'center', color: 'primary.main' }}>
          <ClipLoader color="inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-around"
          flexWrap={'wrap'}
        >
          {books.map(book => (
            <Card
              key={book.id}
              sx={{
                width: '12rem',
                height: '27rem',
                marginBottom: '2rem',
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={`${BACKEND_API}/${book.imageLink}`}
                  alt={`${book.title}`}
                  onClick={() => handleClickBook(book.id)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {`${book.title}`}
                  </Typography>
                  <Typography gutterBottom variant="body1" component="div">
                    {`${book.author}`}
                  </Typography>
                  <Box
                    onClick={() => dispatch(setRemovedBookId(book.id))}
                    sx={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      backgroundColor: 'secondary.light',
                      color: 'secondary.contrastText',
                      padding: '0',
                      minHeight: '1.5rem',
                      minWidth: '1.5rem',
                      fontSize: '1.2rem',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',

                      '&:hover': {
                        cursor: 'pointer',
                      },
                    }}
                  >
                    &times;
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default ReadingPage;
