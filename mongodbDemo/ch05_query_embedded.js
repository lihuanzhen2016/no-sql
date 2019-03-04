dbservice=connect("localhost:27017")//连接数据库
db=dbservice.getSiblingDB("student")//选择数据库
db.class1.drop()//删除集合

var bulk=db.class1.initializeUnorderedBulkOp();
var doc1={
	_id:1,
	name:"张三",
	address:{
		provice:"Hebei",
		city:"shijiazhuang"
	}
}
bulk.insert(doc1);

var doc2={
	_id:2,
	name:"李四",
	address:{
		city:"shijiazhuang",
		provice:"Hebei"
		
	}
}
bulk.insert(doc2);
bulk.execute();
print("find 查询整个内嵌文档")
var cursor=db.class1.find({address:{provice:"Hebei"}})
printjson(cursor.toArray())

var cursor=db.class1.find({address:
{
provice:"Hebei",
city:"shijiazhuang"
}
})
printjson(cursor.toArray())

print("find 内嵌文档查询（根据字段）")
var cursor=db.class1.find({"address.provice":"Hebei"})
printjson(cursor.toArray())


