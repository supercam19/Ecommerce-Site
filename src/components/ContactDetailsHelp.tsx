import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const TIPS = [
    "Describe what you were doing when the issue occurred.",
    "Note any steps you've already tried.",
    "Be specific - \"the button didn't work\" is harder to action than what you expected to happen.",
    "Don't try to attach images - we will ask for them by email if necessary.",
];

export default function ContactDetailsHelp() {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handler(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <Box ref={ref} sx={{ position: "relative", flexShrink: 0 }}>
            <Box
                role="button"
                tabIndex={0}
                aria-label="Writing tips"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setOpen((v) => !v); }}
                sx={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    border: "1px solid",
                    borderColor: open ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.18)",
                    bgcolor: open ? "rgba(255,255,255,0.1)" : "transparent",
                    color: open ? "#fff" : "rgba(255,255,255,0.4)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    userSelect: "none",
                    "&:hover": {
                        borderColor: "rgba(255,255,255,0.4)",
                        color: "#fff",
                    },
                }}
            >
                ?
            </Box>

            {open && (
                <Box
                    role="tooltip"
                    sx={{
                        position: "absolute",
                        top: 28,
                        right: 0,
                        width: 260,
                        bgcolor: "#1a1d24",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 2,
                        p: 1.75,
                        zIndex: 10,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                    }}
                >
                    <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#fff", mb: 1 }}>
                        Writing a helpful message
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
                        {TIPS.map((tip) => (
                            <Box key={tip} sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                                <Box sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: "rgba(255,255,255,0.25)", flexShrink: 0, mt: "5px" }} />
                                <Typography sx={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6, textAlign: "left" }}>
                                    {tip}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
}