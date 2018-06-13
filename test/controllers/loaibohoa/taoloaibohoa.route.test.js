const supertest = require('supertest');
const {equal} = require('assert');
const {loaibohoaService} = require('../../../src/services/loaibohoa.service');
const {LoaiBoHoa} = require('../../../src/models/loaibohoa.model');
const {app} = require('../../../src/app');

describe('test POST/loaibohoa',()=>{
    it('Có Thể Tạo Loại Bó Hoa',async()=>{
        const body = {
            ten_loai : "Hoa Sinh Nhật",
            mo_ta:"Hoa Sinh Nhật Đẹp"
        };
        const response = await supertest(app).post('/loaibohoa').send(body);
        const {success,loai} = response.body;
        equal(success,true);
        equal(loai.ten_loai,"Hoa Sinh Nhật");
        equal(loai.mo_ta,"Hoa Sinh Nhật Đẹp");
        const loaiDb = await LoaiBoHoa.findOne({});
        equal(loaiDb._id,loai._id);
        equal(loaiDb.ten_loai,"Hoa Sinh Nhật");
        equal(loaiDb.mo_ta,"Hoa Sinh Nhật Đẹp");
    });
    it('Không Thể Tạo Loại Bó Hoa Khi ten_loai Trống',async()=>{
        const body = {
            ten_loai : "",
            mo_ta:"Hoa Sinh Nhật Đẹp"
        };
        const response = await supertest(app).post('/loaibohoa').send(body);
        const {success,loai,message} = response.body;
        equal(success,false);
        equal(loai,undefined);
        equal(message,"TEN_LOAI_KHONG_DUOC_TRONG");
        equal(response.status,400);
        const loaiDb = await LoaiBoHoa.findOne({});
        equal(loaiDb,null);
    });
    it('Không Thể Tạo Loại Bó Hoa Khi mo_ta Trống',async()=>{
        const body = {
            ten_loai : "Hoa Sinh Nhật",
            mo_ta:""
        };
        const response = await supertest(app).post('/loaibohoa').send(body);
        const {success,loai,message} = response.body;
        equal(success,false);
        equal(loai,undefined);
        equal(message,"MO_TA_KHONG_DUOC_TRONG");
        equal(response.status,400);
        const loaiDb = await LoaiBoHoa.findOne({});
        equal(loaiDb,null);
    });
});
