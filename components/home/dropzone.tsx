import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import AddOutlineSvg from "assets/icons/AddOutlineSvg";
import CheckmarkOutlineSvg from "assets/icons/CheckmarkOutlineSvg";
import ResetOutlineSvg from "assets/icons/ResetOutlineSvg";

type DropzoneProps = {
  onDrop: (acceptedFiles: File[]) => void;
  fileInState: boolean;
};

const Dropzone = ({ onDrop, fileInState }: DropzoneProps) => {
  // const onDrop = useCallback((acceptedFiles) => {
  //   console.log(acceptedFiles);
  //   // Do something with the files
  // }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      "application/vnd.sqlite3": [".sqlite"],
      "application/x-sqlite3": [".sqlite"],
    },
    maxFiles: 1,
  });

  return (
    <div className="flex w-full mt-4">
      <div
        className={`flex items-center standard-transition font-semibold overflow-hidden whitespace-nowrap text-xl flex-1 ${
          fileInState ? "max-w-[1000px] visible" : "max-w-0 invisible"
        }`}
      >
        <CheckmarkOutlineSvg width="22px" height="22px" className="icon-mr" />
        File added
      </div>
      <div
        {...getRootProps()}
        className={`standard-transition ${!fileInState ? "w-full" : "w-1/3"}`}
      >
        <input {...getInputProps()} />
        <button
          type="button"
          className="btn w-full whitespace-nowrap"
          onClick={open}
        >
          {!fileInState ? (
            <>
              <AddOutlineSvg width="24px" height="24px" className="icon-mr" />{" "}
              Add File
            </>
          ) : (
            <>
              <ResetOutlineSvg width="22px" height="22px" className="icon-mr" />{" "}
              Redo
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Dropzone;
