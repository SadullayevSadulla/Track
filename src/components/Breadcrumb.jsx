import { Link, useLocation } from "react-router-dom";

const LABELS = {
  "/": "Главная",
  "/catalog": "Каталог",
  "/CatalogPage": "CatalogPage",
  "/CatalogKran": "Краны-манипуляторы",
  "/CatalogFuel": "Автотопливозаправщики",
  "/CatalogAwp": "Автогидроподъёмники",
  "/CatalogWater": "Автоцистерны",
  "/CatalogEvkrator": "Автоэвакуаторы",
  "/CatalogBord": "Бортовые автомобили",
  "/CatalogFurgon": "Изотермические фургоны",
  "/CatalogCanto": "Контейнеровозы",
  "/service": "Услуги",
  "/repair": "Ремонт",
  "/news": "Новости",
  "/contacts": "Контакты",
  "/onac": "О нас",
  "/information": "Информация",
  "/foto": "Фото",
  "/vido": "Видео",
  "/reklama": "Реклама",
  "/hamkor": "Партнеры",
  "/certeficat": "Сертификат",
  "/vaqansiya": "Вакансии",
  "/kredit": "Кредит",
  "/production": "Продукция",
  "/favorit": "Избранное",
  "/Отзывы": "Отзывы",
  "/otqaz": "Отказ",
  "/cart": "Корзина",
};

const decodeSegment = (segment) => {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
};

const formatLabel = (segment) => {
  const normalized = segment.replace(/-/g, " ");

  if (/^[A-Z]/.test(normalized)) {
    return normalized;
  }

  return normalized
    .split(" ")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
};

export default function Breadcrumb() {
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  const segments = location.pathname.split("/").filter(Boolean);
  const decodedSegments = segments.map((segment) => decodeSegment(segment));

  return (
    <nav aria-label="Breadcrumb" className="container mb-6 mt-6 text-sm text-gray-500">
      <div className="flex flex-wrap items-center gap-2">
        <Link to="/" className="hover:text-yellow-600 transition">
          {LABELS["/"]}
        </Link>

        {segments.map((segment, index) => {
          const path = `/${segments.slice(0, index + 1).join("/")}`;
          const decodedPath = `/${decodedSegments.slice(0, index + 1).join("/")}`;
          const decodedSegment = decodeSegment(segment);
          const label = LABELS[path] || LABELS[decodedPath] || formatLabel(decodedSegment);
          const isLast = index === segments.length - 1;

          return (
            <div key={path} className="flex items-center gap-2">
              <span>/</span>
              {isLast ? (
                <span className="text-gray-700">{label}</span>
              ) : (
                <Link to={decodedPath} className="hover:text-yellow-600 transition">
                  {label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
