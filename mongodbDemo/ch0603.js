dbservice=connect("localhost:27017");
db=dbservice.getSiblingDB("student");
db.index_multikey.drop()
var bulk=db.index_multikey.initializeUnorderedBulkOp();
var doc1={
	_id:1,
	name:"xiaoli",
	age:20,
	scores:[95,97,98]
}

bulk.insert(doc1);
var doc2={
	_id:2,
	name:"xiaoming",
	age:20,
	scores:[91,92,93],
	title:["学习委员","学生会主席"]
}
bulk.insert(doc2);
//执行插入操作
bulk.execute()
print("---数组不使用索引-----")
var result=db.index_multikey.find({scores:91}).explain().queryPlanner.winningPlan
printjson(result)
print("---创建数组的多键索引的使用-----")
db.index_multikey.createIndex({scores:1})
var result=db.index_multikey.find({scores:91}).explain().queryPlanner.winningPlan
printjson(result)



print("---多键索引，一个索引的数组字段只能有一个-----")
var result=db.index_multikey.createIndex({scores:1,title:1})
printjson(result)

