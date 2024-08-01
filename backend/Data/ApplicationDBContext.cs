using backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options): base(options)
        {

        }

       public  DbSet<Station> Stations { get; set; }
       public DbSet<StoragePlace> StoragePlaces { get; set; }
       public DbSet<PrepList> PrepLists { get; set; }
       public DbSet<PrepListItem> PrepListsItem { get; set; }
       public DbSet<UnitMeasure> UnitsMeasure { get; set; }
       public DbSet<Bio> Bio { get; set; }
       public DbSet<Employee> Employees { get; set;}
       public DbSet<Recipe> Recipes { get; set ;}



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
                        modelBuilder.Entity<PrepList>()
                .HasMany(p => p.PrepListItems)
                .WithOne(p => p.PrepList)
                .HasForeignKey(p => p.PrepListId);
            base.OnModelCreating(modelBuilder);


        }
    }
}
