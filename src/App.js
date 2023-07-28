import "./styles.css";
import { RouterProvider } from "react-router-dom";
import { router } from "lib/routes";
import AnimatedCursor from "react-animated-cursor";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <AnimatedCursor
        innerSize={10}
        outerSize={18}
        color="193, 11, 111"
        outerAlpha={0.4}
        innerScale={0.8}
        outerScale={2}
        style={{
          zIndex: "200",
        }}
      />
    </>
  );
}
