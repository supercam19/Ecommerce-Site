
import { Box, Link, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box
            sx={{
                width: "100%",
                backgroundColor: "#05070b",
                py: 1.5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography
                sx={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "0.75rem",
                    fontFamily: "'Helvetica Neue', Arial, sans-serif",
                    whiteSpace: "nowrap",
                }}
            >
                Designed by Cameron Labelle&nbsp;&nbsp;·&nbsp;&nbsp;
                <Link
                    href="https://cameron-labelle.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        color: "rgba(255,255,255,0.75)",
                        textDecorationColor: "rgba(255,255,255,0.3)",
                        "&:hover": { color: "#ffffff" },
                    }}
                >
                    Portfolio
                </Link>
                &nbsp;&nbsp;·&nbsp;&nbsp;
                <Link
                    href="https://github.com/supercam19/"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        color: "rgba(255,255,255,0.75)",
                        textDecorationColor: "rgba(255,255,255,0.3)",
                        "&:hover": { color: "#ffffff" },
                    }}
                >
                    GitHub
                </Link>
                &nbsp;&nbsp;·&nbsp;&nbsp;2026
            </Typography>
        </Box>
    );
}

