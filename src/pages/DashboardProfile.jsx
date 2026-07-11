function DashboardProfile() {
  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "30px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 0 10px lightgray",
      }}
    >
      <h2
        style={{
          color: "#2563EB",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        User Profile
      </h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
        }}
      >
        <tbody>
          <tr>
            <th>Full Name</th>
            <td>Ranjith</td>
          </tr>

          <tr>
            <th>Email</th>
            <td>admin@servicehub.com</td>
          </tr>

          <tr>
            <th>Mobile Number</th>
            <td>9876543210</td>
          </tr>

          <tr>
            <th>Gender</th>
            <td>Male</td>
          </tr>

          <tr>
            <th>Date of Birth</th>
            <td>01-01-2004</td>
          </tr>

          <tr>
            <th>College</th>
            <td>Your College Name</td>
          </tr>

          <tr>
            <th>Branch</th>
            <td>Computer Science</td>
          </tr>

          <tr>
            <th>Graduation Year</th>
            <td>2026</td>
          </tr>

          <tr>
            <th>Skills</th>
            <td>React JS, JavaScript, HTML, CSS</td>
          </tr>

          <tr>
            <th>Role</th>
            <td>ServiceHub Administrator</td>
          </tr>
        </tbody>
      </table>

      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => alert("Profile Updated Successfully")}
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default DashboardProfile;