dbservice=connect("localhost:27017");
db=dbservice.getSiblingDB("student");
db.index_compound.drop()
var bulk=db.index_compound.initializeUnorderedBulkOp();
var doc1={
	name:"zhangsan",
	age:20,
	address:{provice:"hebei",city:"shijiazhuang"}
}
bulk.insert(doc1);
var doc2={
	name:"lisi",
	age:21,
	address:{provice:"jiangsu",city:"nanjing"}
}
bulk.insert(doc2);
//执行插入操作
bulk.execute()
db.index_compound.createIndex({name:1,age:-1,address:1})
print("---复合索引的前缀匹配的功能-----")
var result=db.index_compound.find({age:21}).explain().queryPlanner.winningPlan
printjson(result)
print("**********************")
var result=db.index_compound.find({name:"lisi",age:21}).explain().queryPlanner.winningPlan
printjson(result)
print("**********************")
var result=db.index_compound.find({name:"lisi",address:{provice:"jiangsu",city:"nanjing"}}).explain().queryPlanner.winningPlan
printjson(result)






print("---复合索引 排序方向-----")
var result=db.index_compound.find({}).sort({name:1,age:1}).explain().queryPlanner.winningPlan
printjson(result)
var result=db.index_compound.find({}).sort({name:1,age:-1}).explain().queryPlanner.winningPlan
printjson(result)
var result=db.index_compound.find({}).sort({name:-1,age:1}).explain().queryPlanner.winningPlan
printjson(result)


