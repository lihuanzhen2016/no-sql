dbservice=connect("localhost:27017")//连接数据库
db=dbservice.getSiblingDB("test0226")//选择数据库
db.class1.drop()//删除集合
db.class1.insert({name:"tom",age:20})//插入文档
var cursor=db.class1.find()//查询所有文档

printjson(cursor.toArray())//迭代输出



