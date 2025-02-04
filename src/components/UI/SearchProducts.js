import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

const SearchProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(searchParams.get('search') || '');
  }, []);

  const handleSearchChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);

    setSearchParams({ 
      ...Object.fromEntries([...searchParams]), 
      search: newValue, 
      page: '1' 
    });
  };

  return (
    <TextField
      label="Search products"
      variant="outlined"
      value={value}
      onChange={handleSearchChange}
      fullWidth
      size="small"
      placeholder="Search products..."
    />
  );
};

export default SearchProducts;
