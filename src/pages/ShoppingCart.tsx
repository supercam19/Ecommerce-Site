import type { Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import type { Product } from "../data/products";
import {useNavigate} from "react-router-dom";

export interface CartItem {
    product: Product;
    quantity: number;
}

interface ShoppingCartProps {
    cartItems: CartItem[];
    setCartItems: Dispatch<SetStateAction<CartItem[]>>;
}

function updateQuantity(
    setCartItems: Dispatch<SetStateAction<CartItem[]>>,
    productId: string,
    delta: number
) {
    setCartItems((prev) =>
        prev.map((item) =>
            item.product.id === productId
                ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                : item
        )
    );
}

function removeFromCart(
    setCartItems: Dispatch<SetStateAction<CartItem[]>>,
    productId: string
) {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
}

export default function ShoppingCart({ cartItems, setCartItems }: ShoppingCartProps) {
    const navigate = useNavigate();

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
    const savings = cartItems.reduce((sum, item) => {
        if (!item.product.originalPrice) return sum;
        return sum + (item.product.originalPrice - item.product.price) * item.quantity;
    }, 0);
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <Box sx={{ bgcolor: "#0a0c10", minHeight: "100vh", color: "#fff", px: { xs: 2, md: 5 }, py: 5 }}>
            <Typography sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 700, letterSpacing: "-0.02em", mb: 4 }}>
                Shopping Cart
            </Typography>

            {cartItems.length === 0 ? (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 12, gap: 2 }}>
                    <ShoppingBagOutlinedIcon sx={{ fontSize: 56, color: "rgba(255,255,255,0.2)" }} />
                    <Typography sx={{ fontSize: "1.05rem", fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>
                        Your cart is empty
                    </Typography>
                    <Button
                        onClick={() => navigate("/search")}
                        variant="outlined"
                        sx={{
                            mt: 1,
                            color: "#fff",
                            borderColor: "rgba(255,255,255,0.2)",
                            "&:hover": { borderColor: "#fff", bgcolor: "transparent" },
                            textTransform: "none",
                            fontSize: "0.85rem",
                        }}
                    >
                        Browse Equipment
                    </Button>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", lg: "row" },
                        gap: 4,
                        alignItems: "flex-start",
                    }}
                >
                    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
                        {cartItems.map((item) => {
                            const { product, quantity } = item;
                            return (
                                <Box
                                    key={product.id}
                                    sx={{
                                        display: "flex",
                                        bgcolor: "#111318",
                                        border: "1px solid rgba(255,255,255,0.06)",
                                        borderRadius: 2,
                                        overflow: "hidden",
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={product.image}
                                        alt={product.name}
                                        sx={{
                                            width: { xs: 110, sm: 160 },
                                            height: { xs: 110, sm: 160 },
                                            objectFit: "cover",
                                            flexShrink: 0,
                                            filter: "brightness(0.85)",
                                        }}
                                    />

                                    <Box
                                        sx={{
                                            flex: 1,
                                            display: "flex",
                                            flexDirection: { xs: "column", sm: "row" },
                                            justifyContent: "space-between",
                                            px: { xs: 2, sm: 3 },
                                            py: 2,
                                            gap: 2,
                                        }}
                                    >
                                        <Box sx={{ minWidth: 0 }}>
                                            <Typography sx={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", mb: 0.5 }}>
                                                {product.brand} · {product.type}
                                            </Typography>
                                            <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: "#fff", letterSpacing: "-0.01em", mb: 0.5 }}>
                                                {product.name}
                                            </Typography>
                                            <Typography sx={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.5 }}>
                                                {product.subtitle}
                                            </Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: { xs: "flex-start", sm: "flex-end" },
                                                justifyContent: "space-between",
                                                flexShrink: 0,
                                            }}
                                        >
                                            <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                                                <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, justifyContent: { xs: "flex-start", sm: "flex-end" } }}>
                                                    <Typography sx={{ fontWeight: 700, fontSize: "1.1rem", color: "#fff" }}>
                                                        ${product.price.toFixed(2)}
                                                    </Typography>
                                                    {product.originalPrice && (
                                                        <Typography sx={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)", textDecoration: "line-through" }}>
                                                            ${product.originalPrice.toFixed(2)}
                                                        </Typography>
                                                    )}
                                                </Box>
                                                {product.discount && (
                                                    <Typography sx={{ fontSize: "0.72rem", color: "#4ade80", fontWeight: 600, mt: 0.25 }}>
                                                        Save {product.discount}%
                                                    </Typography>
                                                )}
                                            </Box>

                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: { xs: 2, sm: 0 } }}>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        border: "1px solid rgba(255,255,255,0.12)",
                                                        borderRadius: 1.5,
                                                    }}
                                                >
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => updateQuantity(setCartItems, product.id, -1)}
                                                        disabled={quantity <= 1}
                                                        sx={{ color: "rgba(255,255,255,0.7)", borderRadius: 0, "&.Mui-disabled": { color: "rgba(255,255,255,0.15)" } }}
                                                    >
                                                        <RemoveIcon sx={{ fontSize: 16 }} />
                                                    </IconButton>
                                                    <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, width: 28, textAlign: "center" }}>
                                                        {quantity}
                                                    </Typography>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => updateQuantity(setCartItems, product.id, 1)}
                                                        sx={{ color: "rgba(255,255,255,0.7)", borderRadius: 0 }}
                                                    >
                                                        <AddIcon sx={{ fontSize: 16 }} />
                                                    </IconButton>
                                                </Box>

                                                <IconButton
                                                    size="small"
                                                    onClick={() => removeFromCart(setCartItems, product.id)}
                                                    aria-label="remove from cart"
                                                    sx={{
                                                        color: "rgba(255,255,255,0.35)",
                                                        "&:hover": { color: "#e05c5c", bgcolor: "rgba(224,92,92,0.08)" },
                                                    }}
                                                >
                                                    <DeleteIcon sx={{ fontSize: 19 }} />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>

                    <Box
                        sx={{
                            width: { xs: "100%", lg: 340 },
                            flexShrink: 0,
                            position: { lg: "sticky" },
                            top: { lg: 88 },
                            bgcolor: "#111318",
                            border: "1px solid rgba(255,255,255,0.06)",
                            borderRadius: 2,
                            px: 3,
                            py: 3,
                        }}
                    >
                        <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", mb: 2.5 }}>
                            Order Summary
                        </Typography>

                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
                            <Typography sx={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)" }}>
                                Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                            </Typography>
                            <Typography sx={{ fontSize: "0.85rem", color: "#fff", fontWeight: 600 }}>
                                ${subtotal.toFixed(2)}
                            </Typography>
                        </Box>

                        {savings > 0 && (
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
                                <Typography sx={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)" }}>
                                    Savings
                                </Typography>
                                <Typography sx={{ fontSize: "0.85rem", color: "#4ade80", fontWeight: 600 }}>
                                    -${savings.toFixed(2)}
                                </Typography>
                            </Box>
                        )}

                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                            <Typography sx={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)" }}>
                                Shipping
                            </Typography>
                            <Typography sx={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
                                Calculated at checkout
                            </Typography>
                        </Box>

                        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mb: 2 }} />

                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                            <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "#fff" }}>
                                Total
                            </Typography>
                            <Typography sx={{ fontSize: "1.15rem", fontWeight: 700, color: "#fff" }}>
                                ${subtotal.toFixed(2)}
                            </Typography>
                        </Box>

                        <Button
                            fullWidth
                            disabled={cartItems.length === 0}
                            onClick={() => navigate("/checkout")}
                            sx={{
                                py: 1.4,
                                borderRadius: 1.5,
                                fontSize: "0.82rem",
                                fontWeight: 700,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                bgcolor: "#fff",
                                color: "#0a0c10",
                                "&:hover": { bgcolor: "rgba(255,255,255,0.88)" },
                                "&.Mui-disabled": { bgcolor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.2)" },
                            }}
                        >
                            Proceed to Checkout
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
}