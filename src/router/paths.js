export const PATHS = {
    home: "/",
    catalog: "/catalog",
    search: "/search",
    reviews: "/otzyvy",
    production: "/production",
    information: "/information",
};

export const CATEGORY_PATHS = {
    curtain: "/catalog/shtornye-avtomobili",
    crane: "/catalog/kran-manipulyatory",
    fuel_truck: "/catalog/toplivovozy",
    lift: "/catalog/avtomobilnye-masterskie",
    tank: "/catalog/vodovozy",
    tow: "/catalog/evakuatory",
    flatbed: "/catalog/bortovye-avtomobili",
    isotherm: "/catalog/furgony",
    container: "/catalog/konteynerovozy",
    hook_loader: "/catalog/il",
    dump: "/catalog/gruzoviki",
    adr: "/catalog/dopolnitelnoe-oborudovanie",
};

export const CATEGORY_ROUTE_BY_ID = {
    1: CATEGORY_PATHS.fuel_truck,
    2: CATEGORY_PATHS.lift,
    3: CATEGORY_PATHS.tank,
    4: CATEGORY_PATHS.tow,
    5: CATEGORY_PATHS.isotherm,
    6: CATEGORY_PATHS.container,
    7: CATEGORY_PATHS.hook_loader,
    8: CATEGORY_PATHS.dump,
    9: CATEGORY_PATHS.adr,
    10: CATEGORY_PATHS.curtain,
    11: CATEGORY_PATHS.crane,
};