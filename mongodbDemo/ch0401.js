dbservice=connect("localhost:27017");
db=dbservice.getSiblingDB("student");
db.insert_demo.drop();//清空集合中的文档

var doc1={
	name:"xiaoli",
	age:20,
	address:{
		provice:"hebei",
		city:"shijiazhuang"
	}
}
print("insert函数的使用")
var result=db.insert_demo.insert(doc1);
printjson(result);//mongoDB shell内置函数
var cursor=db.insert_demo.find()
printjson(cursor.toArray())