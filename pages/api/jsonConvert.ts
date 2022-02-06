// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import nextConnect from "next-connect";
import multer from "multer";
import Database from "better-sqlite3";
import morgan from "morgan";

import deleteFile from "utils/deleteFile";

// type Data = {
//   name: string;
// };

type NextApiRequestWithFile = NextApiRequest & {
  file: Express.Multer.File;
};

const apiRoute = nextConnect({
  onError(error, req: NextApiRequestWithFile, res: NextApiResponse) {
    console.log(error);
    deleteFile(req.file.path, "database");

    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextApiRequestWithFile, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const upload = multer({ dest: `tmp/` });

// tells multer which field on the form has the file, creates middleware
const uploadMiddleware = upload.single("sqllite_file");

apiRoute.use(uploadMiddleware);
apiRoute.use(morgan("dev")); // logs HTTP requests in console

// Process a POST request
apiRoute.post((req: NextApiRequestWithFile, res: NextApiResponse) => {
  // console.log(req.file);
  // console.log(req.body);
  if (!req.file) {
    // no file uploaded
    res.send({
      status: false,
      message: "No file uploaded",
    });
  } else {
    console.log("1");
    // const fileBuffer = req.file.buffer;
    const filePathDb = req.file.path;

    console.log("2");
    // TODO open db connection -> then try catch?
    // const db = new Database(fileBuffer, { fileMustExist: true });
    const db = new Database(filePathDb);
    console.log("3");
    const sqlData = db
      .prepare(
        `
            SELECT
              BookmarkAlias.Text as highlight,
              BookmarkAlias.Annotation as annotation,
              BookmarkAlias.DateCreated as dateCreated,
              BookmarkAlias.ChapterProgress as chapterProgress,
              ContentAlias.Title as title,
              ContentAlias.Attribution as author
            FROM Bookmark as BookmarkAlias
            LEFT JOIN content as ContentAlias ON BookmarkAlias.VolumeID = ContentAlias.ContentID
            WHERE Text != ?
            ORDER BY title, chapterProgress
        `
      )
      .all("null");
    db.close();

    // delete database file
    deleteFile(filePathDb, "database");

    res.send(sqlData);
  }
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default apiRoute;
