using System;

namespace SOTIS_backend.Common.Exceptions
{
    public class NotAuthenticated : Exception
    {
        public NotAuthenticated()
        {

        }

        public NotAuthenticated(string message) : base(message) 
        { 
        
        }
    }
}
