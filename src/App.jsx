import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { router } from "./router/routes";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import MainZapros from "./components/MainZapros/mainZapros";

function App() {
    const location = useLocation();

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
                                <div style={{ width: "100%" }}>{item.element}</div>
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