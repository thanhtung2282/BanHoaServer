const supertest = require('supertest');
const {equal} = require('assert')
const {app} = require('../../../src/app');
const {BoHoa} = require('../../../src/models/bohoa.model');
const {LoaiBoHoa} = require('../../../src/models/loaibohoa.model');
const {loaibohoaService} = require('../../../src/services/loaibohoa.service');
const {bohoaService}= require('../../../src/services/bohoa.service');
describe('TEST PUT/bohoa/:_id',()=>{
    let idLoai_1 ,idLoai_2 , idBoHoa ;
    beforeEach('Tạo DATA ',async()=>{
        const loai_1 = await loaibohoaService.taoLoaiBoHoa('Hoa Sinh Nhật','Mô Tả Hoa Sinh Nhật');
        idLoai_1 = loai_1._id;
        const loai_2 = await loaibohoaService.taoLoaiBoHoa('Hoa Chia Buồn','Mô Tả Hoa Chia Buồn');
        idLoai_2 = loai_2._id;
        const bohoa = await bohoaService.taoBoHoa('Bó Hoa 001','Mô Tả Bó Hoa 001',200000,'bohoa01.png',idLoai_1);
        idBoHoa = bohoa._id;
    });
    it('Có Thể Sửa Bó Hoa',async()=>{
        const body = {
            ten_bo_hoa : "Bó Hoa 02",
            mo_ta : "Bó Hoa 02",
            gia_ban :3000000,
            hinh_anh : "Bohoa02.png",
            idLoai:idLoai_2
        }
        const response = await supertest(app).put('/bohoa/'+idBoHoa).send(body);
        const {success,bohoa}= response.body;    
        equal(success,true);
        equal(bohoa.ten_bo_hoa,"Bó Hoa 02");
        equal(bohoa.mo_ta,"Bó Hoa 02");
        equal(bohoa.gia_ban,3000000);
        equal(bohoa.hinh_anh,"Bohoa02.png");
        equal(bohoa.loai_bo_hoa,idLoai_2);
        const bohoaDb = await BoHoa.findById(idBoHoa).populate('loai_bo_hoa');
        equal(bohoaDb.ten_bo_hoa,"Bó Hoa 02");
        equal(bohoaDb.mo_ta,"Bó Hoa 02");
        equal(bohoaDb.gia_ban,3000000);
        equal(bohoaDb.hinh_anh,"Bohoa02.png");
        equal(bohoaDb.loai_bo_hoa._id.toString(),idLoai_2);
        equal(bohoaDb.loai_bo_hoa.ten_loai,'Hoa Chia Buồn');
        equal(bohoaDb.loai_bo_hoa.bohoas[0].toString(),idBoHoa);
        const loaiDb = await LoaiBoHoa.findById(idLoai_1);
        equal(loaiDb.bohoas.length,0);        
    });
    it('Không  Thể Sửa Bó Hoa Khi Trống ten_bo_hoa',async()=>{
        const body = {
            ten_bo_hoa : "",
            mo_ta : "Bó Hoa 02",
            gia_ban :3000000,
            hinh_anh : "Bohoa02.png",
            idLoai:idLoai_2
        }
        const response = await supertest(app).put('/bohoa/'+idBoHoa).send(body);
        const {success,bohoa,message}= response.body;    
        equal(success,false);
        equal(message,"TEN_BO_HOA_KHONG_DUOC_TRONG");
        equal(bohoa,undefined);
        equal(response.status,400);
        const bohoaDb = await BoHoa.findById(idBoHoa).populate('loai_bo_hoa');
        equal(bohoaDb.ten_bo_hoa,"Bó Hoa 001");
        equal(bohoaDb.mo_ta,"Mô Tả Bó Hoa 001");
        equal(bohoaDb.gia_ban,200000);
        equal(bohoaDb.hinh_anh,"bohoa01.png");
        equal(bohoaDb.loai_bo_hoa._id.toString(),idLoai_1);
        equal(bohoaDb.loai_bo_hoa.ten_loai,'Hoa Sinh Nhật');
        equal(bohoaDb.loai_bo_hoa.bohoas[0].toString(),idBoHoa);
        const loaiDb = await LoaiBoHoa.findById(idLoai_2);
        equal(loaiDb.bohoas.length,0);        
    });
    it('Không  Thể Sửa Bó Hoa Khi Trống mo_ta',async()=>{
        const body = {
            ten_bo_hoa : "Bó Hoa 02",
            mo_ta : "",
            gia_ban :3000000,
            hinh_anh : "Bohoa02.png",
            idLoai:idLoai_2
        }
        const response = await supertest(app).put('/bohoa/'+idBoHoa).send(body);
        const {success,bohoa,message}= response.body;    
        equal(success,false);
        equal(message,"MO_TA_KHONG_DUOC_TRONG");
        equal(bohoa,undefined);
        equal(response.status,400);
        const bohoaDb = await BoHoa.findById(idBoHoa).populate('loai_bo_hoa');
        equal(bohoaDb.ten_bo_hoa,"Bó Hoa 001");
        equal(bohoaDb.mo_ta,"Mô Tả Bó Hoa 001");
        equal(bohoaDb.gia_ban,200000);
        equal(bohoaDb.hinh_anh,"bohoa01.png");
        equal(bohoaDb.loai_bo_hoa._id.toString(),idLoai_1);
        equal(bohoaDb.loai_bo_hoa.ten_loai,'Hoa Sinh Nhật');
        equal(bohoaDb.loai_bo_hoa.bohoas[0].toString(),idBoHoa);
        const loaiDb = await LoaiBoHoa.findById(idLoai_2);
        equal(loaiDb.bohoas.length,0);        
    });
    it('Không  Thể Sửa Bó Hoa Khi Trống gia_ban',async()=>{
        const body = {
            ten_bo_hoa : "Bó Hoa 02",
            mo_ta : "Bó Hoa 02",
            gia_ban :'',
            hinh_anh : "Bohoa02.png",
            idLoai:idLoai_2
        }
        const response = await supertest(app).put('/bohoa/'+idBoHoa).send(body);
        const {success,bohoa,message}= response.body;    
        equal(success,false);
        equal(message,"GIA_BAN_KHONG_DUOC_TRONG");
        equal(bohoa,undefined);
        equal(response.status,400);
        const bohoaDb = await BoHoa.findById(idBoHoa).populate('loai_bo_hoa');
        equal(bohoaDb.ten_bo_hoa,"Bó Hoa 001");
        equal(bohoaDb.mo_ta,"Mô Tả Bó Hoa 001");
        equal(bohoaDb.gia_ban,200000);
        equal(bohoaDb.hinh_anh,"bohoa01.png");
        equal(bohoaDb.loai_bo_hoa._id.toString(),idLoai_1);
        equal(bohoaDb.loai_bo_hoa.ten_loai,'Hoa Sinh Nhật');
        equal(bohoaDb.loai_bo_hoa.bohoas[0].toString(),idBoHoa);
        const loaiDb = await LoaiBoHoa.findById(idLoai_2);
        equal(loaiDb.bohoas.length,0);        
    });
    it('Không  Thể Sửa Bó Hoa Khi Trống hinh_anh',async()=>{
        const body = {
            ten_bo_hoa : "Bó Hoa 02",
            mo_ta : "Bó Hoa 02",
            gia_ban :200000,
            hinh_anh : "",
            idLoai:idLoai_2
        }
        const response = await supertest(app).put('/bohoa/'+idBoHoa).send(body);
        const {success,bohoa,message}= response.body;    
        equal(success,false);
        equal(message,"HINH_ANH_KHONG_DUOC_TRONG");
        equal(bohoa,undefined);
        equal(response.status,400);
        const bohoaDb = await BoHoa.findById(idBoHoa).populate('loai_bo_hoa');
        equal(bohoaDb.ten_bo_hoa,"Bó Hoa 001");
        equal(bohoaDb.mo_ta,"Mô Tả Bó Hoa 001");
        equal(bohoaDb.gia_ban,200000);
        equal(bohoaDb.hinh_anh,"bohoa01.png");
        equal(bohoaDb.loai_bo_hoa._id.toString(),idLoai_1);
        equal(bohoaDb.loai_bo_hoa.ten_loai,'Hoa Sinh Nhật');
        equal(bohoaDb.loai_bo_hoa.bohoas[0].toString(),idBoHoa);
        const loaiDb = await LoaiBoHoa.findById(idLoai_2);
        equal(loaiDb.bohoas.length,0);        
    });
    it('Không  Thể Sửa Bó Hoa Khi ObjectID Loai',async()=>{
        const body = {
            ten_bo_hoa : "Bó Hoa 02",
            mo_ta : "Bó Hoa 02",
            gia_ban :200000,
            hinh_anh : "Bohoa02.png",
            idLoai:"xyz"
        }
        const response = await supertest(app).put('/bohoa/'+idBoHoa).send(body);
        const {success,bohoa,message}= response.body;    
        equal(success,false);
        equal(message,"INVALID_ID");
        equal(bohoa,undefined);
        equal(response.status,400);
        const bohoaDb = await BoHoa.findById(idBoHoa).populate('loai_bo_hoa');
        equal(bohoaDb.ten_bo_hoa,"Bó Hoa 001");
        equal(bohoaDb.mo_ta,"Mô Tả Bó Hoa 001");
        equal(bohoaDb.gia_ban,200000);
        equal(bohoaDb.hinh_anh,"bohoa01.png");
        equal(bohoaDb.loai_bo_hoa._id.toString(),idLoai_1);
        equal(bohoaDb.loai_bo_hoa.ten_loai,'Hoa Sinh Nhật');
        equal(bohoaDb.loai_bo_hoa.bohoas[0].toString(),idBoHoa);
        const loaiDb = await LoaiBoHoa.findById(idLoai_2);
        equal(loaiDb.bohoas.length,0);        
    });
    it('Không  Thể Sửa Bó Hoa Khi Ko Tìm Thấy Loại',async()=>{
        await LoaiBoHoa.findByIdAndRemove(idLoai_2);
        const body = {
            ten_bo_hoa : "Bó Hoa 02",
            mo_ta : "Bó Hoa 02",
            gia_ban :200000,
            hinh_anh : "Bohoa02.png",
            idLoai:idLoai_2
        }
        const response = await supertest(app).put('/bohoa/'+idBoHoa).send(body);
        const {success,bohoa,message}= response.body;    
        equal(success,false);
        equal(message,"KHONG_TIM_THAY_LOAI_HOA_NAY");
        equal(bohoa,undefined);
        equal(response.status,404);
        const bohoaDb = await BoHoa.findById(idBoHoa).populate('loai_bo_hoa');
        equal(bohoaDb.ten_bo_hoa,"Bó Hoa 001");
        equal(bohoaDb.mo_ta,"Mô Tả Bó Hoa 001");
        equal(bohoaDb.gia_ban,200000);
        equal(bohoaDb.hinh_anh,"bohoa01.png");
        equal(bohoaDb.loai_bo_hoa._id.toString(),idLoai_1);
        equal(bohoaDb.loai_bo_hoa.ten_loai,'Hoa Sinh Nhật');
        equal(bohoaDb.loai_bo_hoa.bohoas[0].toString(),idBoHoa);
        const loaiDb = await LoaiBoHoa.findById(idLoai_2);
        equal(loaiDb,null);        
    });
    it('Không  Thể Sửa Bó Hoa Khi Ko Tìm Thấy Bó Hoa',async()=>{
        const body = {
            ten_bo_hoa : "Bó Hoa 02",
            mo_ta : "Bó Hoa 02",
            gia_ban :200000,
            hinh_anh : "Bohoa02.png",
            idLoai:idLoai_2
        }
        const response = await supertest(app).put('/bohoa/9b21d38be5a4a621f4ae787c').send(body);
        const {success,bohoa,message}= response.body;    
        equal(success,false);
        equal(message,"KHONG_TIM_THAY_BO_HOA");
        equal(bohoa,undefined);
        equal(response.status,404);
        const bohoaDb = await BoHoa.findById('9b21d38be5a4a621f4ae787c').populate('loai_bo_hoa');
        equal(bohoaDb,null);
        const loaiDb2 = await LoaiBoHoa.findById(idLoai_2);
        equal(loaiDb2.bohoas.length,0);      
        const loaiDb1 = await LoaiBoHoa.findById(idLoai_1);
        equal(loaiDb1.bohoas[0].toString(),idBoHoa);    
    });
    it('Không  Thể Sửa Bó Hoa Khi OBJECTID BoHoa',async()=>{
        await LoaiBoHoa.findByIdAndRemove(idLoai_2);
        const body = {
            ten_bo_hoa : "Bó Hoa 02",
            mo_ta : "Bó Hoa 02",
            gia_ban :200000,
            hinh_anh : "Bohoa02.png",
            idLoai:idLoai_2
        }
        const response = await supertest(app).put('/bohoa/'+idBoHoa+1).send(body);
        const {success,bohoa,message}= response.body;    
        equal(success,false);
        equal(message,"INVALID_ID");
        equal(bohoa,undefined);
        equal(response.status,400);
        const bohoaDb = await BoHoa.findById(idBoHoa).populate('loai_bo_hoa');
        equal(bohoaDb.ten_bo_hoa,"Bó Hoa 001");
        equal(bohoaDb.mo_ta,"Mô Tả Bó Hoa 001");
        equal(bohoaDb.gia_ban,200000);
        equal(bohoaDb.hinh_anh,"bohoa01.png");
        equal(bohoaDb.loai_bo_hoa._id.toString(),idLoai_1);
        equal(bohoaDb.loai_bo_hoa.ten_loai,'Hoa Sinh Nhật');
        equal(bohoaDb.loai_bo_hoa.bohoas[0].toString(),idBoHoa);
        const loaiDb = await LoaiBoHoa.findById(idLoai_2);
        equal(loaiDb,null);        
    });
    it('Không  Thể Sửa Bó Hoa Khi Trùng Tên Bó Hoa',async()=>{
        await bohoaService.taoBoHoa('Bó Hoa 002',"Bó Hoa 002",20000,"Bohoa002.png",idLoai_1);        
        const body = {
            ten_bo_hoa : "Bó Hoa 002",
            mo_ta : "Bó Hoa 02",
            gia_ban :200000,
            hinh_anh : "Bohoa02.png",
            idLoai:idLoai_2
        }
        const response = await supertest(app).put('/bohoa/'+idBoHoa).send(body);
        const {success,bohoa,message}= response.body;    
        equal(success,false);
        equal(message,"TEN_BO_HOA_DA_TON_TAI");
        equal(bohoa,undefined);
        equal(response.status,400);
        const bohoaDb = await BoHoa.findById(idBoHoa).populate('loai_bo_hoa');
        equal(bohoaDb.ten_bo_hoa,"Bó Hoa 001");
        equal(bohoaDb.mo_ta,"Mô Tả Bó Hoa 001");
        equal(bohoaDb.gia_ban,200000);
        equal(bohoaDb.hinh_anh,"bohoa01.png");
        equal(bohoaDb.loai_bo_hoa._id.toString(),idLoai_1);
        equal(bohoaDb.loai_bo_hoa.ten_loai,'Hoa Sinh Nhật');
        equal(bohoaDb.loai_bo_hoa.bohoas[0].toString(),idBoHoa);
        const loaiDb = await LoaiBoHoa.findById(idLoai_2);
        equal(loaiDb.bohoas[0],null);        
    });
});