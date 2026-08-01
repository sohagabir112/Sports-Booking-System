'use client';
import Image from 'next/image';
import React from 'react';
import { motion } from "motion/react";
import BookingCancelAlert from './BookingCancelAlert';

const BookingCard = ({ booking }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -7,
        scale: 1.01,
      }}
      transition={{
        duration: 0.3,
      }}
      className="bg-white dark:bg-[#151C2C] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden hover:shadow-xl transition-colors duration-300"
    >
      <div className="flex flex-col md:flex-row">
        <Image
          src={booking.facilityImage}
          height={200}
          width={300}
          alt={booking.facilityName}
          className="w-full md:w-60 lg:w-70 h-45 md:h-auto object-cover"
        />

        <div className="flex-1 p-3 md:p-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">
                {booking.facilityName}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{booking.timeSlot}</p>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-sm font-semibold w-fit">
              {booking.status}
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            <div>
              <p className="text-slate-400 dark:text-slate-500 text-xs">Booking Date</p>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm md:text-base mt-1">
                {booking.bookingDate}
              </h3>
            </div>

            <div>
              <p className="text-slate-400 dark:text-slate-500 text-xs">Time Slot</p>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm md:text-base mt-1">
                {booking.timeSlot}
              </h3>
            </div>

            <div className="col-span-2 lg:col-span-1">
              <p className="text-slate-400 dark:text-slate-500 text-xs">Total Price</p>
              <h3 className="font-bold text-lg md:text-xl bg-linear-to-l from-[#24B1B1] to-[#007979] bg-clip-text text-transparent mt-1">
                {booking.totalPrice} Tk
              </h3>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <BookingCancelAlert booking={booking} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingCard;