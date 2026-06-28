import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import { alpha } from "@mui/material/styles";

type Category = "All Equipment" | "Skiing" | "Snowboarding";

interface CategoryCard {
    label: string;
    category: Category | "All Equipment";
    image: string;
    href: string;
}

interface EquipmentItem {
    name: string;
    brand: string;
    price: string;
    tag: string;
    image: string;
    href: string;
}

const CATEGORY_CARDS: CategoryCard[] = [
    {
        label: "All Equipment",
        category: "All Equipment",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80",
        href: "/browse",
    },
    {
        label: "Skiing",
        category: "Skiing",
        image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=600&q=80",
        href: "/browse/skiing",
    },
    {
        label: "Snowboarding",
        category: "Snowboarding",
        image: "https://images.unsplash.com/photo-1453342664588-4e5472e64e2e?w=600&q=80",
        href: "/browse/snowboarding",
    },
];

const ALL_CARDS: CategoryCard[] = [
    {
        label: "All Equipment",
        category: "All Equipment",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80",
        href: "/browse",
    },
    {
        label: "Skiing",
        category: "Skiing",
        image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=600&q=80",
        href: "/browse/skiing",
    },
    {
        label: "Snowboarding",
        category: "Snowboarding",
        image: "https://images.unsplash.com/photo-1453342664588-4e5472e64e2e?w=600&q=80",
        href: "/browse/snowboarding",
    },
    {
        label: "Ski Boots",
        category: "Skiing",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80",
        href: "/browse/ski-boots",
    },
    {
        label: "Helmets",
        category: "All Equipment",
        image: "https://images.unsplash.com/photo-1516967124798-10656f7de543?w=600&q=80",
        href: "/browse/helmets",
    },
    {
        label: "Snowboard Boots",
        category: "Snowboarding",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
        href: "/browse/snowboard-boots",
    },
];

const LATEST_ARRIVALS: EquipmentItem[] = [
    {
        name: "Blizzard Rustler 10",
        brand: "Blizzard",
        price: "$749",
        tag: "Skis",
        image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=500&q=80",
        href: "/product/blizzard-rustler-10",
    },
    {
        name: "Burton Custom X",
        brand: "Burton",
        price: "$629",
        tag: "Snowboard",
        image: "https://images.unsplash.com/photo-1453342664588-4e5472e64e2e?w=500&q=80",
        href: "/product/burton-custom-x",
    },
    {
        name: "Salomon S/Pro 130",
        brand: "Salomon",
        price: "$549",
        tag: "Ski Boots",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&q=80",
        href: "/product/salomon-spro-130",
    },
    {
        name: "Oakley MOD5",
        brand: "Oakley",
        price: "$199",
        tag: "Helmet",
        image: "https://images.unsplash.com/photo-1516967124798-10656f7de543?w=500&q=80",
        href: "/product/oakley-mod5",
    },
];

const CATEGORIES: Category[] = ["All Equipment", "Skiing", "Snowboarding"];

