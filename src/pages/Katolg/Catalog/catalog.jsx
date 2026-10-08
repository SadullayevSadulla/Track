import { Link } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb";
import { swiperCardTrck } from "../../../object";
import { useLanguage } from "../../../i18n/LanguageContext";

const CatalogPage = () => {
  const { lang } = useLanguage();
  const slugs = [
    "avtotoplivozapravshchiki",
    "avtogidropodyemniki",
    "avtotsisterny",
    "avtoevakuatory",
    "avtofurgony",
    "konteynerovozy",
    "kryukovye-pogruzchiki",
    "samosvaly",
    "avtomobili-dopog-exii",
    "shtornye-avtomobili",
    "krany-manipulyatory",
  ];

  const items = (swiperCardTrck || []).map((item, i) => ({
    ...item,
    slug: slugs[i] || `category-${item.id}`,
  }));

  return (
    <section className="pt-4 mb-20">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 border-l border-t border-gray-200">
          {items.map((item) => (
            <Link
              key={item.id}
              to={item.id === 1 ? "/CatalogFuel" : item.id === 2 ? "/CatalogAwp" : item.id === 3 ? "/CatalogWater" : item.id === 4 ? "/CatalogEvkrator" : item.id === 5 ? "/CatalogFurgon" : item.id === 7 ? "/CatalogIL" : item.id === 11 ? "/CatalogKran" : "/katolg"}
              className="border-r border-b border-gray-200 flex flex-col items-start p-4 hover:bg-gray-50 transition duration-200 group"
            >
              <p className="font-semibold text-[15px] mb-0.5 group-hover:text-yellow transition duration-200">
                {item.title?.[lang] || item.title?.ru || item.title}
              </p>
              <p className="text-sm text-gray-400 mb-3">{item.quantity}</p>
              <div className="w-full flex justify-center">
                <img
                  src={item.img}
                  alt={item.title?.[lang] || item.title?.ru || item.title}
                  className="h-36 object-contain group-hover:scale-105 transition duration-300"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CatalogPage;