function About() {
  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <h1
        style={{
          color: "#2563EB",
          textAlign: "center",
        }}
      >
        About ServiceHub
      </h1>

      <br />

      <p
        style={{
          fontSize: "18px",
          lineHeight: "1.8",
          textAlign: "justify",
        }}
      >
        <strong>ServiceHub</strong> is a React-based web application
        developed to connect customers with trusted local service
        providers. Users can easily search and book professionals for
        various home and personal services from one platform.
      </p>

      <br />

      <h2 style={{ color: "#2563EB" }}>
        Our Mission
      </h2>

      <p style={{ lineHeight: "1.8" }}>
        Our mission is to make finding skilled service professionals
        simple, fast, and reliable. ServiceHub provides a user-friendly
        platform where customers can discover experienced service
        providers in their local area.
      </p>

      <br />

      <h2 style={{ color: "#2563EB" }}>
        Services Available
      </h2>

      <ul
        style={{
          lineHeight: "2",
          fontSize: "17px",
        }}
      >
        <li>⚡ Electrician</li>
        <li>🚰 Plumbing</li>
        <li>🪚 Carpenter</li>
        <li>🎨 Painting</li>
        <li>🧹 Home Cleaning</li>
        <li>❄ AC Repair & Installation</li>
        <li>💻 Computer Repair</li>
        <li>📚 Home Tuition</li>
        <li>💄 Beauty Services</li>
      </ul>

      <br />

      <h2 style={{ color: "#2563EB" }}>
        Why Choose ServiceHub?
      </h2>

      <ul
        style={{
          lineHeight: "2",
          fontSize: "17px",
        }}
      >
        <li>✔ Verified Service Providers</li>
        <li>✔ Affordable Pricing</li>
        <li>✔ Quick Booking Process</li>
        <li>✔ Experienced Professionals</li>
        <li>✔ Customer Support</li>
        <li>✔ Secure and Easy-to-Use Platform</li>
      </ul>

      <br />

      <h2 style={{ color: "#2563EB" }}>
        Technologies Used
      </h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          borderCollapse: "collapse",
          width: "100%",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th>Technology</th>
            <th>Purpose</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>React JS</td>
            <td>User Interface</td>
          </tr>

          <tr>
            <td>React Router DOM</td>
            <td>Navigation & Routing</td>
          </tr>

          <tr>
            <td>JavaScript</td>
            <td>Application Logic</td>
          </tr>

          <tr>
            <td>CSS</td>
            <td>Styling</td>
          </tr>

          <tr>
            <td>Vite</td>
            <td>Development Tool</td>
          </tr>
        </tbody>
      </table>

      <br />

      <h2
        style={{
          color: "#2563EB",
          textAlign: "center",
        }}
      >
        Thank You for Choosing ServiceHub!
      </h2>

      <p
        style={{
          textAlign: "center",
          fontSize: "18px",
        }}
      >
        We are committed to providing reliable and professional services
        for every customer.
      </p>
    </div>
  );
}

export default About;