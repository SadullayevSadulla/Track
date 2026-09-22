import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { router } from "./router/routes";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import MainZapros from "./components/MainZapros/mainZapros";
import Preloader from "./components/Preloader/Preloader";

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
                    {router.map((item, i) => (
                        <Route
                            key={i}
                            path={item.path}
                            element={
                                <div style={{ width: "100%" }}>
                                    {item.element}
                                </div>
                            }
                        />
                    ))}
                </Routes>
            </main>
            <MainZapros />
            <Footer />
        </>
    );
}

export default App;