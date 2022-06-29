import Head from "next/head";
import Link from "next/link";

type LayoutProps = {
  children: React.ReactNode;
  fullWidth?: boolean;
  smallHeader?: boolean;
};

const Layout = ({ children, fullWidth, smallHeader }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Kobo Highlights Converter</title>
        <meta
          name="description"
          content="Convert your Kobo highlights and annotations to CSV format so you can open them in many apps, including Excel and word processors!"
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      {/* TODO: main tag, header tag etc */}

      <div className="min-h-screen flex flex-col px-2 py-4 md:px-6">
        <div className="flex-1 flex flex-col justify-center w-full">
          <Link href="/">
            <a className="border-0 undo-a">
              <h1
                className={`text-white drop-shadow-xl text-5xl sm:text-7xl ${
                  smallHeader ? "5xl sm:text-5xl" : ""
                }`}
              >
                Kobo
                <br />
                Highlights
                <br />
                Converter
              </h1>
            </a>
          </Link>
          <div
            className={`max-w-md p-6 bg-white rounded-xl shadow-xl shadow-red-900 ${
              fullWidth ? "max-w-full w-full" : ""
            }`}
          >
            {children}{" "}
          </div>
        </div>
        <div className="text-white mt-auto opacity-50">
          <Link href="/about">
            <a className="mt-4">About</a>
          </Link>
          .
          <Link href="/privacypolicy">
            <a className="mt-4 ml-2">Privacy Policy</a>
          </Link>
          .
        </div>
      </div>
    </>
  );
};

export default Layout;
