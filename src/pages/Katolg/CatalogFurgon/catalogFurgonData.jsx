const CatalogFurgonData = [
  { id: "furgon-1", brand: "kamaz", model: "4308", length: 6200, image: "/1ouw17juj3x4xxuvknamzt2899qhwnio.jpg", available: true },
  { id: "furgon-2", brand: "kamaz", model: "43082", length: 5200, image: "/yfc8u97w1yotua7wzsc4cbdw47z435pf.jpg", available: true },
  { id: "furgon-3", brand: "kamaz", model: "43089", length: 4800, image: "/gn597yzlxlu41xznmx860n1mgyj3mtbh.webp", available: true },
  { id: "furgon-4", brand: "shacman", model: "X3000", length: 6200, image: "/rbn51mm2ik9bb2k8jmi6ljq134o1ej18.jpg", available: true },
  { id: "furgon-5", brand: "jac", model: "N90", length: 4200, image: "/oaq9hsvwl2tknt2i4f7xmgzzdhojxaog.jpg", available: true },
  { id: "furgon-6", brand: "daewoo", model: "CL7AF", length: 7800, image: "/6a2gdi1rpxoza4vdijl3qgenukg9cshl.jpg", available: true },
  { id: "furgon-7", brand: "faw", model: "CA3250", length: 6200, image: "/0001.jpg", available: true },
  { id: "furgon-8", brand: "dongfeng", model: "120L", length: 5200, image: "/0006.jpg", available: true },
  { id: "furgon-9", brand: "hino", model: "300", length: 5500, image: "/000.webp", available: false },
  { id: "furgon-10", brand: "fuso", model: "Canter", length: 4800, image: "/000 (1).jpg", available: false },
  { id: "furgon-11", brand: "isuzu", model: "NMR85", length: 4200, image: "/0002.jpg", available: false },
  { id: "furgon-12", brand: "hyundai", model: "EX8", length: 5200, image: "/0003.jpg", available: false },
  { id: "furgon-13", brand: "kamaz", model: "4308", length: 6200, image: "/0004.jpg", available: true },
  { id: "furgon-14", brand: "jac", model: "N120L", length: 4200, image: "/0005.jpg", available: true },
  { id: "furgon-15", brand: "dongfeng", model: "120L", length: 5200, image: "/0007.jpg", available: true },
  { id: "furgon-16", brand: "shacman", model: "X3000", length: 6200, image: "/0008.jpg", available: true },
];

export const furgonBrands = [
  { value: "kamaz", labelKey: "brand_kamaz" },
  { value: "jac", labelKey: "brand_jac" },
  { value: "daewoo", labelKey: "brand_daewoo" },
  { value: "faw", labelKey: "brand_faw" },
  { value: "dongfeng", labelKey: "brand_dongfeng" },
  { value: "shacman", labelKey: "brand_shacman" },
  { value: "isuzu", labelKey: "brand_isuzu" },
  { value: "hyundai", labelKey: "brand_hyundai" },
  { value: "hino", labelKey: "brand_hino" },
  { value: "fuso", labelKey: "brand_fuso" },
];

export const furgonLengths = [4200, 4800, 5200, 6200, 7000, 7800, "4200...6200", "5200...7800"];

export default CatalogFurgonData;
