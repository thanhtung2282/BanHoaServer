const mongoose =require('mongoose');
const {Schema} = mongoose;
const bohoaSchema = new Schema({
    ten_bo_hoa:{type:String, required:true,trim:true,unique:true},
    mo_ta:{type:String, required:true,trim:true},
    gia_ban:{type:Number, required:true,trim:true},
    hinh_anh:{type:String,required:true,trim:true},
    so_luong_ton:{type:Number,required:true,trim:true},
    loai_bo_hoa:{type:mongoose.SchemaTypes.ObjectId,ref:'LoaiBoHoa'}
    
});
const BoHoa = mongoose.model('BoHoa',bohoaSchema);
module.exports = {BoHoa};