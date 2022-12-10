namespace SOTIS_backend.Common.Settings
{
    public class AppSettings
    {
        public JwtSettings Jwt { get; set; }

        public string IitaUrl { get; set; }

        public string StochasticMarkovUrl { get; set; }

        public double StochasticMarkovThreshold { get; set; }

        public string StatesUrl { get; set; }

        public string SimuUrl { get; set; }

        public SimuSettings SimuSettings { get; set; }
    }
}
