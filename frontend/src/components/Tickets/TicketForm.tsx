import { makeStyles } from "@mui/styles";
import React from "react";
import Grid from "@mui/material/Grid";
import ListService, { Service } from "./ListService";
import { Button } from "@mui/material";
import ListRoomRate, { RoomRate } from "./ListRoomRate";
import ListCashDeposit, { Deposit } from "./ListCashDeposit";
import { Status } from "./Ticket";

const useStyles = makeStyles({
  root: {
    "& > div": {
      borderRight: "1px solid #000",
    },
    "& > div:first-child": {
      borderLeft: "1px solid #000",
    },
    "& > div:last-child": {
      borderRight: 0,
    },
    "&:first-child": {
      borderTop: "1px solid #000",
    },
    borderRight: "1px solid #000",
    borderBottom: "1px solid #000",
  },
  header: {
    color: "#000",
    fontSize: 15,
    fontFamily: "Aclonica",
    margin: 0,
    fontWeight: "bold",
  },
  value: {
    color: "#4B85A6",
    fontSize: 15,
    fontFamily: "Aclonica",
    textAlign: "center",
    margin: 10,
  },
  button: {
    "&.MuiButton-root": {
      borderRadius: "27px",
      background:
        "linear-gradient(0deg, #8B9DCB 0%, #8B9DCB 100%), linear-gradient(0deg, #8B9DCB 0%, #8B9DCB 100%), #8B9DCB",
      color: "#000",
      fontSize: 10,
      fontFamily: "Aclonica",
      textTransform: "none",
    },
  },
  total: {
    "& > div": {
      color: "#D81818",
      fontSize: 20,
      fontFamily: "Aclonica",
      padding: 10,
    },
    border: "1px solid #000",
    borderTop: 0,
  },
});
interface Props {
  handleOpenMinibar?: () => void;
  handleOpenAddService?: () => void;
  handleOpenTour?: () => void;
  data?: Information;
  service?: Service[];
  tour?: Service[];
  listRoom?: RoomRate[];
  listDeposit?: Deposit[];
  total?: number;
  status?: Status;
}

interface Information {
  idTicket?: string;
  idEmployee?: string;
  idCustomer?: string;
  time?: Date;
  roomNumber?: number;
  checkin?: Date;
  checkout?: Date;
}
function TicketForm({
  handleOpenMinibar,
  handleOpenAddService,
  handleOpenTour,
  data,
  service,
  tour,
  listRoom,
  listDeposit,
  total,
  status,
}: Props) {
  const classes = useStyles();

  const { idTicket, idCustomer, time, roomNumber, checkin, checkout } = data;
  return (
    <div style={{ backgroundColor: "#EFE8E8" }}>
      <Grid container className={classes.root} gridColumn={"span 5 span"}>
        <Grid item xs>
          <h1 className={classes.header}>ID Ticket</h1>
          <p className={classes.value}>{idTicket}</p>
        </Grid>
        <Grid item xs>
          <h1 className={classes.header}>ID Customer</h1>
          <p className={classes.value}>{idCustomer}</p>
        </Grid>
      </Grid>
      <Grid container className={classes.root} gridColumn={"span 5 span"}>
        <Grid container item xs>
          <Grid xs={3} item className={classes.header}>
            Time
          </Grid>
          <Grid
            xs={8}
            item
            className={classes.value}
            style={{ textAlign: "left" }}
          >
            {time}
          </Grid>
        </Grid>
        <Grid container item xs={5}>
          <Grid item className={classes.header} xs={5}>
            Room number
          </Grid>
          <Grid item className={classes.value} xs style={{ textAlign: "left" }}>
            {roomNumber}
          </Grid>
        </Grid>
        <Grid container item xs>
          <Grid xs={5} item className={classes.header}>
            Room status
          </Grid>
          <Grid item className={classes.value} style={{ textAlign: "left" }}>
            Ready
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.root}>
        <Grid container item xs>
          <Grid xs={4} item className={classes.header} style={{}}>
            Date of Arrival
          </Grid>
          <Grid
            xs={8}
            item
            className={classes.value}
            style={{ textAlign: "left" }}
          >
            {checkin}
          </Grid>
        </Grid>
        <Grid container item xs>
          <Grid
            item
            className={classes.header}
            xs={5}
            style={{ padding: "10px 0px" }}
          >
            Date of Departure
          </Grid>
          <Grid
            item
            className={classes.value}
            xs
            style={{ textAlign: "left", padding: "10px 0px" }}
          >
            {checkout}
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.root} alignItems={"flex-start"}>
        <Grid container item xs>
          <h1 className={classes.header}>Services</h1>
          <ListService listService={service} />
          <Grid
            container
            spacing={2}
            justifyContent={"flex-end"}
            style={{ margin: 10 }}
          >
            <Grid item>
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleOpenMinibar}
                disabled={
                  status === Status.NO_CONFIRM || status === Status.FINISHED
                }
              >
                Add mini-bar
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleOpenAddService}
                disabled={
                  status === Status.NO_CONFIRM || status === Status.FINISHED
                }
              >
                Add service
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs>
          <h1 className={classes.header}>Tour</h1>
          <ListService listService={tour} />
          <Grid
            container
            spacing={2}
            justifyContent={"flex-end"}
            style={{ margin: 10 }}
          >
            <Grid item>
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleOpenTour}
                disabled={
                  status === Status.NO_CONFIRM || status === Status.FINISHED
                }
              >
                Add Tour
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.root} alignItems={"stretch"}>
        <Grid container item xs>
          <h1 className={classes.header}>Room Rate</h1>
          <ListRoomRate listRoom={listRoom} />
        </Grid>
        <Grid container item xs>
          <h1 className={classes.header}>Cash Deposit</h1>
          <ListCashDeposit listDeposit={listDeposit} />
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent={"space-between"}
        className={classes.total}
      >
        <Grid item>Total</Grid>
        <Grid item>{total}$</Grid>
      </Grid>
    </div>
  );
}

export default TicketForm;
