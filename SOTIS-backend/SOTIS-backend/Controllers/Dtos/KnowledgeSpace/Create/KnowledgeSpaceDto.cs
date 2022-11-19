using System.Collections.Generic;

namespace SOTIS_backend.Controllers.Dtos
{
    public class KnowledgeSpaceDto
    {
        public string Id { get; set; }

        public string SubjectId { get; set; }

        public List<NodeDto> Nodes { get; set; } = new();

        public List<EdgeDto> Edges { get; set; } = new();
    }
}
