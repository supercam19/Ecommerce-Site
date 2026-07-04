import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, alpha } from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

interface NavLink {
    label: string;
    href: string;
}

interface Props {
    cartSize?: number;
}

const NAV_LINKS: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/search" },
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

export default function Navbar({ cartSize = 0 }: Readonly<Props>) {
    const [searchValue, setSearchValue] = useState("");
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate({
            pathname: "/search",
            search: `?q=${searchValue}`
        });
        setMobileOpen(false);
    }

    const handleNavigate = (href: string) => {
        navigate(href);
        setMobileOpen(false);
    }

    return (
        <>
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
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="49" height="40" viewBox="0 0 49 40" fill="none" id="Logo"> <g id="logomark"> <path d="M37.3947 40C43.8275 39.8689 49 34.6073 49 28.1389C49 24.9931 47.7512 21.9762 45.5282 19.7518L25.7895 0V12.2771C25.7895 14.3303 26.6046 16.2995 28.0556 17.7514L32.6795 22.3784L32.6921 22.3907L40.4452 30.149C40.697 30.4009 40.697 30.8094 40.4452 31.0613C40.1935 31.3133 39.7852 31.3133 39.5335 31.0613L36.861 28.3871H12.139L9.46655 31.0613C9.21476 31.3133 8.80654 31.3133 8.55476 31.0613C8.30297 30.8094 8.30297 30.4009 8.55475 30.149L16.3079 22.3907L16.3205 22.3784L20.9444 17.7514C22.3954 16.2995 23.2105 14.3303 23.2105 12.2771V0L3.47175 19.7518C1.24882 21.9762 0 24.9931 0 28.1389C0 34.6073 5.17252 39.8689 11.6053 40H37.3947Z" fill="#FF0A0A"/> </g> </svg>
                    <Typography
                        onClick={() => navigate("/")}
                        sx={{
                            fontFamily: "'Aquire', 'Impact', sans-serif",
                            fontSize: "2rem",
                            fontWeight: 700,
                            letterSpacing: "0.05em",
                            color: "#fff",
                            textTransform: "uppercase",
                            lineHeight: 1,
                            cursor: "pointer",
                            userSelect: "none",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                            "&:hover": {
                                color: "rgba(255,255,255,0.85)",
                            },
                        }}
                    >
                        ATLAS
                    </Typography>
                </Box>

                <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.5, flexGrow: 1 }}>
                    {NAV_LINKS.map((link) => (
                        <Button
                            key={link.href}
                            onClick={() => handleNavigate(link.href)}
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

                <Box sx={{ flexGrow: 1, display: { xs: "block", md: "none" } }} />

                <SearchWrapper sx={{ display: { xs: "none", md: "flex" } }}>
                    <SearchIcon
                        onClick={handleSearch}
                        sx={{ color: "rgba(255,255,255,0.5)", fontSize: 18, cursor: "pointer" }}
                    />
                    <InputBase
                        placeholder="Search…"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
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
                    onClick={() => navigate("/cart")}
                    aria-label="shopping cart"
                    sx={{
                        color: "rgba(255,255,255,0.82)",
                        "&:hover": {
                            color: "#fff",
                            backgroundColor: "rgba(255,255,255,0.1)",
                        },
                    }}
                >
                    <Badge
                        badgeContent={cartSize}
                        max={99}
                        overlap="circular"
                        sx={{
                            "& .MuiBadge-badge": {
                                bgcolor: (theme) => theme.brand.orange,
                                color: "#fff",
                                fontSize: "0.6rem",
                                fontWeight: 700,
                                minWidth: 16,
                                height: 16,
                                padding: "0 4px",
                            },
                        }}
                    >
                        <ShoppingCartIcon fontSize="small" />
                    </Badge>
                </IconButton>

                <IconButton
                    onClick={() => setMobileOpen(true)}
                    aria-label="open navigation menu"
                    sx={{
                        display: { xs: "inline-flex", md: "none" },
                        color: "rgba(255,255,255,0.82)",
                        "&:hover": {
                            color: "#fff",
                            backgroundColor: "rgba(255,255,255,0.1)",
                        },
                    }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>

            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                slotProps={{
                    paper: {
                        sx: {
                            width: 280,
                            background: "rgba(18, 18, 18, 0.98)",
                            backdropFilter: "blur(16px) saturate(180%)",
                            WebkitBackdropFilter: "blur(16px) saturate(180%)",
                            color: "#fff",
                            borderLeft: "1px solid rgba(255,255,255,0.1)",
                        },
                    },
                }}
            >
            <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }} role="presentation">
                <SearchWrapper>
                    <SearchIcon
                        onClick={handleSearch}
                        sx={{ color: "rgba(255,255,255,0.5)", fontSize: 18, cursor: "pointer" }}
                    />
                    <InputBase
                        placeholder="Search…"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                        inputProps={{ "aria-label": "search" }}
                        fullWidth
                        sx={{
                            color: "#fff",
                            fontSize: "0.875rem",
                            "& ::placeholder": { color: "rgba(255,255,255,0.45)", opacity: 1 },
                        }}
                    />
                </SearchWrapper>

                <List>
                    {NAV_LINKS.map((link) => (
                        <ListItem key={link.href} disablePadding>
                            <ListItemButton
                                onClick={() => handleNavigate(link.href)}
                                sx={{
                                    borderRadius: 1.5,
                                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                                }}
                            >
                                <ListItemText
                                    primary={link.label}
                                    slotProps={{
                                        primary: {
                                            sx: { color: "rgba(255,255,255,0.85)", fontWeight: 500 },
                                    }}}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
        </>
    );
}
