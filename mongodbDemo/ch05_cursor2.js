dbservice=connect("localhost:27017")//连接数据库
db=dbservice.getSiblingDB("test")//选择数据库
db.class1.drop()
for(i=0;i<100;i++){
db.c1.insert({_id:i,name:"user"+i});
}
var documentArray=db.c1.find().toArray();
if(documentArray.length>10){
	var obj=documentArray[10];
	printjson(obj);
}