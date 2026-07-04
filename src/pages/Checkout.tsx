import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { alpha } from "@mui/material/styles";
import type { CartItem } from "./ShoppingCart";

const FIELD_SX = {
    "& .MuiOutlinedInput-root": {
        color: "#fff",
        fontSize: "0.9rem",
        borderRadius: 1.5,
        backgroundColor: "rgba(255,255,255,0.04)",
        "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
        "&:hover fieldset": { borderColor: "rgba(255,255,255,0.25)" },
        "&.Mui-focused fieldset": { borderColor: "rgba(255,255,255,0.5)", borderWidth: 1 },
    },
    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.35)", fontSize: "0.88rem" },
    "& .MuiInputLabel-root.Mui-focused": { color: "rgba(255,255,255,0.6)" },
    "& .MuiFormHelperText-root": { color: "#e05c5c", marginLeft: 0, fontSize: "0.75rem" },
    "& .MuiSelect-icon": { color: "rgba(255,255,255,0.35)" },
};

const CARD_SX = {
    bgcolor: "#111318",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 2,
    p: { xs: 3, md: 4 },
};

const CA_PROVINCES = [
    "Alberta", "British Columbia", "Manitoba", "New Brunswick",
    "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia",
    "Nunavut", "Ontario", "Prince Edward Island", "Quebec",
    "Saskatchewan", "Yukon",
];

const MENU_ITEM_SX = {
    fontSize: "0.88rem",
    color: "rgba(255,255,255,0.75)",
    bgcolor: "#1a1d24",
    "&:hover": { bgcolor: "rgba(255,255,255,0.07)" },
    "&.Mui-selected": { bgcolor: "rgba(255,255,255,0.1)", color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.13)" } },
};

type Step = "shipping" | "payment" | "confirmation";

interface ShippingForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    apt: string;
    city: string;
    province: string;
    postal: string;
}

interface PaymentForm {
    cardName: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
}

interface CheckoutProps {
    cartItems: CartItem[];
}

function isValidEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function isValidPostal(v: string) {
    return /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(v.trim());
}
function isValidPhone(v: string) {
    return /^\+?[\d\s\-().]{7,}$/.test(v.trim());
}
function isValidExpiry(v: string) {
    if (!/^\d{2}\/\d{2}$/.test(v)) return false;
    const [mm, yy] = v.split("/").map(Number);
    if (mm < 1 || mm > 12) return false;
    const now = new Date();
    const expDate = new Date(2000 + yy, mm - 1, 1);
    return expDate >= new Date(now.getFullYear(), now.getMonth(), 1);
}
function isValidCard(v: string) {
    return v.replace(/\s/g, "").length === 16;
}
function isValidCVV(v: string) {
    return /^\d{3,4}$/.test(v.trim());
}

function formatCardNumber(v: string) {
    return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(v: string) {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
}

function deliveryDate() {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toLocaleDateString("en-CA", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function StepIndicator({ current }: { current: Step }) {
    const steps: { key: Step; label: string }[] = [
        { key: "shipping", label: "Shipping" },
        { key: "payment", label: "Payment" },
        { key: "confirmation", label: "Confirmation" },
    ];
    const order: Step[] = ["shipping", "payment", "confirmation"];
    const currentIdx = order.indexOf(current);

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0, mb: 6 }}>
            {steps.map((step, i) => {
                const idx = order.indexOf(step.key);
                const done = idx < currentIdx;
                const active = idx === currentIdx;
                return (
                    <Box key={step.key} sx={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                            <Box
                                sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: "1.5px solid",
                                    borderColor: done ? "#fff" : active ? "#fff" : "rgba(255,255,255,0.15)",
                                    bgcolor: done ? "#fff" : active ? "rgba(255,255,255,0.1)" : "transparent",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                {done ? (
                                    <TaskAltIcon sx={{ fontSize: 16, color: "#0a0c10" }} />
                                ) : (
                                    <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: active ? "#fff" : "rgba(255,255,255,0.25)" }}>
                                        {i + 1}
                                    </Typography>
                                )}
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: "0.7rem",
                                    fontWeight: active ? 700 : 500,
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    color: active ? "#fff" : done ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {step.label}
                            </Typography>
                        </Box>
                        {i < steps.length - 1 && (
                            <Box
                                sx={{
                                    flex: 1,
                                    height: "1px",
                                    mx: 2,
                                    mb: 3.5,
                                    bgcolor: done ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)",
                                    transition: "background-color 0.3s ease",
                                }}
                            />
                        )}
                    </Box>
                );
            })}
        </Box>
    );
}

