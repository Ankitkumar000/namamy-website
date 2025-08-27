"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var bcryptjs_1 = require("bcryptjs");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var adminPassword, admin, userPassword, testUser, products, _i, products_1, product, createdProduct, sampleReviews, _a, _b, sampleReviews_1, review, subscribers, _c, subscribers_1, subscriber, contacts, _d, contacts_1, contact;
        var _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    console.log('🌱 Starting database seeding...');
                    return [4 /*yield*/, bcryptjs_1.default.hash('admin123', 12)];
                case 1:
                    adminPassword = _g.sent();
                    return [4 /*yield*/, prisma.user.upsert({
                            where: { email: 'admin@namamy.com' },
                            update: {},
                            create: {
                                name: 'Admin User',
                                email: 'admin@namamy.com',
                                password: adminPassword,
                                role: 'ADMIN',
                                phone: '+91 9876543210'
                            }
                        })];
                case 2:
                    admin = _g.sent();
                    console.log('✅ Admin user created:', admin.email);
                    return [4 /*yield*/, bcryptjs_1.default.hash('user123', 12)];
                case 3:
                    userPassword = _g.sent();
                    return [4 /*yield*/, prisma.user.upsert({
                            where: { email: 'test@example.com' },
                            update: {},
                            create: {
                                name: 'Test User',
                                email: 'test@example.com',
                                password: userPassword,
                                role: 'USER',
                                phone: '+91 9876543211'
                            }
                        })];
                case 4:
                    testUser = _g.sent();
                    console.log('✅ Test user created:', testUser.email);
                    products = [
                        {
                            name: 'Premium Raw Makhana',
                            slug: 'premium-raw-makhana',
                            description: 'Premium quality raw makhana sourced directly from Bihar farms. Naturally dried and carefully selected for the best quality.',
                            price: 199.0,
                            comparePrice: 249.0,
                            category: 'raw',
                            subcategory: 'premium',
                            tags: JSON.stringify(['raw', 'premium', 'natural', 'bihar']),
                            weight: '100g',
                            images: JSON.stringify(['/images/products/raw-makhana-1.jpg', '/images/products/raw-makhana-2.jpg']),
                            stockCount: 100,
                            inStock: true,
                            nutrition: JSON.stringify({
                                calories: 347,
                                protein: 9.7,
                                carbs: 76.9,
                                fat: 0.1,
                                fiber: 7.6
                            }),
                            ingredients: JSON.stringify(['Makhana (Fox Nuts)', '100% Natural']),
                            featured: true
                        },
                        {
                            name: 'Roasted Salted Makhana',
                            slug: 'roasted-salted-makhana',
                            description: 'Crispy roasted makhana seasoned with pink salt for a healthy and delicious snack.',
                            price: 249.0,
                            comparePrice: 299.0,
                            category: 'roasted',
                            subcategory: 'salted',
                            tags: JSON.stringify(['roasted', 'salted', 'healthy', 'snack']),
                            weight: '100g',
                            images: JSON.stringify(['/images/products/salted-makhana-1.jpg', '/images/products/salted-makhana-2.jpg']),
                            stockCount: 75,
                            inStock: true,
                            nutrition: JSON.stringify({
                                calories: 350,
                                protein: 9.5,
                                carbs: 77,
                                fat: 0.2,
                                fiber: 7.5
                            }),
                            ingredients: JSON.stringify(['Makhana', 'Pink Salt', 'Sunflower Oil']),
                            featured: true
                        },
                        {
                            name: 'Chocolate Makhana',
                            slug: 'chocolate-makhana',
                            description: 'Indulgent chocolate-coated makhana for guilt-free snacking. Perfect blend of health and taste.',
                            price: 299.0,
                            comparePrice: 349.0,
                            category: 'flavored',
                            subcategory: 'chocolate',
                            tags: JSON.stringify(['chocolate', 'flavored', 'sweet', 'indulgent']),
                            weight: '100g',
                            images: JSON.stringify(['/images/products/chocolate-makhana-1.jpg', '/images/products/chocolate-makhana-2.jpg']),
                            stockCount: 0,
                            inStock: false,
                            nutrition: JSON.stringify({
                                calories: 380,
                                protein: 8.5,
                                carbs: 78,
                                fat: 2.5,
                                fiber: 7
                            }),
                            ingredients: JSON.stringify(['Makhana', 'Dark Chocolate', 'Cocoa Powder', 'Natural Sweetener']),
                            featured: false
                        },
                        {
                            name: 'Honey Roasted Makhana',
                            slug: 'honey-roasted-makhana',
                            description: 'Naturally sweetened makhana roasted with pure honey for a delightful healthy treat.',
                            price: 279.0,
                            comparePrice: 329.0,
                            category: 'flavored',
                            subcategory: 'honey',
                            tags: JSON.stringify(['honey', 'sweet', 'natural', 'roasted']),
                            weight: '100g',
                            images: JSON.stringify(['/images/products/honey-makhana-1.jpg', '/images/products/honey-makhana-2.jpg']),
                            stockCount: 0,
                            inStock: false,
                            nutrition: JSON.stringify({
                                calories: 365,
                                protein: 9,
                                carbs: 79,
                                fat: 1,
                                fiber: 7.2
                            }),
                            ingredients: JSON.stringify(['Makhana', 'Pure Honey', 'Ghee']),
                            featured: false
                        },
                        {
                            name: 'Spicy Masala Makhana',
                            slug: 'spicy-masala-makhana',
                            description: 'Fiery blend of Indian spices with crispy makhana for those who love bold flavors.',
                            price: 259.0,
                            comparePrice: 309.0,
                            category: 'flavored',
                            subcategory: 'spicy',
                            tags: JSON.stringify(['spicy', 'masala', 'indian', 'bold']),
                            weight: '100g',
                            images: JSON.stringify(['/images/products/masala-makhana-1.jpg', '/images/products/masala-makhana-2.jpg']),
                            stockCount: 0,
                            inStock: false,
                            nutrition: JSON.stringify({
                                calories: 355,
                                protein: 9.2,
                                carbs: 77.5,
                                fat: 0.8,
                                fiber: 7.8
                            }),
                            ingredients: JSON.stringify(['Makhana', 'Red Chili Powder', 'Turmeric', 'Cumin', 'Coriander', 'Garam Masala', 'Salt']),
                            featured: false
                        }
                    ];
                    _i = 0, products_1 = products;
                    _g.label = 5;
                case 5:
                    if (!(_i < products_1.length)) return [3 /*break*/, 8];
                    product = products_1[_i];
                    return [4 /*yield*/, prisma.product.upsert({
                            where: { slug: product.slug },
                            update: product,
                            create: product
                        })];
                case 6:
                    createdProduct = _g.sent();
                    console.log('✅ Product created:', createdProduct.name);
                    _g.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 5];
                case 8:
                    _e = {
                        userId: testUser.id
                    };
                    return [4 /*yield*/, prisma.product.findUnique({ where: { slug: 'premium-raw-makhana' } })];
                case 9:
                    _a = [
                        (_e.productId = (_g.sent()).id,
                            _e.rating = 5,
                            _e.comment = 'Excellent quality! Fresh and crunchy. Will definitely order again.',
                            _e)
                    ];
                    _f = {
                        userId: testUser.id
                    };
                    return [4 /*yield*/, prisma.product.findUnique({ where: { slug: 'roasted-salted-makhana' } })];
                case 10:
                    sampleReviews = _a.concat([
                        (_f.productId = (_g.sent()).id,
                            _f.rating = 4,
                            _f.comment = 'Good taste but could use a bit more salt. Overall satisfied with the quality.',
                            _f)
                    ]);
                    _b = 0, sampleReviews_1 = sampleReviews;
                    _g.label = 11;
                case 11:
                    if (!(_b < sampleReviews_1.length)) return [3 /*break*/, 14];
                    review = sampleReviews_1[_b];
                    return [4 /*yield*/, prisma.review.create({ data: review })];
                case 12:
                    _g.sent();
                    _g.label = 13;
                case 13:
                    _b++;
                    return [3 /*break*/, 11];
                case 14:
                    console.log('✅ Sample reviews created');
                    subscribers = [
                        { email: 'subscriber1@example.com', name: 'John Doe', status: 'ACTIVE' },
                        { email: 'subscriber2@example.com', name: 'Jane Smith', status: 'ACTIVE' },
                        { email: 'subscriber3@example.com', status: 'ACTIVE' }
                    ];
                    _c = 0, subscribers_1 = subscribers;
                    _g.label = 15;
                case 15:
                    if (!(_c < subscribers_1.length)) return [3 /*break*/, 18];
                    subscriber = subscribers_1[_c];
                    return [4 /*yield*/, prisma.newsletter.upsert({
                            where: { email: subscriber.email },
                            update: {},
                            create: subscriber
                        })];
                case 16:
                    _g.sent();
                    _g.label = 17;
                case 17:
                    _c++;
                    return [3 /*break*/, 15];
                case 18:
                    console.log('✅ Newsletter subscribers created');
                    contacts = [
                        {
                            name: 'Rajesh Kumar',
                            email: 'rajesh@example.com',
                            phone: '+91 9876543210',
                            subject: 'Product Quality Question',
                            message: 'I want to know about the freshness guarantee of your makhana products.',
                            status: 'NEW',
                            priority: 'MEDIUM',
                            source: 'CONTACT_FORM',
                            category: 'PRODUCT'
                        },
                        {
                            name: 'Priya Sharma',
                            email: 'priya@example.com',
                            subject: 'Order Delivery Issue',
                            message: 'My order was supposed to be delivered yesterday but I haven\'t received it yet.',
                            status: 'REPLIED',
                            priority: 'HIGH',
                            source: 'EMAIL',
                            category: 'ORDER'
                        }
                    ];
                    _d = 0, contacts_1 = contacts;
                    _g.label = 19;
                case 19:
                    if (!(_d < contacts_1.length)) return [3 /*break*/, 22];
                    contact = contacts_1[_d];
                    return [4 /*yield*/, prisma.contact.create({ data: contact })];
                case 20:
                    _g.sent();
                    _g.label = 21;
                case 21:
                    _d++;
                    return [3 /*break*/, 19];
                case 22:
                    console.log('✅ Sample contact inquiries created');
                    console.log('🎉 Database seeding completed successfully!');
                    console.log('\n📋 Login Credentials:');
                    console.log('Admin: admin@namamy.com / admin123');
                    console.log('User: test@example.com / user123');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
