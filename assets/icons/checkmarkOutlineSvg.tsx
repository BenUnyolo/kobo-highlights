// ionicons
type CheckmarkOutlineSvgProps = {
  className?: string;
  width: number | string;
  height: number | string;
};

const CheckmarkOutlineSvg = ({
  className,
  width,
  height,
}: CheckmarkOutlineSvgProps) => {
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
        d="M416 128L192 384l-96-96"
      />
    </svg>
  );
};

export default CheckmarkOutlineSvg;
