dbservice=connect("localhost:27017");
db=dbservice.getSiblingDB("student");
db.update_demo.drop();//清空集合中的文档

var bulk = db.bulk_demo.initializeUnorderedBulkOp();
var doc1={
	_id:1,
	name:"tom",
	age:20
}
bulk.insert(doc1);
var doc2={
	_id:2,
	name:"jerry",
	age:20
}
bulk.insert(doc2)

var result=bulk.execute();
printjson(result);
var cursor=db.bulk_demo.find()
printjson(cursor.toArray())