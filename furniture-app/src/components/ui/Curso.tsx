// components/CursorBall.tsx
import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CursorBallProps {
  size?: number;
  opacity?: number;
  color?: string;
  blur?: boolean;
  border?: boolean;
  damping?: number;
  stiffness?: number;
}

export const Cursor: React.FC<CursorBallProps> = ({
  size = 32,
  opacity = 0.2,
  color = "white",
  blur = true,
  border = true,
  damping = 25,
  stiffness = 700,
}) => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping, stiffness };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Esconder o cursor padrão
    document.body.style.cursor = "none";

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - size / 2);
      cursorY.set(e.clientY - size / 2);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      // Restaurar o cursor padrão quando o componente for desmontado
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY, size]);

  const ballStyles = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: color,
    opacity: opacity,
  };

  const classNames = [
    "fixed top-0 left-0 rounded-full pointer-events-none z-50",
    blur ? "backdrop-blur-sm" : "",
    border ? "border border-white border-opacity-30" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.div
      className={classNames}
      style={{
        ...ballStyles,
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    />
  );
};

export default Cursor;
