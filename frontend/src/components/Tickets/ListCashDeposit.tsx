import React, { useEffect } from "react";
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
  },
});
export interface Deposit {
  date: string;
  volume: number;
}
interface Props {
  listDeposit?: Deposit[];
}
function ListCashDeposit({ listDeposit }: Props) {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.header}>
        <Grid item xs>
          Date
        </Grid>
        <Grid item xs>
          Card
        </Grid>
      </Grid>
      <div style={{ maxHeight: "10vh", overflowY: "auto", width: "100%" }}>
        {listDeposit?.map((deposit, index) => (
          <Grid container className={classes.row} key={deposit.date + index}>
            <Grid item xs>
              {deposit.date}
            </Grid>
            <Grid item xs>
              {deposit.volume}
            </Grid>
          </Grid>
        ))}
      </div>
    </>
  );
}

export default ListCashDeposit;
