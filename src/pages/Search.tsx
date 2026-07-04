import { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useSearchParams} from "react-router-dom";
import {MOCK_PRODUCTS} from "../data/products";
import type { Product } from "../data/products";
import ProductCard from "../components/ProductCard";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";

const FACET_PANEL_BG = "rgba(255,255,255,0.03)";
const FACET_BORDER = "rgba(255,255,255,0.07)";

function unique<T>(arr: T[]): T[] {
    return Array.from(new Set(arr));
}



function getTrigrams(str: string): Set<string> {
    const s = str.toLowerCase().replace(/\s+/g, " ").trim();
    const trigrams = new Set<string>();
    for (let i = 0; i < s.length - 2; i++) {
        trigrams.add(s.slice(i, i + 3));
    }
    return trigrams;
}

function trigramSimilarity(a: string, b: string): number {
    const ta = getTrigrams(a);
    const tb = getTrigrams(b);
    if (ta.size === 0 || tb.size === 0) return 0;
    let overlap = 0;
    ta.forEach((t) => { if (tb.has(t)) overlap++; });
    return (2 * overlap) / (ta.size + tb.size);
}

const SIMILARITY_THRESHOLD = 0.1;

function matchesSearch(product: Product, query: string): boolean {
    if (!query.trim()) return true;
    const target = `${product.name} ${product.subtitle} ${product.brand} ${product.type}`;
    return trigramSimilarity(target, query) >= SIMILARITY_THRESHOLD;
}

const accordionSx = {
    bgcolor: "transparent",
    backgroundImage: "none",
    boxShadow: "none",
    borderBottom: `1px solid ${FACET_BORDER}`,
    "&:before": { display: "none" },
    "&.Mui-expanded": { margin: 0 },
};

const accordionSummarySx = {
    px: 0,
    minHeight: 48,
    "& .MuiAccordionSummary-content": { my: 1.5 },
};

interface CheckFacetProps {
    label: string;
    options: string[];
    selected: string[];
    onChange: (val: string[]) => void;
}

function CheckFacet({ label, options, selected, onChange }: CheckFacetProps) {
    const toggle = (opt: string) =>
        onChange(selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt]);

    return (
        <Accordion defaultExpanded disableGutters sx={accordionSx}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "rgba(255,255,255,0.4)", fontSize: 18 }} />} sx={accordionSummarySx}>
                <Typography sx={{ fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
                    {label}
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pt: 0, pb: 2 }}>
                {options.map((opt) => (
                    <FormControlLabel
                        key={opt}
                        control={
                            <Checkbox
                                checked={selected.includes(opt)}
                                onChange={() => toggle(opt)}
                                size="small"
                                sx={{
                                    color: "rgba(255,255,255,0.2)",
                                    "&.Mui-checked": { color: "#fff" },
                                    p: 0.75,
                                }}
                            />
                        }
                        label={
                            <Typography sx={{ fontSize: "0.85rem", color: selected.includes(opt) ? "#fff" : "rgba(255,255,255,0.55)" }}>
                                {opt}
                            </Typography>
                        }
                        sx={{ display: "flex", mx: 0, mb: 0.25 }}
                    />
                ))}
            </AccordionDetails>
        </Accordion>
    );
}

