import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

const SortProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState('asc');

  useEffect(() => {
    setValue(searchParams.get('sort') || 'asc');
  }, [searchParams]);

  const handleSortChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);

    setSearchParams({ 
      ...Object.fromEntries([...searchParams]), 
      sort: newValue, 
      page: '1' 
    });
  };

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel>Sort by title</InputLabel>
      <Select value={value} label="Sort by title" onChange={handleSortChange}>
        <MenuItem value="asc">A to Z</MenuItem>
        <MenuItem value="desc">Z to A</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortProducts;
