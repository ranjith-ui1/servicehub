import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dob: "",
    service: "",
    experience: "",
    city: "",
    address: "",
    price: "",
    availability: "",
    skills: "",
    profilePhoto: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (formData.fullName.trim() === "")
      newErrors.fullName = "Full Name is required.";

    if (formData.email.trim() === "")
      newErrors.email = "Email is required.";
    else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      newErrors.email = "Enter a valid Email.";

    if (!/^[0-9]{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter a valid Mobile Number.";

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
        formData.password
      )
    )
      newErrors.password =
        "Password must contain uppercase, lowercase, number and special character.";

    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match.";

    if (formData.gender === "")
      newErrors.gender = "Select Gender.";

    if (formData.service === "")
      newErrors.service = "Select Service Category.";

    if (formData.experience === "")
      newErrors.experience = "Enter Experience.";

    if (formData.city.trim() === "")
      newErrors.city = "Enter City.";

    if (formData.address.trim() === "")
      newErrors.address = "Enter Address.";

    if (formData.price === "")
      newErrors.price = "Enter Service Charge.";

    if (!formData.terms)
      newErrors.terms = "Accept Terms & Conditions.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      localStorage.setItem(
        "registeredUser",
        JSON.stringify(formData)
      );

      setSuccess("Registration Successful!");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

      handleReset();
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      gender: "",
      dob: "",
      service: "",
      experience: "",
      city: "",
      address: "",
      price: "",
      availability: "",
      skills: "",
      profilePhoto: "",
      terms: false,
    });

    setErrors({});
    setSuccess("");
  };

  return (
    <div className="register">
      <h2>ServiceHub Registration</h2>

      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>

        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        <p className="error">{errors.fullName}</p>

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <p className="error">{errors.email}</p>

        <label>Mobile Number</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
        />
        <p className="error">{errors.mobile}</p>

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <p className="error">{errors.password}</p>

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <p className="error">{errors.confirmPassword}</p>

        <label>Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <p className="error">{errors.gender}</p>

        {/* <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        /> */}

        <label>Service Category</label>
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
        >
          <option value="">Select Service</option>
          <option>Electrician</option>
          <option>Plumber</option>
          <option>Carpenter</option>
          <option>Painter</option>
          <option>Cleaner</option>
          <option>Mechanic</option>
          <option>Gardener</option>
        </select>
        <p className="error">{errors.service}</p>

        <label>Experience (Years)</label>
        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
        />
        <p className="error">{errors.experience}</p>

        <label>City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        <p className="error">{errors.city}</p>

        <label>Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
        ></textarea>
        <p className="error">{errors.address}</p>

        <label>Service Charge (₹)</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <p className="error">{errors.price}</p>

        <label>Available Time</label>
        <input
          type="text"
          name="availability"
          placeholder="9 AM - 6 PM"
          value={formData.availability}
          onChange={handleChange}
        />

        {/* <label>Skills</label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
        />

        <label>Profile Photo</label>
        <input
          type="file"
          onChange={(e) =>
            setFormData({
              ...formData,
              profilePhoto: e.target.files[0]?.name || "",
            })
          }
        /> */}
        
        <label className="checkbox-label">
          
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
          I accept Terms & Conditions
        </label>
        

        <p className="error">{errors.terms}</p>

        <div className="button-group">
          <button type="submit">Register</button>

          <button
            type="button"
            className="reset-btn"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>

      </form>
    </div>
  );
}

export default Register;