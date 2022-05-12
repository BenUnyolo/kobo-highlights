// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import morgan from "morgan";
import multer from "multer";
import Database from "better-sqlite3";
import initSqlJs from "sql.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const apiRoute = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const uploadMiddleware = upload.single("sqllite_file");

apiRoute.use(morgan("dev")); // logs HTTP requests in console
apiRoute.use(uploadMiddleware);

// POST
apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log(req.file.buffer);

  const SQL = await initSqlJs({});
  const db = new SQL.Database(req.file.buffer);

  const stmt = db.prepare(`SELECT
               BookmarkAlias.Text as highlight,
               BookmarkAlias.Annotation as annotation,
               BookmarkAlias.DateCreated as dateCreated,
               BookmarkAlias.ChapterProgress as chapterProgress,
               ContentAlias.Title as title,
               ContentAlias.Attribution as author
             FROM Bookmark as BookmarkAlias
             LEFT JOIN content as ContentAlias ON BookmarkAlias.VolumeID = ContentAlias.ContentID
             WHERE Text != '?'
             ORDER BY title, chapterProgress`);

  let highlights = [];

  while (stmt.step()) highlights.push(stmt.getAsObject());
  // while (stmt.step()) console.log(stmt.get());

  console.log(highlights);

  // const db = new Database(req.file.buffer);
  // const sqlData = db
  //   .prepare(
  //     `
  //           SELECT
  //             BookmarkAlias.Text as highlight,
  //             BookmarkAlias.Annotation as annotation,
  //             BookmarkAlias.DateCreated as dateCreated,
  //             BookmarkAlias.ChapterProgress as chapterProgress,
  //             ContentAlias.Title as title,
  //             ContentAlias.Attribution as author
  //           FROM Bookmark as BookmarkAlias
  //           LEFT JOIN content as ContentAlias ON BookmarkAlias.VolumeID = ContentAlias.ContentID
  //           WHERE Text != ?
  //           ORDER BY title, chapterProgress
  //       `
  //   )
  //   .all("null");
  // db.close();

  // console.log(sqlData);

  res.send(highlights);
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default apiRoute;
