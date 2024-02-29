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
                schema: { type: 'string', minLength: 1, maxLength: 120 },
                model: { type: String },
                insert: true,
                update: true,
                required: true
            },
            description: {
                schema: { type: 'string', minLength: 1, maxLength: 5000 },
                model: { type: String },
                insert: true,
                update: true,
                required: true
            },
            imageUrls: {
                schema: {
                    type: 'array',
                    items: {
                        type: 'string'
                    }
                },
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
                schema: { type: 'string', enum: ['NoiBatPhanPhat', 'SanPhamMoiToanh', 'ChoNeHotDi', 'DoTuoiRoiRoi', 'DoKhoChanAi'] },
                model: { type: String },
                insert: true,
                update: true,
                filter: true
            },
            categoryId: {
                schema: { type: 'string' },
                model: { type: String },
                insert: true,
                update: true,
                filter: true,
                required: true
            },
            inventoryManagementOption: {
                schema: { type: 'string', enum: ["on","off"] },
                model: { type: Boolean, default: "on" },
                insert: true,
                update: true
            },
            stockQuantity: {
                schema: { type: 'number' },
                model: { type: Number, default: 0 },
                insert: true,
                update: true
            },
            inventoryStatus: {
                schema: { type: 'string', enum: ['InStock', 'OutOfStock']},
                model: { type: String , default: "InStock"},
                insert: true,
                update: true,
                filter: true,
            },
            publishStatus: {
                schema: { type: 'string', enum: ['Draft', 'Published', 'Hidden']},
                model: { type: String, default: "Draft"},
                insert: true,
                update: true,
                filter: true
            },
            soldCount: {
                schema: { type: 'number' },
                model: { type: Number, default: 0 }
            },
            
            createdBy: {
                schema: { type: 'string', description: 'userId of seller' },
                model: { type: String },
                filter: true
            },
            createdAt: {
                schema: { type: 'number' },
                model: { type: Number, default: Date.now }
            },
            updatedBy: {
                schema: { type: 'string' },
                model: { type: String },
                sort: true
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