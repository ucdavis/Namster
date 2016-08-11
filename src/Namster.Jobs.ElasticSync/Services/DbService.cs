using System.Data.SqlClient;

namespace Namster.Jobs.ElasticSync.Services
{
    public class DbService
    {
        public SqlConnection GetDbConnection()
        {
            var conn = new SqlConnection("Data Source=terry;Initial Catalog=MothraDataMart;Integrated Security=True;");
            return conn;
        }
    }
}
