process.env.NODE_ENV = 'test';
require('../src/helpers/connectDatabase');
const {LoaiBoHoa} = require('../src/models/loaibohoa.model');
const {BoHoa} = require('../src/models/bohoa.model');
const {Quyen} = require('../src/models/quyen.model');

beforeEach('Xoá tất cả dữ liệu để test',async()=>{
    await LoaiBoHoa.remove({});
    await BoHoa.remove({});
    await Quyen.remove({});
}); 