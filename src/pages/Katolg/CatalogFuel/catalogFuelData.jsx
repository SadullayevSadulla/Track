import { swiperCardTrck } from "../../../object";

export const fuelBrands = [
    { value: "gaz", labelKey: "brand_gaz" },
    { value: "jac", labelKey: "brand_jac" },
    { value: "foton", labelKey: "brand_foton" },
    { value: "dongfeng", labelKey: "brand_dongfeng" },
    { value: "sollers", label: "SOLLERS" },
    { value: "yanshi", label: "YANSHI" },
    { value: "valday", labelKey: "brand_valday" },
];

export const fuelCategory = swiperCardTrck.find((item) => item.id === 1);

const fuelImage = "/grk2n4cf0hgaaz9mk9k5i2ks17furqri.png";

const CatalogFuelData = [
    {
        id: "fuel-1",
        titleKey: "menu_cat_fuel_truck",
        brand: "gaz",
        image: "./atz_sadko_nex_novii.jpg",
        priceType: "request",
    },
    {
        id: "fuel-2",
        titleKey: "menu_cat_fuel_truck",
        brand: "jac",
        image: "./xjoz3ut3ry17vv6gm8bfenuqfkjrkctl.webp",
        priceType: "request",
    },
    {
        id: "fuel-3",
        titleKey: "menu_cat_fuel_truck",
        brand: "foton",
        image: "./valdai18_atz.png",
        priceType: "request",
    },
    {
        id: "fuel-4",
        titleKey: "menu_cat_fuel_truck",
        brand: "dongfeng",
        image: "./0nftbqwa84hv46s2ygz14mf8dfm6vub0.jpg",
        priceType: "request",
    },
    {
        id: "fuel-5",
        titleKey: "menu_cat_fuel_truck",
        brand: "dongfeng",
        image: "./001.jpg",
        priceType: "request",
    },
    {
        id: "fuel-6",
        titleKey: "menu_cat_fuel_truck",
        brand: "dongfeng",
        image: "./000 (1).jpg",
        priceType: "request",
    },
    {
        id: "fuel-7",
        titleKey: "menu_cat_fuel_truck",
        brand: "dongfeng",
        image: "./ATZ_sollers_tr180.jpg",
        priceType: "request",
    },
    {
        id: "fuel-8",
        titleKey: "menu_cat_fuel_truck",
        brand: "dongfeng",
        image: "./xc7izn5d1d8irusswgkzu1ri2ztxoily.jpg",
        priceType: "request",
    },
    {
        id: "fuel-9",
        titleKey: "menu_cat_fuel_truck",
        brand: "dongfeng",
        image: "./y7drfgmvz4nu8v9lkktt6fycncsdk2s0.jpg",
        priceType: "request",
    },
];

export const fuelRangeLimits = {
    price: { min: 0, max: 20000000, step: 100000 },
    volume: { min: 0, max: 20000, step: 100 },
};

export default CatalogFuelData;