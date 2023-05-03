require('express-async-errors')

const express =  require('express');
const cors = require('cors');
const routes = require('./routes');

const AppError = require('./utils/AppError');

const userAccont = require('./routes/users/userAconnt');

const app = express();
const port = 8020;

app.use(cors());
app.use(express.json());

app.use(routes);

userAccont(app);

app.use((error, req, res, next)=>{
    if(error instanceof AppError){
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error);
    
    return res.status(500).json({
        status: "Error",
        message: "Internal Server Error"
    })
})

app.listen(port, () => console.log(`Tudo ok, porta ${port}`))