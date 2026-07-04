import type {Product} from "../data/products";
import {Card, Box, CardMedia, Typography, CardContent, CardActions, Button} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { alpha } from "@mui/material/styles";

function StarRating({ rating }: { rating: number }) {
    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
            {[1, 2, 3, 4, 5].map((star) => {
                const filled = rating >= star;
                const half = !filled && rating >= star - 0.5;
                const Icon = filled ? StarIcon : half ? StarHalfIcon : StarBorderIcon;
                return (
                    <Icon
                        key={star}
                        sx={{ fontSize: 14, color: filled || half ? "#f5c842" : "rgba(255,255,255,0.2)" }}
                    />
                );
            })}
        </Box>
    );
}

interface Props {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export default function ProductCard({product, onAddToCart}: Readonly<Props>) {
    return (
        <Card
            key={product.id}
            sx={{
                bgcolor: "#111318",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 2,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease, border-color 0.2s ease",
                "&:hover": {
                    transform: "translateY(-3px)",
                    borderColor: "rgba(255,255,255,0.16)",
                },
            }}
        >
            <Box sx={{ position: "relative", paddingTop: "100%", overflow: "hidden" }}>
                <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "brightness(0.78)"
                    }}
                />
                {product.discount && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: 12,
                            left: 12,
                            px: 1.25,
                            py: 0.4,
                            borderRadius: 1,
                            bgcolor: (theme) => theme.brand.orange,
                        }}
                    >
                        <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.06em", color: "#fff" }}>
                            -{product.discount}%
                        </Typography>
                    </Box>
                )}
                {!product.inStock && (
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            bgcolor: "rgba(10,12,16,0.55)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.25)", px: 2, py: 0.75, borderRadius: 1 }}>
                            Out of Stock
                        </Typography>
                    </Box>
                )}
            </Box>

            <CardContent sx={{ px: 2, pt: 2, pb: 1, flex: 1 }}>
                <Typography sx={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", mb: 0.5 }}>
                    {product.brand} · {product.type}
                </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#fff", letterSpacing: "-0.01em", mb: 0.5, lineHeight: 1.3 }}>
                    {product.name}
                </Typography>
                <Typography sx={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.42)", mb: 1.5, lineHeight: 1.5 }}>
                    {product.subtitle}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                    <StarRating rating={product.rating} />
                    <Typography sx={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>
                        {product.rating.toFixed(1)} ({product.reviewCount})
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "1.1rem", color: "#fff" }}>
                        ${product.price}
                    </Typography>
                    {product.originalPrice && (
                        <Typography sx={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.3)", textDecoration: "line-through" }}>
                            ${product.originalPrice}
                        </Typography>
                    )}
                </Box>
            </CardContent>

            <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    disabled={!product.inStock}
                    startIcon={<ShoppingCartIcon sx={{ fontSize: "16px !important" }} />}
                    onClick={() => onAddToCart(product)}
                    sx={{
                        borderColor: product.inStock ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)",
                        color: product.inStock ? "#fff" : "rgba(255,255,255,0.25)",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        textTransform: "none",
                        py: 1,
                        borderRadius: 1.5,
                        "&:hover": {
                            borderColor: "#fff",
                            bgcolor: alpha("#fff", 0.06),
                        },
                        "&.Mui-disabled": {
                            borderColor: "rgba(255,255,255,0.08)",
                            color: "rgba(255,255,255,0.2)",
                        },
                    }}
                >
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    )
}