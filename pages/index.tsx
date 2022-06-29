import type { NextPage } from "next";
import { useState, useCallback } from "react";
import Head from "next/head";
import axios from "axios";
import { CSVLink } from "react-csv";
import Dropzone from "components/home/dropzone";
import sqliteInstructions from "content/home/sqliteInstructions";
import { errorSupportMessages } from "content/home/errorSupportMessages";

import HelpIcon from "assets/icons/helpFilledSvg";
import ConvertOutlineSvg from "assets/icons/convertOutlineSvg";
import DownloadOutlineSvg from "assets/icons/downloadOutlineSvg";

const Home: NextPage = () => {
  const [sqlFile, setSqlFile] = useState<File>();
  const [serverData, setServerData] = useState<string>();
  const [helpVisible, setHelpVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isConverting, setIsConverting] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSqlFile(acceptedFiles[0]);
    setServerData("");
    setErrorMessage("");
  }, []);

  const onReset = useCallback(() => {
    setSqlFile(undefined);
    setServerData("");
    setErrorMessage("");
  }, []);

  // const onFakeDataLoad = useCallback(() => {
  //   setSqlFile(new File([""], "filename", { type: "text/html" }));
  //   setServerData("blah");
  //   setSqlFile(undefined);
  // }, []);

  const onFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsConverting(true);
    setErrorMessage("");

    // ERROR HANDLING
    if (!sqlFile) {
      setErrorMessage(
        `It looks like no file was provided. ${errorSupportMessages.should_work}`
      );
      setIsConverting(false);
      return;
    }
    if (!sqlFile.name.endsWith(".sqlite")) {
      setErrorMessage(
        `Make sure the file is your KoboReader.sqlite file. ${errorSupportMessages.should_work}`
      );
      setIsConverting(false);
      return;
    }
    if (sqlFile.size > 2000000000) {
      // 2GB
      setErrorMessage(
        `The file uploaded is too large. ${errorSupportMessages.get_help}`
      );
      setIsConverting(false);
      return;
    }

    let response;

    const formData = new FormData();
    sqlFile && formData.append("sqllite_file", sqlFile);

    try {
      response = await axios.post(process.env.API_URL as string, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setServerData(response.data);

      setTimeout(() => setSqlFile(undefined), 1000);
    } catch (err: any) {
      // TODO proper error action
      console.dir(err);
      setErrorMessage(
        err.response?.data?.error ||
          `There was an unknown error with the server. ${errorSupportMessages.try_later}`
      );
    }

    setIsConverting(false);
  };
  return (
    <>
      {/* <button onClick={onFakeDataLoad} className="btn bg-blue-600">
          fake data load
        </button> */}
      {/* BOX */}
      <h2 className="text-2xl font-medium">
        Convert your Kobo highlights to CSV.
      </h2>
      <div className="">
        <form onSubmit={onFormSubmit}>
          <div
            className={`standard-transition ${
              !!serverData
                ? "max-h-0 overflow-hidden opacity-0 invisible"
                : "max-h-[1000px] opacity-100 visible"
            }`}
          >
            <div className="mt-4">
              <label htmlFor="sqllite_file" className="leading-relaxed">
                Upload your KoboReader.sqlite file{" "}
                <button
                  className="ml-1"
                  onClick={(e) => {
                    e.preventDefault();
                    setHelpVisible((prevState) => !prevState);
                  }}
                >
                  <span className="sr-only">
                    How to find your KoboReader.sqlite file.
                  </span>
                  <HelpIcon
                    height="100%"
                    width="22px"
                    className="inline-block"
                  />
                </button>
              </label>
              {/* finding file help */}
              <div
                className={`transition-all duration-1000 overflow-hidden ${
                  helpVisible
                    ? "max-h-[2000px] opacity-100 visible"
                    : "max-h-0 opacity-0 invisible"
                }`}
                aria-hidden={!helpVisible}
              >
                <div className="py-3 px-4 text-stone-600">
                  <strong className="pb-2">
                    Finding your KoboReader.sqlite file:
                  </strong>
                  <ol className="list-decimal list-inside leading-snug space-y-2">
                    {sqliteInstructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>
              </div>
              {/* input */}
              <Dropzone onDrop={onDrop} fileInState={!!sqlFile} />
              {errorMessage && (
                <p className="text-red-600 leading-snug mt-2">{errorMessage}</p>
              )}
            </div>
          </div>
          {!serverData ? (
            // TODO: play around with left aligned buttons |convert           ->|
            // TODO: Convert button only shows once compatible file has been added? - maybe we don't need the file added text if so
            // redo / pick a different file could then be text rather than a button
            <button
              type="submit"
              className="block w-full mt-4 btn"
              disabled={!sqlFile}
            >
              <ConvertOutlineSvg
                width="22px"
                height="22px"
                className={isConverting ? "animate-spin" : ""}
              />{" "}
              Convert
            </button>
          ) : (
            <CSVLink
              data={serverData}
              filename="kobo_highlights.csv"
              className="w-full mt-4 btn undo-a"
            >
              <DownloadOutlineSvg
                width="22px"
                height="22px"
                className="icon-mr"
              />
              Download
            </CSVLink>
          )}
        </form>
      </div>
      <div
        className={`standard-transition delay-300 text-center text-sm ${
          !serverData
            ? "max-h-0 opacity-0 invisible"
            : "max-h-[1000px] opacity-100 visible"
        }`}
      >
        <button onClick={onReset} className="mt-2">
          Reset
        </button>
      </div>
    </>
  );
};

export default Home;
