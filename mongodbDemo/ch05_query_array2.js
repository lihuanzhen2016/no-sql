dbservice=connect("localhost:27017");
db=dbservice.getSiblingDB("student");

db.query_array.drop()

var bulk=db.query_array.initializeUnorderedBulkOp();
var doc1={_id:1,name:"tom",age:20,scores:[{"科目":"语文","成绩":50},{"科目":"数学","成绩":70}]}
bulk.insert(doc1);
var doc2={_id:2,name:"joe",age:21,scores:[{"科目":"语文","成绩":60},{"科目":"数学","成绩":80}]}
bulk.insert(doc2);
var doc3={_id:3,name:"jerry",age:18,scores:[{"科目":"语文","成绩":100},{"科目":"数学","成绩":99}]}
bulk.insert(doc3);
var doc4={_id:4,name:"jack",age:null}
bulk.insert(doc4);
bulk.execute()

print("查询整个数组")
var cursor=db.query_array.find({"scores.成绩":100})
printjson(cursor.toArray())

