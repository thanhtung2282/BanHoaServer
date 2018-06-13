const {Router} = require('express');
const {loaibohoaService} = require('../services/loaibohoa.service');

const loaibohoaRouter = Router();
//lay tat ca
loaibohoaRouter.get('/',(req,res)=>{
    loaibohoaService.xemTatCaLoai()
    .then(loai => res.send({success:true, loai}))
    .catch(res.onError);
});
//tạo loai
loaibohoaRouter.post('/',(req,res)=>{
    const {ten_loai,mo_ta} = req.body;
    loaibohoaService.taoLoaiBoHoa(ten_loai,mo_ta)
    .then(loai => res.send({success:true, loai}))
    .catch(res.onError);
});
module.exports = {loaibohoaRouter};