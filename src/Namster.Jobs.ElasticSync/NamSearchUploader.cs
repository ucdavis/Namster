using System;
using Dapper;
using Microsoft.Extensions.Configuration;
using Namster.Jobs.ElasticSync.Helpers;
using Namster.Jobs.ElasticSync.Models;
using Namster.Jobs.ElasticSync.Services;
using Nest;

namespace Namster.Jobs.ElasticSync
{
    public class NamSearchUploader
    {
        private readonly DbService _dbService;

        private readonly string _indexName;
        private readonly Uri _connectionString;

        public NamSearchUploader(IConfiguration configuration)
        {
            _dbService = new DbService();

            _connectionString = new Uri(configuration["Search:Url"]);
            _indexName = configuration["Search:IndexName"];
        }

        public void Run()
        {
            using (var conn = _dbService.GetDbConnection())
            {
                var nams = conn.Query<DataNam>("select * from DataNamsFlattened");

                Console.WriteLine("Nams retrieved from DB");

                var settings = new ConnectionSettings(_connectionString);
                settings.DefaultIndex(_indexName);

                var client = new ElasticClient(settings);

                if (client.IndexExists(_indexName).Exists)
                {
                    client.DeleteIndex(_indexName);
                }

                client.CreateIndex(_indexName, c => c.Mappings(m =>
                {
                    m.Map<DataNam>(td => td.AutoMap());
                    return m;
                }));
                
                Console.WriteLine("Index recreated, starting indexing");

                var namsBuckets = nams.Partition(5000);

                foreach (var bucket in namsBuckets)
                {
                    Console.WriteLine("indexing bucket");
                    client.Bulk(b => b.IndexMany(bucket));
                }

                Console.WriteLine("Indexing complete, press any key to end");

                Console.ReadKey();
            }
        }
    }
}