export default function Home() {
    const [activeCategory, setActiveCategory] = useState<Category>("All Equipment");

    const filteredCards =
        activeCategory === "All Equipment"
            ? ALL_CARDS
            : ALL_CARDS.filter((c) => c.category === activeCategory);

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
                            New Season · 2025 / 26
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

            {/* ── BROWSE BY CATEGORY ── */}
            <Box
                sx={{
                    width: "100%",
                    bgcolor: "#0d0f14",
                    py: { xs: 8, md: 12 },
                }}
            >
                <Container maxWidth="xl">
                    <Typography
                        variant="overline"
                        sx={{
                            display: "block",
                            textAlign: "center",
                            color: "rgba(255,255,255,0.35)",
                            letterSpacing: "0.22em",
                            fontSize: "0.68rem",
                            mb: 1,
                        }}
                    >
                        Shop By
                    </Typography>
                    <Typography
                        sx={{
                            textAlign: "center",
                            fontWeight: 700,
                            fontSize: { xs: "1.6rem", md: "2.2rem" },
                            letterSpacing: "-0.02em",
                            mb: 4,
                        }}
                    >
                        Categories
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 1,
                            mb: 6,
                            flexWrap: "wrap",
                        }}
                    >
                        {CATEGORIES.map((cat) => {
                            const active = cat === activeCategory;
                            return (
                                <Chip
                                    key={cat}
                                    label={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    sx={{
                                        px: 2,
                                        py: 2.5,
                                        fontSize: "0.82rem",
                                        fontWeight: 600,
                                        letterSpacing: "0.04em",
                                        borderRadius: "100px",
                                        cursor: "pointer",
                                        border: "1px solid",
                                        borderColor: active
                                            ? "rgba(255,255,255,0.7)"
                                            : "rgba(255,255,255,0.12)",
                                        bgcolor: active
                                            ? "rgba(255,255,255,0.12)"
                                            : "transparent",
                                        backdropFilter: "blur(10px)",
                                        color: active ? "#fff" : "rgba(255,255,255,0.5)",
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            bgcolor: "rgba(255,255,255,0.1)",
                                            borderColor: "rgba(255,255,255,0.4)",
                                            color: "#fff",
                                        },
                                    }}
                                />
                            );
                        })}
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 2.5,
                            overflowX: "auto",
                            pb: 2,
                            px: 1,
                            scrollSnapType: "x mandatory",
                            "&::-webkit-scrollbar": { height: 4 },
                            "&::-webkit-scrollbar-track": { bgcolor: "rgba(255,255,255,0.05)" },
                            "&::-webkit-scrollbar-thumb": {
                                bgcolor: "rgba(255,255,255,0.15)",
                                borderRadius: 2,
                            },
                        }}
                    >
                        {filteredCards.map((card) => (
                            <Card
                                key={card.href}
                                sx={{
                                    minWidth: { xs: 240, sm: 280 },
                                    flexShrink: 0,
                                    scrollSnapAlign: "start",
                                    bgcolor: "#151820",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    transition: "transform 0.25s ease, border-color 0.25s ease",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        borderColor: "rgba(255,255,255,0.2)",
                                    },
                                }}
                            >
                                <CardActionArea component="a" href={card.href} sx={{ height: "100%" }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={card.image}
                                        alt={card.label}
                                        sx={{ objectFit: "cover", filter: "brightness(0.8)" }}
                                    />
                                    <CardContent sx={{ px: 2.5, py: 2 }}>
                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: "1rem",
                                                color: "#fff",
                                                letterSpacing: "-0.01em",
                                            }}
                                        >
                                            {card.label}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: "0.78rem",
                                                color: "rgba(255,255,255,0.4)",
                                                mt: 0.5,
                                            }}
                                        >
                                            Shop collection →
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
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
                            href="/browse"
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
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "1fr 1fr",
                                md: "repeat(4, 1fr)",
                            },
                            gap: 3,
                        }}
                    >
                        {LATEST_ARRIVALS.map((item) => (
                            <Card
                                key={item.href}
                                sx={{
                                    bgcolor: "#111318",
                                    border: "1px solid rgba(255,255,255,0.06)",
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    transition: "transform 0.25s ease, border-color 0.25s ease",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        borderColor: "rgba(255,255,255,0.18)",
                                    },
                                }}
                            >
                                <CardActionArea component="a" href={item.href}>
                                    <Box sx={{ position: "relative" }}>
                                        <CardMedia
                                            component="img"
                                            height="220"
                                            image={item.image}
                                            alt={item.name}
                                            sx={{ objectFit: "cover", filter: "brightness(0.75)" }}
                                        />
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: 12,
                                                left: 12,
                                                px: 1.5,
                                                py: 0.4,
                                                borderRadius: "100px",
                                                bgcolor: alpha("#fff", 0.12),
                                                backdropFilter: "blur(8px)",
                                                border: "1px solid rgba(255,255,255,0.18)",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: "0.68rem",
                                                    fontWeight: 600,
                                                    letterSpacing: "0.1em",
                                                    color: "rgba(255,255,255,0.85)",
                                                    textTransform: "uppercase",
                                                }}
                                            >
                                                {item.tag}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <CardContent sx={{ px: 2, py: 2 }}>
                                        <Typography
                                            sx={{
                                                fontSize: "0.72rem",
                                                color: "rgba(255,255,255,0.38)",
                                                letterSpacing: "0.08em",
                                                textTransform: "uppercase",
                                                mb: 0.5,
                                            }}
                                        >
                                            {item.brand}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: "0.95rem",
                                                color: "#fff",
                                                letterSpacing: "-0.01em",
                                                mb: 1.5,
                                            }}
                                        >
                                            {item.name}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: 700,
                                                    fontSize: "1.05rem",
                                                    color: "#fff",
                                                }}
                                            >
                                                {item.price}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: "0.75rem",
                                                    color: "rgba(255,255,255,0.35)",
                                                    letterSpacing: "0.04em",
                                                }}
                                            >
                                                View →
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))}
                    </Box>
                </Container>
            </Box>

        </Box>
    );
}