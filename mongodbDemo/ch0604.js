//数组文档字段建立多键索引
dbservice=connect("localhost:27017");
db=dbservice.getSiblingDB("student");
db.index_multikey_embedded.drop()
var bulk=db.index_multikey_embedded.initializeUnorderedBulkOp();
var doc1={
	_id:1,
	name:"xiaoli",
	age:20,
	scores:[{课程:"语文",成绩:91},{课程:"数学",成绩:94}]
}

bulk.insert(doc1);
var doc2={
	_id:2,
	name:"xiaoming",
	age:22,
	scores:[{课程:"语文",成绩:93},{课程:"数学",成绩:95}]
}
bulk.insert(doc2);
//执行插入操作
bulk.execute()
print("---多键索引，在数组文档元素的字段建立索引-----")
var result=db.index_multikey_embedded.find({"scores.课程":"语文"}).explain().queryPlanner.winningPlan
printjson(result)
db.index_multikey_embedded.createIndex({"scores.课程":1})
var result=db.index_multikey_embedded.find({"scores.课程":"语文"}).explain().queryPlanner.winningPlan
printjson(result)


