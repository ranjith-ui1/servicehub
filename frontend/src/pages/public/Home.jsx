import { Link } from "react-router-dom";
import { isLoggedIn as checkLoggedIn } from "../../api/auth";

function Home() {
  const isLoggedIn = checkLoggedIn();

  return (
    <div className="page-container home-hero">
      <div className="hero-header">
        <h1>Connecting You with Reliable Local Experts</h1>
        <p>
          {isLoggedIn
            ? "Welcome back! Browse available service categories or jump straight into booking your needed professional."
            : "Welcome to ServiceHub — your one-stop destination for verified electricians, plumbers, painters, carpenters, and home service professionals."}
        </p>
        
        {/* Conditional buttons based on login status */}
        <div className="hero-actions">
          {isLoggedIn ? (
            <Link to="/services" className="btn-primary">
              Make a Booking
            </Link>
          ) : (
            <>
              <Link to="/services" className="btn-primary">
                Explore Available Services
              </Link>
              <Link to="/login" className="btn-secondary">
                Sign In to Book
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon">🛠️</div>
          <h3>Wide Range of Skills</h3>
          <p>From emergency plumbing to full home renovation, find experts trained for every job.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">✅</div>
          <h3>Verified Professionals</h3>
          <p>Every worker profile includes verified experience, service ratings, and clear city-based location tags.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📞</div>
          <h3>Direct Communication</h3>
          <p>Log in to view direct phone numbers, transparent hourly rates, and schedule bookings instantly.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;