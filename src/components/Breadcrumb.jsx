import { Link, useLocation } from "react-router-dom";

const LABELS = {
  "/": "Главная",
  "/catalog": "Каталог",
  "/CatalogPage": "CatalogPage",
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
  "/otqaz": "Отказ",
  "/cart": "Корзина",
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

  return (
    <nav aria-label="Breadcrumb" className="container mb-6 mt-6 text-sm text-gray-500">
      <div className="flex flex-wrap items-center gap-2">
        <Link to="/" className="hover:text-yellow-600 transition">
          {LABELS["/"]}
        </Link>

        {segments.map((segment, index) => {
          const path = `/${segments.slice(0, index + 1).join("/")}`;
          const label = LABELS[path] || formatLabel(segment);
          const isLast = index === segments.length - 1;

          return (
            <div key={path} className="flex items-center gap-2">
              <span>/</span>
              {isLast ? (
                <span className="text-gray-700">{label}</span>
              ) : (
                <Link to={path} className="hover:text-yellow-600 transition">
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
