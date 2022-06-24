// ionicons
type CheckmarkSquareOutlineSvgProps = {
  className?: string;
  width: number | string;
  height: number | string;
};

const CheckmarkSquareOutlineSvg = ({
  className,
  width,
  height,
}: CheckmarkSquareOutlineSvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      viewBox="0 0 512 512"
      width={width}
      height={height}
      aria-hidden="true"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M352 176L217.6 336 160 272"
      />
      <rect
        x="64"
        y="64"
        width="384"
        height="384"
        rx="48"
        ry="48"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </svg>
  );
};

export default CheckmarkSquareOutlineSvg;
