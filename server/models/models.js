const sequelize = require('../db')
const {DataTypes} = require('sequelize') //описание типов полей

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    age: {type: DataTypes.INTEGER},
    workexperience: {type: DataTypes.INTEGER},
    address: {type: DataTypes.STRING},
    number: {type: DataTypes.STRING}
}) 

const BinderClientBase = sequelize.define('binderclientbase', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const ClientBase = sequelize.define('clientbase', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    phonenumber: {type: DataTypes.STRING, unique: true},
    address: {type: DataTypes.STRING},
})

const BinderOrders = sequelize.define('binderorders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Orders = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    adddescription: {type: DataTypes.STRING},
    dateOFcreation: {type: DataTypes.DATE},
    dateField: {type: DataTypes.DATE},
    price: {type: DataTypes.INTEGER},
    addres: {type: DataTypes.STRING},
    boleanOrder: {type: DataTypes.BOOLEAN}
})

const BinderHistoryOrders = sequelize.define('binderchistoryorders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const HistoryOrders = sequelize.define('hisorders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const BinderBouquet = sequelize.define('binderbouquet', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Bouquet = sequelize.define('bouquet', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    img: {type:DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER},
    id_category: {type: DataTypes.INTEGER},
    boleanOrder: {type: DataTypes.BOOLEAN}
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
})

const BouquetCategoryBinder = sequelize.define('bouquetbindercategory', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BouquetCategory = sequelize.define('bouquetcategory', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BinderComposition = sequelize.define('bindercomposition', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Composition = sequelize.define('composition', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    qty: {type: DataTypes.INTEGER, primaryKey: true},
    price: {type: DataTypes.INTEGER}
})

const BinderFlowers = sequelize.define('binderflowers', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Flowers = sequelize.define('flowers', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    img: {type:DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.INTEGER},
    quantity: {type: DataTypes.INTEGER}
})

const Receiving = sequelize.define('receiving', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    choisercv: {type: DataTypes.STRING},
})

const StatusOrder = sequelize.define('statusorder', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.STRING}
})

const GuideFlower = sequelize.define('guideflower', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    img: {type:DataTypes.STRING, allowNull: false},
    descripe: {type: DataTypes.STRING(2000)},
    nameuser: {type: DataTypes.STRING}
})

const BinderInspiration = sequelize.define('binderinspiration', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Inspiration = sequelize.define('inspiration', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img: {type:DataTypes.STRING, allowNull: false}
})

User.hasOne(BinderOrders)
BinderOrders.belongsTo(User)

BinderOrders.hasMany(Orders)
Orders.belongsTo(BinderOrders)

User.hasOne(BinderClientBase)
ClientBase.belongsTo(BinderClientBase)

BinderClientBase.hasMany(ClientBase)
ClientBase.belongsTo(BinderClientBase)

User.hasOne(BinderHistoryOrders)
BinderHistoryOrders.belongsTo(User)

BinderHistoryOrders.hasMany(HistoryOrders)
HistoryOrders.belongsTo(BinderHistoryOrders)

User.hasOne(BinderBouquet)
BinderBouquet.belongsTo(User)

BinderBouquet.hasMany(Bouquet)
Bouquet.belongsTo(BinderBouquet)

User.hasOne(BouquetCategoryBinder)
BouquetCategoryBinder.belongsTo(User)

BouquetCategoryBinder.hasMany(BouquetCategory)
BouquetCategory.belongsTo(BouquetCategoryBinder)

User.hasOne(BinderComposition)
BinderComposition.belongsTo(User)

BinderComposition.hasMany(Composition)
Composition.belongsTo(BinderComposition)

User.hasOne(BinderFlowers)
BinderFlowers.belongsTo(User)

BinderFlowers.hasMany(Flowers)
Flowers.belongsTo(BinderFlowers)

User.hasOne(BinderInspiration)
BinderInspiration.belongsTo(User)

BinderInspiration.hasMany(Inspiration)
Inspiration.belongsTo(BinderInspiration)
// HistoryOrders.hasOne(Orders)
// Orders.belongsTo(HistoryOrders)

ClientBase.hasMany(Orders)
Orders.belongsTo(ClientBase)

BouquetCategory.hasMany(Orders)
Orders.belongsTo(BouquetCategory)

Bouquet.hasMany(BouquetCategory)
BouquetCategory.belongsTo(Bouquet)

Category.hasMany(BouquetCategory)
BouquetCategory.belongsTo(Category)

Receiving.hasMany(Orders)
Orders.belongsTo(Receiving)

StatusOrder.hasMany(Orders)
Orders.belongsTo(StatusOrder)

BouquetCategory.hasMany(Composition)
Composition.belongsTo(BouquetCategory)

Flowers.hasMany(Composition)
Composition.belongsTo(Flowers)

User.hasMany(GuideFlower)
GuideFlower.belongsTo(User)

module.exports = {
    User,
    Orders,
    BinderOrders,
    HistoryOrders,
    BinderHistoryOrders,
    Bouquet,
    BinderBouquet,
    Category,
    BouquetCategory,
    BouquetCategoryBinder,
    Composition,
    BinderComposition,
    Flowers,
    BinderFlowers,
    ClientBase,
    BinderClientBase,
    Receiving,
    StatusOrder,
    GuideFlower, 
    BinderInspiration,
    Inspiration
}