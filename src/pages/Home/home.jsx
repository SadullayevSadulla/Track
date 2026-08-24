import HeaderInfo from "./HeaderInfo/headerInfo"
import Categories from "./Main/main"
import MainCard from "./MainCard/mainCard"
import MainDar from "./MainDar/mainDar"
import MainNews from "./MainNews/mainNews"
import MainRus from "./MainRus/mainRus"
import MainZapros from "./MainZapros/mainZapros"

const Home = () => {
  return (
    <div>
      <HeaderInfo />
      <Categories />
      <MainRus />
      <MainDar />
      {/* <Profits/> */}
      <MainCard />
      <MainNews />
      <MainZapros />
    </div>
  )
}

export default Home