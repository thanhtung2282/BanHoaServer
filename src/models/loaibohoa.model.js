const mongoose =require('mongoose');
const {Schema} = mongoose;
const loaibohoaSchema = new Schema({
    ten_loai:{type:String, required:true,trim:true,unique:true},
    mo_ta:{type:String, required:true,trim:true},
    bohoas:[{type:mongoose.SchemaTypes.ObjectId,red:'BoHoa'}]
});
const LoaiBoHoa = mongoose.model('BoHoa',loaibohoaSchema);
module.exports = {LoaiBoHoa};