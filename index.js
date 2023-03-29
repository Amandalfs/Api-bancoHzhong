const express =  require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const createUser = require('./routes/createUser');
const loginUsers = require('./routes/loginUser');
const withdrawUsers = require('./routes/withdrawUsers');
const depositUser = require('./routes/depositUser');
const extractUsers = require('./routes/extractUsers');
const createKeyPixUsers = require('./routes/createKeyPixUsers');
const deleteKeyPixUsers = require('./routes/deleteKeyPixUsers');
const pixKeyTransaction = require('./routes/pixKeyTransaction');


const app = express();
const port = 8020;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}));

pixKeyTransaction(app);
deleteKeyPixUsers(app);
createKeyPixUsers(app);
extractUsers(app);
depositUser(app);
createUser(app);
loginUsers(app);
withdrawUsers(app);

app.get('/', (req, res) => res.send('funcionou'));


app.listen(port, () => console.log(`Tudo ok, porta ${port}`))