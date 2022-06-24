import { ReactNode } from "react";

const sqliteInstructions: ReactNode[] = [
  <>
    Plug your Kobo into your computer (
    <a
      href="https://www.haykranen.nl/2020/11/01/micro-usb-cables-data-power-charge/"
      target="_blank"
      rel="noreferrer"
    >
      make sure the cable supports data transfer
    </a>
    ).
  </>,
  `Go to the file explorer and find your Kobo.`,
  <>
    Select the .kobo folder (if you can&apos;t see the folder you need to enable
    &quot;hidden&quot; folders, on Mac press &quot;Command + Shift + .&quot;,
    for Windows learn more{" "}
    <a
      href="https://support.microsoft.com/en-us/windows/view-hidden-files-and-folders-in-windows-97fbc472-c603-9d90-91d0-1166d1d9f4b5"
      target="_blank"
      rel="noreferrer"
    >
      here
    </a>{" "}
    or{" "}
    <a
      href="https://support.microsoft.com/en-us/windows/show-hidden-files-0320fe58-0117-fd59-6851-9b7f9840fdb2"
      target="_blank"
      rel="noreferrer"
    >
      here
    </a>
    )
  </>,
  'Within the .kobo folder, you will find your "KoboReader.sqlite" file.',
];

export default sqliteInstructions;
