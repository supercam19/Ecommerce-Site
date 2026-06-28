import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";

interface NavLink {
    label: string;
    href: string;
}

const NAV_LINKS: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

const SearchWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.12),
    border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
    padding: "2px 10px",
    gap: 6,
    transition: "background-color 0.2s",
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.18),
    },
    "&:focus-within": {
        backgroundColor: alpha(theme.palette.common.white, 0.22),
        borderColor: alpha(theme.palette.common.white, 0.4),
    },
}));

const LogoPlaceholder = styled(Box)(({ theme }) => ({
    width: 36,
    height: 36,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    border: `1.5px solid ${alpha(theme.palette.common.white, 0.4)}`,
    flexShrink: 0,
}));

export default function Navbar() {
    const [searchValue, setSearchValue] = useState("");

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                background: "rgba(18, 18, 18, 0.55)",
                backdropFilter: "blur(16px) saturate(180%)",
                WebkitBackdropFilter: "blur(16px) saturate(180%)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
            }}
        >
            <Toolbar sx={{ gap: 2, px: { xs: 2, sm: 3 } }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mr: 2 }}>
                    <img src="/logo.png" alt="Logo" width={48} height={48}/>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexGrow: 1 }}>
                    {NAV_LINKS.map((link) => (
                        <Button
                            key={link.href}
                            href={link.href}
                            sx={{
                                color: "rgba(255, 255, 255, 0.82)",
                                fontWeight: 500,
                                fontSize: "0.875rem",
                                textTransform: "none",
                                px: 1.5,
                                borderRadius: 1.5,
                                "&:hover": {
                                    color: "#fff",
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                },
                            }}
                        >
                            {link.label}
                        </Button>
                    ))}
                </Box>

                <SearchWrapper>
                    <SearchIcon sx={{ color: "rgba(255,255,255,0.5)", fontSize: 18 }} />
                    <InputBase
                        placeholder="Search…"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        inputProps={{ "aria-label": "search" }}
                        sx={{
                            color: "#fff",
                            fontSize: "0.875rem",
                            width: 180,
                            "& ::placeholder": { color: "rgba(255,255,255,0.45)", opacity: 1 },
                        }}
                    />
                </SearchWrapper>

                <IconButton
                    aria-label="shopping cart"
                    sx={{
                        color: "rgba(255,255,255,0.82)",
                        "&:hover": {
                            color: "#fff",
                            backgroundColor: "rgba(255,255,255,0.1)",
                        },
                    }}
                >
                    <ShoppingCartIcon fontSize="small" />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}