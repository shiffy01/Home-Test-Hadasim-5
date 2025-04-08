import React, { useState, useEffect } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { getProductsBySupplier, getOrdersBySupplier, editOrder } from "./api";
import Approve from "./Approve";
import Profile from "./Profile";
function SupplierPage() {
  const supplier = JSON.parse(localStorage.getItem("supplier"));
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchProducts = async (id) => {
    try {
      const response = await getProductsBySupplier(id);
      setProducts(response);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchOrders = async (id) => {
    try {
      const response = await getOrdersBySupplier(id);
      console.log(response);
      setOrders(response);
    } catch (error) {
      setOrders([]);
    }
  };
  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("supplier")).id;
    fetchProducts(id);
    fetchOrders(id);
  }, []);

  const onApprove = async (orderId) => {
    const order = orders.find((item) => item.id === orderId);
    const newOrder = {
      id: order.id,
      name: order.name,
      quantity: order.quantity,
      supplier_id: order.supplier_id,
      total: order.total,
      status: "processing",
    };
    try {
      const response = await editOrder(newOrder);
      fetchOrders(supplier.id);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box sx={{ padding: 3, backgroundColor: "lightgray" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            padding: "10px",
          }}
        >
          {`Welcome, ${supplier.representative}`}
        </Typography>
        <Profile supplier={supplier}></Profile>
      </Box>
      <Grid container spacing={2}>
        {/* left: order list */}
        <Grid item size={3}>
          <Paper
            sx={{
              padding: 2,
              maxHeight: "70vh",
              overflow: "auto",
              border: "2px solid  rgb(85, 77, 77)",
            }}
          >
            <Typography variant="h6">Order List</Typography>
            <List>
              {orders.map((order) => (
                <ListItem
                  key={order.id}
                  sx={{
                    marginBottom: "7px",
                    border: "3px solid #1E90FF",
                    borderRadius: "5px",
                  }}
                >
                  <ListItemText
                    primary={`${order.name}(${order.quantity})`}
                    secondary={
                      <>
                        <div>{`Total price: $${order.total}`}</div>
                        <div>
                          {order.status == "pending"
                            ? "Ordered"
                            : order.status == "processing"
                            ? "Processing"
                            : "Completed"}
                        </div>
                      </>
                    }
                  />
                  {order.status == "pending" ? (
                    <Approve onApprove={() => onApprove(order.id)}></Approve>
                  ) : (
                    <></>
                  )}
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* right: diplay products */}
        <Grid item size={9}>
          <Paper
            sx={{
              padding: 2,
              height: "70vh",
              border: "2px solid  rgb(85, 77, 77)",
            }}
          >
            <Grid container spacing={2}>
              {products.map((product, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper sx={{ padding: 2, border: "2px solid #1E90FF" }}>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2">
                      Price: {product.price}
                    </Typography>
                    <Typography variant="body2">
                      Minimum Order: {product.minimum}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SupplierPage;
