using System;
using System.Threading.Tasks;
using Microsoft.Azure;
using Namster.Models;
using Nest;

namespace Namster.Services
{
    public interface ISearchService
    {
        Task<ISearchResponse<DataNam>> FindByMatchAsync(string term, int size);
    }

    public class SearchService : ISearchService
    {
        private static readonly Uri ConnectionString = new Uri(CloudConfigurationManager.GetSetting("ElasticSearchUrl"));
        private static readonly string IndexName = CloudConfigurationManager.GetSetting("SearchIndexName");
        private readonly ElasticClient _client;

        private readonly Action<HighlightDescriptor<DataNam>> _highlightDescription =
            h =>
                h.OnFields(
                    f => f.OnField(x => x.Building).PreTags("<mark>").PostTags("</mark>"),
                    f => f.OnField(x => x.Room).PreTags("<mark>").PostTags("</mark>"),
                    f => f.OnField(x => x.Department).PreTags("<mark>").PostTags("</mark>"),
                    f => f.OnField(x => x.Division).PreTags("<mark>").PostTags("</mark>"));

        public SearchService()
        {
            var settings = new ConnectionSettings(ConnectionString, IndexName);
            _client = new ElasticClient(settings);

        }

        public async Task<ISearchResponse<DataNam>> FindByMatchAsync(string term, int size)
        {
            var baseSearch =
                Query<DataNam>.MultiMatch(
                    m =>
                        m.OnFields(f => f.NamNumber, f => f.Building, f => f.Room,
                            f => f.Department, f => f.Division).Query(term));

            return
                await
                    _client.SearchAsync<DataNam>(
                        s =>
                            s.Size(size)
                                .Query(baseSearch)
                                .Highlight(_highlightDescription));
        }
    }
}
