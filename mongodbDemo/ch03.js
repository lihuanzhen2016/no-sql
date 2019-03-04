dbservice=connect("localhost:27017");//连接数据库
db=dbservice.getSiblingDB("student");
db.stu.drop();

db.stu.insert({name:"tom",age:20})
db.stu.insert({name:"jerry",age:21})
cursor=db.stu.find()
while(cursor.hasNext())
{
	printjson(cursor.next());
}