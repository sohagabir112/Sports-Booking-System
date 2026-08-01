import DeleteFacilityAlert from '@/components/DeleteFacilityAlert';
import EditFacilityModal from '@/components/EditFacilityModal';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ManageFacilitiesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const { token } = await auth.api.getToken({
    headers: await headers()
  });
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-facilities/${user?.email}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  const facilities = await res.json();

  if (facilities.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">No Facilities Available</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-3">You haven't added any facilities yet.</p>
        <Link href="/add-facility">
          <button className="btn mt-6 rounded-2xl bg-linear-to-l from-[#24B1B1] to-[#007979] text-white font-semibold transition duration-300 hover:-translate-y-1 border-none">
            Add Facility
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#0F172A] dark:text-slate-100">
            Manage
            <span className="bg-linear-to-l from-[#24B1B1] to-[#007979] bg-clip-text text-transparent">
              {" "}Facilities
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-4">Update or remove your facilities.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {facilities.map((facility) => (
            <div
              key={facility._id}
              className="group bg-white dark:bg-[#151C2C] rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={facility.image}
                  alt={facility.name}
                  width={500}
                  height={300}
                  className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                />

                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-linear-to-l from-[#24B1B1] to-[#007979]">
                    {facility.facility_type}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{facility.name}</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">{facility.location}</p>
                  </div>

                  <div className="text-right">
                    <h3 className="text-xl font-bold bg-linear-to-l from-[#24B1B1] to-[#007979] bg-clip-text text-transparent">
                      {facility.price_per_hour} Tk
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500">per hour</p>
                  </div>
                </div>

                <div className="flex justify-between mt-5 text-sm">
                  <div>
                    <p className="text-slate-400 dark:text-slate-500">Capacity</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{facility.capacity} Players</p>
                  </div>

                  <div>
                    <p className="text-slate-400 dark:text-slate-500">Bookings</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{facility.booking_count}</p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <EditFacilityModal facility={facility} />
                  <DeleteFacilityAlert facility={facility} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageFacilitiesPage;