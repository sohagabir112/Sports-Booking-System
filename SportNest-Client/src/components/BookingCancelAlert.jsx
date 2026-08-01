"use client";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const BookingCancelAlert = ({ booking }) => {
  const router = useRouter();
  const { _id, facilityName } = booking;
  const handleCancelBooking = async () => {
    const { data: tokenData } = await authClient.token();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${tokenData?.token}`
      },
    });
    const data = await res.json();

    if (data.deletedCount > 0) {
      toast.success("Booking Cancelled Successfully!");
      router.refresh();
    }
  };

  return (
    <AlertDialog>
      <Button
        className="btn rounded-full bg-rose-500 hover:bg-rose-600 text-white font-semibold transition-all duration-300 hover:-translate-y-1 border-none"
        variant="solid"
      >
        <TrashBin />
        Cancel Booking
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[450px] bg-white dark:bg-[#151C2C] text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800">
            <AlertDialog.CloseTrigger className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100" />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />

              <AlertDialog.Heading className="text-slate-800 dark:text-slate-100 font-bold">
                Cancel Booking?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p className="text-slate-600 dark:text-slate-300">
                Are you sure you want to cancel your booking for{" "}
                <strong className="text-slate-800 dark:text-slate-100">{facilityName}</strong>?
              </p>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
                This action cannot be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer className="border-t border-slate-100 dark:border-slate-800 pt-3">
              <Button
                slot="close"
                variant="tertiary"
                className="text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Keep Booking
              </Button>

              <Button
                onClick={handleCancelBooking}
                slot="close"
                variant="danger"
              >
                Cancel Booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default BookingCancelAlert;