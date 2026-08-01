"use client";
import { authClient } from "@/lib/auth-client";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteFacilityAlert = ({ facility }) => {
  const router = useRouter();
  const { _id, name } = facility;
  const handleDelete = async () => {
    const { data: tokenData } = await authClient.token();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facility/${_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${tokenData?.token}`
      }
    });
    const data = await res.json();
    if (data.deletedCount > 0) {
      toast.success("Facility Deleted Successfully!");
      router.refresh();
    }
  };

  return (
    <AlertDialog>
      <Button
        className="bg-rose-500 hover:bg-rose-600 text-white font-semibold transition hover:scale-102 border-none"
        variant="solid"
      >
        <TrashBin />
        Delete
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[420px] bg-white dark:bg-[#151C2C] text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800">
            <AlertDialog.CloseTrigger className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100" />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />

              <AlertDialog.Heading className="text-slate-800 dark:text-slate-100 font-bold">
                Delete Facility?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p className="text-slate-600 dark:text-slate-300">
                This will permanently delete{" "}
                <strong className="text-slate-800 dark:text-slate-100">{name}</strong> and all of its
                booking information. This action cannot be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer className="border-t border-slate-100 dark:border-slate-800 pt-3">
              <Button
                slot="close"
                variant="tertiary"
                className="text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </Button>

              <Button
                onClick={handleDelete}
                slot="close"
                variant="danger"
              >
                Delete Facility
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DeleteFacilityAlert;