/* eslint-disable react/no-unescaped-entities */
import type { ReactElement } from "react";

import Head from "next/head";
import Layout from "components/layout";
import Link from "next/link";

const pageNotFound = () => {
  return (
    <>
      <Head>
        <title>Kobo Highlights Converter | 404</title>
      </Head>
      <h2>There's nothing here</h2>
      <p className="text-xl mb-0">
        <Link href="/">
          <a>Click here to go home.</a>
        </Link>{" "}
      </p>
    </>
  );
};

pageNotFound.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default pageNotFound;
