const supertest = require('supertest');
const {equal} = require('assert')
const {app} = require('../../../src/app');
const {BoHoa} = require('../../../src/models/bohoa.model');
const {LoaiBoHoa} = require('../../../src/models/loaibohoa.model');
const {loaibohoaService} = require('../../../src/services/loaibohoa.service');
const {bohoaService}= require('../../../src/services/bohoa.service');
describe('TEST DELETE/bohoa/:_id',()=>{
    let idLoai , idBoHoa,idBoHoa2;
    beforeEach('Tạo DATA ',async()=>{
        const loai = await loaibohoaService.taoLoaiBoHoa('Hoa Sinh Nhật','Mô Tả Hoa Sinh Nhật');
        idLoai = loai._id;
        const bohoa = await bohoaService.taoBoHoa('Bó Hoa 02','Mô Tả Bó Hoa 02',300000,'bohoa02.png',idLoai);
        idBoHoa = bohoa._id;
        const bohoa2 =await bohoaService.taoBoHoa('Bó Hoa 001','Mô Tả Bó Hoa 001',300000,'bohoa001.png',idLoai);
        idBoHoa2 = bohoa2._id;
    });
    it('Có Thể Xoá Bó Hoa',async()=>{
        const response = await supertest(app).delete('/bohoa/'+idBoHoa).send({idLoai});
        const {success,bohoa}= response.body;    
        equal(success,true);
        equal(bohoa.ten_bo_hoa,"Bó Hoa 02");
        equal(bohoa.mo_ta,"Mô Tả Bó Hoa 02");
        equal(bohoa.gia_ban,300000);
        equal(bohoa.hinh_anh,"bohoa02.png");
        equal(bohoa.loai_bo_hoa,idLoai);
        //test db bohoa
        const bohoaDb = await BoHoa.findById(idBoHoa);
        equal(bohoaDb,null);
        // test db loaibohoa
        const loaiDb = await LoaiBoHoa.findById(idLoai);
        equal(loaiDb.bohoas.length,1);        
        equal(loaiDb.bohoas[0].toString(),idBoHoa2);        
    });
    it('Không  Thể Xoá Bó Hoa Khi Sai objectID ',async()=>{
        const response = await supertest(app).delete('/bohoa/xyz').send({idLoai});
        const {success,bohoa,message}= response.body;       
        equal(success,false);
        equal(bohoa,null);
        equal(message,'INVALID_ID');
        equal(response.status,'400');       
        //test db bohoa
        const bohoaDb = await BoHoa.find().count();
        equal(bohoaDb,2);
        // test db loaibohoa
        const loaiDb = await LoaiBoHoa.findById(idLoai);
        equal(loaiDb.bohoas.length,2);           
    });
    it('Không  Thể Xoá Bó Hoa Khi Sai ID Bó Hoa ',async()=>{
        const response = await supertest(app).delete('/bohoa/9b21d38be5a4a621f4ae787c').send({idLoai});
        const {success,bohoa,message}= response.body;       
        equal(success,false);
        equal(bohoa,null);
        equal(message,'KHONG_TIM_THAY_BO_HOA');
        equal(response.status,'404');       
        //test db bohoa
        const bohoaDb = await BoHoa.find().count();
        equal(bohoaDb,2);
        // test db loaibohoa
        const loaiDb = await LoaiBoHoa.findById(idLoai);
        equal(loaiDb.bohoas.length,2);           
    });
    it('Không  Thể Xoá Bó Hoa Khi Không Có idLoai ',async()=>{
        const response = await supertest(app).delete('/bohoa/9b21d38be5a4a621f4ae787c').send({});
        const {success,bohoa,message}= response.body;       
        equal(success,false);
        equal(bohoa,null);
        equal(message,'INVALID_ID');
        equal(response.status,'400');       
        //test db bohoa
        const bohoaDb = await BoHoa.find().count();
        equal(bohoaDb,2);
        // test db loaibohoa
        const loaiDb = await LoaiBoHoa.findById(idLoai);
        equal(loaiDb.bohoas.length,2);           
    });
});