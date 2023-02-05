const express =  require('express');
const bodyParser = require('body-parser');

const createUsers = require('./routes/createUsers');
const loginUsers = require('./routes/loginUsers');
const withdrawUsers = require('./routes/withdrawUsers');
const depositUsers = require('./routes/depositUsers');
const extractUsers = require('./routes/extractUsers');
const createKeyPixUsers = require('./routes/createKeyPixUsers');
const deleteKeyPixUsers = require('./routes/deleteKeyPixUsers');


const app = express();
const port = 8020;

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false}))

deleteKeyPixUsers(app);
createKeyPixUsers(app);
extractUsers(app);
depositUsers(app);
createUsers(app);
loginUsers(app);
withdrawUsers(app);

app.get('/', (req, res) => res.send('funcionou'));


app.listen(port, () => console.log(`Tudo ok, porta ${port}`))