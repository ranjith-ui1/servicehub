import Navbar from "../components/Navbar";
import Hero from "../components/Hero/Hero";
import CategoryCard from "../components/CategoryCard/CategoryCard";
import ServiceCard from "../components/ServiceCard/ServiceCard";
import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <Hero
        title="Find Trusted Local Services"
        subtitle="Book electricians, plumbers, tutors and many more."
        button="Explore Services"
      />

      <h2>Categories</h2>

      <CategoryCard name="Electrician" />
      <CategoryCard name="Plumber" />
      <CategoryCard name="Painter" />
      <CategoryCard name="Tutor" />

      <h2>Popular Services</h2>

      <ServiceCard
        title="Home Cleaning"
        rating="4.9"
        price="₹499"
      />

      <ServiceCard
        title="AC Repair"
        rating="4.8"
        price="₹699"
      />

      <ServiceCard
        title="Painting"
        rating="4.7"
        price="₹999"
      />

      <Footer />
    </>
  );
}

export default Home;