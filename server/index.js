import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/app.routes.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/api', routes);

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));