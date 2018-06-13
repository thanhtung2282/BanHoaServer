const mongoose = require('mongoose');

function getDatabaseUri(){
    if(process.env.NODE_ENV === 'production') return '';
    if(process.env.NODE_ENV === 'test') return 'mongodb://localhost/banhoa-test';
    return 'mongodb://localhost/banhoa';
}

mongoose.connect(getDatabaseUri())
.then(()=>console.log('Đã Kết Nối Database'))
.catch((error)=>{
    console.log('Lỗi Kết Nối Database: '+ error.message);
    process.exit(1);
})