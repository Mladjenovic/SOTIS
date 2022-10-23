namespace SOTIS_backend.Common.Enums
{
    public enum ServiceType
    {
        /// <summary>
        /// Transient service.
        /// </summary>
        Transient = 0,

        /// <summary>
        /// Scoped service.
        /// </summary>
        Scoped = 1,

        /// <summary>
        /// Singleton service
        /// </summary>
        Singleton = 2
    }
}
