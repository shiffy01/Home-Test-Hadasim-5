import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
  Alert,
} from "@mui/material";
import { checkSupplier } from "./api";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    representative: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { representative, password } = formData;

    if (password === "" || representative === "") {
      setError("Both fields are required");
    } else {
      const supplier = await checkSupplier(representative, password);
      if (supplier) {
        setError("");
        localStorage.setItem("supplier", JSON.stringify(supplier));
        navigate("/supplier");
      } else {
        setError("Name or password is incorrect");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 8,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3 }}>
          Sign In
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="Representative"
            name="representative"
            type="text"
            value={formData.representative}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            name="password"
            type="text"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
        </form>

        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid item>
            <Button
              onClick={() => {
                navigate("/signup");
              }}
              variant="text"
              color="primary"
              sx={{ textTransform: "none" }}
            >
              Sign up
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SignInPage;
