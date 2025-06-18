
import NavBar from "../components/NavBar"
import Hero from "../components/Hero"
import Cities from "../components/Cities"
import FeaturedDestination from "../components/FeaturedDestination"
import ExclusiveOffer from "../components/ExclusiveOffer"
import Testimonial from "../components/Testimonial"
import NewsLetter from "../components/NewsLetter"
import Footer from "../components/Footer"
import SearchByTypeProperty from "../components/TypeProperty"
const Home=()=>{
    return(
    <>
        <NavBar />
        <Hero />
        <Cities />
        <SearchByTypeProperty />
        <FeaturedDestination />
        <ExclusiveOffer />
        <Testimonial />
        <NewsLetter />
        <Footer />
    </>
    )
}
export default Home