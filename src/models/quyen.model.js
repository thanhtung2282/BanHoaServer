const mongoose = require('mongoose');
const {Schema} = mongoose;
const quyenShema = new Schema({
    ten_quyen:{type:String,trim:true,required:true,unique:true},
    mo_ta:{type:String,trim:true,required:true},
    nhanvien:[{type:mongoose.SchemaTypes.ObjectId,ref:'NhanVien'}]

});
const Quyen  = mongoose.model('Quyen',quyenShema);
module.exports = {Quyen};