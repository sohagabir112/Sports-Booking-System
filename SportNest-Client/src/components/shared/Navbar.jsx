'use client';
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { toast } from "react-toastify";
import Navlink from "./Navlink";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success('Logout successful');
    router.push('/login');
  };

  return (
    <div className="bg-white dark:bg-[#111827] shadow-md border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="navbar max-w-7xl mx-auto px-4">
        <div className="navbar-start">
          <Link href={"/"} className="flex items-center gap-2">
            <Image
              src={"/logoo.png"}
              height={45}
              width={45}
              alt="SportNest Logo"
            />

            <h1 className="text-2xl font-bold">
              <span className="text-[#0F172A] dark:text-white transition-colors duration-300">
                Sport
              </span>

              <span className="bg-linear-to-l from-[#24B1B1] to-[#007979] bg-clip-text text-transparent">
                Nest
              </span>
            </h1>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-7 text-[16px] font-medium items-center">
            <li>
              <Navlink href={"/"}>Home</Navlink>
            </li>

            <li>
              <Navlink href={"/all-facilities"}>All Facilities</Navlink>
            </li>

            {user && (
              <div className="flex gap-7 items-center">
                <li>
                  <Navlink href={"/mybookings"}>My Bookings</Navlink>
                </li>

                <li>
                  <Navlink href={"/add-facility"}>Add Facility</Navlink>
                </li>

                <li>
                  <Navlink href={"/manage-facilities"}>
                    Manage My Facilities
                  </Navlink>
                </li>
              </div>
            )}
          </ul>
        </div>

        <div className="navbar-end gap-3 flex items-center">
          <ThemeToggle />

          {user ? (
            <div className="flex items-center sm:gap-2.5">
              <h2 className="sm:font-semibold text-slate-800 dark:text-slate-200">
                Hi,{" "}
                <span className="bg-linear-to-l from-[#24B1B1] to-[#007979] bg-clip-text text-transparent font-semibold sm:font-bold">
                  {user?.name}
                </span>
              </h2>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full border-2 border-[#24B1B1] overflow-hidden">
                    <Image
                      src={user?.image || "/user.png"}
                      alt={user?.name || "User"}
                      width={40}
                      height={40}
                    />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-5 z-1 p-4 shadow-xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 rounded-2xl w-56 text-[#0F172A] dark:text-slate-200 space-y-2 font-semibold"
                >
                  <li>
                    <Link href={"/mybookings"} className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg p-2">
                      My Bookings
                    </Link>
                  </li>

                  <li>
                    <Link href={"/add-facility"} className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg p-2">
                      Add Facility
                    </Link>
                  </li>

                  <li>
                    <Link href={"/manage-facilities"} className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg p-2">
                      Manage My Facilities
                    </Link>
                  </li>

                  <li className="pt-2">
                    <button
                      onClick={handleLogout}
                      className="btn rounded-2xl bg-linear-to-l from-[#24B1B1] to-[#007979] hover:opacity-90 border-none text-white w-full"
                    >
                      Logout <MdOutlineLogout />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <Link href={"/login"}>
                <button className="btn bg-linear-to-l from-[#24B1B1] to-[#007979] text-white rounded-xl hover:opacity-90 border-none ease-in-out transition-all duration-300 hover:scale-102">
                  Login <MdOutlineLogin />
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
