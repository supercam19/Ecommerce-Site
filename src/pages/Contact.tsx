import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { alpha } from "@mui/material/styles";

const CONTACT_REASONS = [
    "Order Status & Tracking",
    "Returns & Exchanges",
    "Damaged or Defective Item",
    "Wrong Item Received",
    "Product Question",
    "Size & Fit Advice",
    "Warranty Claim",
    "Billing & Payment Issue",
    "Cancel or Modify Order",
    "Other",
];

const FIELD_SX = {
    "& .MuiOutlinedInput-root": {
        color: "#fff",
        fontSize: "0.9rem",
        borderRadius: 1.5,
        backgroundColor: "rgba(255,255,255,0.04)",
        "& fieldset": {
            borderColor: "rgba(255,255,255,0.1)",
        },
        "&:hover fieldset": {
            borderColor: "rgba(255,255,255,0.25)",
        },
        "&.Mui-focused fieldset": {
            borderColor: "rgba(255,255,255,0.5)",
            borderWidth: 1,
        },
    },
    "& .MuiInputLabel-root": {
        color: "rgba(255,255,255,0.35)",
        fontSize: "0.88rem",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "rgba(255,255,255,0.6)",
    },
    "& .MuiFormHelperText-root": {
        color: "#e05c5c",
        marginLeft: 0,
        fontSize: "0.75rem",
    },
    "& .MuiSelect-icon": {
        color: "rgba(255,255,255,0.35)",
    },
};

const MENU_ITEM_SX = {
    fontSize: "0.88rem",
    color: "rgba(255,255,255,0.75)",
    bgcolor: "#1a1d24",
    "&:hover": { bgcolor: "rgba(255,255,255,0.07)" },
    "&.Mui-selected": {
        bgcolor: "rgba(255,255,255,0.1)",
        color: "#fff",
        "&:hover": { bgcolor: "rgba(255,255,255,0.13)" },
    },
};

function isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function Contact() {
    const [email, setEmail] = useState("");
    const [emailTouched, setEmailTouched] = useState(false);
    const [reason, setReason] = useState("");
    const [details, setDetails] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const emailError = emailTouched && email.length > 0 && !isValidEmail(email);
    const emailEmpty = emailTouched && email.length === 0;

    const canSubmit = isValidEmail(email) && reason !== "" ;

    const handleSubmit = () => {
        if (!canSubmit) return;
        setSubmitted(true);
    };

    return (
        <Box sx={{ bgcolor: "#0a0c10", color: "#fff" }}>

            <Box
                sx={{
                    position: "relative",
                    height: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" },
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box
                    component="img"
                    src="/mountains.png"
                    alt="Mountain landscape"
                    sx={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center 60%",
                        filter: "brightness(0.45)",
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to bottom, rgba(10,12,16,0.1) 0%, rgba(10,12,16,0.55) 100%)",
                    }}
                />

                <Typography
                    sx={{
                        position: "relative",
                        zIndex: 2,
                        fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                        fontWeight: 800,
                        fontSize: { xs: "2.75rem", sm: "3.5rem", md: "4.5rem" },
                        letterSpacing: "-0.02em",
                        textTransform: "uppercase",
                        color: "transparent",
                        WebkitTextStroke: "1.5px rgba(255,255,255,0.82)",
                        userSelect: "none",
                        mb: { xs: 3, md: 4 },
                    }}
                >
                    Contact Us
                </Typography>

                <Box
                    sx={{
                        position: "relative",
                        zIndex: 2,
                        width: "100%",
                        maxWidth: 720,
                        px: { xs: 2, md: 4 },
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            bgcolor: alpha("#13161e", 0.92),
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: 2.5,
                            boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
                            overflow: "hidden",
                            maxHeight: { xs: "calc(100vh - 56px - 180px)", md: "calc(100vh - 64px - 220px)" },
                            overflowY: "auto",
                        }}
                    >
                        {submitted ? (
                            <Box sx={{ px: { xs: 3, md: 5 }, py: { xs: 5, md: 7 }, textAlign: "center" }}>
                                <Typography sx={{ fontSize: "1.5rem", fontWeight: 700, mb: 1.5, letterSpacing: "-0.02em" }}>
                                    Message Sent
                                </Typography>
                                <Typography sx={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                                    Thanks for reaching out. A customer service rep will follow up at{" "}
                                    <Box component="span" sx={{ color: "rgba(255,255,255,0.75)" }}>{email}</Box>{" "}
                                    as soon as possible.
                                </Typography>
                            </Box>
                        ) : (
                            <Box sx={{ px: { xs: 3, md: 5 }, pt: { xs: 3, md: 4 }, pb: { xs: 3, md: 4 } }}>
                                <Typography
                                    sx={{
                                        fontSize: "0.8rem",
                                        color: "rgba(255,255,255,0.4)",
                                        lineHeight: 1.7,
                                        textAlign: "center",
                                        mb: 3,
                                    }}
                                >
                                    Need to get in touch with us about your order, a product, or any other concern?
                                    Our customer service team is happy to help. Fill out the form and we'll get back to you shortly.
                                </Typography>

                                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                    <TextField
                                        label="Email address"
                                        type="email"
                                        fullWidth
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={() => setEmailTouched(true)}
                                        error={emailError || emailEmpty}
                                        helperText={
                                            emailEmpty
                                                ? "Email address is required"
                                                : emailError
                                                    ? "Enter a valid email address"
                                                    : ""
                                        }
                                        sx={FIELD_SX}
                                    />

                                    <TextField
                                        select
                                        label="Reason for contact"
                                        fullWidth
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        sx={FIELD_SX}
                                        slotProps={{
                                            select: {
                                                sx: { textAlign: "left" },
                                                MenuProps: {
                                                    slotProps: {
                                                        paper: {
                                                            sx: {
                                                                bgcolor: "#1a1d24",
                                                                border: "1px solid rgba(255,255,255,0.08)",
                                                                borderRadius: 1.5,
                                                                boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
                                                                mt: 0.5,
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        }}
                                    >
                                        {CONTACT_REASONS.map((r) => (
                                            <MenuItem key={r} value={r} sx={MENU_ITEM_SX}>
                                                {r}
                                            </MenuItem>
                                        ))}
                                    </TextField>

                                    <TextField
                                        label="Details"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        value={details}
                                        onChange={(e) => setDetails(e.target.value)}
                                        placeholder="Describe your issue or question in as much detail as possible…"
                                        sx={{
                                            ...FIELD_SX,
                                            "& .MuiOutlinedInput-root": {
                                                ...FIELD_SX["& .MuiOutlinedInput-root"],
                                                alignItems: "flex-start",
                                            },
                                            "& .MuiOutlinedInput-input::placeholder": {
                                                color: "rgba(255,255,255,0.2)",
                                                opacity: 1,
                                            },
                                        }}
                                    />

                                    <Button
                                        fullWidth
                                        onClick={handleSubmit}
                                        disabled={!canSubmit}
                                        sx={{
                                            mt: 0.5,
                                            py: 1.4,
                                            borderRadius: 1.5,
                                            fontSize: "0.82rem",
                                            fontWeight: 700,
                                            letterSpacing: "0.1em",
                                            textTransform: "uppercase",
                                            bgcolor: canSubmit ? "#fff" : "rgba(255,255,255,0.07)",
                                            color: canSubmit ? "#0a0c10" : "rgba(255,255,255,0.2)",
                                            transition: "background-color 0.2s, color 0.2s",
                                            "&:hover": {
                                                bgcolor: canSubmit ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.07)",
                                            },
                                            "&.Mui-disabled": {
                                                bgcolor: "rgba(255,255,255,0.07)",
                                                color: "rgba(255,255,255,0.2)",
                                            },
                                        }}
                                    >
                                        Send Message
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}