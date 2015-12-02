using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nest;

namespace Namster.Models
{
    public class DataNam
    {
        [ElasticProperty(Index = FieldIndexOption.NotAnalyzed)]
        public string NamNumber { get; set; }

        public string Building { get; set; }

        public string Room { get; set; }

        public string Department { get; set; }

        [ElasticProperty(Index = FieldIndexOption.No, Store = true)]
        public string CaanZone { get; set; }

        [ElasticProperty(Index = FieldIndexOption.No, Store = true)]
        public string BillingId { get; set; }

        [ElasticProperty(Index = FieldIndexOption.NotAnalyzed)]
        public string Vlan { get; set; }

        [ElasticProperty(Index = FieldIndexOption.No, Store = true)]
        public string DepartmentNumber { get; set; }

        public string Division { get; set; }

        public string Status { get; set; }
    }
}
