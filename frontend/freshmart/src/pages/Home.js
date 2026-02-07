import HeroSlider from "../components/HeroSlider";
import HomeProducts from "../components/HomeProducts";
import HomeRecentlyViewed from "../components/HomeRecentlyViewed";
import OffersSection from "../components/OffersSection";
import FeaturedProducts from "../components/FeaturedProducts";
import NewArrivals from "../components/NewArrivals";

function Home() {
  return (
    <div>
      <HeroSlider />
      <HomeProducts />
       <HomeRecentlyViewed /> 
      <OffersSection />
        <FeaturedProducts />
      <NewArrivals />
    </div>
  );
}

export default Home;

