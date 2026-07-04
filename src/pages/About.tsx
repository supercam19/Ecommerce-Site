import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

interface Section {
    heading: string;
    body: string;
    image: string;
    alt: string;
}

const SECTIONS: Section[] = [
    {
        heading: "Built for the Mountain",
        body: "Atlas Sports Equipment was founded in 2009 by a group of Whistler locals who were tired of choosing between gear that performed and gear that lasted. We set out to build an equipment shop that took both seriously — sourcing only from brands whose engineers spend more time on snow than in boardrooms. Fifteen years later, that philosophy hasn't changed, even if our catalogue has grown from a single rack of demo skis to one of Canada's most respected winter sports retailers.",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=900&q=80",
        alt: "Skier on a steep mountain slope",
    },
    {
        heading: "Gear We Believe In",
        body: "Every product on Atlas carries our personal endorsement. Our buying team tests submissions throughout the season across a range of conditions — groomed runs, backcountry powder, and everything in between. If a ski doesn't hold an edge on hard pack, it doesn't make the shelf. If a boot runs cold below minus twenty, same story. We turn down more brands than we carry, and we think that's exactly how it should be.",
        image: "/ski2.png",
        alt: "Close-up of ski equipment",
    },
    {
        heading: "People Who Ride",
        body: "Our team is made up entirely of skiers and snowboarders who use the gear themselves. When you ask us about a binding's release threshold or how a board feels in heavy spring slush, you'll get a real answer from someone who found out the hard way. We don't script our customer support, and we don't hire people who haven't been on snow. It's a small thing that makes a big difference when you're making a $600 purchase decision.",
        image: "/ski1.png",
        alt: "Snowboarder mid-run",
    },
    {
        heading: "Outfitting Every Level",
        body: "Atlas started as a shop for experts, but we've spent the last decade making sure beginners feel just as welcome. Our fit guides, rental packages, and beginner-specific collections exist because we believe more people on the hill is always a good thing. Whether you're picking up your first pair of rental boots or hunting a pro-model twin tip, you'll find what you need here — without being made to feel like you're in the wrong place.",
        image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=900&q=80",
        alt: "Ski boots on snow",
    },
];

export default function About() {
    return (
        <Box sx={{ bgcolor: "#0a0c10", minHeight: "100vh", color: "#fff" }}>

            <Box
                sx={{
                    position: "relative",
                    height: { xs: "45vh", md: "55vh" },
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "flex-end",
                    pb: { xs: 5, md: 8 },
                }}
            >
                <Box
                    component="img"
                    src="/skiier.png"
                    alt="Skier descending a mountain"
                    sx={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center 30%",
                        filter: "brightness(0.45)",
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to bottom, rgba(10,12,16,0) 30%, rgba(10,12,16,0.85) 100%)",
                    }}
                />
                <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
                    <Typography
                        sx={{
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.35)",
                            mb: 1.5,
                        }}
                    >
                        Our Story
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                            fontWeight: 800,
                            fontSize: { xs: "3rem", md: "5rem" },
                            lineHeight: 0.92,
                            letterSpacing: "-0.02em",
                            textTransform: "uppercase",
                        }}
                    >
                        Atlas Sports Equipment
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
                {SECTIONS.map((section, i) => {
                    const imageRight = i % 2 === 0;
                    return (
                        <Box
                            key={section.heading}
                            sx={{
                                display: "flex",
                                flexDirection: {
                                    xs: "column",
                                    md: imageRight ? "row" : "row-reverse",
                                },
                                gap: { xs: 4, md: 8 },
                                alignItems: "center",
                                mb: i < SECTIONS.length - 1 ? { xs: 10, md: 14 } : 0,
                            }}
                        >
                            <Box
                                sx={{
                                    flex: 1,
                                    minWidth: 0,
                                    order: { xs: 2, md: "unset" },
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: "0.65rem",
                                        fontWeight: 700,
                                        letterSpacing: "0.2em",
                                        textTransform: "uppercase",
                                        color: "rgba(255,255,255,0.25)",
                                        mb: 2,
                                    }}
                                >
                                    0{i + 1}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                                        fontWeight: 800,
                                        fontSize: { xs: "2rem", md: "2.75rem" },
                                        lineHeight: 1,
                                        letterSpacing: "-0.02em",
                                        textTransform: "uppercase",
                                        mb: 3,
                                    }}
                                >
                                    {section.heading}
                                </Typography>
                                <Box
                                    sx={{
                                        width: 32,
                                        height: 2,
                                        bgcolor: "rgba(255,255,255,0.25)",
                                        mb: 3,
                                    }}
                                />
                                <Typography
                                    sx={{
                                        fontSize: "0.92rem",
                                        color: "rgba(255,255,255,0.55)",
                                        lineHeight: 1.85,
                                        maxWidth: 480,
                                    }}
                                >
                                    {section.body}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    flex: 1,
                                    order: { xs: 1, md: "unset" },
                                }}
                            >
                                <Box
                                    component="img"
                                    src={section.image}
                                    alt={section.alt}
                                    sx={{
                                        width: "100%",
                                        height: { xs: 260, md: 400 },
                                        objectFit: "cover",
                                        borderRadius: 2,
                                        display: "block",
                                        filter: "brightness(0.82)",
                                    }}
                                />
                            </Box>
                        </Box>
                    );
                })}
            </Container>

            <Box
                sx={{
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    py: { xs: 8, md: 12 },
                    bgcolor: "#0d0f14",
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
                            gap: { xs: 4, md: 0 },
                        }}
                    >
                        {[
                            { value: "2009", label: "Founded" },
                            { value: "40+", label: "Brands Carried" },
                            { value: "1,200+", label: "Products" },
                            { value: "6", label: "Seasons Tested" },
                        ].map((stat, i, arr) => (
                            <Box
                                key={stat.label}
                                sx={{
                                    textAlign: "center",
                                    px: 3,
                                    borderRight: {
                                        md: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                                    },
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                                        fontWeight: 800,
                                        fontSize: { xs: "2.5rem", md: "3.5rem" },
                                        letterSpacing: "-0.02em",
                                        lineHeight: 1,
                                        color: "#fff",
                                        mb: 1,
                                    }}
                                >
                                    {stat.value}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "0.72rem",
                                        fontWeight: 600,
                                        letterSpacing: "0.14em",
                                        textTransform: "uppercase",
                                        color: "rgba(255,255,255,0.3)",
                                    }}
                                >
                                    {stat.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

        </Box>
    );
}