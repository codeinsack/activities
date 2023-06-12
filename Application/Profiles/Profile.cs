namespace Application.Profiles;

public class Profile
{
    public string Username { get; set; }
    public string DisplayName { get; set; }
    public string Bio { get; set; } = "Default Bio";
    public bool Following { get; set; }
    public int FollowersCount { get; set; }
    public int FollowingCount { get; set; }
}