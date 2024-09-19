
// Q1: Find all the information about each product
db.products.find().pretty()
// Q2: Find the product prices that are between 400 to 800
db.products.find({$and: [{product_price: {"$gte": 400}}, {product_price: {"$lte": 800}}]}).pretty()
// Q3: Find the product prices that are not between 400 to 600
db.products.find({$or: [{product_price: {"$lte": 400}}, {product_price: {"$gte": 600}}]}).pretty()

// Q4: List the products which are greater than 500 in price
db.products.find({product_price: {"$gt": 500}}).pretty()  //Note: Only 3 products are greater than 500 in price

// Q5: Find the product name and product material of each product
db.products.find({}, {product_name: 1, product_material: 1, _id: 0})

// Q6: Find the product with an id of 10
db.products.find({id: {"$eq": "10"}}).pretty()

// Q7: Find only the product name and product material for a specific product
db.products.find({$and: [{product_name: {"$eq": "Practical Soft Shoes"}}, {product_material: {"$eq": "Rubber"}}]}).pretty()

// Q8: Find all products that have the value "Soft" in product material
db.products.find({product_material: "Soft"}).pretty()

// Q9: Find products that contain product color "indigo" and product price of 492.00
db.products.find({$and: [{product_color: {"$eq": "indigo"}}, {product_price: {"$eq": 492.00}}]}).pretty()  //Note: No such product exists in this dataset

// Q10: Delete the products where the product price is duplicated
// First, find the duplicated prices
var criteria = db.products.aggregate([{ $group: { _id: "$product_price", count: { $sum: 1 } } }, { $match: { count: { $gt: 1 } } }]).toArray().map((d) => d._id)

// Then, delete the products that have duplicated prices
db.products.deleteMany({product_price: {"$in": criteria}})

