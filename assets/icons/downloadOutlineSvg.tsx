// ionicons
type DownloadOutlineSvgProps = {
  className?: string;
  width: number | string;
  height: number | string;
};

const DownloadOutlineSvg = ({
  className,
  width,
  height,
}: DownloadOutlineSvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      viewBox="0 0 512 512"
      width={width}
      height={height}
      aria-hidden="true"
    >
      <title>Download</title>
      <path
        d="M336 176h40a40 40 0 0140 40v208a40 40 0 01-40 40H136a40 40 0 01-40-40V216a40 40 0 0140-40h40"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M176 272l80 80 80-80M256 48v288"
      />
    </svg>
  );
};

export default DownloadOutlineSvg;
