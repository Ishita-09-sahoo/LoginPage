import React from "react";
import { motion as Motion } from "framer-motion";

function FloatingShape({ color, size, top, left, delay }) {
  return (
    <Motion.div
      className={` absolute rounded-full ${color} ${size} opacity-20 blur-xl ${top} ${left} `}
      animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay,
      }}
      aria-hidden="true"
    ></Motion.div>
  );
}

export default FloatingShape;
