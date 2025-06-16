const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');

const app = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

app.db = router.db;
app.use(cors());
app.use(middlewares);
app.use(auth);
app.use(router);

app.listen(3000, () => {
  console.log('✅ JSON Server with Auth is running at http://localhost:3000');
});