dbservice=connect("localhost:27017");
db=dbservice.getSiblingDB("student");
db.index_single.drop();
for(i=0;i<10000;i++){
	
	db.index_single.insert({index:i,name:"user"+i})
}
print("单一索引的功能")
print("----------不使用索引----------------")
var result=db.index_single.find({name:"user10"}).explain("executionStats").executionStats
print("扫描的文档数："+result.totalDocsExamined)
print("总耗时："+result.executionStages.executionTimeMillisEstimate)

print("不使用索引，返回1条数据")
var result=db.index_single.find({name:"user10"}).limit(1).explain("executionStats").executionStats
print("扫描的文档数："+result.totalDocsExamined)
print("总耗时："+result.executionStages.executionTimeMillisEstimate)

print("------------使用索引-----------------")
db.index_single.createIndex({name:1})
var result=db.index_single.find({name:"user10"}).explain("executionStats").executionStats
print("扫描的文档数："+result.totalDocsExamined)
print("总耗时："+result.executionStages.executionTimeMillisEstimate)