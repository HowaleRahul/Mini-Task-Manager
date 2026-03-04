const app = require('./app');
const logger = require('./middlewares/logger');
require('dotenv').config();
const port = process.env.Port;

app.listen(port, () =>{
    logger.info(`Server running at port ${port}`);
});