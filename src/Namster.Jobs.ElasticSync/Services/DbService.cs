using System.Data.SqlClient;

namespace Namster.Jobs.ElasticSync.Services
{
    public class DbService
    {
        public SqlConnection GetDbConnection(string connection)
        {
            var conn = new SqlConnection(connection);
            return conn;
        }
    }
}
