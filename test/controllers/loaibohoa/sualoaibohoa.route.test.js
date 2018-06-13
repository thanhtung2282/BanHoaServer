const supertest = require('supertest');
const {equal} = require('assert');
const {loaibohoaService} = require('../../../src/services/loaibohoa.service');
const {LoaiBoHoa} = require('../../../src/models/loaibohoa.model');
const {app} = require('../../../src/app');

describe('test PUT/loaibohoa/:id_loai',()=>{
    let id_loai;
    beforeEach('Tạo Loại Bó Hoa Để TEST Sửa',async()=>{
        const loaibohoa = await loaibohoaService.taoLoaiBoHoa('Hoa Sinh Nhật','Hoa Sinh Nhật Nè');
        id_loai = loaibohoa._id;
    });
    it('Có thể Sửa Loại Bó Hoa',async()=>{
        const body = {
            ten_loai : "Hoa Sinh Nhật Update",
            mo_ta:"Hoa Sinh Nhật Đẹp 1"
        };
        const response = await supertest(app).put('/loaibohoa/'+id_loai).send(body);
        const {success,loai} = response.body;
        // console.log(response.body)
        equal(success,true);
        equal(loai.ten_loai,"Hoa Sinh Nhật Update");
        equal(loai.mo_ta,"Hoa Sinh Nhật Đẹp 1");
        const loaiDb = await LoaiBoHoa.findById(id_loai);
        equal(loaiDb._id.toString(),id_loai);
        equal(loaiDb.ten_loai,"Hoa Sinh Nhật Update");
        equal(loaiDb.mo_ta,"Hoa Sinh Nhật Đẹp 1");
    });
    it('Không Thể Sửa Loại Bó Hoa Khi ten_loai Trống',async()=>{
        const body = {
            ten_loai : "",
            mo_ta:"Hoa Sinh Nhật Đẹp"
        };
        const response = await supertest(app).put('/loaibohoa/'+id_loai).send(body);
        const {success,loai,message} = response.body;
        equal(success,false);
        equal(loai,undefined);
        equal(message,"TEN_LOAI_KHONG_DUOC_TRONG");
        equal(response.status,400);
        const loaiDb = await LoaiBoHoa.findById(id_loai);
        equal(loaiDb._id.toString(),id_loai);
        equal(loaiDb.ten_loai,"Hoa Sinh Nhật");
        equal(loaiDb.mo_ta,"Hoa Sinh Nhật Nè");
    });
    it('Không Thể Sửa Loại Bó Hoa Khi mo_ta Trống',async()=>{
        const body = {
            ten_loai : "Hoa ",
            mo_ta:""
        };
        const response = await supertest(app).put('/loaibohoa/'+id_loai).send(body);
        const {success,loai,message} = response.body;
        equal(success,false);
        equal(loai,undefined);
        equal(message,"MO_TA_KHONG_DUOC_TRONG");
        equal(response.status,400);
        const loaiDb = await LoaiBoHoa.findById(id_loai);
        equal(loaiDb._id.toString(),id_loai);
        equal(loaiDb.ten_loai,"Hoa Sinh Nhật");
        equal(loaiDb.mo_ta,"Hoa Sinh Nhật Nè");
    });
    it('Không Thể Sửa Loại Bó Hoa Khi Sai ID Loai',async()=>{
        const body = {
            ten_loai : "Hoa Sinh Nhật Update",
            mo_ta:"Hoa Sinh Nhật Đẹp 1"
        };
        const response = await supertest(app).put('/loaibohoa/sxy').send(body);
        const {success,loai,message} = response.body;
        // console.log(response.body)
        equal(success,false);
        equal(loai,undefined);
        equal(message,"INVALID_ID");
        equal(response.status,400);
        const loaiDb = await LoaiBoHoa.findById(id_loai);
        equal(loaiDb._id.toString(),id_loai);
        equal(loaiDb.ten_loai,"Hoa Sinh Nhật");
        equal(loaiDb.mo_ta,"Hoa Sinh Nhật Nè");
    });
    it('Không Thể Sửa Loại Bó Hoa Khi Đã Xoá',async()=>{
        await LoaiBoHoa.remove({});
        const body = {
            ten_loai : "Hoa Sinh Nhật Update",
            mo_ta:"Hoa Sinh Nhật Đẹp 1"
        };
        const response = await supertest(app).put('/loaibohoa/'+id_loai).send(body);
        const {success,loai,message} = response.body;
        // console.log(response.body);
        equal(success,false);
        equal(loai,undefined);
        equal(message,"KHONG_TIM_THAY_LOAI");
        equal(response.status,404);
        const loaiDb = await LoaiBoHoa.findById(id_loai);
        equal(loaiDb,null);
    });
    it('Không Thể Sửa Loại Bó Hoa Khi ten_loai Trùng',async()=>{
        await loaibohoaService.taoLoaiBoHoa('Hoa Chia Buồn','Hoa Sinh Nhật Nè');
        const body = {
            ten_loai : "Hoa Chia Buồn",
            mo_ta:"Hoa Sinh Nhật Đẹp"
        };
        const response = await supertest(app).put('/loaibohoa/'+id_loai).send(body);
        const {success,loai,message} = response.body;
        // console.log(response.body)
        equal(success,false);
        equal(loai,undefined);
        equal(message,"TEN_LOAI_DA_TON_TAI");
        equal(response.status,400);
        const loaiDb = await LoaiBoHoa.findById(id_loai);
        equal(loaiDb._id.toString(),id_loai);
        equal(loaiDb.ten_loai,"Hoa Sinh Nhật");
        equal(loaiDb.mo_ta,"Hoa Sinh Nhật Nè");
    });
});
