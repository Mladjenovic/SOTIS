using System.Collections.Generic;

namespace SOTIS_backend.Controllers.Dtos
{
    public class KnowledgeSpaceDto
    {
        public string Id { get; set; }

        public string SubjectId { get; set; }

        public IEnumerable<NodeDto> Nodes { get; set; }

        public IEnumerable<EdgeDto> Edges { get; set; }
    }
}
