import React from "react";

function MyH1({ title, ...props }) {
  return (
    <h1
      {...props}
      className="myTextColor uppercase text-sm md:text-xl lg:text-2xl font-bold"
    >
      {title}
    </h1>
  );
}

export default MyH1;
