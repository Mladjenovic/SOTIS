namespace SOTIS_backend.Common.Settings
{
    public class JwtSettings
    {
        public string Secret { get; set; }

        public double JwtTokenExpiresInSeconds { get; set; }

        public string Issuer { get; set; }

        public string Audience { get; set; }
    }
}
