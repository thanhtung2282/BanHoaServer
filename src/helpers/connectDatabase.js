const mongoose = require('mongoose');

function getDatabaseUri(){
    if(process.env.NODE_ENV === 'production') return '';
    if(process.env.NODE_ENV === 'test') return 'mongodb://localhost/banhoa-test';
    return 'mongodb://localhost/banhoa';
}
mongoose.Promise = global.Promise;

mongoose.connect(getDatabaseUri(), { useMongoClient: true })
.then(() => console.log('Database connected.'))
.catch(error => {
    console.log('Lỗi Kết Nối Database: '+ error.message);
    process.exit(1);
});
