const mongoose =require('mongoose');
const {Schema} = mongoose;
const bohoaSchema = new Schema({
    ten_bo_hoa:{type:String, required:true,trim:true,unique:true},
    mo_ta:{type:String, required:true,trim:true},
    gia_ban:{type:Number, required:true,trim:true},
    gia_khuyen_mai:{type:Number,trim:true},
    ngay_bat_dau:{type:Date ,trim:true},
    ngay_ket_thuc:{type:Date ,trim:true},
    hinh_anh:{type:String,required:true,trim:true},
    loai_bo_hoa:{type:mongoose.SchemaTypes.ObjectId,ref:'LoaiBoHoa'}
    
});
const BoHoa = mongoose.model('BoHoa',bohoaSchema);
module.exports = {BoHoa};