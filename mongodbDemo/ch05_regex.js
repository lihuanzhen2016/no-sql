dbservice=connect("localhost:27017")//连接数据库
db=dbservice.getSiblingDB("student")//选择数据库
db.class1.drop()
var bulk=db.class1.initializeUnorderedBulkOp();
var doc1={name:"aaa11",description:"Single line"}
bulk.insert(doc1);
var doc2={name:"AAAbb",description:"First line\nSecond line"}
bulk.insert(doc2);
var doc3={name:"aac123bb",description:"Many Space before    line"}
bulk.insert(doc3);
var doc4={name:"abc",description:"Multiple\nline description"}
bulk.insert(doc3);
bulk.execute();
//忽略大小写 {field:{$regex:/pattern/i}}
var cursor=db.class1.find({name:{$regex:/^AAA/i}})
printjson(cursor.toArray())
//多行匹配模式 {field:{$regex:/pattern/,$options:'m'}}
var cursor=db.class1.find({description:{$regex:/^S/,$options:'m'}})
printjson(cursor.toArray())
print("不使用多行匹配")
var cursor=db.class1.find({description:{$regex:/^S/}})
printjson(cursor.toArray())
print("find--si选项的使用")
var cursor=db.class1.find({description:{$regex:/M.*line/,$options:'si'}})
printjson(cursor.toArray())
print("find--x选项的使用")
var pattern="abc #category code \n123 #item number";
var cursor=db.class1.find({description:{$regex:pattern,$options:'xi'}})
//var cursor=db.class1.find({description:{$regex:/abc123,$options:'xi'}})
printjson(cursor.toArray())