dbservice=connect("localhost:27017");
db=dbservice.getSiblingDB("student");
db.bulk_demo.drop();//清空集合中的文档

var bulk = db.bulk_demo.initializeUnorderedBulkOp();
bulk.insert( { item: "abc123", defaultQty: 100, status: "A", points: 100 } );
bulk.insert( { item: "ijk123", defaultQty: 200, status: "A", points: 200 } );
bulk.insert( { item: "mop123", defaultQty: 0, status: "P", points: 0 } );



var result=bulk.execute();
printjson(result);
var cursor=db.bulk_demo.find()
printjson(cursor.toArray())