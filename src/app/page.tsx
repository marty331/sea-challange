"use client";

import { useEffect, useState } from "react";

type Advocate = {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
        setIsLoading(false);
      });
    });
  }, []);

  const filterData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    console.log("filtering advocates...");
    const filtered = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchValue) ||
        advocate.lastName.toLowerCase().includes(searchValue) ||
        advocate.city.toLowerCase().includes(searchValue) ||
        advocate.degree.toLowerCase().includes(searchValue) ||
        advocate.specialties.some(s => s.toLowerCase().includes(searchValue)) ||
        advocate.yearsOfExperience.toString().includes(searchValue)
      );
    });

    setFilteredAdvocates(filtered);
  };

  const resetSearch = () => {
    setSearchTerm("");
    setFilteredAdvocates(advocates);
    const input = document.querySelector('input') as HTMLInputElement;
    if (input) input.value = "";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Solace Advocates
          </h1>
          <p className="text-gray-600">Find the right healthcare professional for your needs</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Search Advocates
          </label>
          <div className="flex gap-3">
            <input 
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
              onChange={filterData}
              placeholder="Search by name, city, degree, or specialty..."
            />
            <button 
              onClick={resetSearch}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm hover:shadow-md"
            >
              Reset
            </button>
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-600 mt-3">
              Searching for: <span className="font-semibold text-blue-600">{searchTerm}</span>
            </p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            Showing {filteredAdvocates.length} of {advocates.length} advocates
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <th className="w-32 px-6 py-4 text-left text-sm font-semibold">First Name</th>
                  <th className="w-32 px-6 py-4 text-left text-sm font-semibold">Last Name</th>
                  <th className="w-28 px-6 py-4 text-left text-sm font-semibold">City</th>
                  <th className="w-24 px-6 py-4 text-left text-sm font-semibold">Degree</th>
                  <th className="w-64 px-6 py-4 text-left text-sm font-semibold">Specialties</th>
                  <th className="w-32 px-6 py-4 text-left text-sm font-semibold">Experience</th>
                  <th className="w-36 px-6 py-4 text-left text-sm font-semibold">Phone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12">
                      <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                        <p className="text-gray-500">Loading advocates...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredAdvocates.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12">
                      <div className="text-gray-400">
                        <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-lg font-medium">No advocates found</p>
                        <p className="text-sm mt-1">Try adjusting your search criteria</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredAdvocates.map((advocate, id) => (
                    <tr 
                      key={id} 
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 text-gray-900 font-medium">{advocate.firstName}</td>
                      <td className="px-6 py-4 text-gray-900 font-medium">{advocate.lastName}</td>
                      <td className="px-6 py-4 text-gray-700">{advocate.city}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {advocate.degree}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {advocate.specialties.join(", ")}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {advocate.yearsOfExperience} years
                      </td>
                      <td className="px-6 py-4 text-gray-700 font-mono text-sm">
                        {advocate.phoneNumber}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
