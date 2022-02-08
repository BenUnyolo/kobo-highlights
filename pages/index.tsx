import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import axios from "axios";

const Home: NextPage = () => {
  const [sqlFile, setSqlFile] = useState<string | Blob>();

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files && setSqlFile(e.target.files[0]);
    // console.log(e.target.value);
  };

  const onFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(e);

    // ERROR HANDLING

    console.log(process.env.API_URL);

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
    } catch (err: any) {
      // TODO proper error action
      console.log(err);
    }
  };
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Test App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <form onSubmit={onFormSubmit}>
          <input
            type="file"
            name="sqllite_file"
            onChange={onFileInputChange}
            required
          />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Home;
