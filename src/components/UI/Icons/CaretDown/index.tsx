const CaretDown = ({ fill, size = 20, extraClass }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={extraClass}
    viewBox="0 -960 960 960"
    strokeWidth="1.5"
    fill={fill}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
      <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
  </svg>
);

export default CaretDown;