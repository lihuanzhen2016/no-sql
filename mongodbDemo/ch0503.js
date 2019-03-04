dbservice=connect("localhost:27017");
db=dbservice.getSiblingDB("student");

db.query_cursor.drop()

for(i=0;i<10;i++){
	
	db.query_cursor.insert({x:i})
}
var cursor=db.query_cursor.find();
#while(cursor.hasNext()){
#var obj=cursor.next();
#printjson(obj);
#print(obj.x);
#}