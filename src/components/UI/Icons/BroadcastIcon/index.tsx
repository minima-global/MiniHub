const BroadcastIcon = ({ fill, size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    fill="none"
    stroke={fill}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18.364 19.364a9 9 0 1 0 -12.728 0" />
    <path d="M15.536 16.536a5 5 0 1 0 -7.072 0" />
    <path d="M12 13m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
  </svg>
);

export default BroadcastIcon;
