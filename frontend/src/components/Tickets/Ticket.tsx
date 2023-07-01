import React, { useEffect, useState } from "react";
import axios from "axios";
import TicketForm from "./TicketForm";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import SuccessIcon from "../../public/Check_fill.png";
import UnComfirmIcon from "../../public/Close_round_fill.png";
import HotelIcon from "../../public/Group.png";
import { Input } from "@mui/joy";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CloseIcon from "@mui/icons-material/Close";
import Bill from "./Bill";
import { Service } from "./ListService";
import { RoomRate } from "./ListRoomRate";
import { Deposit } from "./ListCashDeposit";
const useStyles = makeStyles({
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

interface Information {
  idTicket?: string;
  idCustomer?: string;
  time?: Date;
  roomNumber?: number;
  checkin?: Date;
  checkout?: Date;
  xetDuyet?: string;
}
export interface ChooseMiniBar {
  name: string;
  quantity: number;
}
export enum Status {
  NO_CONFIRM = "Not Confirm",
  CONFIRMED = "Confirmed",
  DEPOSITED = "Deposited",
  FINISHED = "Finished",
}
interface Props {
  handleClickBack?: () => void;
  handleAddMiniBar: (data: ChooseMiniBar[]) => void;
  handleAddService: (data: ChooseMiniBar[]) => void;
  handleAddTour: (data: ChooseMiniBar[]) => void;
  handlePay: () => void;
  handleConFirmTicket: () => void;
  data: Information;
  service?: Service[];
  tour?: Service[];
  listRoom?: RoomRate[];
  total: number;
}

interface AllService {
  name?: string;
  price?: string;
  defaultValue?: string;
}
interface MiniBar {
  name: string;
  price: string;
  defaultValue?: string;
}
interface Tour {
  name: string;
  price: string;
  defaultValue?: string;
}
function Ticket({
  handleClickBack,
  data,
  service,
  tour,
  listRoom,
  total,
  handleAddMiniBar,
  handleAddService,
  handleAddTour,
  handleConFirmTicket,
  handlePay,
}: Props) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openDeposit, setOpenDeposit] = useState(false);
  const [openAddService, setOpenAddService] = useState(false);
  const [openMinibar, setOpenMiniBar] = useState(false);
  const [openBill, setOpenBill] = useState(false);
  const [openTour, setOpenTour] = useState(false);
  const [allService, setAllService] = useState<AllService[]>([]);
  const [allMiniBar, setAllMiniBar] = useState<MiniBar[]>([]);
  const [allDeposit, setAllDeposit] = useState<Deposit[]>([]);
  const [allTour, setAllTour] = useState<Tour[]>([]);
  const [deposit, setDeposit] = useState<number>(0);
  const [chooseMiniBar, setChooseMiniBar] = useState<ChooseMiniBar[]>([]);
  const [chooseService, setChooseService] = useState<ChooseMiniBar[]>([]);
  const [chooseTour, setChooseTour] = useState<ChooseMiniBar[]>([]);
  const [status, setStatus] = useState<Status>(Status.NO_CONFIRM);

  const handleOnChangeMiniBar = (name: string, value: string) => {
    setChooseMiniBar(
      chooseMiniBar.map((item) => {
        if (item.name === name) {
          return {
            ...item,
            quantity: Number(value),
          };
        } else {
          return item;
        }
      })
    );
  };
  const handleOnChangeService = (name: string, value: string) => {
    setChooseService(
      chooseService.map((item) => {
        if (item.name === name) {
          return {
            ...item,
            quantity: Number(value),
          };
        } else {
          return item;
        }
      })
    );
  };

  const handleOnChangeTour = (name: string, value: string) => {
    setChooseTour(
      chooseTour.map((item) => {
        if (item.name === name) {
          return {
            ...item,
            quantity: Number(value),
          };
        } else {
          return item;
        }
      })
    );
  };
  const fetchAllService = () => {
    fetch(`/getAllService`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllService(
          data.map((ser) => {
            return {
              name: ser.TenDV,
              price: ser.Gia,
              defaultValue:
                service?.find((s) => s.name === ser.TenDV)?.size || 0,
            };
          })
        );
        setChooseService(
          data.map((item) => {
            return {
              name: item.TenDV,
              quantity: service?.find((s) => s.name === item.TenDV)?.size || 0,
            };
          })
        );
      });
  };
  const fetchAllTour = () => {
    fetch(`/getAllTour`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllTour(
          data.map((item) => {
            return {
              name: item.TenTour,
              price: item.GiaTour,
              defaultValue:
                tour?.find((s) => s.name === item.TenTour)?.size || 0,
            };
          })
        );
        setChooseTour(
          data.map((item) => {
            return {
              name: item.TenTour,
              quantity: tour?.find((s) => s.name === item.TenTour)?.size || 0,
            };
          })
        );
      });
  };

  const fetchAllMiniBar = () => {
    fetch(`/getAllMiniBar`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllMiniBar(
          data.map((ser) => {
            return {
              name: ser.TenVD,
              price: ser.Gia,
              default: service?.find((s) => s.name === ser.TenVD)?.size || 0,
            };
          })
        );
        setChooseMiniBar(
          data.map((item) => {
            return {
              name: item.TenVD,
              quantity: service?.find((s) => s.name === item.TenVD)?.size || 0,
            };
          })
        );
      });
  };
  const fetchDepositInTicket = () => {
    if (!data.idTicket) return;
    fetch(`/getDeposit?ticket=${data.idTicket}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllDeposit(
          data.map((item) => {
            return {
              date: item.date,
              volume: item.volume,
            };
          })
        );
      });
  };
  const addDepositToTicket = async () => {
    await axios.post("/ticket/deposit", {
      ticketId: data.idTicket,
      deposit: deposit,
    });
    fetchDepositInTicket();
  };
  useEffect(() => {
    fetchAllService();
    fetchAllMiniBar();
  }, [service]);
  useEffect(() => {
    fetchAllTour();
  }, [tour]);

  useEffect(() => {
    fetchDepositInTicket();
  }, [data.idTicket]);

  const totalDeposit = () => {
    let total = 0;
    for (var i = 0; i < allDeposit.length; i++) {
      total += allDeposit[i].volume;
    }
    return total;
  };

  const getStatus = () => {
    if (!data) return;
    if (data.xetDuyet === "Duyet") {
      setStatus(Status.CONFIRMED);
    } else return;
    if (totalDeposit() >= total * 0.3) {
      setStatus(Status.DEPOSITED);
    } else return;
    if (data.time) {
      setStatus(Status.FINISHED);
    }
  };
  useEffect(() => {
    getStatus();
  }, [data, total, allDeposit]);
  const classes = useStyles();

  return (
    <div
      style={{
        padding: 10,
        width: "90vw",
        margin: "10px auto",
        backgroundColor: "#F9F9F9",
        borderRadius: 27,
      }}
    >
      <TicketForm
        handleOpenAddService={() => setOpenAddService(true)}
        handleOpenMinibar={() => setOpenMiniBar(true)}
        handleOpenTour={() => setOpenTour(true)}
        data={data}
        service={service}
        tour={tour}
        listRoom={listRoom}
        total={total}
        listDeposit={allDeposit}
        status={status}
      ></TicketForm>
      <Modal
        open={openAddService}
        disablePortal
        disableEnforceFocus
        disableAutoFocus
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            width: "40vw",
            boxShadow: 24,
            padding: "40px 40px",
            background: "#FFF",
          }}
        >
          <Button
            style={{ marginLeft: "auto", display: "block", color: "gray" }}
            onClick={() => setOpenAddService(false)}
          >
            <CloseIcon />
          </Button>
          <h1
            style={{
              color: "#000",
              fontSize: 20,
              fontFamily: "Aclonica",
              textAlign: "center",
            }}
          >
            Service
          </h1>
          <Box
            sx={{
              border: "1px dashed #9747FF",
              padding: 5,
              maxHeight: "40vh",
              overflow: "auto",
            }}
          >
            {allService.map((ser) => (
              <Grid container style={{ padding: 5 }} gap={2} key={ser.name}>
                <Grid item xs={6}>
                  <h1
                    style={{
                      color: "#000",
                      fontSize: 15,
                      fontFamily: "Aclonica",
                    }}
                  >
                    {ser.name} {ser.price}$
                  </h1>
                </Grid>
                <Grid item xs={5}>
                  <Input
                    size="md"
                    type="number"
                    slotProps={{
                      input: {
                        min: 0,
                        step: 1,
                      },
                    }}
                    sx={{
                      "--Input-radius": "0px",
                    }}
                    value={
                      chooseService.find((item) => item.name === ser.name)
                        ?.quantity
                    }
                    onChange={(
                      event: React.ChangeEvent<
                        HTMLTextAreaElement | HTMLInputElement
                      >
                    ) => {
                      handleOnChangeService(ser.name, event.target.value);
                    }}
                    defaultValue={ser.defaultValue}
                  />
                </Grid>
              </Grid>
            ))}
          </Box>
          <Box sx={{ width: "100%" }}>
            <Button
              className={classes.button}
              style={{
                width: 120,
                margin: "10px auto",
                display: "block",
                background: "#249795",
                boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.25);",
                color: "#FFF",
              }}
              onClick={() => {
                handleAddService(chooseService);
                setOpenAddService(false);
              }}
            >
              Order Now
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={openMinibar}
        disablePortal
        disableEnforceFocus
        disableAutoFocus
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            width: "40vw",
            boxShadow: 24,
            padding: "40px 40px",
            background: "#FFF",
          }}
        >
          <Button
            style={{ marginLeft: "auto", display: "block", color: "gray" }}
            onClick={() => setOpenMiniBar(false)}
          >
            <CloseIcon />
          </Button>
          <h1
            style={{
              color: "#000",
              fontSize: 20,
              fontFamily: "Aclonica",
              textAlign: "center",
            }}
          >
            Mini-bar
          </h1>
          <Box
            sx={{
              border: "1px dashed #9747FF",
              padding: 5,
              maxHeight: "30vh",
              overflow: "auto",
            }}
          >
            {allMiniBar.map((ser, index) => (
              <Grid container style={{ padding: 5 }} gap={2} key={ser.name}>
                <Grid item xs={6}>
                  <h1
                    style={{
                      color: "#000",
                      fontSize: 15,
                      fontFamily: "Aclonica",
                    }}
                  >
                    {ser.name} {ser.price}$
                  </h1>
                </Grid>
                <Grid item xs={5}>
                  <Input
                    size="md"
                    type="number"
                    slotProps={{
                      input: {
                        min: 0,
                        step: 1,
                      },
                    }}
                    sx={{
                      "--Input-radius": "0px",
                    }}
                    value={
                      chooseMiniBar.find((item) => item.name === ser.name)
                        ?.quantity
                    }
                    onChange={(
                      event: React.ChangeEvent<
                        HTMLTextAreaElement | HTMLInputElement
                      >
                    ) => {
                      handleOnChangeMiniBar(ser.name, event.target.value);
                    }}
                    defaultValue={ser.defaultValue}
                  />
                </Grid>
              </Grid>
            ))}
          </Box>
          <Box sx={{ width: "100%" }}>
            <Button
              className={classes.button}
              style={{
                width: 120,
                margin: "10px auto",
                display: "block",
                background: "#249795",
                boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.25);",
                color: "#FFF",
              }}
              onClick={() => {
                handleAddMiniBar(chooseMiniBar);
                setOpenMiniBar(false);
              }}
            >
              Order Now
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal open={openTour} disablePortal disableEnforceFocus disableAutoFocus>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -60%)",
            width: "40vw",
            boxShadow: 24,
            padding: "40px 40px",
            background: "#FFF",
          }}
        >
          <Button
            style={{ marginLeft: "auto", display: "block", color: "gray" }}
            onClick={() => setOpenTour(false)}
          >
            <CloseIcon />
          </Button>
          <h1
            style={{
              color: "#000",
              fontSize: 20,
              fontFamily: "Aclonica",
              textAlign: "center",
            }}
          >
            Add Tour
          </h1>
          <Box
            sx={{
              border: "1px dashed #9747FF",
              padding: 5,
              maxHeight: "30vh",
              overflow: "auto",
            }}
          >
            {allTour.map((ser, index) => (
              <Grid container style={{ padding: 5 }} gap={2} key={ser.name}>
                <Grid item xs={6}>
                  <h1
                    style={{
                      color: "#000",
                      fontSize: 15,
                      fontFamily: "Aclonica",
                    }}
                  >
                    {ser.name} {ser.price}$
                  </h1>
                </Grid>
                <Grid item xs={5}>
                  <Input
                    size="md"
                    type="number"
                    slotProps={{
                      input: {
                        min: 0,
                        step: 1,
                      },
                    }}
                    sx={{
                      "--Input-radius": "0px",
                    }}
                    value={
                      chooseTour.find((item) => item.name === ser.name)
                        ?.quantity
                    }
                    onChange={(
                      event: React.ChangeEvent<
                        HTMLTextAreaElement | HTMLInputElement
                      >
                    ) => {
                      handleOnChangeTour(ser.name, event.target.value);
                    }}
                    defaultValue={ser.defaultValue}
                  />
                </Grid>
              </Grid>
            ))}
          </Box>
          <Box sx={{ width: "100%" }}>
            <Button
              className={classes.button}
              style={{
                width: 120,
                margin: "10px auto",
                display: "block",
                background: "#249795",
                boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.25);",
                color: "#FFF",
              }}
              onClick={() => {
                handleAddTour(chooseTour);
                setOpenTour(false);
              }}
            >
              Order Now
            </Button>
          </Box>
        </Box>
      </Modal>

      <Grid container style={{ marginTop: 8 }}>
        <Grid item container alignItems={"center"} gap={4} xs={4}>
          <img
            src={status === Status.NO_CONFIRM ? UnComfirmIcon : SuccessIcon}
            alt="success icon"
            width={40}
          />
          <span
            style={{
              color: "#000",
              fontSize: 20,
              fontFamily: "Aclonica",
            }}
          >
            {status}
          </span>
        </Grid>
        <Grid item xs container justifyContent={"flex-end"} gap={3}>
          <Button
            variant="contained"
            className={classes.button}
            style={{
              background: "#D9D9D9",
              color: "#000",
            }}
            onClick={handleClickBack}
          >
            Back
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            style={{
              background: "#DFED40",
              color: "#000",
            }}
            onClick={() => setOpenBill(true)}
            disabled={status !== Status.DEPOSITED}
          >
            Pay
          </Button>
          <Modal
            open={openBill}
            disablePortal
            disableEnforceFocus
            disableAutoFocus
          >
            <Bill
              handleBack={() => setOpenBill(false)}
              handlePay={async () => {
                await handlePay();
                setOpenBill(false);
              }}
              handlePrint={() => setOpenBill(false)}
              listRoom={listRoom}
              listService={service}
              listTour={tour}
              total={total}
              surChange={totalDeposit()}
            ></Bill>
          </Modal>
          <Button
            variant="contained"
            className={classes.button}
            style={{
              background: "rgba(69, 101, 213, 0.30)",
              color: "#000",
            }}
            onClick={() => setOpenDeposit(true)}
            disabled={
              status === Status.FINISHED || status === Status.NO_CONFIRM
            }
          >
            Deposit
          </Button>
          <Modal
            open={openDeposit}
            onClose={() => {
              return;
            }}
            disablePortal
            disableEnforceFocus
            disableAutoFocus
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -80%)",
                width: "50vw",
                boxShadow: 24,
                padding: "40px 40px",
                background: "#FFF8F8",
              }}
            >
              <Grid container alignItems={"center"}>
                <Grid item xs={5}>
                  <img src={HotelIcon} alt="Hotel Icon" width={100}></img>
                </Grid>
                <Grid item xs>
                  <h1
                    style={{
                      color: "#000",
                      fontSize: 25,
                      fontFamily: "Aclonica",
                    }}
                  >
                    Cash Deposit
                  </h1>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4} style={{ marginTop: "auto" }}>
                  <h2
                    style={{
                      textAlign: "center",
                      fontSize: "20px",
                      fontFamily: "Aclonica",
                    }}
                  >
                    CASH
                  </h2>
                </Grid>
                <Grid item xs>
                  <Input
                    size="lg"
                    startDecorator={<AttachMoneyIcon />}
                    placeholder="Amount"
                    type="number"
                    inputProps={{
                      min: 1,
                      max: total - totalDeposit(),
                      step: 1,
                    }}
                    value={deposit}
                    onChange={(e) => {
                      setDeposit(
                        Math.min(Number(e.target.value), total - totalDeposit())
                      );
                    }}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                style={{ marginTop: 50 }}
                justifyContent={"flex-end"}
                gap={5}
              >
                <Grid item>
                  <Button
                    className={classes.button}
                    variant={"contained"}
                    style={{ width: 120, background: "#D9D9D9", color: "#000" }}
                    onClick={() => setOpenDeposit(false)}
                  >
                    BACK
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    className={classes.button}
                    variant={"contained"}
                    style={{
                      width: 120,
                      background: "#1FCD65",
                      color: "#000",
                    }}
                    onClick={async () => {
                      await addDepositToTicket();
                      setOpenDeposit(false);
                    }}
                  >
                    DEPOSIT
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Modal>
          <Button
            variant="contained"
            className={classes.button}
            style={{
              background: "#1FCD65",
              color: "#02051C",
            }}
            onClick={() => setOpenConfirm(true)}
            disabled={status !== Status.NO_CONFIRM}
          >
            Confirm
          </Button>
          <Modal
            open={openConfirm}
            onClose={() => {
              return;
            }}
            disablePortal
            disableEnforceFocus
            disableAutoFocus
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -60%)",
                width: "40vw",
                boxShadow: 24,
                padding: "40px 40px",
                backgroundColor: "#4B85A6",
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                align="center"
                fontFamily={"Aclonica"}
              >
                Do you sure to confirm this ticket
              </Typography>
              <Grid
                container
                style={{ marginTop: 50 }}
                justifyContent={"space-between"}
              >
                <Grid item>
                  <Button
                    className={classes.button}
                    variant={"contained"}
                    style={{ width: 120, background: "#FFF", color: "#000" }}
                    onClick={() => setOpenConfirm(false)}
                  >
                    NO
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    className={classes.button}
                    variant={"contained"}
                    style={{ width: 120, background: "#FFF", color: "#000" }}
                    onClick={async () => {
                      await handleConFirmTicket();
                      setOpenConfirm(false);
                    }}
                  >
                    YES
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </div>
  );
}

export default Ticket;
