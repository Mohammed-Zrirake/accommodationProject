using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helper
{
    public class QueryForm
    {
        public string city { get; set; }=null!;
        public int capacity { get; set; }
        public string startDate { get; set; }= null!;
        public string endDate { get; set; }= null!;
        
    }
}