import type { IconProps } from "~/utils/types";

export const HomeIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.75 5.24996L7 1.16663L12.25 5.24996V11.6666C12.25 11.976 12.1271 12.2728 11.9083 12.4916C11.6895 12.7104 11.3928 12.8333 11.0833 12.8333H2.91667C2.60725 12.8333 2.3105 12.7104 2.09171 12.4916C1.87292 12.2728 1.75 11.976 1.75 11.6666V5.24996Z"
      stroke="#0072CD"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.25 12.8333V7H8.75V12.8333"
      stroke="#0072CD"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
