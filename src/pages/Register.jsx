import { useState } from "react";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Customer");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [skills, setSkills] = useState("");
  const [resume, setResume] = useState(null);
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({});
 const [success, setSuccess] = useState("");

 const validateForm = () => {

  let newErrors = {};

  if (!fullName.trim()) {
    newErrors.fullName = "Full Name is required";
  }

  if (!email.trim()) {
    newErrors.email = "Email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
  ) {
    newErrors.email = "Invalid Email Address";
  }

  if (!mobile.trim()) {
    newErrors.mobile = "Mobile Number is required";
  } else if (!/^[0-9]{10}$/.test(mobile)) {
    newErrors.mobile = "Mobile Number must be 10 digits";
  }

  if (!password) {
    newErrors.password = "Password is required";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(password)
  ) {
    newErrors.password =
      "Password must contain uppercase, lowercase, number and special character";
  }

  if (confirmPassword !== password) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  if (!terms) {
    newErrors.terms = "Accept Terms & Conditions";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};
  const handleSubmit = (e) => {

  e.preventDefault();

  if (!validateForm()) return;

  setSuccess("Registration Successful!");

  console.log({
    fullName,
    email,
    mobile,
    password,
    confirmPassword,
    role,
    gender,
    dob,
    city,
    category,
    skills,
    resume,
    terms,
  });

  handleReset();
  
};

  const handleReset = () => {
    setFullName("");
    setEmail("");
    setMobile("");
    setPassword("");
    setConfirmPassword("");
    setRole("Customer");
    setGender("");
    setDob("");
    setCity("");
    setCategory("");
    setSkills("");
    setResume(null);
    setTerms(false);
    setErrors({});
  };

  return (
    <div style={{ width: "500px", margin: "30px auto" }}>
      <h1 style={{ textAlign: "center" }}>Join ServiceHub</h1>
        
        {success && (
  <p style={{ color: "green", fontWeight: "bold" }}>
    {success}
  </p>
)}

{errors.fullName && (
<p style={{color:"red"}}>{errors.fullName}</p>
)}

{errors.email && (
<p style={{color:"red"}}>{errors.email}</p>
)}

{errors.mobile && (
<p style={{color:"red"}}>{errors.mobile}</p>
)}

{errors.password && (
<p style={{color:"red"}}>{errors.password}</p>
)}

{errors.terms && (
<p style={{color:"red"}}>{errors.terms}</p>
)}
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <br />
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <br />
        <br />

        <label>Email Address</label>
        <br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />

        <label>Mobile Number</label>
        <br />
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <br />
        <br />

        <label>Password</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />

        <label>Confirm Password</label>
        <br />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <br />

        <label>Register As</label>
        <br />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option>Customer</option>
          <option>Service Provider</option>
        </select>
        <br />
        <br />

        <label>Gender</label>
        <br />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <br />
        <br />

        <label>Date of Birth</label>
        <br />
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <br />
        <br />

        <label>City</label>
        <br />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <br />
        <br />

        <label>Service Category</label>
        <br />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option>Electrician</option>
          <option>Plumber</option>
          <option>Painter</option>
          <option>Tutor</option>
          <option>Carpenter</option>
          <option>AC Repair</option>
        </select>
        <br />
        <br />

        <label>Skills</label>
        <br />
        <textarea
          rows="4"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        ></textarea>
        <br />
        <br />

        <label>Upload Resume (UI Only)</label>
        <br />
        <input
          type="file"
          onChange={(e) => setResume(e.target.files[0])}
        />
        <br />
        <br />

        <label>
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
          />
          {" "}I accept the Terms & Conditions
        </label>

        <br />
        <br />

        <button type="submit">Register</button>

        {" "}

        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  );
}

export default Register;