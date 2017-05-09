using System;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Namster.Models;
using Nest;

namespace Namster.Services
{
    public interface ISearchService
    {
        Task<ISearchResponse<DataNam>> FindByMatchAsync(string term, string building, string department, string vlan, int size = 100);
        Task<ISearchResponse<DataNam>> FilterByAsync(string field, string term, int size = 1000);
        Task<ISearchResponse<DataNam>> FilterNamsAsync(string room, string building, string department, string vlan, int size = 1000);
    }

    public class SearchService : ISearchService
    {
        private readonly ElasticClient _client;

        public SearchService(IConfiguration configuration)
        {
            var connectionString = new Uri(configuration["Search:Url"]);
            var indexName = configuration["Search:IndexName"];

            var settings = new ConnectionSettings(connectionString);
            settings.DefaultIndex(indexName);

            _client = new ElasticClient(settings);
        }

        public async Task<ISearchResponse<DataNam>> FilterByAsync(string field, string term, int size = 1000)
        {
            return
                await
                    _client.SearchAsync<DataNam>(s => s.Size(size).Query(q => q.Term(field, term)));
        }

        public async Task<ISearchResponse<DataNam>> FilterNamsAsync(string room, string building, string department,
            string vlan, int size = 1000)
        {
            return
                await
                    _client.SearchAsync<DataNam>(
                        s =>
                            s.Size(size).Query(q =>
                                q.Term(t => t.ExactRoom, room) &&
                                q.Term(t => t.ExactBuilding, building) &&
                                q.Term(t => t.ExactDepartment, department) &&
                                q.Term(t => t.Vlan, vlan)));
        }

        public async Task<ISearchResponse<DataNam>> FindByMatchAsync(string term, string building, string department, string vlan, int size = 100)
        {
            return await _client.SearchAsync<DataNam>(s =>
                s.Size(size)
                    .Query(q => // search on term
                        (q.Term(t => t.Room, term) ||
                        q.Term(t => t.NamNumber, term) ||
                        q.Term(t => t.Building, term) ||
                        q.Term(t => t.Department, term) ||
                        q.Term(t => t.Vlan, term)) &&
                        (q.Term(t => t.ExactBuilding, building) &&
                        q.Term(t => t.ExactDepartment, department) &&
                        q.Term(t => t.Vlan, vlan)))
                    .Aggregations(a =>
                        a.Terms("building", d => d.Field(f => f.ExactBuilding))
                         .Terms("department", d => d.Field(f => f.ExactDepartment))
                         .Terms("vlan", d => d.Field(f => f.Vlan)))
                    .Highlight(h =>
                        h.Fields(
                            f => f.Field(x => x.Building).PreTags("<mark>").PostTags("</mark>"),
                            f => f.Field(x => x.Room).PreTags("<mark>").PostTags("</mark>"),
                            f => f.Field(x => x.Department).PreTags("<mark>").PostTags("</mark>"),
                            f => f.Field(x => x.Division).PreTags("<mark>").PostTags("</mark>"))));
        }
    }
}
