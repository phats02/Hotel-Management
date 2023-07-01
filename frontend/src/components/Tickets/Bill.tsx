import { Box, Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import React from "react";
import HotelIcon from "../../public/Group.png";
import { Service } from "./ListService";
import { RoomRate } from "./ListRoomRate";

const useStyles = makeStyles({
  text: {
    color: "#000",
    fontSize: 13,
    fontFamily: "Aclonica",
  },
  button: {
    "&.MuiButtonBase-root": {
      borderRadius: "27px",
      border: "1px solid #F1F1F1",
      textAlign: "center",
      fontSize: "15px",
      fontFamily: "Aclonica",
      textTransform: "none",
      width: 90,
    },
  },
});

interface Props {
  handleBack?: () => void;
  handlePrint?: () => void;
  handlePay?: () => void;
  listService?: Service[];
  listTour?: Service[];
  listRoom?: RoomRate[];
  total: number;
  surChange: number;
}
function Bill({
  handleBack,
  handlePrint,
  handlePay,
  listService,
  listTour,
  listRoom,
  total,
  surChange,
}: Props) {
  const classes = useStyles();
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -60%)",
        width: "50vw",
        boxShadow: 24,
        padding: "40px 40px",
        background: "#FFF8F8",
      }}
    >
      <Grid container>
        <Grid item xs>
          <img src={HotelIcon} alt="Hotel icon" width={60} />
        </Grid>
        <Grid item xs={4}>
          <h1
            style={{
              color: "#000",
              textAlign: "center",
              fontSize: 15,
              fontFamily: "Aclonica",
            }}
          >
            717 W 80TH ST LOS ANGELES CA 90044-5937 USA
          </h1>
        </Grid>
      </Grid>
      <h1
        style={{
          color: "#000",
          textAlign: "center",
          fontSize: 25,
          fontFamily: "Aclonica",
        }}
      >
        Bill
      </h1>
      <Box
        sx={{ background: "#FFF", padding: 1, borderBottom: "1px solid #000" }}
      >
        <h3 className={classes.text}>Employee : Michael</h3>
        <h3 className={classes.text}>Time:7/6/2023 13:10PM</h3>
        <h3 className={classes.text}>Bill Number : 12433262</h3>
      </Box>
      <Box
        sx={{
          background: "#FFF",
          marginTop: 2,
          padding: 2,
          maxHeight: "20vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {listRoom?.map((room) => (
          <Grid container style={{ margin: 2 }} key={room.type + room.cash}>
            <Grid item className={classes.text} xs={6}>
              {room.type}
            </Grid>
            <Grid item className={classes.text} xs={3}>
              {room.quantity}
            </Grid>
            <Grid item className={classes.text} xs={3}>
              {room.cash}
            </Grid>
          </Grid>
        ))}
        {listService?.map((service) => (
          <Grid container style={{ margin: 2 }}>
            <Grid item className={classes.text} xs={6}>
              {service.name}
            </Grid>
            <Grid item className={classes.text} xs={3}>
              {service.size}
            </Grid>
            <Grid item className={classes.text} xs={3}>
              {service.price}
            </Grid>
          </Grid>
        ))}
        {listTour?.map((tour) => (
          <Grid container style={{ margin: 2 }}>
            <Grid item className={classes.text} xs={6}>
              {tour.name}
            </Grid>
            <Grid item className={classes.text} xs={3}>
              {tour.size}
            </Grid>
            <Grid item className={classes.text} xs={3}>
              {tour.price}
            </Grid>
          </Grid>
        ))}
      </Box>
      <hr
        style={{
          color: "#000",
          backgroundColor: "#000",
          height: 1,
          marginTop: 6,
          marginBottom: 3,
        }}
      />
      <Box
        sx={{
          background: "#FFF",
          marginTop: 2,
          padding: 2,
          maxHeight: "20vh",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Grid container style={{ margin: 4 }}>
          <Grid item className={classes.text} xs={9}>
            Total
          </Grid>
          <Grid item className={classes.text} xs={3}>
            {total}$
          </Grid>
        </Grid>
        <Grid container style={{ margin: 4 }}>
          <Grid item className={classes.text} xs={9}>
            Surcharge
          </Grid>
          <Grid item className={classes.text} xs={3}>
            {surChange}$
          </Grid>
        </Grid>
        <Grid container style={{ margin: "20px 4px 20px 4px" }}>
          <Grid item className={classes.text} style={{ fontSize: 20 }} xs={9}>
            Real Payment
          </Grid>
          <Grid item className={classes.text} style={{ fontSize: 20 }} xs={3}>
            {total - surChange}$
          </Grid>
        </Grid>
      </Box>
      <Grid
        xs
        container
        justifyContent={"flex-end"}
        gap={3}
        style={{ padding: 8 }}
      >
        <Button
          variant="contained"
          className={classes.button}
          style={{
            background: "#D9D9D9",
            color: "#000",
          }}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          style={{
            background: "#C4CDEF",
            color: "#000",
          }}
          onClick={handlePrint}
        >
          Print
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          style={{
            background: "#1FCD65",
            color: "#000",
          }}
          onClick={handlePay}
        >
          Pay
        </Button>
      </Grid>
    </Box>
  );
}

export default Bill;
