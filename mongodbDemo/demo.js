dbservice=connect("localhost:27017")//连接数据库
db=dbservice.getSiblingDB("test")
db.test0221.drop()
db.test0221.insert({_id:1,name:"tom"})
var result=db.test0221.find()
printjson(result.toArray())