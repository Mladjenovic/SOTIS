using SOTIS_backend.DataAccess.Interfaces;
using SOTIS_backend.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOTIS_backend.DataAccess.Repositories
{
    public class NodeDetailsRepository : EntityBaseRepository<NodeDetails>, INodeDetailsRepository
    {
        public NodeDetailsRepository(SotisDbContext context) : base(context) { }
    }
}
