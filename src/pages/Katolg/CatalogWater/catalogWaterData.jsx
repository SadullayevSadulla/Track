const CatalogWaterData = [
  { id: "water-1", titleKey: "water_product_1", brand: "kamaz", type: "food", volume: 6000, image: "/4l3kyxp81p11tzrl9y3bdilnajfdev9l.jpeg", available: true },
  { id: "water-2", titleKey: "water_product_2", brand: "gaz", type: "food", volume: 4200, image: "/ac3xynucj7rym2m9ro5p6siaw61168yb.webp", available: true },
  { id: "water-3", titleKey: "water_product_3", brand: "jac", type: "food", volume: 5000, image: "/jf2h4fii7f5ml8axfrtxrk6yan98j6vu.jpg", available: true },
  { id: "water-4", titleKey: "water_product_4", brand: "gaz", type: "vacuum", volume: 4000, image: "/vahf6fylor51ytm994follmdp2ueicnp.jpg", available: true },
  { id: "water-5", titleKey: "water_product_5", brand: "jac", type: "vacuum", volume: 5000, image: "/81ify3p9ueg7yem0mx1ylhukgd929npr.webp", available: true },
  { id: "water-6", titleKey: "water_product_6", brand: "gaz", type: "food", volume: 4200, image: "/0nftbqwa84hv46s2ygz14mf8dfm6vub0.jpg", available: false },
  { id: "water-7", titleKey: "water_product_7", brand: "kamaz", type: "food", volume: 8000, image: "/001.jpg", available: true },
  { id: "water-8", titleKey: "water_product_8", brand: "gaz", type: "vacuum", volume: 4000, image: "/000.jpg", available: false },
];

export const waterBrands = [
  { value: "gaz", labelKey: "brand_gaz" },
  { value: "kamaz", labelKey: "brand_kamaz" },
  { value: "jac", labelKey: "brand_jac" },
];

export const waterTypes = [
  { value: "vacuum", labelKey: "water_type_vacuum" },
  { value: "food", labelKey: "water_type_food" },
];

export const waterVolumeLimits = { min: 0, max: 20000, step: 100 };

export default CatalogWaterData;
