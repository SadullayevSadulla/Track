import HeaderInfo from "./HeaderInfo/headerInfo"
import Categories from "./Main/main"
import MainCard from "./MainCard/mainCard"
import MainDar from "./MainDar/mainDar"
import MainNews from "./MainNews/mainNews"
import MainRus from "./MainRus/mainRus"
import MainZapros from "../../components/MainZapros/mainZapros"
import ArcNavigation from "./Profits/profits.jsx"

const Home = () => {
  return (
    <div>
      <HeaderInfo />
      <Categories />
      <MainRus />
      <MainDar />
      <ArcNavigation/>
      <MainCard />
      <MainNews />
    </div>
  )
}

export default Home