import React from "react";

export default function Loader() {
  return (
    <>
      <div
        className="bg-overlay"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div class="spinner-grow text-warning" s role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    </>
  );
}
