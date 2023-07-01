import * as React from "react";
import axios from "axios";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridColumnHeaderParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { Person, MeetingRoom } from "@mui/icons-material";
import CheckIn from "../../public/tableIcon/checkin.png";
import CheckOut from "../../public/tableIcon/checkout.png";
import { styled } from "@mui/material/styles";
import { Modal } from "@mui/material";
import Ticket, { ChooseMiniBar } from "./Ticket";
import { Service } from "./ListService";
import { RoomRate } from "./ListRoomRate";

const StyleDataGrid = styled(DataGrid)(({ theme }) => ({
  border: "1px solid black",
  borderRadius: 0,
  fontFamily: ["Aclonica"].join(","),
  WebkitFontSmoothing: "auto",
  letterSpacing: "normal",
  backgroundColor: "#F5F4F4",
  "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
    borderRight: "1px solid #000000",
    borderTop: "1px solid #000000",
    borderBottom: "0px",
  },
  "& .MuiDataGrid-columnHeader:last-child, .MuiDataGrid-cell:last-child": {
    borderRight: 0,
  },
  "& .MuiDataGrid-columnHeader": {
    borderTop: 0,
  },
  "& .MuiDataGrid-cell": {
    cursor: "pointer",
  },
  "& .MuiDataGrid-main": {
    borderBottom: "1px solid #000000",
  },
  "& .MuiDataGrid-row.Mui-selected": {
    backgroundColor: "#4B85A6",
    border: "none",
  },
}));

const columns: GridColDef[] = [
  {
    field: "id",
    renderHeader: (params: GridColumnHeaderParams) => <div>#</div>,
  },
  {
    field: "user",
    renderHeader: (params: GridColumnHeaderParams) => (
      <Person fontSize="large" />
    ),
  },
  {
    field: "room",
    renderHeader: (params: GridColumnHeaderParams) => (
      <MeetingRoom fontSize="large" />
    ),
  },
  {
    field: "checkin",
    flex: 1,
    renderHeader: (params: GridColumnHeaderParams) => (
      <img
        src={CheckIn}
        alt="checkin time"
        width={35}
        height={35}
        style={{ marginLeft: "auto" }}
      />
    ),
    headerAlign: "center",
  },
  {
    field: "checkout",
    flex: 1,
    renderHeader: (params: GridColumnHeaderParams) => (
      <img
        src={CheckOut}
        alt="checkout time"
        width={35}
        height={35}
        style={{ margin: "0px auto" }}
      />
    ),
    headerAlign: "center",
  },
];
interface Information {
  idTicket?: string;
  idCustomer?: string;
  time?: Date;
  roomNumber?: number;
  checkin?: Date;
  checkout?: Date;
}

export default function App() {
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [rows, setRows] = React.useState<GridRowsProp[]>([]);
  const [data, setData] = React.useState<Information>({});
  const [listService, setListService] = React.useState<Service[]>([]);
  const [listMiniBar, setListMiniBar] = React.useState<Service[]>([]);
  const [listTour, setListTour] = React.useState<Service[]>([]);
  const [listRoom, setListRoom] = React.useState<RoomRate[]>([]);
  const [total, setTotal] = React.useState<number>(0);

  const fetchAllTicket = () => {
    fetch("/getAllTicket")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRows(data);
      });
  };
  const fetchTicketInfor = () => {
    if (rowSelectionModel?.length === 0) return;
    fetch(`/getOneTicket?ticket=${rowSelectionModel[0]}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      });
  };
  const fetchServiceInTicket = () => {
    if (rowSelectionModel?.length === 0) return;
    fetch(`/getService?ticket=${rowSelectionModel[0]}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setListService(data);
      });
  };
  const fetchMiniBarinService = () => {
    if (rowSelectionModel?.length === 0) return;
    fetch(`/getMinibar?ticket=${rowSelectionModel[0]}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setListMiniBar(data);
      });
  };
  const fetchTourInTicket = () => {
    if (rowSelectionModel?.length === 0) return;
    fetch(`/getTour?ticket=${rowSelectionModel[0]}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setListTour(data);
      });
  };
  const fetchRoomRate = () => {
    if (rowSelectionModel?.length === 0) return;
    fetch(`/getRoomRate?ticket=${rowSelectionModel[0]}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setListRoom(data);
      });
  };
  React.useEffect(() => {
    fetchAllTicket();
  }, []);
  React.useEffect(() => {
    fetchTicketInfor();
    fetchServiceInTicket();
    fetchTourInTicket();
    fetchRoomRate();
    fetchMiniBarinService();
  }, [rowSelectionModel[0]]);

  React.useEffect(() => {
    let newTotal = 0;

    listService.forEach((service) => {
      newTotal += service.size * Number(service.price);
    });
    listMiniBar.forEach((service) => {
      newTotal += service.size * Number(service.price);
    });
    listRoom.forEach((room) => {
      newTotal += room.quantity * Number(room.cash);
    });

    listTour.forEach((tour) => {
      newTotal += Number(tour.price) * tour.size;
    });

    setTotal(newTotal);
  }, [listService, listTour, listRoom, listMiniBar]);

  const handleAddMiniBar = async (data: ChooseMiniBar[]) => {
    await axios.post("/ticket/minibar", {
      ticketId: rowSelectionModel[0],
      miniBar: data,
    });
    fetchMiniBarinService();
  };
  const handleAddService = async (data: ChooseMiniBar[]) => {
    await axios.post("/ticket/service", {
      ticketId: rowSelectionModel[0],
      service: data,
    });
    fetchServiceInTicket();
  };
  const handleAddTour = async (data: ChooseMiniBar[]) => {
    await axios.post("/ticket/tour", {
      ticketId: rowSelectionModel[0],
      tour: data,
    });
    fetchTourInTicket();
  };
  const handleConFirmTicket = async () => {
    await axios.post("/ticket/confirm", {
      ticketId: rowSelectionModel[0],
    });
    fetchTicketInfor();
  };
  const handlePay = async () => {
    await axios.post("/ticket/pay", {
      ticketId: rowSelectionModel[0],
      total: total,
    });
    fetchTicketInfor();
  };
  return (
    <div style={{ maxHeight: "90vh" }}>
      <StyleDataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
        pageSizeOptions={[5, 10, 25]}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setIsOpen(true);
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
      />
      <Modal open={isOpen}>
        <Ticket
          handleClickBack={() => setIsOpen(false)}
          data={data}
          service={[
            ...listService.filter((item) => item.size),
            ...listMiniBar.filter((item) => item.size),
          ]}
          tour={listTour.filter((item) => item.size)}
          listRoom={listRoom}
          total={total}
          handleAddMiniBar={handleAddMiniBar}
          handleAddService={handleAddService}
          handleAddTour={handleAddTour}
          handleConFirmTicket={handleConFirmTicket}
          handlePay={handlePay}
        />
      </Modal>
    </div>
  );
}
