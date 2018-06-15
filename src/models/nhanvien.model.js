const mongoose = require('mongoose');
const {Schema} = mongoose;
const nhanvienShema = new Schema({
    ten_nhan_vien:{type:String,trim:true,required:true},
    dia_chi:{type:String,trim:true,required:true},
    ngay_sinh:{type:Date,trim:true,required:true},
    so_dien_thoai:{type:Number,trim:true,required:true},
    email:{type:String,trim:true,required:true,unique:true},
    quyen:{type:mongoose.SchemaTypes.ObjectId,ref:'Quyen'}
});
const NhanVien  = mongoose.model('NhanVien',nhanvienShema);
module.exports = {NhanVien};