function SectionLabel({ children }: { children: string }) {
    return (
        <Typography
            sx={{
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                mb: 2,
            }}
        >
            {children}
        </Typography>
    );
}

function PrimaryButton({ children, onClick, disabled }: { children: string; onClick?: () => void; disabled?: boolean }) {
    return (
        <Button
            fullWidth
            onClick={onClick}
            disabled={disabled}
            sx={{
                py: 1.5,
                borderRadius: 1.5,
                fontSize: "0.82rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                bgcolor: disabled ? "rgba(255,255,255,0.07)" : "#fff",
                color: disabled ? "rgba(255,255,255,0.2)" : "#0a0c10",
                transition: "background-color 0.2s, color 0.2s",
                "&:hover": { bgcolor: disabled ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.88)" },
                "&.Mui-disabled": { bgcolor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.2)" },
            }}
        >
            {children}
        </Button>
    );
}

function OrderSummary({ cartItems }: { cartItems: CartItem[] }) {
    const subtotal = cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
    const savings = cartItems.reduce((s, i) => s + ((i.product.originalPrice ?? i.product.price) - i.product.price) * i.quantity, 0);
    const shipping = 0;
    const total = subtotal + shipping;

    return (
        <Box sx={{ ...CARD_SX, position: { lg: "sticky" }, top: { lg: 88 } }}>
            <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", mb: 2.5 }}>
                Order Summary
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
                {cartItems.map(({ product, quantity }) => (
                    <Box key={product.id} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                        <Box
                            component="img"
                            src={product.image}
                            alt={product.name}
                            sx={{ width: 52, height: 52, borderRadius: 1, objectFit: "cover", flexShrink: 0, filter: "brightness(0.85)" }}
                        />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography sx={{ fontSize: "0.82rem", fontWeight: 600, color: "#fff", lineHeight: 1.3 }} noWrap>
                                {product.name}
                            </Typography>
                            <Typography sx={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>
                                {product.brand} · Qty {quantity}
                            </Typography>
                        </Box>
                        <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                            ${(product.price * quantity).toFixed(2)}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", mb: 2 }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)" }}>Subtotal</Typography>
                    <Typography sx={{ fontSize: "0.82rem", color: "#fff" }}>${subtotal.toFixed(2)}</Typography>
                </Box>
                {savings > 0 && (
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography sx={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)" }}>Savings</Typography>
                        <Typography sx={{ fontSize: "0.82rem", color: "#4ade80" }}>-${savings.toFixed(2)}</Typography>
                    </Box>
                )}
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)" }}>Shipping</Typography>
                    <Typography sx={{ fontSize: "0.82rem", color: "#4ade80" }}>Free</Typography>
                </Box>
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "#fff" }}>Total</Typography>
                <Typography sx={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>${total.toFixed(2)}</Typography>
            </Box>
        </Box>
    );
}

