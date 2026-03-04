const express = require('express');
const app = express();
const taskRoutes = require('./routes/taskRoute');
const logger = require('./middlewares/logger');

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
});

app.use('/api', taskRoutes);

app.use((req,res)=>{
    logger.warn(`404 - Invalid URL: ${req.path}`);
    res.status(404).json({message : "invalid url"});
});

app.use((err, req, res, next) => {
    logger.error(`Error: ${err.message}`);
    res.status(500).json({success: false, message: 'Internal Server Error'});
});

module.exports = app;