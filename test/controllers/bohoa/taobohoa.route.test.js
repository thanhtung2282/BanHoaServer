const supertest = require('supertest');
const {equal} = require('assert')
const {app} = require('../../../src/app');
const {BoHoa} = require('../../../src/models/bohoa.model');
const {LoaiBoHoa} = require('../../../src/models/loaibohoa.model');
const {loaibohoaService} = require('../../../src/services/loaibohoa.service');
const {bohoaService}= require('../../../src/services/bohoa.service');
describe('TEST POST/bohoa',()=>{
    let idLoai;
    beforeEach('Tạo Loại Bó Hoa Để Test Tạo Bó Hoa',async()=>{
        const loai = await loaibohoaService.taoLoaiBoHoa('Hoa Sinh Nhật','Mô Tả Hoa Sinh Nhật');
        idLoai = loai._id;
    });
    it('Có Thể Tạo Bó Hoa',async()=>{
        const body = {
            ten_bo_hoa : "Bó Hoa 01",
            mo_ta : "Bó Hoa 01",
            gia_ban :2000000,
            hinh_anh : "Bohoa01.png",
            idLoai
        }
        const response = await supertest(app).post('/bohoa').send(body);
        const {success,bohoa}= response.body;
        equal(success,true);
        equal(bohoa.ten_bo_hoa,"Bó Hoa 01");
        equal(bohoa.mo_ta,"Bó Hoa 01");
        equal(bohoa.gia_ban,2000000);
        equal(bohoa.hinh_anh,"Bohoa01.png");
        equal(bohoa.loai_bo_hoa,idLoai);
        const bohoaDb = await BoHoa.findById(bohoa._id).populate('loai_bo_hoa');
        equal(bohoaDb.ten_bo_hoa,"Bó Hoa 01");
        equal(bohoaDb.mo_ta,"Bó Hoa 01");
        equal(bohoaDb.gia_ban,2000000);
        equal(bohoaDb.hinh_anh,"Bohoa01.png");
        equal(bohoaDb.loai_bo_hoa._id.toString(),idLoai);
        equal(bohoaDb.loai_bo_hoa.ten_loai,'Hoa Sinh Nhật');
        equal(bohoaDb.loai_bo_hoa.bohoas[0],bohoa._id);
    });
    it('Không Thể Tạo Bó Hoa Khi ten_bo_hoa Trống',async()=>{
        const body = {
            ten_bo_hoa : "",
            mo_ta : "Bó Hoa 01",
            gia_ban :2000000,
            hinh_anh : "Bohoa01.png",
            idLoai
        }
        const response = await supertest(app).post('/bohoa').send(body);
        const {success,bohoa,message}= response.body;
        equal(success,false);
        equal(bohoa,null);
        equal(message,'TEN_BO_HOA_KHONG_DUOC_TRONG');
        const bohoaDb = await BoHoa.findOne({});
        equal(bohoaDb,null);
        const loaibohoaDb = await LoaiBoHoa.findById(idLoai);
        equal(loaibohoaDb.bohoas.length,0);
    })
    it('Không Thể Tạo Bó Hoa Khi mo_ta Trống',async()=>{
        const body = {
            ten_bo_hoa : "Bó Hoa 01",
            mo_ta : "",
            gia_ban :2000000,
            hinh_anh : "Bohoa01.png",
            idLoai
        }
        const response = await supertest(app).post('/bohoa').send(body);
        const {success,bohoa,message}= response.body;
        equal(success,false);
        equal(bohoa,null);
        equal(message,'MO_TA_KHONG_DUOC_TRONG');
        const bohoaDb = await BoHoa.findOne({});
        equal(bohoaDb,null);
        const loaibohoaDb = await LoaiBoHoa.findById(idLoai);
        equal(loaibohoaDb.bohoas.length,0);
    })
    it('Không Thể Tạo Bó Hoa Khi gia_ban Trống',async()=>{
        const body = {
            ten_bo_hoa : "Bó Hoa 01",
            mo_ta : "Bó Hoa 01",
            gia_ban :'',
            hinh_anh : "Bohoa01.png",
            idLoai
        }
        const response = await supertest(app).post('/bohoa').send(body);
        const {success,bohoa,message}= response.body;
        equal(success,false);
        equal(bohoa,null);
        equal(message,'GIA_BAN_KHONG_DUOC_TRONG');
        const bohoaDb = await BoHoa.findOne({});
        equal(bohoaDb,null);
        const loaibohoaDb = await LoaiBoHoa.findById(idLoai);
        equal(loaibohoaDb.bohoas.length,0);
    })
    it('Không Thể Tạo Bó Hoa Khi hinh_anh Trống',async()=>{
        const body = {
            ten_bo_hoa : "Bó Hoa 01",
            mo_ta : "Bó Hoa 01",
            gia_ban :200000,
            hinh_anh : '',
            idLoai
        }
        const response = await supertest(app).post('/bohoa').send(body);
        const {success,bohoa,message}= response.body;
        equal(success,false);
        equal(bohoa,null);
        equal(message,'HINH_ANH_KHONG_DUOC_TRONG');
        const bohoaDb = await BoHoa.findOne({});
        equal(bohoaDb,null);
        const loaibohoaDb = await LoaiBoHoa.findById(idLoai);
        equal(loaibohoaDb.bohoas.length,0);
    })
    it('Không Thể Tạo Bó Hoa Khi ObjectId Loai',async()=>{
        const body = {
            ten_bo_hoa : "Bó Hoa 01",
            mo_ta : "Bó Hoa 01",
            gia_ban :200000,
            hinh_anh : 'Bohoa1.png',
            idLoai:'asdadasasdasd12'
        }
        const response = await supertest(app).post('/bohoa').send(body);
        const {success,bohoa,message}= response.body;
        equal(success,false);
        equal(bohoa,null);
        equal(message,'INVALID_ID');
        const bohoaDb = await BoHoa.findOne({});
        equal(bohoaDb,null);
        const loaibohoaDb = await LoaiBoHoa.findById(idLoai);
        equal(loaibohoaDb.bohoas.length,0);
    })
    it('Không Thể Tạo Bó Hoa Khi Sai Id Loai Trống',async()=>{
        const body = {
            ten_bo_hoa : "Bó Hoa 01",
            mo_ta : "Bó Hoa 01",
            gia_ban :200000,
            hinh_anh : 'Bohoa1.png',
            idLoai:'9b21229bba36371bf82ae2c3'
        }
        const response = await supertest(app).post('/bohoa').send(body);
        const {success,bohoa,message}= response.body; 
        equal(success,false);
        equal(bohoa,null);
        equal(message,'KHONG_TIM_THAY_LOAI_HOA_NAY');
        const bohoaDb = await BoHoa.findOne({});
        equal(bohoaDb,null);
        const loaibohoaDb = await LoaiBoHoa.findById(idLoai);
        equal(loaibohoaDb.bohoas.length,0);
    })
    it('Không Thể Tạo Bó Hoa Khi Trùng Tên Bó Hoa',async()=>{
        const Temp = await bohoaService.taoBoHoa('Bó Hoa 01',"Bó Hoa 01",20000,"Bohoa01.png",idLoai);
        const body = {
            ten_bo_hoa : "Bó Hoa 01",
            mo_ta : "Bó Hoa 01",
            gia_ban :20000,
            hinh_anh : "Bohoa01.png",
            idLoai
        }
                
        const response = await supertest(app).post('/bohoa').send(body);
        
        const {success,bohoa,message}= response.body ;
        
        equal(success,false);
        equal(bohoa,null);
        equal(message,'TEN_BO_HOA_DA_TON_TAI');
        const bohoaDb = await BoHoa.findById(Temp._id).populate('loai_bo_hoa');
        equal(bohoaDb.ten_bo_hoa,"Bó Hoa 01");
        equal(bohoaDb.loai_bo_hoa.bohoas[0].toString(),Temp._id);

    })
});