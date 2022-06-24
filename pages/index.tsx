import type { NextPage } from "next";
import { useState, useCallback } from "react";
import Head from "next/head";
import axios from "axios";
import { CSVLink } from "react-csv";
import Dropzone from "components/home/Dropzone";
import sqliteInstructions from "content/home/sqliteInstructions";

import HelpIcon from "assets/icons/HelpFilledSvg";
import ConvertOutlineSvg from "assets/icons/ConvertOutlineSvg";
import DownloadOutlineSvg from "assets/icons/DownloadOutlineSvg";

const Home: NextPage = () => {
  const [sqlFile, setSqlFile] = useState<File>();
  const [serverData, setServerData] = useState<string>();
  const [helpVisible, setHelpVisible] = useState(false);
  const [frontError, setFrontError] = useState<string>();
  const [isConverting, setIsConverting] = useState(false);

  // const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.target.files && setSqlFile(e.target.files[0]);
  //   setServerData("");
  //   setFrontError("");
  // };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // console.log(acceptedFiles);
    setSqlFile(acceptedFiles[0]);
    setServerData("");
    setFrontError("");
  }, []);

  const onReset = useCallback(() => {
    setSqlFile(undefined);
    setServerData("");
    setFrontError("");
  }, []);

  const onFakeDataLoad = useCallback(() => {
    setSqlFile(new File([""], "filename", { type: "text/html" }));
    setServerData("blah");
    // TODO: add this in after 200
    setSqlFile(undefined);
  }, []);

  const onFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsConverting(true);

    // ERROR HANDLING
    if (!sqlFile) {
      setFrontError("No file uploaded.");
      return;
    }
    if (!sqlFile.name.endsWith(".sqlite")) {
      setFrontError("Make sure the file is your KoboReader.sqlite file.");
      return;
    }
    if (sqlFile.size > 2000000000) {
      setFrontError(
        "Your file is too big. Please contact me and I may be able to assist."
      );
      return;
    }

    console.log(sqlFile);

    let response;

    const formData = new FormData();
    // TODO error for empty
    sqlFile && formData.append("sqllite_file", sqlFile);

    try {
      response = await axios.post(process.env.API_URL as string, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);

      setServerData(response.data);
    } catch (err: any) {
      // TODO proper error action
      console.log(err);
    }

    setIsConverting(false);
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Test App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col justify-center w-full h-screen px-2 md:px-6">
        <h1 className="text-white drop-shadow-xl text-5xl sm:text-7xl">
          Kobo
          <br />
          Highlights
          <br />
          Converter
        </h1>
        <button onClick={onFakeDataLoad}>fake data load</button>
        {/* BOX */}
        <div className="max-w-md p-6 bg-white rounded-xl shadow-xl shadow-red-900">
          {/* TODO: try putting title above box */}
          {/* <h1 className="text-5xl sm:text-7xl">
            Kobo
            <br />
            Highlights
            <br />
            Converter
          </h1> */}
          <h2 className="text-2xl font-medium">
            Convert your Kobo highlights to CSV.
          </h2>
          <div className="">
            <div
              className={`transition-all duration-[3000ms] bg-blue-600 ${
                // className={`standard-transition bg-blue-600 ${
                !!serverData
                  ? "max-h-0 overflow-hidden opacity-0"
                  : "max-h-[1000px] opacity-100"
              }`}
            >
              <form onSubmit={onFormSubmit} className="mt-4">
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
                    // className={`transition-max-height duration-700 overflow-hidden ${
                    helpVisible
                      ? "max-h-[2000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                  aria-hidden={helpVisible}
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
                {frontError && <p className="text-red-600">{frontError}</p>}
                {!serverData && (
                  // TODO: play around with left aligned buttons |convert           ->|
                  <button
                    type="submit"
                    className="block w-full mt-4 btn"
                    // value="Convert"
                  >
                    {/* TODO: on data load the convert button turns into the download button,
but on reset the download button disappears before the convert button transitions in   */}
                    <ConvertOutlineSvg
                      width="22px"
                      height="22px"
                      className={isConverting ? "animate-spin" : ""}
                    />{" "}
                    Convert
                  </button>
                )}
              </form>
            </div>
          </div>
          {/* TODO: the appearance of the button should change */}
          {serverData ? (
            <CSVLink
              data={serverData}
              filename="kobo_highlights.csv"
              className="w-full mt-4 btn"
            >
              <DownloadOutlineSvg
                width="22px"
                height="22px"
                className="icon-mr"
              />
              Download
            </CSVLink>
          ) : (
            ""
          )}
          <div
            className={`standard-transition delay-1000 text-center text-sm ${
              !serverData
                ? "max-h-0 overflow-hidden opacity-0"
                : "max-h-[1000px] opacity-100"
            }`}
          >
            <button onClick={onReset} className="mt-2">
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
