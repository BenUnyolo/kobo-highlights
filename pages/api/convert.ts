// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import morgan from "morgan";
import multer from "multer";
import initSqlJs from "sql.js";

interface MulterRequest extends NextApiRequest {
  file: any;
}

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const apiRoute = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    res
      .status(500)
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
apiRoute.post(async (req: MulterRequest, res: NextApiResponse) => {
  if (!req.file) {
    res
      .status(400)
      .json({ error: "No file provided", code: "NO_FILE_UPLOADED" });
    return;
  }

  if (!req.file.originalname.endsWith(".sqlite")) {
    res.status(400).json({
      error: "File is not .sqlite",
      code: "INVALID_FILE_TYPE",
    });
    return;
  }

  // >2GB
  if (req.file.size > 2000000000) {
    res.status(400).json({
      error: "File is too large",
      code: "FILE_TOO_LARGE",
    });
    return;
  }
  // check for file type
  console.log(req.file);

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

  db.close();

  res.send(highlights);
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default apiRoute;
