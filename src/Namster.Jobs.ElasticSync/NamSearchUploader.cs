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
        private readonly string _dbConnectionString;

        public NamSearchUploader(IConfiguration configuration)
        {
            _dbService = new DbService();

            _dbConnectionString = configuration["Data:DefaultConnection:ConnectionString"];
            _connectionString = new Uri(configuration["Search:Url"]);
            _indexName = configuration["Search:IndexName"];
        }

        public void Run()
        {
            using (var conn = _dbService.GetDbConnection(_dbConnectionString))
            {
                var nams = conn.Query<DataNam>("select * from DataNamsFlattened inner join VLanContactsFlattened on DataNamsFlattened.Vlan = VLanContactsFlattened.Vlan");

                Console.WriteLine("Nams retrieved from DB");

                var settings = new ConnectionSettings(_connectionString);
                settings.DefaultIndex(_indexName);

                var client = new ElasticClient(settings);

                if (client.Indices.Exists(_indexName).Exists)
                {
                    client.Indices.Delete(_indexName);
                }

                client.Indices.Create(_indexName, c => c.Map<DataNam>(m => m.AutoMap()));
                
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
