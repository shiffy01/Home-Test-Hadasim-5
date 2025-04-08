import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
  Checkbox,
  Paper,
  List,
} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import React, { useState, useEffect } from "react";
import { addProduct, addSupplier, getAllProducts } from "./api";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    company: "",
    phoneNumber: "",
    representative: "",
    password: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    minimum: "",
  });
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };
  const addProductToList = () => {
    setProducts((products) => [...products, productData]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { company, phoneNumber, representative, password } = formData;
    if (
      company === "" ||
      phoneNumber === "" ||
      representative === "" ||
      password === ""
    ) {
      setError("All fields are required");
    } else {
      const supplier = await addSupplier(
        company,
        phoneNumber,
        representative,
        password
      );
      products.forEach(async (product) => {
        const ans = await addProduct(
          product.name,
          product.price,
          product.minimum,
          supplier.id
        );
      });

      localStorage.setItem("supplier", JSON.stringify(supplier));
      navigate("/supplier");
    }
  };
  const handleAddItem = () => {
    addProductToList();
    setProductData({
      name: "",
      price: "",
      minimum: "",
    });
    setIsAdding(false);
  };

  return (
    <Container sx={{ pt: 4, minHeight: "600px", width: "600px" }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Create an Account
        </Typography>

        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", flexWrap: "wrap" }}
          >
            {/* Left Column: Company Info */}
            <Grid item lg={6} xs={12}>
              <Grid
                container
                direction="column"
                spacing={2}
                justifyContent="center"
              >
                <Grid item>
                  <TextField
                    fullWidth
                    label="Company Name"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    type="text"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    label="Representative"
                    name="representative"
                    type="text"
                    value={formData.representative}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="text"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Right Column: Product Form */}
            <Grid
              item
              lg={6}
              xs={12}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              >
                {!isAdding ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsAdding(true)}
                    sx={{ marginLeft: "50px" }}
                  >
                    Add Product
                  </Button>
                ) : (
                  <Box>
                    <Typography>New Product</Typography>
                    <TextField
                      label="Name"
                      name="name"
                      variant="outlined"
                      value={productData.name}
                      onChange={handleProductChange}
                      margin="normal"
                      sx={{ marginRight: "5px" }}
                    />
                    <TextField
                      label="Price"
                      name="price"
                      variant="outlined"
                      value={productData.price}
                      onChange={handleProductChange}
                      margin="normal"
                    />
                    <TextField
                      label="Minimum"
                      name="minimum"
                      variant="outlined"
                      value={productData.minimum}
                      onChange={handleProductChange}
                      margin="normal"
                      sx={{ marginRight: "5px" }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAddItem}
                      sx={{ marginTop: "25px", marginLeft: "45px" }}
                    >
                      Add Product
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "20px" }}
          >
            Sign Up
          </Button>
        </form>
        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Grid item>
            <Button
              onClick={() => {
                navigate("/signin");
              }}
              variant="text"
              color="primary"
              sx={{ textTransform: "none" }}
            >
              Sign in
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SignUpPage;
