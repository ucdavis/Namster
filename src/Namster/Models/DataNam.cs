using System;
using Nest;

namespace Namster.Models
{
    [ElasticsearchType(RelationName = "datanam", IdProperty = "NamNumber")]
    public class DataNam
    {
        [Keyword]
        public string NamNumber { get; set; }

        [Keyword]
        public string ExactBuilding => Building;
        public string Building { get; set; }

        [Keyword]
        public string ExactRoom => Room;
        public string Room { get; set; }

        [Keyword]
        public string ExactDepartment => Department;

        public string Department { get; set; }

        [Keyword]
        public string CaanZone { get; set; }

        [Keyword]
        public string BillingId { get; set; }

        [Keyword]
        public string Vlan { get; set; }

        [Keyword]
        public string DepartmentNumber { get; set; }

        public string Division { get; set; }

        public string Status { get; set; }

        [Keyword]
        public string College { get; set; }

        [Keyword]
        public string Subnet { get; set; }

        [Keyword]
        public string Id { get; set; }

        [Keyword]
        public string Mask { get; set; }

        [Keyword]
        public string TechContact { get; set; }

        [Keyword]
        public string Email { get; set; }

        [Keyword]
        public string Phone { get; set; }
    }
}
