/* eslint-disable react/no-unescaped-entities */
import type { ReactElement } from "react";

import Head from "next/head";
import Layout from "components/layout";

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Kobo Highlights Converter | Privacy Policy</title>
      </Head>

      <h2>Privacy Policy</h2>

      <p className="text-sm">Effective Date: 28-06-2022</p>

      <p>
        It is Kobo Highlights's policy to respect your privacy regarding any
        information we may collect while operating our website. This Privacy
        Policy applies to{" "}
        <a href="https://www.kobohighlights.com/"> www.kobohighlights.com/</a>{" "}
        (hereinafter, "us", "we", or "www.kobohighlights.com/"). We respect your
        privacy and are committed to protecting personally identifiable
        information you may provide us through the Website. We have adopted this
        privacy policy ("Privacy Policy") to explain what information may be
        collected on our Website, how we use this information, and under what
        circumstances we may disclose the information to third parties. This
        Privacy Policy applies only to information we collect through the
        Website and does not apply to our collection of information from other
        sources.
      </p>
      <p>
        This Privacy Policy, together with the Terms of service posted on our
        Website, set forth the general rules and policies governing your use of
        our Website. Depending on your activities when visiting our Website, you
        may be required to agree to additional terms of service.
      </p>
      <h3 id="websitevisitors">1. Website Visitors</h3>
      <p>
        Like most website operators, Kobo Highlights collects
        non-personally-identifying information of the sort that web browsers and
        servers typically make available, such as the browser type, language
        preference, referring site, and the date and time of each visitor
        request. Kobo Highlights's purpose in collecting non-personally
        identifying information is to better understand how Kobo Highlights's
        visitors use its website. From time to time, Kobo Highlights may release
        non-personally-identifying information in the aggregate, e.g., by
        publishing a report on trends in the usage of its website.
      </p>
      <p>
        Kobo Highlights also collects potentially personally-identifying
        information like Internet Protocol (IP) addresses for logged in users
        and for users leaving comments on https://www.kobohighlights.com/ blog
        posts. Kobo Highlights only discloses logged in user and commenter IP
        addresses under the same circumstances that it uses and discloses
        personally-identifying information as described below.
      </p>
      <h3 id="ExternalLinks">2. Links To External Sites</h3>
      <p>
        Our Service may contain links to external sites that are not operated by
        us. If you click on a third party link, you will be directed to that
        third party's site. We strongly advise you to review the Privacy Policy
        and terms of service of every site you visit.
      </p>
      <p>
        We have no control over, and assume no responsibility for the content,
        privacy policies or practices of any third party sites, products or
        services.
      </p>
      <h3 id="Stats">3. Aggregated Statistics</h3>
      <p>
        Kobo Highlights may collect statistics about the behaviour of visitors
        to its website. Kobo Highlights may display this information publicly or
        provide it to others. However, Kobo Highlights does not disclose your
        personally-identifying information.
      </p>
      <h3 id="Cookies">4. Cookies</h3>
      <p>
        To enrich and perfect your online experience, Kobo Highlights uses
        "Cookies", similar technologies and services provided by others to
        display personalised content, appropriate advertising and store your
        preferences on your computer.
      </p>
      <p>
        A cookie is a string of information that a website stores on a visitor's
        computer, and that the visitor's browser provides to the website each
        time the visitor returns. Kobo Highlights uses cookies to help Kobo
        Highlights identify and track visitors, their usage of
        https://www.kobohighlights.com/, and their website access preferences.
        Kobo Highlights visitors who do not wish to have cookies placed on their
        computers should set their browsers to refuse cookies before using Kobo
        Highlights's websites, with the drawback that certain features of Kobo
        Highlights's websites may not function properly without the aid of
        cookies.
      </p>
      <p>
        By continuing to navigate our website without changing your cookie
        settings, you hereby acknowledge and agree to Kobo Highlights's use of
        cookies.
      </p>
      <h3 id="Changes">5. Privacy Policy Changes</h3>
      <p>
        Although most changes are likely to be minor, Kobo Highlights may change
        its Privacy Policy from time to time, and in Kobo Highlights's sole
        discretion. Kobo Highlights encourages visitors to frequently check this
        page for any changes to its Privacy Policy. Your continued use of this
        site after any change in this Privacy Policy will constitute your
        acceptance of such change.
      </p>
      <h3 id="Credit">6. Contact Information &amp; Credit</h3>
      <p>
        This privacy policy was created at{" "}
        <a
          href="https://privacyterms.io/en/privacy-policy-generator/"
          title="Privacy policy generator"
          target="_blank"
          rel="noreferrer"
        >
          privacyterms.io privacy policy generator
        </a>
        . If you have any questions about our Privacy Policy, please contact us
        via <a href="mailto:support@kobohighlights.com">email</a>.
      </p>
    </>
  );
};

PrivacyPolicy.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout fullWidth smallHeader>
      {page}
    </Layout>
  );
};

export default PrivacyPolicy;
