const express =  require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const createUser = require('./routes/createUser');
const userAccont = require('./routes/users/userAconnt');
const loginUser = require('./routes/loginUser');
const withdrawUser = require('./routes/withdrawUser');
const depositUser = require('./routes/depositUser');
const extractUser = require('./routes/extractUser');
const createKeyPixUser = require('./routes/createKeyPixUser');
const deleteKeyPixUser = require('./routes/deleteKeyPixUser');
const pixKeyTransaction = require('./routes/pixKeyTransaction');


const app = express();
const port = 8020;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}));

userAccont(app);
pixKeyTransaction(app); 
deleteKeyPixUser(app);
createKeyPixUser(app); 
extractUser(app);
depositUser(app);
createUser(app);
loginUser(app);
withdrawUser(app);

app.get('/', (req, res) => res.send('funcionou'));


app.listen(port, () => console.log(`Tudo ok, porta ${port}`))