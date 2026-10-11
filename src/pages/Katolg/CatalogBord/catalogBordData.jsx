const CatalogBordData = [
  { id: "bord-1", brand: "maz", model: "631228", length: 6200, grossWeight: 14.5, payload: 10500, image: "/1ouw17juj3x4xxuvknamzt2899qhwnio.jpg", available: true },
  { id: "bord-2", brand: "kamaz", model: "Compass 43085-33111", length: 4200, grossWeight: 8.2, payload: 5000, image: "/yfc8u97w1yotua7wzsc4cbdw47z435pf.jpg", available: true },
  { id: "bord-3", brand: "kamaz", model: "43082", length: 4800, grossWeight: 10.5, payload: 6400, image: "/gn597yzlxlu41xznmx860n1mgyj3mtbh.webp", available: true },
  { id: "bord-4", brand: "kamaz", model: "43089", length: 4800, grossWeight: 11.2, payload: 7000, image: "/rbn51mm2ik9bb2k8jmi6ljq134o1ej18.jpg", available: true },
  { id: "bord-5", brand: "jac", model: "N120L", length: 5200, grossWeight: 10.8, payload: 6800, image: "/oaq9hsvwl2tknt2i4f7xmgzzdhojxaog.jpg", available: true },
  { id: "bord-6", brand: "jac", model: "N90L", length: 4200, grossWeight: 8.7, payload: 5200, image: "/a2mmgjffovv3gs8yf8tago0meaz3piox.webp", available: true },
  { id: "bord-7", brand: "kamaz", model: "4308", length: 5500, grossWeight: 12.0, payload: 7400, image: "/tdvq2addgz3qptxfudtw3n02z65jbkrq.webp", available: true },
  { id: "bord-8", brand: "foton", model: "AUMARK BJ1128 (S120)", length: 4800, grossWeight: 10.4, payload: 6600, image: "/9r8pld1l9c89ng8qrur4ilp0rkgkrapt.webp", available: true },
  { id: "bord-9", brand: "foton", model: "AUMARK BJ1089", length: 4200, grossWeight: 9.6, payload: 5600, image: "/awjc3him09dcecaikclt982kwpv5tgld.webp", available: true },
  { id: "bord-10", brand: "faw", model: "1066 (Tiger V)", length: 4800, grossWeight: 9.9, payload: 5900, image: "/gwzjvf5s72pydn80jw88blx3z5ajnx7c.jpg", available: true },
  { id: "bord-11", brand: "dongfeng", model: "Z80N", length: 4200, grossWeight: 8.8, payload: 5400, image: "/hkiwqz60kw85k6dkw8nn2tu9b3icwupe.jpg", available: true },
  { id: "bord-12", brand: "daewoo", model: "NOVUS CC4CT", length: 6200, grossWeight: 14.1, payload: 9600, image: "/6a2gdi1rpxoza4vdijl3qgenukg9cshl.jpg", available: true },
  { id: "bord-13", brand: "daewoo", model: "NOVUS CC6CT", length: 7800, grossWeight: 15.6, payload: 10900, image: "/g91q0umoeiqoqzyaymdoaszfl079em2a.webp", available: true },
  { id: "bord-14", brand: "isuzu", model: "NMR85", length: 4200, grossWeight: 8.5, payload: 5100, image: "/0001.jpg", available: false },
  { id: "bord-15", brand: "isuzu", model: "FSR34", length: 6200, grossWeight: 13.2, payload: 8900, image: "/0002.jpg", available: false },
  { id: "bord-16", brand: "isuzu", model: "CYZ52", length: 8400, grossWeight: 16.8, payload: 11800, image: "/0004.jpg", available: false },
  { id: "bord-17", brand: "isuzu", model: "NPR75", length: 4800, grossWeight: 9.4, payload: 5600, image: "/0005.jpg", available: false },
  { id: "bord-18", brand: "hyundai", model: "EX8", length: 5200, grossWeight: 10.5, payload: 6200, image: "/0006.jpg", available: false },
  { id: "bord-19", brand: "hino", model: "300 Series", length: 5500, grossWeight: 11.1, payload: 6800, image: "/000.webp", available: false },
  { id: "bord-20", brand: "fuso", model: "Canter", length: 4200, grossWeight: 8.0, payload: 4700, image: "/000 (1).jpg", available: false },
  { id: "bord-21", brand: "maz", model: "6312C9", length: 7000, grossWeight: 15.2, payload: 10300, image: "/000.jpg", available: false },
];

export const bordBrands = [
  { value: "kamaz", labelKey: "brand_kamaz" },
  { value: "jac", labelKey: "brand_jac" },
  { value: "daewoo", labelKey: "brand_daewoo" },
  { value: "faw", labelKey: "brand_faw" },
  { value: "foton", labelKey: "brand_foton" },
  { value: "dongfeng", labelKey: "brand_dongfeng" },
  { value: "maz", labelKey: "brand_maz" },
  { value: "isuzu", labelKey: "brand_isuzu" },
  { value: "hyundai", labelKey: "brand_hyundai" },
  { value: "hino", labelKey: "brand_hino" },
  { value: "fuso", labelKey: "brand_fuso" },
];

export const bordLengths = [4200, "4500...7500", 4800, "5200...7400", "5500...7500", "6200...8400", "6200...7500", "6700...7400", 7000, 7800, 8400];

export default CatalogBordData;