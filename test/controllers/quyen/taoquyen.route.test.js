const supertest = require('supertest');
const {equal} = require('assert');
const {app} = require('../../../src/app');
const {Quyen} = require('../../../src/models/quyen.model');

describe('Test POST/quyen',()=>{
    it('Có Thể Tạo Quyền',async()=>{
        const body ={
            ten_quyen:'Admin',
            mo_ta:'Cấp bậc cao nhất'
        };
        const response = await supertest(app).post('/quyen').send(body);
        const {success,quyen} = response.body;
        equal(success,true);
        equal(quyen.ten_quyen,'Admin');
        equal(quyen.mo_ta,'Cấp bậc cao nhất');
        // kt db
        const quyenDb = await Quyen.findOne();
        equal(quyenDb.ten_quyen,'Admin');
        equal(quyenDb.mo_ta,'Cấp bậc cao nhất');
    });
    it('Không Thể Tạo Quyền Khi ten_quyen Trống',async()=>{
        const body ={
            ten_quyen:'',
            mo_ta:'Cấp bậc cao nhất'
        };
        const response = await supertest(app).post('/quyen').send(body);
        const {success,quyen,message} = response.body;
        equal(success,false);
        equal(quyen,undefined);
        equal(message,'TEN_QUYEN_KHONG_DUOC_TRONG');
        equal(response.status,400);
        // kt db
        const quyenDb = await Quyen.findOne();
        equal(quyenDb,null);
    });
    it('Không Thể Tạo Quyền Khi mo_ta Trống',async()=>{
        const body ={
            ten_quyen:'Admin',
            mo_ta:''
        };
        const response = await supertest(app).post('/quyen').send(body);
        const {success,quyen,message} = response.body;
        equal(success,false);
        equal(quyen,undefined);
        equal(message,'MO_TA_KHONG_DUOC_TRONG');
        equal(response.status,400);
        // kt db
        const quyenDb = await Quyen.findOne();
        equal(quyenDb,null);
    });
    it('Không Thể Tạo Quyền Khi Trùng ten_quyen',async()=>{
        const body ={
            ten_quyen:'Admin',
            mo_ta:'Cấp bậc cao nhất'
        };
        await supertest(app).post('/quyen').send(body);
        const response = await supertest(app).post('/quyen').send(body);
        const {success,quyen,message} = response.body;
        equal(success,false);
        equal(quyen,undefined);
        equal(message,'TEN_QUYEN_DA_TON_TAI');
        equal(response.status,400);
        // kt db
        const quyenDb = await Quyen.findOne();
        equal(quyenDb.ten_quyen,'Admin');
        equal(quyenDb.mo_ta,'Cấp bậc cao nhất');
    });
});