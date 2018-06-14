const {MyError} = require('../models/my-error');
const {checkObjectId} = require('../helpers/checkObjectId');
const {BoHoa} = require('../models/bohoa.model');
const {LoaiBoHoa} = require('../models/loaibohoa.model');

class bohoaService{
    static layTatCaBoHoa(){
        return BoHoa.find({});
    }
    static async taoBoHoa(ten_bo_hoa,mo_ta,gia_ban,hinh_anh,loai_bo_hoa){
        // không nhập liệu
        if(!ten_bo_hoa) throw new MyError('TEN_BO_HOA_KHONG_DUOC_TRONG',400);
        if(!mo_ta) throw new MyError('MO_TA_KHONG_DUOC_TRONG',400);
        if(!gia_ban) throw new MyError('GIA_BAN_KHONG_DUOC_TRONG',400);
        if(!hinh_anh) throw new MyError('HINH_ANH_KHONG_DUOC_TRONG',400);
        //check id
        checkObjectId(loai_bo_hoa);
        //check tồn tai loại
        const loai = await LoaiBoHoa.findById(loai_bo_hoa);
        if(!loai) throw new MyError('KHONG_TIM_THAY_LOAI_HOA_NAY',404);
        //tạo
        try {
            const bohoa  = new BoHoa({ten_bo_hoa,mo_ta,gia_ban,hinh_anh,loai_bo_hoa});
             
            await LoaiBoHoa.findByIdAndUpdate(loai_bo_hoa,{$push:{bohoas:bohoa._id}})
            
            return await bohoa.save();
            
        } catch (error) {
            // console.log(error.message)
            if(error.name == 'MongoError') throw new MyError('TEN_BO_HOA_DA_TON_TAI',400);            
        }
        

    }
    static async suaBohoa(ten_bo_hoa,mo_ta,gia_ban,hinh_anh,loai_bo_hoa,_id){
        //kiem tra nhap liệu
        if(!ten_bo_hoa) throw new MyError('TEN_BO_HOA_KHONG_DUOC_TRONG',400);
        if(!mo_ta) throw new MyError('MO_TA_KHONG_DUOC_TRONG',400);
        if(!gia_ban) throw new MyError('GIA_BAN_KHONG_DUOC_TRONG',400);
        if(!hinh_anh) throw new MyError('HINH_ANH_KHONG_DUOC_TRONG',400);
        checkObjectId(loai_bo_hoa,_id);
        //kiểm tra tồn tai loai hoa
        const loai = await LoaiBoHoa.findById(loai_bo_hoa);
        if(!loai) throw new MyError('KHONG_TIM_THAY_LOAI_HOA_NAY',404);
        const query = {ten_bo_hoa,mo_ta,gia_ban,hinh_anh,loai_bo_hoa};
        try {
            //lấy  bó hoa cũ
            const bohoa_1  = await BoHoa.findById(_id);
            if(!bohoa_1) throw new Error();
            //update
            const bohoa  = await BoHoa.findByIdAndUpdate(_id,query,{new:true});
            console.log(bohoa);
            // them bó hoa vào loại bó hoa mói
            await LoaiBoHoa.findByIdAndUpdate(loai_bo_hoa,{$push:{bohoas:_id}},{new:true})
            //xoa bó hoa trong loai bó hoa cũ  
            await LoaiBoHoa.findOneAndUpdate(bohoa_1.loai_bo_hoa,{$pull:{bohoas:_id}},{new:true})
            return  bohoa;
            
        } catch (error) {
            if(error.name == 'MongoError') throw new MyError('TEN_BO_HOA_DA_TON_TAI',400); 
            throw new MyError('KHONG_TIM_THAY_BO_HOA',404);            
        }
    }
}
module.exports = {bohoaService};