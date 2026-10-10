import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../i18n/LanguageContext";
const LABEL_KEYS = {
  "/catalog": "catalog",
  "/catalog/shtornye-avtomobili": "menu_cat_curtain",
  "/catalog/kran-manipulyatory": "menu_cat_crane",
  "/catalog/toplivovozy": "menu_cat_fuel_truck",
  "/catalog/avtomobilnye-masterskie": "menu_cat_lift",
  "/catalog/vodovozy": "menu_cat_tank",
  "/catalog/evakuatory": "menu_cat_tow",
  "/catalog/bortovye-avtomobili": "menu_cat_flatbed",
  "/catalog/furgony": "menu_cat_isotherm",
  "/catalog/konteynerovozy": "menu_cat_container",
  "/catalog/il": "menu_cat_hook_loader",
  "/catalog/gruzoviki": "menu_cat_dump",
  "/catalog/dopolnitelnoe-oborudovanie": "menu_cat_adr",
  "/search": "search_results_title",
  "/service": "crumb_services",
  "/repair": "repair",
  "/news": "news",
  "/contacts": "contacts",
  "/onac": "about_us",
  "/information": "crumb_information",
  "/mainNewsCard": "news",
  "/foto": "crumb_photo",
  "/vido": "menu_media_video",
  "/reklama": "crumb_ads",
  "/hamkor": "hamkor_page_title",
  "/certeficat": "crumb_certificate",
  "/vaqansiya": "vacancy_page_title",
  "/kredit": "crumb_credit",
  "/production": "crumb_production",
  "/favorit": "footer_link_favorites",
  "/otzyvy": "menu_about_reviews",
  "/cart": "crumb_cart",
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
  const { t } = useLanguage();

  if (location.pathname === "/") {
    return null;
  }

  const getLabel = (path, decodedPath, decodedSegment) => {
    const key = LABEL_KEYS[path] || LABEL_KEYS[decodedPath];
    return key ? t(key) : formatLabel(decodedSegment);
  };

  const segments = location.pathname.split("/").filter(Boolean);
  const decodedSegments = segments.map((segment) => decodeSegment(segment));

  return (
    <nav aria-label={t("crumb_aria_label")} className="container mb-6 mt-6 text-sm text-gray-500">
      <div className="flex flex-wrap items-center gap-2">
        <Link to="/" className="hover:text-yellow-600 transition">
          {t("crumb_home")}
        </Link>

        {segments.map((segment, index) => {
          const path = `/${segments.slice(0, index + 1).join("/")}`;
          const decodedPath = `/${decodedSegments.slice(0, index + 1).join("/")}`;
          const decodedSegment = decodeSegment(segment);
          const label = getLabel(path, decodedPath, decodedSegment);
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