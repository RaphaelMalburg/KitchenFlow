using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class AppUser : IdentityUser
    {
        public Bio? bio;

        public List<Station> stations = new List<Station>();
        public List<UnitMeasure> unitMeasures  = new List<UnitMeasure>();
        public List<Employee> employees = new List<Employee>();
        public List<Recipe> recipes = new List<Recipe>();



    }
}
