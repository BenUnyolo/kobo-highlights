// ionicons
type AddOutlineSvgProps = {
  className?: string;
  width: number | string;
  height: number | string;
};

const AddOutlineSvg = ({ className, width, height }: AddOutlineSvgProps) => {
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
        d="M256 112v288M400 256H112"
      />
    </svg>
  );
};

export default AddOutlineSvg;
