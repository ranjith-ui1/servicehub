function Loading() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      <h2>Loading ServiceHub Data...</h2>

      <div
        style={{
          width: "50px",
          height: "50px",
          border: "5px solid lightgray",
          borderTop: "5px solid blue",
          borderRadius: "50%",
          margin: "20px auto",
          animation: "spin 1s linear infinite",
        }}
      ></div>

      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }

            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Loading;