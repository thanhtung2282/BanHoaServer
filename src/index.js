require('./helpers/connectDatabase');
const {app} =require('./app');

app.listen(3000,()=> console.log('Kết Nối Server Thành Công'));