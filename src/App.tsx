import {createTheme, ThemeProvider, type Theme} from "@mui/material";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useState} from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./pages/Home.tsx";
import SearchPage from "./pages/Search.tsx";
import Contact from "./pages/Contact.tsx";
import ShoppingCart from "./pages/ShoppingCart.tsx";
import Checkout from "./pages/Checkout.tsx";
import About from "./pages/About.tsx";
import type {CartItem} from "./pages/ShoppingCart.tsx";
import type {Product} from "./data/products.ts";

interface FourColoured {
    white: string;
    blue: string;
    gray: string;
    orange: string;
}

declare module '@mui/material/styles' {
    interface ThemeOptions {
        brand?: FourColoured,
        darkened?: FourColoured,
    }

    interface Theme {
        brand: FourColoured,
        darkened: FourColoured,
    }
}

function App() {

    const theme: Theme = createTheme({
        brand: {
            white: "#F5F5F5",
            blue: "#76ABAE",
            gray: "#303841",
            orange: "#FF5722",
        },
        darkened: {
            white: "#FFFFFF",
            blue: "#FFF",
            gray: "#FFF",
            orange: "#FFF",
        },
        typography: {
            fontFamily: "Roboto",
        },
    });

    const [shoppingCart, setShoppingCart] = useState<CartItem[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [addedProductName, setAddedProductName] = useState("");

    const handleAddToCart = (product: Product) => {
        const existing = shoppingCart.findIndex(item => item.product.id === product.id);
        if (existing !== -1) {
            const updatedCart = [...shoppingCart];
            updatedCart[existing].quantity += 1;
            setShoppingCart(updatedCart);
        } else {
            setShoppingCart((prev) => {
                prev.push({product: product, quantity: 1})
                return [...prev];
            });
        }
        setAddedProductName(product.name);
        setSnackbarOpen(true);
    }

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
          <Navbar cartSize={shoppingCart.reduce((sum, item) => sum + item.quantity, 0)}/>
          <Routes>
            <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
              <Route path="/search" element={<SearchPage onAddToCart={handleAddToCart} />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<ShoppingCart cartItems={shoppingCart} setCartItems={setShoppingCart} />} />
              <Route path="/checkout" element={<Checkout cartItems={shoppingCart} />} />
              <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
          <Snackbar 
              key={addedProductName + Date.now()}
              open={snackbarOpen} 
              autoHideDuration={3000} 
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
              <Alert 
                  onClose={handleCloseSnackbar} 
                  severity="success" 
                  sx={{ 
                      width: '100%',
                      backgroundColor: theme.brand.blue,
                      color: '#fff',
                      '& .MuiAlert-icon': {
                          color: '#fff'
                      }
                  }}
              >
                  "{addedProductName}" added to cart!
              </Alert>
          </Snackbar>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
