// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import { getSupplier } from "./api";
// import React, { useEffect, useState } from "react";
// export default function Profile({ supplier }) {
//   const [open, setOpen] = useState(false);
//   console.log(supplier);
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Profile
//       </Button>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">{"Profile"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             {`Name: ${supplier.representative}
// Company: ${supplier.company}
// Phone: ${supplier.phone_number}
// For more info contact the company`
//               .split("\n")
//               .map((line, idx) => (
//                 <span key={idx}>
//                   {line}
//                   <br />
//                 </span>
//               ))}
//           </DialogContentText>
//         </DialogContent>
//       </Dialog>
//     </React.Fragment>
//   );
// }
import React, { useState, forwardRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

// Slide transition from the left (so the dialog enters from the right)
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function Profile({ supplier }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        sx={{ borderRadius: "50%", height: "100%" }}
      >
        Profile
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        keepMounted
        PaperProps={{
          sx: {
            position: "fixed",
            right: 0,
            margin: 0,
            width: "400px",
            height: "100%",
            maxHeight: "100%",
            borderRadius: 0,
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{"Profile"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Name: ${supplier.representative}
              Company: ${supplier.company}
              Phone: ${supplier.phone_number}
              For more info contact the company`
              .split("\n")
              .map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
