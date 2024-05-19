const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const routes =require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB 연결
if (process.env.NODE_ENV !== 'production') {
require('dotenv').config()
}

try {
mongoose.connect(process.env.MONGO_DB_SECRET) //useNewUrlParser 옵션이 mongoose 5.3.0 이상 버전부터는 default 기능으로 내장되어 따로 옵션설정을 할 필요 없음.
console.log('MongoDb 연결 완료')

} catch (error) {
console.log(error)
}

app.use(routes);


app.listen(PORT, function(){
console.log(`Listening on ${PORT}`);
}); 