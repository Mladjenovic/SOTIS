import React from "react";
import book from "../../assets/book-90.gif";

function Home() {
  return (
    <div>
      <img
        src={book}
        alt="book"
        className="book"
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "50%",
          maxHeight: "600px",
          maxWidth: "600px",
        }}
      />
    </div>
  );
}

export default Home;
