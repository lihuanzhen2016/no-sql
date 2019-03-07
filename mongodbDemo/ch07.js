dbservice=connect("localhost:27017")//连接数据库
db=dbservice.getSiblingDB("student")//选择数据库
db.class1.drop()
var bulk=db.class1.initializeUnorderedBulkOp();
var doc1={address:"鼓楼",
location: { type: "Point", coordinates: [116.393453,39.962571] },
}
bulk.insert(doc1);

var doc2={address:"永定门",location:{type: "Point",coordinates: [116.405738,39.878415]}
}

bulk.insert(doc2);
var doc3={address:"长安街",location:
{ type: "Point", coordinates: [116.403982,39.915425] }}
bulk.insert(doc3);

bulk.execute();
var result=db.class1.createIndex({location:"2dsphere"})
printjson(result)
//包含
var cursor=db.class1.find({
	location:
	{$geoWithin:
	{$geometry:
	{type:"Polygon",coordinates:[[
[116.393453,39.962571],
[116.405738,39.878415],
[116.403982,39.915425],
[116.393453,39.962571]
]]
}}}})

printjson(cursor.toArray())
//交叉
var cursor=db.class1.find({
	location:
	{$geoIntersects :
	{$geometry:
	{type:"Polygon",coordinates:[[
[116.393453,39.962571],
[116.405738,39.878415],
[116.403982,39.915425],
[116.393453,39.962571]
]]
}}}})

printjson(cursor.toArray())

//距离永定门1~5公里的坐标有哪些？
var cursor=db.class1.find({
	location:
	{$near:
	{$geometry:
	{type:"Point",coordinates:[116.405738,39.878415]},
    $minDistance: 1000,
    $maxDistance: 5000
}}})

printjson(cursor.toArray())


