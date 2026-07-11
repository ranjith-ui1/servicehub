import { useState } from "react";

function DashboardSettings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    alert("Settings Saved Successfully!");
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "30px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px lightgray",
      }}
    >
      <h2
        style={{
          color: "#2563EB",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Dashboard Settings
      </h2>

      {/* Notifications */}

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() =>
              setNotifications(!notifications)
            }
          />

          Enable Notifications
        </label>
      </div>

      {/* Theme */}

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() =>
              setDarkMode(!darkMode)
            }
          />

          Enable Dark Mode
        </label>
      </div>

      {/* Preview */}

      <div
        style={{
          backgroundColor: darkMode ? "#333" : "#f5f5f5",
          color: darkMode ? "white" : "black",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h3>Preview</h3>

        <p>
          Notifications :
          <strong>
            {" "}
            {notifications ? "Enabled" : "Disabled"}
          </strong>
        </p>

        <p>
          Theme :
          <strong>
            {" "}
            {darkMode ? "Dark Mode" : "Light Mode"}
          </strong>
        </p>
      </div>

      {/* Save Button */}

      <div
        style={{
          textAlign: "center",
        }}
      >
        <button
          onClick={handleSave}
          style={{
            padding: "10px 25px",
            backgroundColor: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default DashboardSettings;