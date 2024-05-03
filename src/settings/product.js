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
                update: true
            },
            images: {
                schema: {
                    type: 'array',
                    items: {
                        anyOf: [{ type: 'string' }, {
                            type: 'object',
                            additionalProperties: true
                        }]
                    },
                    minItems: 1,
                    maxItems: 10
                },
                model: { type: [{ type: String, ref: 'file' }], default: [] },
                insert: true,
                update: true,
                required: true
            },
            price: {
                schema: { type: 'number', minimum: 1, maximum: 999999999, default: 100000 },
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
            collectionType: {
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
                schema: { type: 'boolean' },
                model: { type: Boolean, default: true },
                insert: true,
                update: true
            },
            stockQuantity: {
                schema: { type: 'number', minimum: 0, maximum: 99999, default: 0 },
                model: { type: Number, default: 0 },
                insert: true,
                update: true
            },
            inventoryStatus: {
                schema: { type: 'string', enum: ['InStock', 'OutOfStock'] },
                model: { type: String, default: "InStock" },
                insert: true,
                update: true,
                filter: true,
            },
            publishStatus: {
                schema: { type: 'string', enum: ['Draft', 'Published', 'Hidden'] },
                model: { type: String, default: "Draft" },
                insert: true,
                update: true,
                filter: true
            },
            soldCount: {
                schema: { type: 'number' },
                model: { type: Number, default: 0 }
            },
            weight: {
                schema: { type: 'number', minimum: 0, maximum: 99999, default: 0 }, // gram
                model: { type: Number },
                insert: true,
                update: true,
                required: true
            },
            height: {
                schema: { type: 'number', minimum: 0, maximum: 99999, default: 0 }, // cm
                model: { type: Number },
                insert: true,
                update: true,
                required: true
            },
            width: {
                schema: { type: 'number', minimum: 0, maximum: 99999, default: 0 }, // cm
                model: { type: Number },
                insert: true,
                update: true,
                required: true
            },
            length: {
                schema: { type: 'number', minimum: 0, maximum: 99999, default: 0 }, // cm
                model: { type: Number },
                insert: true,
                update: true,
                required: true
            },
            createdBy: {
                schema: { type: 'string', description: 'userId of seller' },
                model: { type: String },
                //filter: true
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
        super.populate = ["images"]
    }
}

// caching object setting
if (!global.Product) {
    global.Product = new Product();
}

module.exports = global.Product;
