import express from 'express';
import cors from 'cors';
import simpleGit from 'simple-git';
import { generate } from './utils';
import { getAllFiles } from './file';
import path from 'path';
import { uploadFile } from './aws';

import { createClient } from 'redis';
const publisher = createClient();
publisher.connect();

const app = express();
app.use(cors());

app.use(express.json());
app.post('/deploy', async (req, res, next) => {
  const repoUrl = req.body.repoUrl;
  console.log('body ' + JSON.stringify(req.body));
  const id = generate();
  const outpath = path.join(__dirname, `output/${id}`);
  await simpleGit().clone(repoUrl, outpath);
  const files = getAllFiles(outpath);
  //s3://common-adas-dev/shree/vercel/
  files.map(async f => {
    if (f.endsWith('.cjs')) return;
    try {
      await uploadFile(f.slice(__dirname.length + 1) + '/' + f);
    } catch (e) {
      console.log(e);
    }

    publisher.lPush('build-queue', id);
  });
  res.json({ id });
});
app.listen(3456);
