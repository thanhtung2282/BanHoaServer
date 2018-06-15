const {LoaiBoHoa} = require('../models/loaibohoa.model');
const {BoHoa} = require('../models/bohoa.model');
const {MyError} = require('../models/my-error');
const {checkObjectId} = require('../helpers/checkObjectId');
class loaibohoaService{
    static xemTatCaLoai(){
        return LoaiBoHoa.find({});
    }
    static async taoLoaiBoHoa(ten_loai,mo_ta){
        //kiểm tra nhập liệu
        if(!ten_loai) throw new MyError('TEN_LOAI_KHONG_DUOC_TRONG',400);
        if(!mo_ta) throw new MyError('MO_TA_KHONG_DUOC_TRONG',400);
        
        try {
            // save
            const loai = new LoaiBoHoa({ten_loai,mo_ta});
            return  await loai.save();
        } catch (error) {
            if(error.name == 'MongoError') throw new MyError('TEN_LOAI_DA_TON_TAI',400);
        }
     
    }
    static async suaLoaiBoHoa(id_loai,ten_loai,mo_ta){
        //kiểm tra nhập liệu
        if(!ten_loai) throw new MyError('TEN_LOAI_KHONG_DUOC_TRONG',400);
        if(!mo_ta) throw new MyError('MO_TA_KHONG_DUOC_TRONG',400);
        checkObjectId(id_loai);

        const query = {ten_loai,mo_ta};
        try {

            const loai = await LoaiBoHoa.findByIdAndUpdate(id_loai,query,{new:true});
            // ko tìm thấy loại
            if(!loai) throw new Error();
            return loai; 
        } catch (error) {
            if(error.name == 'MongoError') throw new MyError('TEN_LOAI_DA_TON_TAI',400);
            throw new MyError('KHONG_TIM_THAY_LOAI',404);       
        }
    }
    static async xoaLoaiBohoa(id_loai){
        checkObjectId(id_loai);
        //xoá loại bó hoa
        const loai = await LoaiBoHoa.findByIdAndRemove(id_loai);
        if(!loai)throw new MyError('KHONG_TIM_THAY_LOAI',404);
        // xoa bó hoa thuộc loại bị xoá
        const bohoa = await BoHoa.remove({loai_bo_hoa:id_loai});
        return loai;
    }
}
module.exports = {loaibohoaService}