import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Approve({ onApprove }) {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      buttonRef.current?.focus();
    }, 100);
  };

  const handleApprove = () => {
    onApprove();
    setOpen(false);
    setTimeout(() => {
      buttonRef.current?.focus();
    }, 100);
  };

  return (
    <React.Fragment>
      <Button ref={buttonRef} variant="outlined" onClick={handleClickOpen}>
        Approve
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Awaits approval"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to approve the order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleApprove} autoFocus>
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
