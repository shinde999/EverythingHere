import React from 'react';
import { Pagination } from '@mui/material';

const CustomPagination = ({ count, page, onChange }) => {
  return (
    <Pagination 
      count={count} 
      page={page} 
      onChange={onChange}
      color="primary"
      size="large"
      showFirstButton 
      showLastButton
    />
  );
};
export default CustomPagination;