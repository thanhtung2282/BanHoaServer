const {LoaiBoHoa} = require('../models/loaibohoa.model');
const {MyError} = require('../models/my-error');
class loaibohoaService{
    static xemTatCaLoai(){
        return LoaiBoHoa.find({});
    }
    static async taoLoaiBoHoa(ten_loai,mo_ta){
        if(!ten_loai) throw new MyError('TEN_LOAI_KHONG_DUOC_TRONG',400);
        if(!mo_ta) throw new MyError('MO_TA_KHONG_DUOC_TRONG',400);
        const loai = new LoaiBoHoa({ten_loai,mo_ta});
        return  loai.save();
     
    }
}
module.exports = {loaibohoaService}