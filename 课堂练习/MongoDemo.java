package demo2;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Updates.*;
import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import static com.mongodb.client.model.Aggregates.*;

import com.mongodb.client.model.Accumulators;
import com.mongodb.client.model.Projections;
import com.mongodb.client.model.Sorts;
import com.mongodb.client.model.UpdateOptions;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;

public class MongoDemo {
	private MongoClient client = null;
	private MongoDatabase dbase = null;
	private MongoCollection<Document> col = null;

	public MongoDemo(String db, String colletion) {
		client = new MongoClient("localhost", 27017);
		dbase = client.getDatabase(db);
		col = dbase.getCollection(colletion);
	}

//	FindIterable<Document>  iterable=col.find(eq("city","shijiazhuang"));
//	FindIterable<Document>  iterable=col.find(eq("city","shijiazhuang"));
//	FindIterable<Document>  iterable=col.find(gt("pop",300000));
//	FindIterable<Document>  iterable=col.find(regex("city","^s")).sort(Sorts.ascending("pop"));
	public void show() {
		FindIterable<Document> iterable = col.find();
		MongoCursor<Document> cursor = iterable.iterator();
		while (cursor.hasNext()) {
			System.out.println(cursor.next());
		}

	}
	
	
	public void insert() {
		List<Document> list=new ArrayList<Document>();
		for(int i=0;i<10;i++) {
			Document doc1 =new Document();
			doc1.append("name", "tom"+i);
			doc1.append("age", 20);
			doc1.append("scores", Arrays.asList(23,56,67));
			doc1.append("address", new Document("provice","hebei"));
//			col.insertOne(doc1);
			list.add(doc1);
			
		}
		col.insertMany(list);
	}
	
	
	public void update() {
//	UpdateResult result=col.updateOne
//		(eq("name","tom100"), combine(set("age", 22),currentDate("date1")),
//				 new UpdateOptions().upsert(true).bypassDocumentValidation(true));
//	System.out.println(result.toString());
	col.updateMany(eq("age",20), combine(inc("age", 5)));
	}
	
	public void delete() {
	DeleteResult  result=col.deleteOne(eq("name","tom1"));
	System.out.println(result.toString());
	col.drop();
	}
	
	public void aggregate() {
		AggregateIterable<Document> iterable=col.aggregate(Arrays.asList(
				match(eq("provice","hebei")),
				group("$city", Accumulators.sum("cityPop","$pop")),
			   sort(Sorts.ascending("$city"))
				));
		MongoCursor<Document> cursor=iterable.iterator();
		while (cursor.hasNext()) {
			System.out.println(cursor.next());
		}
	
//		AggregateIterable<Document> iterable=col.aggregate(Arrays.asList(
//			          project(
//			              Projections.fields(
//			                    Projections.excludeId(),
//			                    Projections.include("city","pop")
//			                   
//		        			              )
//			          )
//			      )
//			);
//		MongoCursor<Document> cursor=iterable.iterator();
		while (cursor.hasNext()) {
			System.out.println(cursor.next());
		}
	}
	public static void main(String[] args) {
		MongoDemo d=new MongoDemo("test","chinaPop");
		d.aggregate();
	}

}
