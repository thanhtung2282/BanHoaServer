const {MyError} = require('../models/my-error');
const {checkObjectId} = require('../helpers/checkObjectId');
const {BoHoa} = require('../models/bohoa.model');
const {LoaiBoHoa} = require('../models/loaibohoa.model');

class bohoaService{
    static layTatCaBoHoa(){
        return BoHoa.find({});
    }
    static async taoBoHoa(ten_bo_hoa,mo_ta,gia_ban,hinh_anh,loai_bo_hoa){
        if(!ten_bo_hoa) throw new MyError('TEN_BO_HOA_KHONG_DUOC_TRONG',400);
        if(!mo_ta) throw new MyError('MO_TA_KHONG_DUOC_TRONG',400);
        if(!gia_ban) throw new MyError('GIA_BAN_KHONG_DUOC_TRONG',400);
        if(!hinh_anh) throw new MyError('HINH_ANH_KHONG_DUOC_TRONG',400);
        checkObjectId(loai_bo_hoa);
        const loai = await LoaiBoHoa.findById(loai_bo_hoa);
        if(!loai) throw new MyError('KHONG_TIM_THAY_LOAI_HOA_NAY',404);
        const bohoa  = new BoHoa({ten_bo_hoa,mo_ta,gia_ban,hinh_anh,loai_bo_hoa});
        
        await LoaiBoHoa.findOneAndUpdate(loai_bo_hoa,{$push:{bohoas:bohoa._id}})
        return  bohoa.save();
        // return bohoa;
    }
}
module.exports = {bohoaService};