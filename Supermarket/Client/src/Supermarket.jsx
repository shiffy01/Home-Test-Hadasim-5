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
import AddOrder from "./AddOrder";
import { editOrder, getAllOrders } from "./api";
import Approve from "./Approve";
function SupermarketPage() {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const response = await getAllOrders();
      setOrders(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const onRefresh = () => {
    fetchOrders();
  };
  const onApprove = async (orderId) => {
    const order = orders.find((item) => item.id === orderId);
    const newOrder = {
      id: order.id,
      name: order.name,
      quantity: order.quantity,
      supplier_id: order.supplier_id,
      total: order.total,
      status: "done",
    };
    try {
      const response = await editOrder(newOrder);
      fetchOrders();
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
          Welcome to the Store
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {/* left: order list */}
        <Grid item size={3}>
          <Paper
            sx={{
              backgroundColor: "white",
              padding: 2,
              maxHeight: "70vh",
              overflow: "auto",
              border: "2px solid rgb(85, 77, 77)",
            }}
          >
            <Typography variant="h6">Order List</Typography>
            <List>
              {orders.map((order) => (
                <ListItem
                  key={order.id}
                  sx={{
                    marginBottom: "7px",
                    borderRadius: "5px",
                    border: "3px solid #1E90FF",
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
                  {order.status == "processing" ? (
                    <Approve onApprove={() => onApprove(order.id)}></Approve>
                  ) : (
                    <></>
                  )}
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* right: add new order */}
        <Grid item size={9}>
          <Paper
            sx={{
              padding: 2,
              height: "70vh",
              backgroundColor: "white",
              border: "2px solid rgb(85, 77, 77)",
            }}
          >
            <AddOrder onRefresh={onRefresh}></AddOrder>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SupermarketPage;

