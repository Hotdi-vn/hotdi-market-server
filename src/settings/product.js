class Product extends require('../templates/settings/master') {
    constructor() {
        super();
        super.resource = 'products';
        super.settings = {
            _id: {
                schema: { type: 'string' },
                model: { type: String },
                isKey: true
            },
            name: {
                schema: { type: 'string' },
                model: { type: String },
                insert: true,
                update: true,
                required: true
            },
            description: {
                schema: { type: 'string' },
                model: { type: String },
                insert: true,
                update: true
            },
            imageUrls: {
                schema: { type: 'array' },
                model: { type: Array },
                insert: true,
                update: true,
                required: true
            },
            price: {
                schema: { type: 'number' },
                model: { type: Number },
                insert: true,
                update: true,
                required: true
            },
            location: {
                schema: { type: 'string' },
                model: { type: String },
                insert: true,
                update: true
            },
            colectionType: {
                schema: { type: 'string', enum: ['NoiBatPhanPhat', 'SanPhamMoiToanh', 'ChoNeHotDi','DoTuoiRoiRoi','DoKhoChanAi'] },
                model: { type: String },
                insert: true,
                update: true,
                required: true
            },
            soldCount: {
                schema: { type: 'number' },
                model: { type: Number, default: 0 }
            },
            createdBy: {
                schema: { type: 'string' },
                model: { type: String }
            },
            createdAt: {
                schema: { type: 'number' },
                model: { type: Number, default: Date.now }
            },
            updatedBy: {
                schema: { type: 'string' },
                model: { type: String }
            },
            updatedAt: {
                schema: { type: 'number' },
                model: { type: Number, default: Date.now }
            }
        }
    }
}

// caching object setting
if (!global.Product) {
    global.Product = new Product();
}

module.exports = global.Product;