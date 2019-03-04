dbservice=connect("localhost:27017")
db=dbservice.getSiblingDB("student")
db.counters.drop()//存放计数器
db.use_test.drop()//存放测试集合

//_id计数器的名称,seq计数器的值
db.counters.insert({_id:"userid",seq:0})

//函数：用于增加计数器的值
function getNextSequence(name){
   var ret=db.counters.findAndModify({
	query:{_id:name},
	update:{$inc:{seq:1}},
	new:true,
	upsert:true 
   });
   return ret.seq;
}

for(i=0;i<5;i++){
	db.use_test.insert({_id:getNextSequence("userid"),name:"Bob"});
}

var cursor=db.use_test.find();
cursor.forEach(printjson)
	