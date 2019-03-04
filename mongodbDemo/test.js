db=connect("localhost:27017");
db=db.getSiblingDB("student");
cursor=db.class1.find();
while(cursor.hasNext())
{
	printjson(cursor.next());
}