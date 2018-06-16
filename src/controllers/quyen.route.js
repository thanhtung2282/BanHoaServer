const {Router} = require('express');
const {quyenService} = require('../services/quyen.service');
const quyenRouter = Router();

quyenRouter.get('/',(req,res)=>{
    quyenService.danhsachQuyen()
    .then(quyen => res.send({success:true, quyen}))
    .catch(res.onError);
});

quyenRouter.post('/',(req,res)=>{
    const {ten_quyen,mo_ta} = req.body;
    quyenService.themQuyen(ten_quyen,mo_ta)
    .then(quyen => res.send({success:true, quyen}))
    .catch(res.onError);
});

module.exports = {quyenRouter};