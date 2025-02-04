// import React, { createContext, useState, useContext } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   const addToCart = (product) => {
//     setCart((prevCart) => {
//       const existingProduct = prevCart.find((item) => item.id === product.id);
//       if (existingProduct) {
//         return prevCart.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       }
//       return [...prevCart, { ...product, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (id) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   const clearCart =()=>{setCart([]);}
  
//   const updateQuantity = (id, quantity) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
//       )
//     );
//   };

//   const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
//   const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal,clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
