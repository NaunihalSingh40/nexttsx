import BannerSection from '@/components/hpLayout/BannerSection'
import TopSellingSection from 'components/hpLayout/topSelling'
import ProductCard from 'components/hpLayout/productCard'
import FeaturesSection from 'components/hpLayout/FeatureSection'
import ProductProcessingSection from 'components/hpLayout/productProcessingSection'
import EmpoweringWomenFarmers from 'components/hpLayout/empoweringWomenFarmers'
import Testimonials from 'components/hpLayout/testimonials'
import FestiveSection from 'components/hpLayout/festiveSection'
import { Wrapper } from 'styles/hpLayout'
import OurHeroProducts from 'components/hpLayout/heroProducts'

interface HomeProps {
    loginModal: boolean;
  }

const Home = ({ loginModal }: HomeProps) => {
  return (
    <Wrapper>
      <BannerSection loginModal={loginModal} />
      <OurHeroProducts />
      <TopSellingSection />
      <ProductCard />
      <FeaturesSection />
      <ProductProcessingSection />
      <EmpoweringWomenFarmers />
      <Testimonials />
      <FestiveSection />
    </Wrapper>
  )
}

export default Home
