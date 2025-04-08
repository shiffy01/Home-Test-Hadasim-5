import React from "react";
import { Button, Container, Typography, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 4,
            backgroundColor: "#ffffff",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: "#333", fontWeight: "bold" }}
          >
            Welcome to the Supermarket
          </Typography>

          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate("/signin")}
            sx={{
              mt: 2,
              backgroundColor: "#1E90FF",
              "&:hover": {
                backgroundColor: "#63B3ED",
              },
              color: "white",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Enter as a supplier
          </Button>

          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate("/store")}
            sx={{
              mt: 2,
              backgroundColor: "#1E90FF",
              "&:hover": {
                backgroundColor: "#63B3ED",
              },
              color: "white",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Go to Store
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
