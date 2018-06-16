const {Quyen} = require('../models/quyen.model');
const {MyError} = require('../models/my-error');
class quyenService {

    static danhsachQuyen(){
        return Quyen.find({});
    }
    static async themQuyen(ten_quyen,mo_ta){
        //ko nhap lieu
        if(!ten_quyen) throw new MyError('TEN_QUYEN_KHONG_DUOC_TRONG',400);
        if(!mo_ta) throw new MyError('MO_TA_KHONG_DUOC_TRONG',400);
        //save
        try {
            // save
            const quyen = new Quyen({ten_quyen,mo_ta});
            return  await quyen.save();
        } catch (error) {
            if(error.name == 'MongoError') throw new MyError('TEN_QUYEN_DA_TON_TAI',400);
        }
    }
}
module.exports = {quyenService};