import React from "react";
import { Box, Typography } from "@mui/material";
import ProductList from "../Products/ProductList";

const ProductsPage = () => {

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" textAlign="center" marginY={2}>
        Products
      </Typography>
      <ProductList/>
    </Box>
  );
};

export default ProductsPage;