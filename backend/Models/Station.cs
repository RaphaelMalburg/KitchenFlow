namespace backend.Models
{
    public class Station
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public AppUser? AppUser { get; set; }
        public string AppUserId { get; set; }
        public List<StoragePlace> StoragePlaces { get; set; } = new List<StoragePlace>();
        public List <PrepList> PrepLists { get; set; } = new List<PrepList>();
        public List<PrepListItem> PrepListsItem { get; set ;} = new List<PrepListItem>();


    }
}
