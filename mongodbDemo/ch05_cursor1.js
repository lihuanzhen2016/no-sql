dbservice=connect("localhost:27017")//连接数据库
db=dbservice.getSiblingDB("test")//选择数据库
db.class1.drop()//删除集合
for(i=0;i<1000;i++){
db.c1.insert({_id:i,name:"user"+i});
}
var cursor=db.c1.find({},{name:0});

while(cursor.hasNext()){
var obj=cursor.next();
print(tojson(obj));

var left=cursor.objsLeftInBatch();//objsLeftInBatch获取当前批次未被迭代的文档
print("hello:"+left);
}