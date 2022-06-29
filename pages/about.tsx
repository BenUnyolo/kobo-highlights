/* eslint-disable react/no-unescaped-entities */
import type { ReactElement } from "react";

import Head from "next/head";
import Layout from "components/layout";

const About = () => {
  return (
    <>
      <Head>
        <title>Kobo Highlights Converter | About</title>
      </Head>
      <h2 className="sr-only">About</h2>
      <p className="text-xl mt-0">
        Hey, I'm{" "}
        <a href="https://benunyolo.com/" target="_blank" rel="noreferrer">
          Ben
        </a>
        . Welcome to <strong>Kobo Highlights Converter</strong>!
      </p>

      <p className="mb-0">
        I built this site to help fellow Kobo users easily convert their
        highlights and annotations into a flexible format without much effort.
        If you have any problems using the site, email {""}
        <a href="mailto:support@kobohighlights.com">
          support@kobohighlights.com
        </a>
        , and for anything else, you can email me at{" "}
        <a href="mailto:hello@kobohighlights.com">hello@kobohighlights.com</a>.
        I hope you enjoy the site!
      </p>
    </>
  );
};

About.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default About;
