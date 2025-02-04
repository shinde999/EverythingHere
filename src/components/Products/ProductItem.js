// import React from "react";
// import { Card, CardContent, CardActions, Button, Typography, CardMedia, Box } from "@mui/material";
// import { useCart } from "../../components/context/CartContext";

// const ProductItem = ({ product, onView }) => {
//   const { addToCart } = useCart();

//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardContent>
//         <Typography variant="h6">{product.title}</Typography>
//         <Typography variant="body2" color="text.secondary">
//           Price: ${product.price}
//         </Typography>

//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 1,
//             alignItems: "center",
//             my: 2,
//           }}
//         >
//           {product.thumbnail && (
//             <CardMedia
//               component="img"
//               image={product.thumbnail}
//               alt={`${product.title} Thumbnail`}
//               sx={{
//                 width: "80px",
//                 height: "80px",
//                 objectFit: "cover",
//                 border: "1px solid #ddd",
//                 borderRadius: "5px",
//               }}
//             />
//           )}
//         </Box>
//       </CardContent>
//       <CardActions>
//         <Button size="small" variant="outlined" onClick={() => onView(product)}>
//           View
//         </Button>
//         <Button size="small" variant="contained" onClick={() => addToCart(product)}>
//           Add to Cart
//         </Button>
//       </CardActions>
//     </Card>
//   );
// };

// export default ProductItem;
