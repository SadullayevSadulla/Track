const CatalogEvkratorData = [
  {
    id: "evkrator-1",
    titleKey: "evkrator_product_1",
    brand: "kamaz",
    platformType: "straight",
    wheelFormula: "4x2",
    platformLength: 4600,
    image: "/000 (1).webp",
    available: true,
    priceType: "request",
  },
  {
    id: "evkrator-2",
    titleKey: "evkrator_product_2",
    brand: "isuzu",
    platformType: "straight",
    wheelFormula: "4x2",
    platformLength: 4600,
    image: "/000 (2).webp",
    available: false,
    priceType: "request",
  },
];

export const evkratorBrands = [
  { value: "kamaz", labelKey: "brand_kamaz" },
];

export const evkratorPlatformTypes = [
  { value: "straight", labelKey: "evkrator_platform_straight" },
];

export const evkratorWheelFormulas = ["4x2"];
export const evkratorPlatformLengths = [4600];

export default CatalogEvkratorData;
