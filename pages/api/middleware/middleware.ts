import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multiparty from "multiparty";

const middleware = nextConnect();

middleware.use(async (req: NextApiRequest, res: NextApiResponse, next) => {
  const form = new multiparty.Form();

  await form.parse(req, function (err, fields, files) {
    req.body = fields;
    req.files = files;
    next();
  });
});

export default middleware;
