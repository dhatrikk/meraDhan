import { FaFilter, FaRegCalendarAlt } from "react-icons/fa";



export default function TabsSection() {
  return (
    <div className="mt-6 w-full ">
      
      <div className="bg-blue-50 rounded-xl flex items-center justify-between px-3 md:px-6 py-3 
                      overflow-x-auto ">
        
        {/* Tabs */}
        <div className="flex gap-3 md:gap-5 text-sm font-medium min-w-max">
          <button className="px-4 py-2 text-gray-600 hover:text-black transition whitespace-nowrap">
            Yesterday
          </button>

          <button className="px-4 py-2 bg-blue-900 text-white rounded-md whitespace-nowrap">
            Today
          </button>

          <button className="px-4 py-2 text-gray-600 hover:text-black transition whitespace-nowrap">
            Tomorrow
          </button>

          <button className="px-4 py-2 text-gray-600 hover:text-black transition whitespace-nowrap">
            This Week
          </button>

          <button className="px-4 py-2 text-gray-600 hover:text-black transition whitespace-nowrap">
            Next Week
          </button>

          <button className="px-4 py-2 text-gray-600 hover:text-black transition whitespace-nowrap">
            This Month
          </button>
        </div>

        {/* Filters */}
        <button className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black transition">
          <FaFilter className="w-4 h-4 text-blue-900" />
          Filters
        </button>

      </div>

      {/* Mobile Filters Button */}
      <div className="mt-3 md:hidden flex justify-start px-3">
        <button className="flex items-center gap-2 border px-3 py-2 rounded-md text-sm">
          <FaFilter className="text-blue-900" />
          Filters
        </button>
         
      </div>

    </div>
  );
}
