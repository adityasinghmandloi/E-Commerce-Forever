import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";
const Home = () => {
  return (
    <div>
      <LatestCollection></LatestCollection>
      <BestSeller></BestSeller>
      <OurPolicy></OurPolicy>
      <NewsletterBox></NewsletterBox>
    </div>
  );
};

export default Home;
