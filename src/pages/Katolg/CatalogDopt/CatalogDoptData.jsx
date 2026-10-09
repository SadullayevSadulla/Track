const CatalogDoptData = [
  { id: "dopt-1", brand: "kamaz", title: "Шторный грузовик КАМАЗ 4308 ДОПОГ EXII (модель 4388H2-10)", platformType: "168", mass: "до 12", wheelFormula: "4x2", length: "6,2", image: "/000 (2).jpg", available: true },
  { id: "dopt-2", brand: "kamaz", title: "Бортовой автомобиль КАМАЗ 4308-3083-69, ДОПОГ категория EXII", platformType: "168", mass: "до 12", wheelFormula: "4x2", length: "6,2", image: "/e7ekebenv5zkdn2lb85ymgp3dp9u51dc.webp", available: true },
  { id: "dopt-3", brand: "jac", title: "Кран-манипулятор JAC N200L с КМУ ИНМАН ИМ150N, ДОПОГ EXII", platformType: "168", mass: "до 12", wheelFormula: "4x2", length: "5,2...6,2", image: "/000 (3).jpg", available: true },
  { id: "dopt-4", brand: "daewoo", title: "Кран-манипулятор DAEWOO CL8CF С КМУ PALFINGER PK 8500, ДОПОГ EXII", platformType: "168", mass: "до 20", wheelFormula: "6x4", length: "8,2", image: "/1gn8kxwfpjy40x1fe52a3jc06kxkq8ic.jpg", available: true },
];

export const doptBrands = [
  { value: "kamaz", label: "КАМАЗ" },
  { value: "jac", label: "JAC" },
  { value: "daewoo", label: "DAEWOO" },
];

export const doptPlatformTypes = ["168"];
export const doptMasses = ["до 12", "до 20"];
export const doptWheelFormulas = ["4x2", "6x4"];
export const doptLengths = ["5,2...6,2", "6,2", "6,6", "8,2"];

export default CatalogDoptData;