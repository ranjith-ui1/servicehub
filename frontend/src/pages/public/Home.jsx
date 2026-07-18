import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="hero">
      <h1>Welcome to ServiceHub</h1>
      <p>Find trusted service providers for your daily needs.</p>
      <div className="home-buttons">
        <Link to="/services">Find Services</Link>
        <Link to="/register">Become a Service Provider</Link>
      </div>
    </div>
  );
}

export default Home;