export default function Checkout({ cartItems }: CheckoutProps) {
    const [step, setStep] = useState<Step>("shipping");

    const [shipping, setShipping] = useState<ShippingForm>({
        firstName: "", lastName: "", email: "", phone: "",
        address: "", apt: "", city: "", province: "", postal: "",
    });
    const [shippingTouched, setShippingTouched] = useState<Partial<Record<keyof ShippingForm, boolean>>>({});

    const [payment, setPayment] = useState<PaymentForm>({
        cardName: "", cardNumber: "", expiry: "", cvv: "",
    });
    const [paymentTouched, setPaymentTouched] = useState<Partial<Record<keyof PaymentForm, boolean>>>({});

    const shippingErrors: Partial<Record<keyof ShippingForm, string>> = {
        firstName: !shipping.firstName ? "Required" : undefined,
        lastName: !shipping.lastName ? "Required" : undefined,
        email: !shipping.email ? "Required" : !isValidEmail(shipping.email) ? "Enter a valid email" : undefined,
        phone: !shipping.phone ? "Required" : !isValidPhone(shipping.phone) ? "Enter a valid phone number" : undefined,
        address: !shipping.address ? "Required" : undefined,
        city: !shipping.city ? "Required" : undefined,
        province: !shipping.province ? "Required" : undefined,
        postal: !shipping.postal ? "Required" : !isValidPostal(shipping.postal) ? "Enter a valid postal code" : undefined,
    };

    const paymentErrors: Partial<Record<keyof PaymentForm, string>> = {
        cardName: !payment.cardName ? "Required" : undefined,
        cardNumber: !payment.cardNumber ? "Required" : !isValidCard(payment.cardNumber) ? "Enter a valid 16-digit card number" : undefined,
        expiry: !payment.expiry ? "Required" : !isValidExpiry(payment.expiry) ? "Enter a valid expiry date" : undefined,
        cvv: !payment.cvv ? "Required" : !isValidCVV(payment.cvv) ? "Enter a valid CVV" : undefined,
    };

    const shippingValid = Object.values(shippingErrors).every((e) => !e);
    const paymentValid = Object.values(paymentErrors).every((e) => !e);

    function touchAllShipping() {
        setShippingTouched({ firstName: true, lastName: true, email: true, phone: true, address: true, city: true, province: true, postal: true });
    }
    function touchAllPayment() {
        setPaymentTouched({ cardName: true, cardNumber: true, expiry: true, cvv: true });
    }

    function updateShipping(field: keyof ShippingForm, value: string) {
        setShipping((p) => ({ ...p, [field]: value }));
    }
    function updatePayment(field: keyof PaymentForm, value: string) {
        setPayment((p) => ({ ...p, [field]: value }));
    }
    function touchShipping(field: keyof ShippingForm) {
        setShippingTouched((p) => ({ ...p, [field]: true }));
    }
    function touchPayment(field: keyof PaymentForm) {
        setPaymentTouched((p) => ({ ...p, [field]: true }));
    }

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.shiftKey && e.key === "F") {
                setShipping({
                    firstName: "Cameron",
                    lastName: "Labelle",
                    email: "cameron.labelle@uottawa.ca",
                    phone: "613-555-0192",
                    address: "75 Laurier Ave E",
                    apt: "404",
                    city: "Ottawa",
                    province: "Ontario",
                    postal: "K1N 6N5",
                });
                setShippingTouched({
                    firstName: true, lastName: true, email: true, phone: true,
                    address: true, city: true, province: true, postal: true,
                });
                setPayment({
                    cardName: "Cameron Labelle",
                    cardNumber: "4242 4242 4242 4242",
                    expiry: "08/27",
                    cvv: "737",
                });
                setPaymentTouched({ cardName: true, cardNumber: true, expiry: true, cvv: true });
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    function handleContinueToPayment() {
        touchAllShipping();
        if (shippingValid) setStep("payment");
    }
    function handlePlaceOrder() {
        touchAllPayment();
        if (paymentValid) setStep("confirmation");
    }

    function shippingField(field: keyof ShippingForm, label: string, props?: object) {
        const touched = shippingTouched[field];
        const error = shippingErrors[field];
        return (
            <TextField
                label={label}
                fullWidth
                value={shipping[field]}
                onChange={(e) => updateShipping(field, e.target.value)}
                onBlur={() => touchShipping(field)}
                error={!!(touched && error)}
                helperText={touched && error ? error : ""}
                sx={FIELD_SX}
                {...props}
            />
        );
    }

    const orderNumber = "ORD-" + Math.random().toString(36).slice(2, 9).toUpperCase();

    return (
        <Box sx={{ bgcolor: "#0a0c10", minHeight: "100vh", color: "#fff", px: { xs: 2, md: 5 }, py: 5 }}>
            <Typography sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 700, letterSpacing: "-0.02em", mb: 6 }}>
                Checkout
            </Typography>

            {step !== "confirmation" && <StepIndicator current={step} />}

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", lg: "row" },
                    gap: 4,
                    alignItems: "flex-start",
                }}
            >
                <Box sx={{ flex: 1, width: "100%" }}>

                    {step === "shipping" && (
                        <Box sx={CARD_SX}>
                            <SectionLabel>Contact</SectionLabel>
                            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mb: 4 }}>
                                {shippingField("firstName", "First name")}
                                {shippingField("lastName", "Last name")}
                                {shippingField("email", "Email address", { type: "email", sx: { ...FIELD_SX, gridColumn: { sm: "span 2" } } })}
                                {shippingField("phone", "Phone number", { type: "tel" })}
                            </Box>

                            <SectionLabel>Shipping Address</SectionLabel>
                            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
                                {shippingField("address", "Street address", { sx: { ...FIELD_SX, gridColumn: { sm: "span 2" } } })}
                                {shippingField("apt", "Apt / Suite (optional)")}
                                {shippingField("city", "City")}
                                <TextField
                                    select
                                    label="Province"
                                    fullWidth
                                    value={shipping.province}
                                    onChange={(e) => updateShipping("province", e.target.value)}
                                    onBlur={() => touchShipping("province")}
                                    error={!!(shippingTouched.province && shippingErrors.province)}
                                    helperText={shippingTouched.province && shippingErrors.province ? shippingErrors.province : ""}
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
                                                            maxHeight: 260,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    }}
                                >
                                    {CA_PROVINCES.map((p) => (
                                        <MenuItem key={p} value={p} sx={MENU_ITEM_SX}>{p}</MenuItem>
                                    ))}
                                </TextField>
                                {shippingField("postal", "Postal code")}
                            </Box>

                            <Box sx={{ mt: 4 }}>
                                <PrimaryButton onClick={handleContinueToPayment}>
                                    Continue to Payment
                                </PrimaryButton>
                            </Box>
                        </Box>
                    )}

                    {step === "payment" && (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            <Box
                                sx={{
                                    ...CARD_SX,
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    cursor: "pointer",
                                    "&:hover": { borderColor: "rgba(255,255,255,0.2)" },
                                }}
                                onClick={() => setStep("shipping")}
                            >
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                    <Box>
                                        <Typography sx={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", mb: 0.5 }}>
                                            Ship to
                                        </Typography>
                                        <Typography sx={{ fontSize: "0.88rem", color: "#fff" }}>
                                            {shipping.firstName} {shipping.lastName}
                                        </Typography>
                                        <Typography sx={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.45)" }}>
                                            {shipping.address}{shipping.apt ? `, ${shipping.apt}` : ""}, {shipping.city}, {shipping.province} {shipping.postal}
                                        </Typography>
                                    </Box>
                                    <Typography sx={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", "&:hover": { color: "#fff" }, textDecoration: "underline", cursor: "pointer", flexShrink: 0, ml: 2 }}>
                                        Edit
                                    </Typography>
                                </Box>
                            </Box>

                            <Box sx={CARD_SX}>
                                <SectionLabel>Payment Details</SectionLabel>

                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 1.5,
                                        mb: 3,
                                        p: 1.5,
                                        bgcolor: "rgba(255,255,255,0.03)",
                                        borderRadius: 1.5,
                                        border: "1px solid rgba(255,255,255,0.06)",
                                    }}
                                >
                                    {["VISA", "MC", "AMEX"].map((card) => (
                                        <Box
                                            key={card}
                                            sx={{
                                                px: 1.5,
                                                py: 0.5,
                                                border: "1px solid rgba(255,255,255,0.12)",
                                                borderRadius: 1,
                                                fontSize: "0.65rem",
                                                fontWeight: 800,
                                                letterSpacing: "0.08em",
                                                color: "rgba(255,255,255,0.5)",
                                            }}
                                        >
                                            {card}
                                        </Box>
                                    ))}
                                    <Typography sx={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", ml: "auto", alignSelf: "center" }}>
                                        SSL encrypted
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
                                    <TextField
                                        label="Name on card"
                                        fullWidth
                                        value={payment.cardName}
                                        onChange={(e) => updatePayment("cardName", e.target.value)}
                                        onBlur={() => touchPayment("cardName")}
                                        error={!!(paymentTouched.cardName && paymentErrors.cardName)}
                                        helperText={paymentTouched.cardName && paymentErrors.cardName ? paymentErrors.cardName : ""}
                                        sx={{ ...FIELD_SX, gridColumn: { sm: "span 2" } }}
                                    />
                                    <TextField
                                        label="Card number"
                                        fullWidth
                                        value={payment.cardNumber}
                                        onChange={(e) => updatePayment("cardNumber", formatCardNumber(e.target.value))}
                                        onBlur={() => touchPayment("cardNumber")}
                                        error={!!(paymentTouched.cardNumber && paymentErrors.cardNumber)}
                                        helperText={paymentTouched.cardNumber && paymentErrors.cardNumber ? paymentErrors.cardNumber : ""}
                                        placeholder="1234 5678 9012 3456"
                                        sx={{ ...FIELD_SX, gridColumn: { sm: "span 2" } }}
                                    />
                                    <TextField
                                        label="Expiry (MM/YY)"
                                        fullWidth
                                        value={payment.expiry}
                                        onChange={(e) => updatePayment("expiry", formatExpiry(e.target.value))}
                                        onBlur={() => touchPayment("expiry")}
                                        error={!!(paymentTouched.expiry && paymentErrors.expiry)}
                                        helperText={paymentTouched.expiry && paymentErrors.expiry ? paymentErrors.expiry : ""}
                                        placeholder="MM/YY"
                                        sx={FIELD_SX}
                                    />
                                    <TextField
                                        label="CVV"
                                        fullWidth
                                        value={payment.cvv}
                                        onChange={(e) => updatePayment("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                                        onBlur={() => touchPayment("cvv")}
                                        error={!!(paymentTouched.cvv && paymentErrors.cvv)}
                                        helperText={paymentTouched.cvv && paymentErrors.cvv ? paymentErrors.cvv : ""}
                                        placeholder="123"
                                        sx={FIELD_SX}
                                    />
                                </Box>

                                <Box sx={{ mt: 4 }}>
                                    <PrimaryButton onClick={handlePlaceOrder}>
                                        Place Order
                                    </PrimaryButton>
                                    <Typography sx={{ textAlign: "center", fontSize: "0.72rem", color: "rgba(255,255,255,0.25)", mt: 1.5 }}>
                                        By placing your order, you agree to our Terms of Service and Privacy Policy.
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    )}

                    {step === "confirmation" && (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            <Box
                                sx={{
                                    ...CARD_SX,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                    py: { xs: 5, md: 7 },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: "50%",
                                        bgcolor: alpha("#4ade80", 0.1),
                                        border: "1.5px solid rgba(74,222,128,0.3)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mb: 3,
                                    }}
                                >
                                    <TaskAltIcon sx={{ fontSize: 30, color: "#4ade80" }} />
                                </Box>

                                <Typography sx={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", mb: 1 }}>
                                    Order Confirmed
                                </Typography>
                                <Typography sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, fontWeight: 700, letterSpacing: "-0.02em", mb: 1 }}>
                                    Thank you, {shipping.firstName}.
                                </Typography>
                                <Typography sx={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.45)", mb: 3 }}>
                                    A confirmation has been sent to{" "}
                                    <Box component="span" sx={{ color: "rgba(255,255,255,0.75)" }}>{shipping.email}</Box>
                                </Typography>

                                <Box
                                    sx={{
                                        width: "100%",
                                        maxWidth: 400,
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 0,
                                        bgcolor: "rgba(255,255,255,0.03)",
                                        borderRadius: 2,
                                        border: "1px solid rgba(255,255,255,0.07)",
                                        overflow: "hidden",
                                        mb: 4,
                                    }}
                                >
                                    {[
                                        { label: "Order number", value: orderNumber },
                                        { label: "Ship to", value: `${shipping.address}, ${shipping.city}, ${shipping.province}` },
                                        { label: "Estimated delivery", value: deliveryDate() },
                                        { label: "Payment", value: `•••• •••• •••• ${payment.cardNumber.slice(-4)}` },
                                    ].map(({ label, value }, i, arr) => (
                                        <Box
                                            key={label}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "flex-start",
                                                gap: 2,
                                                px: 2.5,
                                                py: 1.75,
                                                borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                                            }}
                                        >
                                            <Typography sx={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", flexShrink: 0 }}>
                                                {label}
                                            </Typography>
                                            <Typography sx={{ fontSize: "0.78rem", color: "#fff", textAlign: "right" }}>
                                                {value}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>

                                <Button
                                    href="/"
                                    sx={{
                                        color: "rgba(255,255,255,0.5)",
                                        fontSize: "0.8rem",
                                        letterSpacing: "0.06em",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        "&:hover": { color: "#fff", bgcolor: "transparent" },
                                    }}
                                >
                                    Continue Shopping →
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>

                {step !== "confirmation" && (
                    <Box sx={{ width: { xs: "100%", lg: 340 }, flexShrink: 0 }}>
                        <OrderSummary cartItems={cartItems} />
                    </Box>
                )}
            </Box>
        </Box>
    );
}