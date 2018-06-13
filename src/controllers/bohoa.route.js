const {Router} = require('express');
const {bohoaService} = require('../services/bohoa.service');
const bohoaRouter = Router();
//get all
bohoaRouter.get('/',(req,res)=>{
    bohoaService.layTatCaBoHoa()
    .then(bohoa => res.send({success:true,bohoa}))
    .catch(res.onError);
});
// tạo 
bohoaRouter.post('/',(req,res)=>{
    const {ten_bo_hoa,mo_ta,gia_ban,hinh_anh,idLoai} = req.body;
    bohoaService.taoBoHoa(ten_bo_hoa,mo_ta,gia_ban,hinh_anh,idLoai)
    .then(bohoa => res.send({success:true,bohoa}))
    .catch(res.onError);
});
module.exports = {bohoaRouter};