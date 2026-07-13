function ErrorMessage({ message, onRetry }) {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        padding: "20px",
        border: "1px solid red",
        borderRadius: "10px",
        backgroundColor: "#ffe6e6",
        maxWidth: "500px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h2 style={{ color: "red" }}>
        Oops! Something Went Wrong
      </h2>

      <p>{message}</p>

      <button
        onClick={onRetry}
        style={{
          padding: "10px 20px",
          marginTop: "10px",
          cursor: "pointer",
        }}
      >
        Try Again
      </button>
    </div>
  );
}

export default ErrorMessage;