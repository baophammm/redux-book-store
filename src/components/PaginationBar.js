import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch } from 'react-redux';
import { setPage } from '../app/slices/bookStoreSlice';

const PaginationBar = ({ pageNum, setPageNum, totalPageNum }) => {
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    // setPageNum(value);
    dispatch(setPage(value));
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPageNum}
        page={pageNum}
        onChange={handleChange}
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default PaginationBar;
