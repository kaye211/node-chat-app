const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');

const port = process.env.PORT || 3000;
const app = express();

//configure express static middleware
app.use(express.static(publicPath));
//start up server
app.listen(port, () => {
	console.log(`Server started at ${port} `);
});
