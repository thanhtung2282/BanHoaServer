const {LoaiBoHoa} = require('../models/loaibohoa.model');
const {MyError} = require('../models/my-error');
const {checkObjectId} = require('../helpers/checkObjectId');
class loaibohoaService{
    static xemTatCaLoai(){
        return LoaiBoHoa.find({});
    }
    static async taoLoaiBoHoa(ten_loai,mo_ta){
        if(!ten_loai) throw new MyError('TEN_LOAI_KHONG_DUOC_TRONG',400);
        if(!mo_ta) throw new MyError('MO_TA_KHONG_DUOC_TRONG',400);
        try {
            const loai = new LoaiBoHoa({ten_loai,mo_ta});
            return  await loai.save();
        } catch (error) {
            if(error.name == 'MongoError') throw new MyError('TEN_LOAI_DA_TON_TAI',400);
        }
     
    }
    static async suaLoaiBoHoa(id_loai,ten_loai,mo_ta){
        if(!ten_loai) throw new MyError('TEN_LOAI_KHONG_DUOC_TRONG',400);
        if(!mo_ta) throw new MyError('MO_TA_KHONG_DUOC_TRONG',400);
        checkObjectId(id_loai);
        const query = {ten_loai,mo_ta};
        try {
            const loai = await LoaiBoHoa.findByIdAndUpdate(id_loai,query,{new:true});
            if(!loai) throw new Error();
            return loai; 
        } catch (error) {
            if(error.name == 'MongoError') throw new MyError('TEN_LOAI_DA_TON_TAI',400);
            throw new MyError('KHONG_TIM_THAY_LOAI',404);       
        }
    }
    static async xoaLoaiBohoa(id_loai){
        checkObjectId(id_loai);
        const loai = await LoaiBoHoa.findByIdAndRemove(id_loai);
        if(!loai)throw new MyError('KHONG_TIM_THAY_LOAI',404);
        return loai;
    }
}
module.exports = {loaibohoaService}