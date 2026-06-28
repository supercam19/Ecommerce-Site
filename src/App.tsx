import {createTheme, ThemeProvider, type Theme} from "@mui/material";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";

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

  return (
    <ThemeProvider theme={theme}>
        <Navbar />
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
