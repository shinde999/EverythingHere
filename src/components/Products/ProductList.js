import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  Grid2,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  Stack,
  Chip,
  Rating,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CustomPagination from "../UI/Pagination";
import SearchProducts from "../UI/SearchProducts";
import SortProducts from "../UI/SortProducts";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { useGetProductsQuery } from "../../features/api/productsApi";

const ProductList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Added state
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSearch = searchParams.get("search") || "";
  const currentSort = searchParams.get("sort") || "asc";
  const ITEMS_PER_PAGE = 10; // Added constant

  // Use the query hook
  const { data, isLoading, isError, error } = useGetProductsQuery({
    search: currentSearch,
    sort: currentSort,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  const products = data?.products || [];
  const totalPages = Math.ceil((data?.total || 0) / ITEMS_PER_PAGE);

  const handleView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handlePageChange = (newPage) => {
    const current = Object.fromEntries([...searchParams]);
    setSearchParams({ ...current, page: newPage });
  };

  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <SearchProducts />
        <SortProducts />
      </Box>

      {/* Loading State */}
      {isLoading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Typography color="error" align="center">
          {error.error} {/* Display error message */}
        </Typography>
      ) : !products.length ? (
        <Typography align="center" my={4}>
          No products available.
        </Typography>
      ) : (
        <Grid2 container spacing={3}>
          {products.map((product) => (
            <Grid2 item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  image={product.thumbnail}
                  alt={product.title}
                  sx={{ height: 140 }}
                />
                <CardContent>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography color="text.secondary">
                    Price: ${product.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleView(product)}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      )}

      {/* CustomPagination */}
      <Box display="flex" justifyContent="center" my={4}>
        <CustomPagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) => handlePageChange(value)}
          color="primary"
        />
      </Box>

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="product-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: 800,
            width: "90%",
            borderRadius: 2,
            maxHeight: "90vh",
            overflow: "auto",
          }}
        >
          {selectedProduct && (
            <Grid2 container spacing={3}>
              {/* Left side - Product Images */}
              <Grid2 item xs={12} md={6}>
                <Box sx={{ display: "flex", overflowX: "auto", gap: 2, mb: 2 }}>
                  {selectedProduct.images.map((image, index) => (
                    <CardMedia
                      key={index}
                      component="img"
                      image={image}
                      alt={`${selectedProduct.title} Image ${index + 1}`}
                      sx={{
                        width: 120,
                        height: 120,
                        objectFit: "cover",
                        borderRadius: 1,
                        border: "1px solid #ddd",
                      }}
                    />
                  ))}
                </Box>
              </Grid2>

              {/* Right side - Product Information */}
              <Grid2 item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>
                  {selectedProduct.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {selectedProduct.description}
                </Typography>
                <Stack spacing={2}>
                  {/* Price */}
                  <Box>
                    <Typography variant="h6">
                      ${selectedProduct.price}
                    </Typography>
                  </Box>

                  {/* Product Details */}
                  <Box sx={{ bgcolor: "grey.50", p: 2, borderRadius: 1 }}>
                    <Grid2 container spacing={2}>
                      <Grid2 item xs={6}>
                        <Typography variant="subtitle2">Brand</Typography>
                        <Typography>{selectedProduct.brand}</Typography>
                      </Grid2>
                      <Grid2 item xs={6}>
                        <Typography variant="subtitle2">Category</Typography>
                        <Typography>{selectedProduct.category}</Typography>
                      </Grid2>
                      <Grid2 item xs={6}>
                        <Typography variant="subtitle2">Stock</Typography>
                        <Chip
                          label={
                            selectedProduct.stock > 10 ? "In Stock" : "Low Stock"
                          }
                          color={selectedProduct.stock > 10 ? "success" : "warning"}
                          size="small"
                        />
                      </Grid2>
                      <Grid2 item xs={6}>
                        <Typography variant="subtitle2">Rating</Typography>
                        <Rating
                          value={selectedProduct.rating}
                          precision={0.1}
                          readOnly
                        />
                      </Grid2>
                    </Grid2>
                  </Box>

                  {/* Shipping Information */}
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography>Shipping & Returns</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Free shipping on orders over $50. Returns accepted within
                        30 days.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  {/* Tags */}
                  <Box>
                    {selectedProduct.tags &&
                      selectedProduct.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          sx={{ mr: 1, mb: 1 }}
                          size="small"
                        />
                      ))}
                  </Box>
                </Stack>
              </Grid2>

              {/* Modal Footer */}
              <Grid2 item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button variant="outlined" onClick={handleCloseModal}>
                    Close
                  </Button>
                </Stack>
              </Grid2>
            </Grid2>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductList;