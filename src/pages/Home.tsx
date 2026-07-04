import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { alpha } from "@mui/material/styles";
import { MOCK_PRODUCTS } from "../data/products";
import type {Product} from "../data/products";
import ProductCard from "../components/ProductCard";

const LATEST_ARRIVALS: Product[] = MOCK_PRODUCTS.slice(0, 4);

const BEST_DISCOUNTS: Product[] = MOCK_PRODUCTS
    .filter((product) => product.discount)
    .sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0))
    .slice(0, 4);

export default function Home({ onAddToCart }: Readonly<{ onAddToCart: (product: Product) => void }>) {
    return (
        <Box sx={{ bgcolor: (theme) => theme.brand.gray, minHeight: "100vh", color: "#fff" }}>
            <Box
                sx={{
                    position: "relative",
                    height: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" },
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    pb: { xs: 8, md: 12 },
                }}
            >
                <Box
                    component="video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    src="/snow-kickup.mp4"
                    sx={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        zIndex: 0,
                        filter: "brightness(0.55)",
                    }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to top, rgba(10,12,16,0.85) 0%, rgba(10,12,16,0.1) 60%, transparent 100%)",
                        zIndex: 1,
                    }}
                />

                <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
                    <Box sx={{ maxWidth: 680, }}>
                        <Typography
                            variant="overline"
                            sx={{
                                color: "rgba(180,210,255,0.7)",
                                letterSpacing: "0.2em",
                                fontSize: "0.7rem",
                                display: "block",
                                mb: 2,
                                textAlign: "left",
                                pl: 2,
                            }}
                        >
                            New Season · 2026 / 27
                        </Typography>

                        <Typography
                            sx={{
                                fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                                fontWeight: 800,
                                fontSize: { xs: "3.5rem", sm: "5rem", md: "7rem" },
                                lineHeight: 0.92,
                                letterSpacing: "-0.02em",
                                textTransform: "uppercase",
                                color: "transparent",
                                WebkitTextStroke: "1.5px rgba(255,255,255,0.88)",
                                mb: 1,
                                userSelect: "none",
                                textAlign: "left",
                            }}
                        >
                            Own
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                                fontWeight: 800,
                                fontSize: { xs: "3.5rem", sm: "5rem", md: "7rem" },
                                lineHeight: 0.92,
                                letterSpacing: "-0.02em",
                                textTransform: "uppercase",
                                color: "#fff",
                                mb: 3,
                                userSelect: "none",
                                textAlign: "left",
                            }}
                        >
                            The Mountain.
                        </Typography>

                        <Typography
                            sx={{
                                color: "rgba(255,255,255,0.62)",
                                fontSize: { xs: "0.95rem", md: "1.1rem" },
                                fontWeight: 400,
                                lineHeight: 1.6,
                                maxWidth: 420,
                                mb: 4,
                                textAlign: "left",
                            }}
                        >
                            Pro-grade skis, boards, boots, and gear — curated for every level,
                            from first-timers to backcountry regulars.
                        </Typography>
                        <Box sx={{width: "100%", display: "flex", justifyContent: "left", gap: 2, mb: 4,}}>
                            <Button
                                variant="contained"
                                href="/browse"
                                sx={{
                                    bgcolor: "#fff",
                                    color: "#0a0c10",
                                    fontWeight: 700,
                                    fontSize: "0.85rem",
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 1,
                                    boxShadow: (theme) => `6px 6px ${alpha(theme.brand.blue, 1)}`,
                                    "&:hover": {
                                        bgcolor: "rgba(255,255,255,0.88)",
                                    },
                                }}
                            >
                                Browse Equipment
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* ── BEST DISCOUNTS ── */}
            <Box
                sx={{
                    width: "100%",
                    bgcolor: "#0d0f14",
                    py: { xs: 8, md: 12 },
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "space-between",
                            mb: 6,
                            flexWrap: "wrap",
                            gap: 2,
                        }}
                    >
                        <Box>
                            <Typography
                                variant="overline"
                                sx={{
                                    display: "block",
                                    color: "rgba(255,255,255,0.35)",
                                    letterSpacing: "0.22em",
                                    fontSize: "0.68rem",
                                    mb: 1,
                                }}
                            >
                                Save Big
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    fontSize: { xs: "1.6rem", md: "2.2rem" },
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                Best Discounts
                            </Typography>
                        </Box>
                        <Button
                            variant="text"
                            href="/search"
                            sx={{
                                color: "rgba(255,255,255,0.5)",
                                fontSize: "0.8rem",
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                fontWeight: 600,
                                "&:hover": { color: "#fff", bgcolor: "transparent" },
                            }}
                        >
                            View All →
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 3,
                            overflowX: "auto",
                            pb: 2,
                            scrollSnapType: "x mandatory",
                            "&::-webkit-scrollbar": { height: 6 },
                            "&::-webkit-scrollbar-track": { bgcolor: "rgba(255,255,255,0.05)" },
                            "&::-webkit-scrollbar-thumb": {
                                bgcolor: "rgba(255,255,255,0.15)",
                                borderRadius: 3,
                            },
                        }}
                    >
                        {BEST_DISCOUNTS.map((product) => (
                            <Box
                                key={product.id}
                                sx={{
                                    display: "flex",
                                    flex: "0 0 auto",
                                    width: { xs: 260, sm: 280 },
                                    scrollSnapAlign: "start",
                                    "& > *": { width: "100%" },
                                }}
                            >
                                <ProductCard product={product} onAddToCart={onAddToCart} />
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* ── LATEST ARRIVALS ── */}
            <Box
                sx={{
                    width: "100%",
                    bgcolor: "#0a0c10",
                    py: { xs: 8, md: 12 },
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "space-between",
                            mb: 6,
                            flexWrap: "wrap",
                            gap: 2,
                        }}
                    >
                        <Box>
                            <Typography
                                variant="overline"
                                sx={{
                                    display: "block",
                                    color: "rgba(255,255,255,0.35)",
                                    letterSpacing: "0.22em",
                                    fontSize: "0.68rem",
                                    mb: 1,
                                }}
                            >
                                Just Dropped
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    fontSize: { xs: "1.6rem", md: "2.2rem" },
                                    letterSpacing: "-0.02em",
                                }}
                            >
                                Latest Arrivals
                            </Typography>
                        </Box>
                        <Button
                            variant="text"
                            href="/search"
                            sx={{
                                color: "rgba(255,255,255,0.5)",
                                fontSize: "0.8rem",
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                fontWeight: 600,
                                "&:hover": { color: "#fff", bgcolor: "transparent" },
                            }}
                        >
                            View All →
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 3,
                            overflowX: "auto",
                            pb: 2,
                            scrollSnapType: "x mandatory",
                            "&::-webkit-scrollbar": { height: 6 },
                            "&::-webkit-scrollbar-track": { bgcolor: "rgba(255,255,255,0.05)" },
                            "&::-webkit-scrollbar-thumb": {
                                bgcolor: "rgba(255,255,255,0.15)",
                                borderRadius: 3,
                            },
                        }}
                    >
                        {LATEST_ARRIVALS.map((item) => (
                            <Box
                                key={item.id}
                                sx={{
                                    display: "flex",
                                    flex: "0 0 auto",
                                    width: { xs: 260, sm: 280 },
                                    scrollSnapAlign: "start",
                                    "& > *": { width: "100%" },
                                }}
                            >
                                <ProductCard product={item} onAddToCart={onAddToCart} />
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

        </Box>
    );
}