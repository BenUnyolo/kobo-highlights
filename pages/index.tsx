import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import axios from "axios";
import Papa from "papaparse";
import Parser from "json2csv";
import { CSVLink } from "react-csv";

import HelpIcon from "assets/icons/helpFilledSvg";

const Home: NextPage = () => {
  const [sqlFile, setSqlFile] = useState<string | Blob>();
  const [csvData, setCsvData] = useState<string>();
  const [serverData, setServerData] = useState<string>();

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files && setSqlFile(e.target.files[0]);
    // console.log(e.target.value);
  };

  const onFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // ERROR HANDLING

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

      console.log(csvData);
    } catch (err: any) {
      // TODO proper error action
      console.log(err);
    }
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Test App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col justify-center w-full h-screen px-2 md:px-6">
        {/* BOX */}
        <div className="max-w-md px-6 py-8 bg-white rounded-xl drop-shadow-xl">
          <h1 className="text-5xl sm:text-7xl">
            Kobo
            <br />
            Highlight
            <br />
            Tool
          </h1>
          <h2 className="mt-2 text-xl font-medium">
            Convert your Kobo highlights to CSV.
          </h2>
          <form className="mt-4" onSubmit={onFormSubmit}>
            <label htmlFor="sqllite_file" className="leading-relaxed">
              Upload your KoboReader.sqlite file{" "}
              <button
                className="ml-1"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("clicked");
                }}
              >
                <HelpIcon height="100%" width="22px" className="inline-block" />
              </button>
            </label>
            <input
              type="file"
              name="sqllite_file"
              id="sqllite_file"
              className="block w-full mt-2 text-slate-500 file:btn sm:file:w-1/3 file:mr-4"
              onChange={onFileInputChange}
              accept=".sqlite"
              required
            />
            <input
              type="submit"
              className="block w-full mt-4 btn"
              value="Convert"
            />
            {serverData ? (
              <CSVLink data={serverData} filename="file">
                Download me
              </CSVLink>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
