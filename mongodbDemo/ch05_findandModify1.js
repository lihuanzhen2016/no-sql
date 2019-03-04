dbservice=connect("localhost:27017")
db=dbservice.getSiblingDB("student")
db.demo_findAndModify.drop()
var bulk=db.demo_findAndModify.initializeUnorderedBulkOp();
var doc1={
	_id:1,
	name:"tom",
	age:21,
	scores:90
}
bulk.insert(doc1);
var doc2={
	_id:2,
	name:"jerry",
	age:19,
	scores:80
}
bulk.insert(doc2);
var doc3={
	_id:3,
	name:"tom",
	age:20,
	scores:80
}
bulk.insert(doc3);
bulk.execute(); 
var cursor=db.demo_findAndModify.find();
cursor.forEach(printjson)
print("执行完findAndModify后更新后的结果")
var cursor=db.demo_findAndModify.findAndModify({
	query:{name:"tom"},
	sort:{age:1},
	update:{$inc:{age:5}},
	new:true,
	upsert:true
	
})
printjson(cursor)
print("执行find的结果")
var cursor=db.demo_findAndModify.find();
cursor.forEach(printjson)

print("执行完findAndModify---删除文档")
var cursor=db.demo_findAndModify.findAndModify({
	query:{name:"tom"},
	sort:{age:1},
	remove:true
})
printjson(cursor)
