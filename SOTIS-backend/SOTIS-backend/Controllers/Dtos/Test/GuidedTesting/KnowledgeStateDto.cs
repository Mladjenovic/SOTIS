﻿using System.Collections;
using System.Collections.Generic;

namespace SOTIS_backend.Controllers.Dtos.Test.GuidedTesting
{
    public class KnowledgeStateDto
    {
        public IEnumerable<string> ProblemIds { get; set; }

        public double Probability { get; set; }
    }
}
