import { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "" || email === "" || message === "") {
      alert("Please fill all the fields.");
      return;
    }

    setSuccess("Your message has been sent successfully!");

    setName("");
    setEmail("");
    setMessage("");
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setSuccess("");
  };

  return (
    <div
      style={{
        width: "500px",
        margin: "40px auto",
        padding: "25px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px #ccc",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#2563EB",
        }}
      >
        Contact ServiceHub
      </h1>

      <p style={{ textAlign: "center" }}>
        We'd love to hear from you. Send us your query.
      </p>

      <form onSubmit={handleSubmit}>
        <label>Full Name</label>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
            marginBottom: "15px",
          }}
        />

        <label>Email Address</label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
            marginBottom: "15px",
          }}
        />

        <label>Message</label>

        <textarea
          rows="5"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "5px",
            marginBottom: "15px",
          }}
        ></textarea>

        {success && (
          <p
            style={{
              color: "green",
              fontWeight: "bold",
            }}
          >
            {success}
          </p>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#2563EB",
            color: "white",
            border: "none",
            marginBottom: "10px",
          }}
        >
          Send Message
        </button>

        <button
          type="button"
          onClick={handleReset}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "gray",
            color: "white",
            border: "none",
          }}
        >
          Reset
        </button>
      </form>

      <hr style={{ margin: "25px 0" }} />

      <h3>Contact Information</h3>

      <p>
        <strong>Email:</strong> support@servicehub.com
      </p>

      <p>
        <strong>Phone:</strong> +91 7207659097
      </p>

      <p>
        <strong>Address:</strong> Amaravthi, Andhra Pradesh, India
      </p>

      <p>
        <strong>Working Hours:</strong> Monday - Saturday (9:00 AM - 6:00 PM)
      </p>
    </div>
  );
}

export default Contact;