import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Button, Card, CardContent, TextField } from "@mui/material";
import { removeFromCart, updateQuantity, clearCart, cart as selectCart, cartTotal as selectCartTotal } from "../../features/cart/cartSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const cartTotal = useSelector(selectCartTotal); 

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        Your Shopping Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography align="center" variant="h6">Your cart is empty.</Typography>
      ) : (
        <Box>
          {cart.map((item) => (
            <Card key={item.id} sx={{ mb: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>{item.title}</Typography>
                <Typography color="textSecondary">Price: ${item.price.toFixed(2)}</Typography>
                <TextField
                  type="number"
                  label="Quantity"
                  value={item.quantity}
                  onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: parseInt(e.target.value) }))}
                  inputProps={{ min: 1 }}
                  size="small"
                />
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))}
          <Box sx={{ mt: 4, textAlign: "center", p: 3, borderTop: "2px solid #ccc" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Total: ${cartTotal.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;