export default function SearchPage({onAddToCart}: {onAddToCart: (product: Product) => void} ) {
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("q") ?? "";
    const allBrands = useMemo(() => unique(MOCK_PRODUCTS.map((p) => p.brand)).sort(), []);
    const allCategories = useMemo(() => unique(MOCK_PRODUCTS.map((p) => p.category)).sort(), []);
    const allTypes = useMemo(() => unique(MOCK_PRODUCTS.map((p) => p.type)).sort(), []);
    const allLevels: Product["level"][] = ["Beginner", "Intermediate", "Advanced", "Pro"];
    const allGenders: Product["gender"][] = ["Men", "Women", "Unisex"];

    const [brands, setBrands] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [types, setTypes] = useState<string[]>([]);
    const [levels, setLevels] = useState<string[]>([]);
    const [genders, setGenders] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 900]);
    const [inStockOnly, setInStockOnly] = useState(false);

    const filtered = useMemo(() => {
        return MOCK_PRODUCTS.filter((p) => {
            if (brands.length && !brands.includes(p.brand)) return false;
            if (categories.length && !categories.includes(p.category)) return false;
            if (types.length && !types.includes(p.type)) return false;
            if (levels.length && !levels.includes(p.level)) return false;
            if (genders.length && !genders.includes(p.gender)) return false;
            if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
            if (inStockOnly && !p.inStock) return false;
            if (searchQuery && !matchesSearch(p, searchQuery)) return false;
            return true;
        });
    }, [brands, categories, types, levels, genders, priceRange, inStockOnly, searchQuery]);

    const clearAll = () => {
        setBrands([]);
        setCategories([]);
        setTypes([]);
        setLevels([]);
        setGenders([]);
        setPriceRange([0, 900]);
        setInStockOnly(false);
    };

    const hasFilters =
        brands.length || categories.length || types.length || levels.length ||
        genders.length || inStockOnly || priceRange[0] > 0 || priceRange[1] < 900;

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const filterPanelContent = (
        <>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                    Filters
                </Typography>
                {hasFilters && (
                    <Button onClick={clearAll} sx={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", p: 0, minWidth: 0, textTransform: "none", "&:hover": { color: "#fff", bgcolor: "transparent" } }}>
                        Clear all
                    </Button>
                )}
            </Box>

            <Accordion defaultExpanded disableGutters sx={accordionSx}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "rgba(255,255,255,0.4)", fontSize: 18 }} />} sx={accordionSummarySx}>
                    <Typography sx={{ fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
                        Price Range
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0, pt: 0, pb: 2 }}>
                    <Slider
                        value={priceRange}
                        onChange={(_, v) => setPriceRange(v as [number, number])}
                        min={0}
                        max={900}
                        step={10}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(v) => `$${v}`}
                        sx={{
                            color: "#fff",
                            "& .MuiSlider-thumb": { bgcolor: "#fff", width: 14, height: 14 },
                            "& .MuiSlider-track": { bgcolor: "#fff", border: "none" },
                            "& .MuiSlider-rail": { bgcolor: "rgba(255,255,255,0.15)" },
                            "& .MuiSlider-valueLabel": { bgcolor: "rgba(30,32,40,0.95)", fontSize: "0.72rem" },
                        }}
                    />
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.5 }}>
                        <Typography sx={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>${priceRange[0]}</Typography>
                        <Typography sx={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)" }}>${priceRange[1]}</Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded disableGutters sx={accordionSx}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "rgba(255,255,255,0.4)", fontSize: 18 }} />} sx={accordionSummarySx}>
                    <Typography sx={{ fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
                        Availability
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0, pt: 0, pb: 1 }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={inStockOnly}
                                onChange={(e) => setInStockOnly(e.target.checked)}
                                size="small"
                                sx={{
                                    "& .MuiSwitch-switchBase.Mui-checked": { color: "#fff" },
                                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: "rgba(255,255,255,0.5)" },
                                    "& .MuiSwitch-track": { bgcolor: "rgba(255,255,255,0.15)" },
                                }}
                            />
                        }
                        label={<Typography sx={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)" }}>In stock only</Typography>}
                        labelPlacement="end"
                        sx={{ mx: 0, justifyContent: "flex-start" }}
                    />
                </AccordionDetails>
            </Accordion>

            <CheckFacet label="Category" options={allCategories} selected={categories} onChange={setCategories} />
            <CheckFacet label="Type" options={allTypes} selected={types} onChange={setTypes} />
            <CheckFacet label="Brand" options={allBrands} selected={brands} onChange={setBrands} />
            <CheckFacet label="Skill Level" options={allLevels} selected={levels} onChange={setLevels} />
            <CheckFacet label="Gender" options={allGenders} selected={genders} onChange={setGenders} />
        </>
    );

    return (
        <Box sx={{ bgcolor: "#0a0c10", minHeight: "100vh", color: "#fff", display: "flex", flexDirection: "column" }}>

            <Stack direction="row" spacing={1.5} sx={{ px: { xs: 2, md: 5 }, py: 2, borderBottom: `1px solid ${FACET_BORDER}`, alignItems: "center", justifyContent: "center" }}>
                {searchQuery ? <><Typography sx={{
                    fontSize: "0.72rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)"
                }}>
                    Search Results
                </Typography>
                    <Typography sx={{color: "rgba(255,255,255,0.2)"}}>•</Typography>
            <Typography sx={{fontSize: {xs: "1.5rem", md: "2rem"}, fontWeight: 700, letterSpacing: "-0.02em"}}>
                "{searchQuery}"
            </Typography>
            <Typography sx={{color: "rgba(255,255,255,0.2)"}}>•</Typography></> : <></>}
                <Typography sx={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
                    {filtered.length} {filtered.length === 1 ? "result" : "results"}
                </Typography>

                <Button
                    onClick={() => setMobileFiltersOpen(true)}
                    startIcon={<FilterListIcon sx={{ fontSize: 18 }} />}
                    sx={{
                        display: { xs: "flex", md: "none" },
                        ml: "auto",
                        fontSize: "0.78rem",
                        color: hasFilters ? "#fff" : "rgba(255,255,255,0.55)",
                        borderColor: "rgba(255,255,255,0.2)",
                        textTransform: "none",
                    }}
                    variant="outlined"
                    size="small"
                >
                    Filters{hasFilters ? ` (${[brands.length, categories.length, types.length, levels.length, genders.length].reduce((a, b) => a + b, 0) + (inStockOnly ? 1 : 0)})` : ""}
                </Button>
            </Stack>

            <Box sx={{ display: "flex", flex: 1, minHeight: 0 }}>

                <Box
                    component="aside"
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        display: { xs: "none", md: "flex" },
                        flexDirection: "column",
                        borderRight: `1px solid ${FACET_BORDER}`,
                        bgcolor: FACET_PANEL_BG,
                        px: 3,
                        py: 3,
                        overflowY: "auto",
                        position: "sticky",
                        top: 64,
                        height: "calc(100vh - 64px - 97px)",
                    }}
                >
                    {filterPanelContent}
                </Box>

                <Box
                    sx={{
                        flex: 1,
                        overflowY: "auto",
                        px: { xs: 2, md: 4 },
                        py: 4,
                    }}
                >
                    {filtered.length === 0 ? (
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 300, gap: 2 }}>
                            <Typography sx={{ fontSize: "1.1rem", fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>No results match your filters</Typography>
                            <Button onClick={clearAll} variant="outlined" sx={{ color: "#fff", borderColor: "rgba(255,255,255,0.2)", "&:hover": { borderColor: "#fff", bgcolor: "transparent" }, textTransform: "none", fontSize: "0.85rem" }}>
                                Clear filters
                            </Button>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    sm: "repeat(2, 1fr)",
                                    lg: "repeat(3, 1fr)",
                                    xl: "repeat(4, 1fr)",
                                },
                                gap: 2.5,
                            }}
                        >
                            {filtered.map((product) => (
                                <ProductCard product={product} onAddToCart={onAddToCart} />
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>
            <Drawer
                anchor="left"
                open={mobileFiltersOpen}
                onClose={() => setMobileFiltersOpen(false)}
                sx={{ display: { xs: "block", md: "none" } }}
                slotProps={{
                    paper: {
                        sx: {
                            width: 280,
                            bgcolor: "#0a0c10",
                            color: "#fff",
                            px: 3,
                            py: 3,
                        },
                    },
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                        Filters
                    </Typography>
                    <IconButton onClick={() => setMobileFiltersOpen(false)} size="small" sx={{ color: "rgba(255,255,255,0.6)" }}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>
                {filterPanelContent}
            </Drawer>
        </Box>
    );
}