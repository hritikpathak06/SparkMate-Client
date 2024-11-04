import Footer from "../components/home/Footer"
import Profile from "../components/home/Landing"
import TestimonialsSection from "../components/home/Testinomial"
import Navbar from "../components/shared/Navbar"

const LandingPage = () => {
  return (
    <div>
      <Navbar/>
      {/* <Header/> */}
      <Profile/>
      <TestimonialsSection/>
      <Footer/>
    </div>
  )
}

export default LandingPage
