import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

import { router } from "./router/routes";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import MainZapros from "./components/MainZapros/mainZapros";

function App() {
    const location = useLocation();

    useEffect(() => {
        AOS.init({
            duration: 1200,
            once: false,
            mirror: true,
            offset: 40,
            easing: "ease-out-cubic",
        });
    }, []);

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            AOS.refreshHard();
        });

        return () => cancelAnimationFrame(frame);
    }, [location.pathname]);

    return (
        <>
            <Header data-aos="fade-up" data-aos-duration="800" />

            <main>
                <Routes>
                    {router.map((item, i) => (
                        <Route
                            key={i}
                            path={item.path}
                            element={
                                <div
                                    data-aos="fade-up"
                                    data-aos-delay={i * 50}
                                    data-aos-duration="900"
                                    style={{ width: "100%" }}
                                >
                                    {item.element}
                                </div>
                            }
                        />
                    ))}
                </Routes>
            </main>

            <MainZapros data-aos="fade-up" data-aos-duration="900" />

            <Footer data-aos="fade-up" data-aos-duration="900" />
        </>
    );
}

export default App;