const app = require('./src/config/express.config');
const DB = require('./src/config/db.config');
require('dotenv').config();
DB()


app.listen(process.env.PORT, () => {
    console.log(`Server start on ${process.env.PORT}`);
});