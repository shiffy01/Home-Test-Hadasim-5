import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
} from "@mui/material";
import { addOrder, getAllSuppliers, getProductsBySupplier } from "./api";
function AddOrder({ onRefresh }) {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const fetchProducts = async (id) => {
    try {
      const response = await getProductsBySupplier(id);
      setProducts(response);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchSuppliers = async () => {
    try {
      const response = await getAllSuppliers();
      setSuppliers(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchSuppliers();
  }, []);

  const setSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    fetchProducts(supplier);
  };

  const postOrder = async () => {
    try {
      addOrder(
        products.find((item) => item.id === selectedProduct)?.name,
        quantity,
        selectedSupplier,
        quantity * products.find((item) => item.id === selectedProduct)?.price
      );
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      postOrder();
      setIsLoading(false);
      setSelectedSupplier("");
      setSelectedProduct("");
      setQuantity("");
      onRefresh();
    }, 2000);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add Order
      </Typography>

      {/* Product Selector */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="supplier-select-label">Select Supplier</InputLabel>
        <Select
          labelId="supplier-select-label"
          value={selectedSupplier}
          label="Select Product"
          onChange={(e) => setSupplier(e.target.value)}
        >
          {suppliers.map((supplier) => (
            <MenuItem key={supplier.id} value={supplier.id}>
              {`${supplier.representative}, ${supplier.company}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="product-select-label">Select Product</InputLabel>
        <Select
          labelId="product-select-label"
          value={selectedProduct}
          label="Select Product"
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          {products.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Quantity Input */}
      <TextField
        label="Quantity"
        type="number"
        fullWidth
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        sx={{ marginBottom: 2 }}
        slotProps={{
          htmlInput: {
            min: products.find((item) => item.id === selectedProduct)?.minimum,
            max: 1000,
            step: 1,
          },
        }}
      />
      <Typography paddingBottom={2}>{`Total: $${
        quantity *
          products.find((item) => item.id === selectedProduct)?.price || 0
      }`}</Typography>
      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={isLoading || !selectedProduct || quantity <= 0}
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Place Order"
        )}
      </Button>
    </Box>
  );
}

export default AddOrder;
