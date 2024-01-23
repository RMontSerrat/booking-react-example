import { Modal } from "@/components/Modal";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Button } from "@mui/material";

interface DeleteReservationProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteReservation({
  onCancel,
  onConfirm,
}: DeleteReservationProps) {
  return (
    <>
      <WarningAmberIcon color="warning" fontSize="large" />
      <Modal.Title>
        Are you sure you want to delete this reservation?
      </Modal.Title>
      <Modal.Actions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Actions>
    </>
  );
}
