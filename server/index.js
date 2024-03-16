import express from 'express';
import bodyParser from 'body-parser';
import Users from './users.json' assert { type: "json" };

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


const router = express.Router();
app.use('/api', router);

router.get('/isUserExists', (req, res) => {
  const { identifier, password } = req.query;

  const user = Users.find(user => user.id == identifier && user.password == password);
  
  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Nieprawidłowy identyfikator lub hasło' });
  }
});

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));