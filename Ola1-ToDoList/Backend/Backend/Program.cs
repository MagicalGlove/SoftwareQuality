using MongoDB.Bson;
using MongoDB.Driver;

namespace Backend
{
    public class Program
    {
        public static void Main()
        {
            Console.WriteLine("Starting");
            const string connectionString =
                "mongodb+srv://test:1234@ola2cluster.bijj3hs.mongodb.net/?retryWrites=true&w=majority&appName=Ola2Cluster";
            MongoClient client = new MongoClient(connectionString);

            IMongoCollection<BsonDocument>? collection =
                client.GetDatabase("sqOla1").GetCollection<BsonDocument>("Tasks");

            FilterDefinition<BsonDocument>? filter = Builders<BsonDocument>.Filter.Eq("name", "task 1");

            BsonDocument? document = collection.Find(filter).First();

            Console.WriteLine(document.ToString());
        }
    }
}