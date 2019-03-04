dbservice=connect("localhost:27017");
db=dbservice.getSiblingDB("student");

db.query_test.drop()

var bulk=db.query_test.initializeUnorderedBulkOp();
var doc1={name:"tom",age:20}
bulk.insert(doc1);
var doc2={name:"joe",age:23}
bulk.insert(doc2);
var doc3={name:"jerry",age:30}
bulk.insert(doc3);
var doc4={name:"jack",age:null}
bulk.insert(doc4);
bulk.execute()