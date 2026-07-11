import { useState } from "react";
import { useNavigate } from "react-router-dom";


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
    college: "",
    branch: "",
    graduationYear: "",
    skills: "",
    resume: "",
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
      newErrors.email = "Enter a valid email.";

    if (!/^[0-9]{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter a valid 10-digit mobile number.";

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
        formData.password
      )
    )
      newErrors.password =
        "Password must be at least 8 characters with uppercase, lowercase, number and special character.";

    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match.";

    if (!formData.terms)
      newErrors.terms = "Please accept Terms & Conditions.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccess("Registration Successful!");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        gender: "",
        dob: "",
        college: "",
        branch: "",
        graduationYear: "",
        skills: "",
        resume: "",
        terms: false,
      });
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
      college: "",
      branch: "",
      graduationYear: "",
      skills: "",
      resume: "",
      terms: false,
    });

    setErrors({});
    setSuccess("");
  };

  return (
    <div className="register">
      <h1>ServiceHub Registration</h1>

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
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />

        <label>College Name</label>
        <input
          type="text"
          name="college"
          value={formData.college}
          onChange={handleChange}
        />

        <label>Branch</label>
        <input
          type="text"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
        />

        <label>Graduation Year</label>
        <input
          type="number"
          name="graduationYear"
          value={formData.graduationYear}
          onChange={handleChange}
        />

        <label>Skills</label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
        />

        <label>Resume Upload</label>
        <input
          type="file"
          name="resume"
          onChange={(e) =>
            setFormData({
              ...formData,
              resume: e.target.files[0]?.name || "",
            })
          }
        />

        <label>
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
          I Accept Terms & Conditions
        </label>
        <p className="error">{errors.terms}</p>

        <button type="submit">Register</button>

        <button
          type="button"
          onClick={handleReset}
        >
          Reset
        </button>
      </form>
    </div>
  );
}

export default Register;