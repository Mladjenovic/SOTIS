using System;

namespace SOTIS_backend.Common.Exceptions
{
    public class NotAuthorized : Exception
    {
        public NotAuthorized()
        {

        }

        public NotAuthorized(string message) : base(message)
        {

        }
    }
}
