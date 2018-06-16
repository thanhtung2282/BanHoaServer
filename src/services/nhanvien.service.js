const {NhanVien} = require('../models/nhanvien.model');
const {MyError} = require('../models/my-error');
class NhanVienService{
    static danhsachNhanVien(){
        return NhanVien.find({});
    }
    static async themNhanVien(ten_nhan_vien,dia_chi,ngay_sinh,so_dien_thoai,email,quyen){
        // kiem tra nhap lieu
        if(!ten_nhan_vien) throw new MyError('TEN_NHAN_VIEN_KHONG_DUOC_TRONG',400);
        if(!dia_chi) throw new MyError('DIA_CHI_KHONG_DUOC_TRONG',400);
        if(!ngay_sinh) throw new MyError('NGAY_SINH_KHONG_DUOC_TRONG',400);
        if(!so_dien_thoai) throw new MyError('SO_DIEN_THOAI_KHONG_DUOC_TRONG',400);
        if(!email) throw new MyError('EMAIL',400);
        //save
        try {
            const nhanvien =  new NhanVien({ten_nhan_vien,dia_chi,ngay_sinh,so_dien_thoai,email,quyen});
            return await nhanvien.save(); 
        } catch (error) {
            if(error.name == 'MongoError') throw new MyError('EMAIL_DA_TON_TAI',400);
        }
    }
}