/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  // Card,
  Row,
  CardBody,
  CardHeader,
  Form,
  Input,
  Col,
  FormGroup,
  Nav,
  NavItem,
  Label ,
  Button ,
  // TabContent,
  TabPane,
  CardGroup,
    DropdownItem,
    Card,
    DropdownMenu,
    UncontrolledDropdown,
    DropdownToggle,
    Modal, ModalHeader, ModalBody
} from "reactstrap";
import axios from "axios";
import { Link , useHistory } from "react-router-dom";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Detail from "views/pages/itemStock/StockPribadi/Detail"


const ModalKartuStok = (props) => {
  const warehouse = localStorage.warehouse;
  const [hide, setHide] = useState(true);
  const [nameStock, setNameStock] = useState("");
  const [codeStock, setCodeStock] = useState("");
  const [barcode, setBarcode] = useState("");
  const [allItemStock, setAllItemStock] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [detailItemStok, setDetailItemStok] = useState(0);
  // const redirectPrefix = `/admin/warehouse/edit/`;
  const redirectPrefix1 = `/admin/stock-item/kartu-stok/`;
  const redirectPrefix = `/admin/stock-item/semua-cabang/`;
  const [itemId, setItemId] = useState(1);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [modal1, setModal1] = useState(false);
  const [id, setId] = useState("");
  const toggle1 = () => setModal1(!modal1);

  const token = localStorage.token;
  const [activeTab, setActiveTab] = useState("1");
  const [alert, setAlert] = React.useState(null);
  const [rowIndex, setRowIndex] = useState(0);
  const [namaproyek,setNamaProyek] = useState("");
  const [image1,setImage1] = useState("");
  const [image2,setImage2] = useState("");
  const [image3,setImage3] = useState("");
  const [namaitem, setNamaItem] = useState("")
  const [kodeitem,setKodeItem] = useState("")
  const [masuk, setMasuk] = useState(0)
  const [keluar, setKeluar] = useState(0)
  const [sisa, setSisa] = useState(0)
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [currentSort, setCurrentSort] = useState("");

  let paginationOption = {
    page: page,
    alwaysShowAllBtns: true,
    override: true,
    showTotal: true,
    withFirstAndLast: false,
    sizePerPage: perPage,
    totalSize: totalItem,
    onPageChange: (page) => {
      updateDataTable(
        page,
        perPage,
        currentSort,
        nameStock,
        codeStock,
        barcode
      );
    },
    sizePerPageRenderer: () => (
      <div className="dataTables_length" id="datatable-basic_length">
        <label>
          Show{" "}
          {
            <select
              name="datatable-basic_length"
              aria-controls="datatable-basic"
              className="form-control form-control-sm"
              onChange={(e) => {
                updateDataTable(page, e.target.value, currentSort);
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          }{" "}
          entries.
        </label>
      </div>
    ),
  };

  const updateDataTable = (page, perPage, sort,nameStock, codeStock, barcode) => {
    getItemOwnStock(page, perPage, sort,nameStock, codeStock, barcode);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setNameStock(nameStock);
    setCodeStock(codeStock);
    setBarcode(barcode);
  };

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`;
      updateDataTable(page, perPage, sort,nameStock, codeStock, barcode);
    }
  };


  useEffect(() => {
    getSalesTrackingDetail(page, perPage, currentSort);
  }, []);

  const getSalesTrackingDetail = (page, perPage, currentSort) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const data = { page: page, per_page: perPage };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/log-stock/get-by-item/${props.id}`,
        {
          headers,
        }
      )
      .then((data) => {
        setNamaItem(data.data.response.item_name);
        setKodeItem(data.data.response.item_code);
        setMasuk(data.data.response.qty_masuk);
        setKeluar(data.data.response.qty_keluar);
        setSisa(data.data.response.qty_sisa);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  return (
    <div>
        
         <Button color="link" onClick={toggle1}>
            Detail
         </Button>
        {/* // modal Semua Stok */}
      {/* <Modal isOpen={modal} toggle={toggle} style={{ minWidth: "70%", top: "-20%" }}>
        <ModalHeader toggle={toggle} align="center"></ModalHeader>
        <ModalBody align="center">
        <font size="5"><b>Contoh Semua Stok</b></font><br></br><br></br><br></br>
        <Card>
              <CardHeader>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>Lokasi</h3>
                </div>
              </CardHeader>
              <CardBody>
                <ToolkitProvider
                  rowNumber={rowIndex}
                  data={namaproyek}
                  keyField="id"
                  columns={[
                    {
                      dataField: "no",
                      text: "#",
                      sort: true,
                      page: 1,
                      formatter: (cell, row, index) => {
                        let currentRow = ++index;
                        return currentRow + rowIndex;
                      },
                    },
                    {
                      dataField: "cabang",
                      text: "Cabang",
                      sort: true,
                    },
                    {
                      dataField: "alamat",
                      text: "Alamat",
                      sort: true,
                    },
                    {
                      dataField: "total_stok",
                      text: "Total Stok",
                      sort: true,
                    },
                    {
                      dataField: "inbound_stok",
                      text: "Stok Inbound",
                      sort: true,
                    },
                    {
                      dataField: "rak_stok",
                      text: "Stok Rak",
                      sort: true,
                    },
                  ]}
                >
                  {(props) => (
                    <div className="py-4 table-responsive">
                      <BootstrapTable
                        remote
                        {...props.baseProps}
                        bootstrap4={true}
                        bordered={false}
                        hover={true}
                        pagination={paginationFactory({ ...paginationOption })}
                        onTableChange={handleTableChange}
                      />
                    </div>
                  )}
                </ToolkitProvider>
              </CardBody>
        </Card> 
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalBody>
      </Modal> */}
        {/* kartu stok   */}
      <Modal isOpen={modal1} toggle={toggle1} style={{ minWidth: "70%", top: "-20%" }}>
        <ModalHeader toggle={toggle1} align="center"></ModalHeader>
        <ModalBody align="center">
        <font size="5"><b>Contoh Kartu Stok</b></font><br></br><br></br><br></br>
        <Row md="12">
                          <Col md="6">
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Kode Item
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                disabled
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Keterangan"
                                  value={kodeitem}
                                  onChange={(e) => {
                                    setKodeItem(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Nama Item
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                disabled
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Nama Item"
                                  value={namaitem}
                                  onChange={(e) => {
                                    setNamaItem(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                          </Col>
                          <Col md="6">
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Qty Masuk
                            </Label>
                            <Col sm={7}>
                            <Input
                            disabled
                            className="form-control-alternative"
                                name="Tipe Po"
                                type="number"
                                value={masuk}
                                onChange={(e) => {
                                    setMasuk(e.target.value);
                                }}
                              />
                              
                            </Col>
                            </FormGroup>
                            <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Qty Keluar
                            </Label>
                            <Col sm={7}>
                            <Input
                            disabled
                            className="form-control-alternative"
                                name="Tipe Po"
                                type="number"
                                value={keluar}
                                onChange={(e) => {
                                    setKeluar(e.target.value);
                                }}
                              />
                              
                            </Col>
                            </FormGroup>
                            <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Qty Sisa
                            </Label>
                            <Col sm={7}>
                            <Input
                            disabled
                            className="form-control-alternative"
                                name="Tipe Po"
                                type="number"
                                value={sisa}
                                onChange={(e) => {
                                    setSisa(e.target.value);
                                }}
                              />
                              
                            </Col>
                            </FormGroup>
                          </Col>
                      </Row>
          <Button color="secondary" onClick={toggle1}>
            Cancel
          </Button>
        </ModalBody>
      </Modal>  
    </div>
  );
};

export default ModalKartuStok;
