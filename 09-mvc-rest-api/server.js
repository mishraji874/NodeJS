const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;
const { logger } = require('./middleware/logEvents');
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const corsOptions = require('./config/corsOptions');

//custom middleware logger
app.use(logger);

//cross origin resource sharing

app.use(cors(corsOptions));

//built in middleware to handle urlencoded data
//in other words, from data:
//'content-type: application/x-www-form-urlencoded'

app.use(express.urlencoded({ extended: false }));

//built in middleware for json
app.use(express.json());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root'));
app.use('/employees', require('./routes/api/employees'));

app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    if(req.accepts('json')) {
        res.json({ error: "404 Not Found" });
    } else {
        res.type('text').send('404 Not Found');
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));