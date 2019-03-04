dbservice=connect("localhost:27017")
db=dbservice.getSiblingDB("test0227")
db.class1.drop()
db.class1.insert({name:"tom"})
db.class1.insert({_id:1,name:"tom",age:NumberInt(20)})
var doc1={name:"lhz",address:{provice:"hebei"}}
db.class1.insert(doc1)
db.class1.insert({name:"tom"},{name:"jerry"})
db.class1.insert([{name:"tom"},{name:"jerry"}])

/*
var bulk=db.class1.initializeUnorderedBulkOp()
bulk.insert({name:"aa"})
bulk.insert({name:"bb"})
bulk.insert({name:"cc"})
bulk.execute()
*/

var result=db.class1.find()
printjson(result.toArray())
