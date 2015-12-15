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
    }

    public class SearchService : ISearchService
    {
        private readonly ElasticClient _client;

        private readonly Action<HighlightDescriptor<DataNam>> _highlightDescription =
            h =>
                h.OnFields(
                    f => f.OnField(x => x.Building).PreTags("<mark>").PostTags("</mark>"),
                    f => f.OnField(x => x.Room).PreTags("<mark>").PostTags("</mark>"),
                    f => f.OnField(x => x.Department).PreTags("<mark>").PostTags("</mark>"),
                    f => f.OnField(x => x.Division).PreTags("<mark>").PostTags("</mark>"));

        public SearchService(IConfiguration configuration)
        {
            var connectionString = new Uri(configuration["Search:Url"]);
            var indexName = configuration["Search:IndexName"];

            var settings = new ConnectionSettings(connectionString, indexName);
            _client = new ElasticClient(settings);

        }

        public async Task<ISearchResponse<DataNam>> FilterByAsync(string field, string term, int size = 1000)
        {
            return
                await
                    _client.SearchAsync<DataNam>(s => s.Size(size).Filter(f => f.Term(field, term)));
        }

        public async Task<ISearchResponse<DataNam>> FindByMatchAsync(string term, string building, string department, string vlan, int size = 100)
        {
            var query = Query<DataNam>.Filtered(a =>
            {
                // build multimatch on term
                a.Query(q => q.MultiMatch(m =>
                    m.OnFields(f =>
                        f.NamNumber, f => f.Building, f => f.Room, f => f.Department, f => f.Division)
                    .Query(term)));

                // add filters
                a.Filter(f =>
                    f.Term(t => t.ExactBuilding, building)
                    && f.Term(t => t.ExactDepartment, department)
                    && f.Term(t => t.Vlan, vlan)
                );
            });

            return await _client.SearchAsync<DataNam>(s =>
                s.Size(size)
                    .Query(query)
                    .Aggregations(a =>
                        a.Terms("Building", d => d.Field(f => f.ExactBuilding))
                         .Terms("Department", d => d.Field(f => f.ExactDepartment))
                         .Terms("VLAN", d => d.Field(f => f.Vlan)))
                    .Highlight(_highlightDescription));
        }
    }
}
