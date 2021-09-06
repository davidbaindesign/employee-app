﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.DataModels
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Department { get; set; }
        public string DateOfHire { get; set; }
        public string Birthday { get; set; }
        public string ProfilePhoto { get; set; }
        public string ProfileDesciption { get; set; }

    }
}
