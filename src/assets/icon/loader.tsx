import { SVGProps } from "react";

export default function LoaderIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      // className="loader"
      viewBox="0 0 384 384"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="active"
        pathLength="360"
        fill="transparent"
        strokeWidth="32"
        cx="192"
        cy="192"
        r="176"
      ></circle>
      <circle
        className="track"
        pathLength="360"
        fill="transparent"
        strokeWidth="32"
        cx="192"
        cy="192"
        r="176"
      ></circle>
    </svg>

  );
}
