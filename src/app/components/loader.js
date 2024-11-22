import React from "react";

export default function Loader() {
  return (
    <>
      <div
        className="bg-overlay-o"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // height: "100vh",
          zIndex: "9999",
        }}
      >
        <div className="spinner-grow text-warning" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    </>
  );
}
