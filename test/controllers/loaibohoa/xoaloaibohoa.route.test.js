const supertest = require('supertest');
const {equal} = require('assert');
const {loaibohoaService} = require('../../../src/services/loaibohoa.service');
const {LoaiBoHoa} = require('../../../src/models/loaibohoa.model');
const {app} = require('../../../src/app');

describe('test DELETE/loaibohoa/:id_loai',()=>{
    let id_loai;
    beforeEach('Tạo Loại Bó Hoa Để TEST Xoá',async()=>{
        const loaibohoa = await loaibohoaService.taoLoaiBoHoa('Hoa Sinh Nhật','Hoa Sinh Nhật Nè');
        id_loai = loaibohoa._id;
    });
    it('Có thể Xoá Loại Bó Hoa',async()=>{
        const response = await supertest(app).delete('/loaibohoa/'+id_loai);
        const {success,loai} = response.body;
        equal(success,true);
        equal(loai.ten_loai,"Hoa Sinh Nhật");
        equal(loai.mo_ta,"Hoa Sinh Nhật Nè");
        const loaiDb = await LoaiBoHoa.findById(id_loai);
        equal(loaiDb,null);
    });
    it('Không thể Xoá Loại Bó Hoa 2 lần',async()=>{
        await supertest(app).delete('/loaibohoa/'+id_loai);
        const response = await supertest(app).delete('/loaibohoa/'+id_loai);
        // console.log(response.body)
        const {success,loai,message} = response.body;
        equal(success,false);
        equal(loai,undefined);
        equal(message,"KHONG_TIM_THAY_LOAI");
        equal(response.status,404);
        const loaiDb = await LoaiBoHoa.findById(id_loai);
        equal(loaiDb,null);
    });
    it('Không thể Xoá Loại Bó Hoa khi Sai objectID',async()=>{
        const response = await supertest(app).delete('/loaibohoa/'+id_loai+1);
        // console.log(response.body)
        const {success,loai,message} = response.body;
        equal(success,false);
        equal(loai,undefined);
        equal(message,"INVALID_ID");
        equal(response.status,400);
        const loaiDb = await LoaiBoHoa.findById(id_loai);
        equal(loaiDb._id.toString(),id_loai);
    });
    it('Không thể Xoá Loại Bó Hoa khi Sai Id',async()=>{
        const response = await supertest(app).delete('/loaibohoa/5b211154b2f55f30b047f89b');
        // console.log(response.body)
        const {success,loai,message} = response.body;
        equal(success,false);
        equal(loai,undefined);
        equal(response.status,404);
        equal(message,"KHONG_TIM_THAY_LOAI");
        const loaiDb = await LoaiBoHoa.findById(id_loai);
        equal(loaiDb._id.toString(),id_loai);
    });
});
