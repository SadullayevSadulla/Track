import { Link } from "react-router-dom";
import { swiperCardTrck } from "../../../object";
import { useLanguage } from "../../../i18n/LanguageContext";

const categoryRoutes = {
  1: "/catalog/toplivovozy",
  2: "/catalog/avtomobilnye-masterskie",
  3: "/catalog/vodovozy",
  4: "/catalog/evakuatory",
  5: "/catalog/furgony",
  6: "/catalog/konteynerovozy",
  7: "/catalog/il",
  8: "/catalog/gruzoviki",
  9: "/catalog/dopolnitelnoe-oborudovanie",
  10: "/katolg",
  11: "/catalog/kran-manipulyatory",
};

const getImagePath = (image) => {
  if (!image) return "";

  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("data:") ||
    image.startsWith("/")
  ) {
    return image;
  }

  return `/${image.replace(/^\.?\//, "")}`;
};

const CatalogPage = () => {
  const { lang } = useLanguage();

  return (
    <section className="pt-4 mb-20">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 border-l border-t border-gray-200">
          {(swiperCardTrck || []).map((item) => {
            const title =
              item.title?.[lang] ||
              item.title?.ru ||
              item.title ||
              "";

            return (
              <Link
                key={item.id}
                to={categoryRoutes[item.id] || "/katolg"}
                className="border-r border-b border-gray-200 flex flex-col items-start p-4 hover:bg-gray-50 transition duration-200 group"
              >
                <p className="font-semibold text-[15px] mb-0.5 group-hover:text-yellow transition duration-200">
                  {title}
                </p>

                <p className="text-sm text-gray-400 mb-3">
                  {item.quantity}
                </p>

                <div className="w-full flex justify-center items-center">
                  {item.img ? (
                    <img
                      src={getImagePath(item.img)}
                      alt={title || "Transport"}
                      className="h-36 w-full object-contain group-hover:scale-105 transition duration-300"
                      loading="lazy"
                      onError={(event) => {
                        console.error(
                          "Rasm yuklanmadi:",
                          event.currentTarget.src
                        );
                      }}
                    />
                  ) : (
                    <div className="h-36 flex items-center text-sm text-gray-400">
                      Rasm mavjud emas
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CatalogPage;
