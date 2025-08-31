"use client";

import AnimatedCursor from "react-animated-cursor";

export const CustomCursor = () => {
  return (
    <>
      <AnimatedCursor
        innerSize={0}
        outerSize={40}
        outerAlpha={1}
        outerScale={1.5}
        outerStyle={{
          border: "2px solid #00bc7d",
          background: "transparent",
        }}
      />
    </>
  );
};
