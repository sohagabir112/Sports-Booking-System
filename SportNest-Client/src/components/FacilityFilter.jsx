'use client';
import { useState } from "react";

const FacilityFilter = ({ fetchFacilities }) => {
  const [search, setSearch] = useState("");
  const [sport, setSport] = useState("");

  const handleSearch = () => {
    fetchFacilities(search, sport);
  };

  const handleSportChange = (e) => {
    const value = e.target.value;
    setSport(value);
    fetchFacilities(search, value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 my-10 justify-center items-center">
      <label className="select mb-4 md:mb-0 w-49 bg-white dark:bg-[#151C2C] text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700">
        <select value={sport} onChange={handleSportChange} className="bg-transparent text-slate-800 dark:text-slate-100">
          <option value="" className="bg-white dark:bg-[#151C2C] text-slate-800 dark:text-slate-100">All Sports</option>
          <option value="Football" className="bg-white dark:bg-[#151C2C] text-slate-800 dark:text-slate-100">Football</option>
          <option value="Cricket" className="bg-white dark:bg-[#151C2C] text-slate-800 dark:text-slate-100">Cricket</option>
          <option value="Badminton" className="bg-white dark:bg-[#151C2C] text-slate-800 dark:text-slate-100">Badminton</option>
          <option value="Basketball" className="bg-white dark:bg-[#151C2C] text-slate-800 dark:text-slate-100">Basketball</option>
          <option value="Swimming" className="bg-white dark:bg-[#151C2C] text-slate-800 dark:text-slate-100">Swimming</option>
          <option value="Bowling" className="bg-white dark:bg-[#151C2C] text-slate-800 dark:text-slate-100">Bowling</option>
          <option value="Gym" className="bg-white dark:bg-[#151C2C] text-slate-800 dark:text-slate-100">Gym</option>
          <option value="Athletics" className="bg-white dark:bg-[#151C2C] text-slate-800 dark:text-slate-100">Athletics</option>
          <option value="Tennis" className="bg-white dark:bg-[#151C2C] text-slate-800 dark:text-slate-100">Tennis</option>
        </select>
      </label>

      <label className="input bg-white dark:bg-[#151C2C] text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700">
        <svg className="h-[1em] opacity-60 text-slate-500 dark:text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="text"
          placeholder="Search facility..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
      </label>

      <button onClick={handleSearch} className="btn bg-linear-to-l from-[#24B1B1] to-[#007979] text-white border-none hover:opacity-90">
        Search
      </button>
    </div>
  );
};

export default FacilityFilter;