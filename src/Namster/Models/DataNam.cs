using System;
using Nest;

namespace Namster.Models
{
    [ElasticsearchType(Name = "datanam", IdProperty = "NamNumber")]
    public class DataNam
    {
        [String(Index = FieldIndexOption.NotAnalyzed)]
        public string NamNumber { get; set; }

        [String(Index = FieldIndexOption.NotAnalyzed)]
        public string ExactBuilding => Building;
        public string Building { get; set; }

        [String(Index = FieldIndexOption.NotAnalyzed)]
        public string ExactRoom => Room;
        public string Room { get; set; }

        [String(Index = FieldIndexOption.NotAnalyzed)]
        public string ExactDepartment => Department;

        public string Department { get; set; }

        [String(Index = FieldIndexOption.No, Store = true)]
        public string CaanZone { get; set; }

        [String(Index = FieldIndexOption.No, Store = true)]
        public string BillingId { get; set; }

        [String(Index = FieldIndexOption.NotAnalyzed)]
        public string Vlan { get; set; }

        [String(Index = FieldIndexOption.No, Store = true)]
        public string DepartmentNumber { get; set; }

        public string Division { get; set; }

        public string Status { get; set; }

        [String(Index = FieldIndexOption.No, Store = true)]
        public string College { get; set; }

        [String(Index = FieldIndexOption.No, Store = true)]
        public string Subnet { get; set; }

        [String(Index = FieldIndexOption.No, Store = true)]
        public string Id { get; set; }

        [String(Index = FieldIndexOption.No, Store = true)]
        public string Mask { get; set; }

        [String(Index = FieldIndexOption.No, Store = true)]
        public string TechContact { get; set; }

        [String(Index = FieldIndexOption.No, Store = true)]
        public string Email { get; set; }

        [String(Index = FieldIndexOption.No, Store = true)]
        public string Phone { get; set; }
    }
}
