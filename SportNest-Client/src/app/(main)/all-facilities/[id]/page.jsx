import BookingForm from '@/components/BookingForm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';

const FacilityDetailsPage = async ({ params }) => {
  const { id } = await params;
  const { token } = await auth.api.getToken({
    headers: await headers()
  });
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facility/${id}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  const facility = await res.json();
  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <Image
              src={facility.image}
              alt={facility.name}
              height={450}
              width={500}
              className="w-full object-cover rounded-3xl shadow-lg border border-slate-200 dark:border-slate-800"
            />
          </div>

          <div>
            <div className="md:inline-block text-center text-base px-4 py-2 rounded-full bg-linear-to-l from-[#24B1B1] to-[#007979] text-white font-medium shadow-md">
              {facility.facility_type}
            </div>

            <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mt-4">
              {facility.name}
            </h1>

            <p className="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed">
              {facility.description}
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Location
                </span>

                <span className="text-slate-800 dark:text-slate-200">
                  {facility.location}
                </span>
              </div>

              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Capacity
                </span>

                <span className="text-slate-800 dark:text-slate-200">
                  {facility.capacity} Players
                </span>
              </div>

              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Price
                </span>

                <span className="font-semibold text-[#24B1B1]">
                  {facility.price_per_hour} Tk/hour
                </span>
              </div>

              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Available Slots
                </h3>

                <div className="flex flex-wrap gap-2">
                  {facility.available_slots.map((slot) => (
                    <span
                      key={slot}
                      className="px-4 py-2 bg-teal-50 dark:bg-teal-950/60 rounded-xl text-[#007979] dark:text-teal-300 border border-teal-200/60 dark:border-teal-800 text-sm font-medium"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <BookingForm facility={facility} />
      </div>
    </div>
  );
};

export default FacilityDetailsPage;