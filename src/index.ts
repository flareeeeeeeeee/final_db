import "dotenv/config";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

// import http from "http";

import morgan from "morgan-body"
import morganOptions from "./middleware/morgan";
import logger from "./middleware/logger";
import health from "./middleware/health";
import version from "./middleware/version";
import routes from "./routes";

const app = express();

app.set('port', process.env.PORT || 3000)

morgan(app, {
  noColors: true,
  stream: morganOptions.stream,
  skip: morganOptions.skip
});

app.use(version);
app.use(health);
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.use(express.static('client/dist', { maxAge: 0 }))
app.get('*', (_req, res) => {
  if (_req.url.startsWith('/api')) {
    res.status(404)
    res.json({ message: `Method not found ${_req.path}` })
    return
  }

  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')

  res.sendFile('index.html', { root: 'client/dist' })
})

app.listen(app.get('port'), () => {
  logger.info(`Server is running on port ${app.get('port')}`)
})

