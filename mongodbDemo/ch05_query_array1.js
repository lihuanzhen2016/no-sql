dbservice=connect("localhost:27017");
db=dbservice.getSiblingDB("student");

db.query_array.drop()

var bulk=db.query_array.initializeUnorderedBulkOp();
var doc1={_id:1,name:"tom",age:20,scores:[90,98,95]}
bulk.insert(doc1);
var doc2={_id:2,name:"joe",age:21,scores:[52,84,100]}
bulk.insert(doc2);
var doc3={_id:3,name:"jerry",age:18,scores:[68,90,95]}
bulk.insert(doc3);
var doc4={_id:4,name:"jack",age:null}
bulk.insert(doc4);
bulk.execute()

print("查询整个数组")
var cursor=db.query_array.find({scores:[90,98,95]})
printjson(cursor.toArray())

print("查询数组中含有某个值/（满足某个条件的值）的元素")
var cursor=db.query_array.find({scores:100})
printjson(cursor.toArray())

print("按照指定的数组索引查询数组元素的值")
var cursor=db.query_array.find({"scores.2":95})
printjson(cursor.toArray())

print("$all的使用")
var cursor=db.query_array.find({scores:{$all:[90,98]}})
printjson(cursor.toArray())

print("$eleMatch的使用,元素的一个值同时满足多个条件")
var cursor=db.query_array.find({scores:{$elemMatch:{$gt:80,$lt:90}}})
printjson(cursor.toArray())

print("不使用$elemMatch，元素只要有值满足条件即可，不需要同时满足")
var cursor=db.query_array.find({scores:{$gt:80,$lt:90}})
printjson(cursor.toArray())

print("$elemMatch映射")
var cursor=db.query_array.find({},{scores:{$elemMatch:{$gt:80,$lt:90}}})
printjson(cursor.toArray())

print("$的使用，返回第一个匹配的数组元素")
var cursor=db.query_array.find({scores:{$gt:90}},{"scores.$":1})
printjson(cursor.toArray())


