const express =  require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const routes = require('./routes')

const userAccont = require('./routes/users/userAconnt');

const app = express();
const port = 8020;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}));


app.use(routes);

userAccont(app);

app.get('/', (req, res) => res.send('funcionou'));


app.listen(port, () => console.log(`Tudo ok, porta ${port}`))