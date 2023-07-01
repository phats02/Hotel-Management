import React from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  header: {
    "& > div": {
      color: "#000",
      fontSize: 15,
      fontFamily: "Aclonica",
      margin: 0,
      fontWeight: "bold",
      textAlign: "center",
    },
    "& >div:first-child": {
      textAlign: "left",
      paddingLeft: 50,
    },
    marginBottom: 10,
  },
  row: {
    "& >div": {
      color: "#4B85A6",
      fontSize: 15,
      fontFamily: "Aclonica",
      textAlign: "center",
      padding: "2px 0px",
    },
    "& >div:first-child": {
      textAlign: "left",
      paddingLeft: 50,
    },
  },
});
export interface RoomRate {
  type: string;
  quantity: number;
  cash: string;
}
interface Props {
  listRoom?: RoomRate[];
}
function ListRoomRate({ listRoom }: Props) {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.header}>
        <Grid item xs>
          Type
        </Grid>
        <Grid item xs>
          Quantity
        </Grid>
        <Grid item xs>
          Cash
        </Grid>
      </Grid>
      <div style={{ maxHeight: "10vh", overflowY: "auto", width: "100%" }}>
        {listRoom?.map((room) => (
          <Grid container className={classes.row} key={room.type + room.cash}>
            <Grid item xs>
              {room.type}
            </Grid>
            <Grid item xs>
              {room.quantity}
            </Grid>
            <Grid item xs>
              {room.cash}$
            </Grid>
          </Grid>
        ))}
      </div>
    </>
  );
}

export default ListRoomRate;
