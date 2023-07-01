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
export interface Service {
  name?: string;
  size?: number;
  price?: string;
}
interface Props {
  listService?: Service[];
}
function ListService({ listService }: Props) {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.header}>
        <Grid item xs={6}></Grid>
        <Grid item xs>
          Quantity
        </Grid>
        <Grid item xs>
          Cash
        </Grid>
      </Grid>
      <div style={{ height: "12vh", overflow: "auto", width: "100%" }}>
        {listService?.map((service) => (
          <Grid container className={classes.row} key={service.name}>
            <Grid item xs={6}>
              {service.name}
            </Grid>
            <Grid item xs>
              {service.size}
            </Grid>
            <Grid item xs>
              {service.price}$
            </Grid>
          </Grid>
        ))}
      </div>
    </>
  );
}

export default ListService;
