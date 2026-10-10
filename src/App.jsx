import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { router, redirects } from "./router/routes";
import NotFound from "./pages/NotFound/notFound";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import MainZapros from "./components/MainZapros/mainZapros";
import Preloader from "./components/Preloader/Preloader";
import Breadcrumb from "./components/Breadcrumb";

function App() {
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    if (loading) {
        return <Preloader />;
    }

    return (
        <>
            <Header />

            <main>
                <Routes>
                    {router.map((item) => (
                        <Route
                            key={item.id}
                            path={item.path}
                            element={
                                <div style={{ width: "100%" }}>
                                    <Breadcrumb />
                                    {item.element}
                                </div>
                            }
                        />
                    ))}

                    {redirects.map((item) => (
                        <Route
                            key={item.from}
                            path={item.from}
                            element={<Navigate to={item.to} replace />}
                        />
                    ))}

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <MainZapros />
            <Footer />
        </>
    );
}

export default App;