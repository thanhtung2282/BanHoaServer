process.env.NODE_ENV = 'test';
require('../src/helpers/connectDatabase');
const {LoaiBoHoa} = require('../src/models/loaibohoa.model');
const {BoHoa} = require('../src/models/bohoa.model');

beforeEach('Xoá tất cả dữ liệu để test',async()=>{
    await LoaiBoHoa.remove({});
    await BoHoa.remove({});
}); 