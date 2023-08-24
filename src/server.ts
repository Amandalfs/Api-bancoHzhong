import"dotenv/config";
import { app } from "./app";
const port = Number(process.env.PORT) | 8020;

app.listen(port, () => console.log(`Tudo ok, porta ${port}`));
