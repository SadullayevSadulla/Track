import { Route, Routes } from "react-router-dom"
import { router } from "./router/routes"
import Header from "./components/Header/header"
import Footer from "./components/Footer/footer"

function App() {

    return (
        <>
            <Header />
            <main>
                <Routes>
                    {router.map((item, i) => (
                        <Route
                            key={i}
                            path={item.path}
                            element={item.element} />
                    ))}
                </Routes>
            </main>
            <Footer />

        </>
    )
}

export default App
