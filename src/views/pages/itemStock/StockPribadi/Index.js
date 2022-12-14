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
import TextField from '@mui/material/TextField';
import axios from "axios";
import { Link , useHistory } from "react-router-dom";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Detail from "views/pages/itemStock/StockPribadi/Detail"


const StockPribadi = () => {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  const [hide, setHide] = useState(true);
  const [activeTab, setActiveTab] = useState("1");
  const [nameStock, setNameStock] = useState("");
  const [codeStock, setCodeStock] = useState("");
  const [barcode, setBarcode] = useState("");
  const [allItemStock, setAllItemStock] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [currentSort, setCurrentSort] = useState("");
  const [rowIndex, setRowIndex] = useState(0);
  const [detailItemStok, setDetailItemStok] = useState(0);
  const [namaproyek,setNamaProyek] = useState("");
  const [image1,setImage1] = useState("");

  const [itemId, setItemId] = useState(1);
  const toggle1 = () => setModal1(!modal1);
  const [modal1, setModal1] = useState(false);
  const toggle2 = () => setModal2(!modal2);
  const [modal2, setModal2] = useState(false);
  const [id, setId] = useState("");

  const [namaitem, setNamaItem] = useState("")
  const [kodeitem,setKodeItem] = useState("")
  const [masuk, setMasuk] = useState(0)
  const [keluar, setKeluar] = useState(0)
  const [sisa, setSisa] = useState(0)
  const headers = { Authorization: `Bearer ${token}` };
  const cekStok = async(id) => {
    setItemId(id);
    axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/log-stock/get-by-item/${id}`, {headers,}
          )
          .then((data) => {
            setNamaItem(data.data.response.item_name);
            setKodeItem(data.data.response.item_code);
            setMasuk(data.data.response.qty_masuk);
            setKeluar(data.data.response.qty_keluar);
            setSisa(data.data.response.qty_sisa);
            setModal1(!modal1);
          })
          .catch(function (error) {
            console.log(error);
          });
  };

  const [rowIndexLokasi, setRowIndexLokasi] = useState(0);
  const [namaproyekLokasi,setNamaProyekLokasi] = useState([]);
  const [imageLokasi1,setImageLokasi1] = useState("");
  const [imageLokasi2,setImageLokasi2] = useState("");
  const [imageLokasi3,setImageLokasi3] = useState("");
  const [pageLokasi, setPageLokasi] = useState(1);
  const [perPageLokasi, setPerpageLokasi] = useState(10);
  const [currentSortLokasi, setCurrentSortLokasi] = useState("");
  const cekStokLokasi = async(id) => {
    setItemId(id);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const data = { page: pageLokasi, per_page: perPageLokasi };
    axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/item-stock/get/${id}`, {headers,}
          )
          .then((data) => {
            setNamaProyekLokasi(data.data.response.location);
            setImageLokasi1(data.data.response.image_1);
            setImageLokasi2(data.data.response.image_2);
            setImageLokasi3(data.data.response.image_3);
            setModal2(!modal2);
          })
          .catch(function (error) {
            console.log(error);
          });
  };
  let paginationOptionLokasi = {
    page: pageLokasi,
    alwaysShowAllBtns: true,
    override: true,
    showTotal: true,
    withFirstAndLast: false,
    sizePerPage: perPageLokasi,
    onPageChangeLokasi: (pageLokasi) => {
      updateDataTable(pageLokasi, perPageLokasi, currentSort);
    },
    sizePerPageRendererLokasi: () => (
      <div className="dataTables_length" id="datatable-basic_length">
        <label>
          Show{" "}
          {
            <select
              name="datatable-basic_length"
              aria-controls="datatable-basic"
              className="form-control form-control-sm"
              onChange={(e) => {
                updateDataTable(pageLokasi, e.target.value, currentSort);
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

  const updateDataTableLokasi = (pageLokasi, perPageLokasi, currentSort) => {
    cekStokLokasi(itemId);
    setPageLokasi(pageLokasi);
    setPerpageLokasi(perPageLokasi);
    setRowIndex((page - 1) * perPageLokasi);
    currentSortLokasi(currentSort);
  };

  const handleTableChangeLokasi = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`;
      updateDataTable(pageLokasi, perPageLokasi, sort);
    }
  };

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
    getItemOwnStock(page, perPage, currentSort, "", "");
  }, []);

  const getItemOwnStock = async (page, perPage, currentSort, item_name = null, item_code = null, barcode = null) => {
    let filter = {
      page: page,
      per_page: perPage,
      warehouse_id: parseInt(warehouse)
    };
    if (item_name !== null) {
      filter = Object.assign(filter, { item_name: item_name })
    }
    if (item_code !== null) {
        filter = Object.assign(filter, { item_code: item_code })
      }
      if (barcode !== null) {
        filter = Object.assign(filter, { barcode: barcode })
      }
    const data = filter;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/all-stock`,
      data,
      { headers }
    );
    setAllItemStock(res.data.response);
    setPage(res.data.current_page + 1);
    setPerpage(res.data.per_page);
    setTotalItem(res.data.total_item);
  };

  const reset = () => {
    setNameStock("");
    setCodeStock("");
    setBarcode("");
    updateDataTable(1, perPage, currentSort, "", "");
  }
  const rowEvents = {
    onDoubleClick: (e, row, rowIndex) => {
      setHide(false);
      setDetailItemStok(row.id);
    },
  };

  return (
    <div>
        <Row>
          <div className="col">
              <CardHeader>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>Stok Item</h3>
                </div>
              </CardHeader>
              <CardBody>
                      <Form>
                        <Row>
                          <Col md="3">
                            <FormGroup>
                            <TextField className="col"
															label="Nama Item" variant="outlined" size="small" 
															value={nameStock}
															onChange={e => updateDataTable(1, perPage, currentSort, e.target.value, codeStock, barcode)}/>
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup>
                            <TextField className="col text-muted"
															label="Kode Item" variant="outlined" size="small" 
															value={codeStock}
															onChange={e => updateDataTable(1, perPage, currentSort, nameStock,e.target.value,barcode)}/>
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup>
                              <TextField className="col"
															label="Barcode" variant="outlined" size="small" 
															value={barcode}
															onChange={e => updateDataTable(1, perPage, currentSort,codeStock, nameStock, e.target.value, )}/>
                             
                            </FormGroup>
                          </Col>
                          <Col>
                            <Button type="button" onClick={reset} color="secondary">Reset</Button>
                          </Col>
                        </Row>
                      </Form>
                      <div className="table-sm my--4">
                        <ToolkitProvider
                          rowNumber={rowIndex}
                          data={allItemStock}
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
                              dataField: "item_code",
                              text: "Kode Item",
                              sort: true,
                            },
                            {
                              dataField: "barcode",
                              text: "Barcode",
                              sort: true,
                            },
                            {
                              dataField: "item_name",
                              text: "Nama Item",
                              sort: true,
                            },
                            {
                              dataField: "satuan",
                              text: "Satuan",
                              sort: true,
                            },
                            {
                              dataField: "qty_total",
                              text: "Stok",
                              sort: true,
                            },
                            // {
                            //   dataField: "qty_masuk",
                            //   text: "Stok Masuk",
                            //   sort: true,
                            // },
                            // {
                            //   dataField: "qty_keluar",
                            //   text: "Stok Keluar",
                            //   sort: true,
                            // },
                          
                        {
                          dataField: "", text: "", formatter: (cell, row, index) => {
                          return (
                            
                        <UncontrolledDropdown group>
                            <DropdownToggle className="nav-link pr-0" color="" tag="a">
                                <Button className="btn btn-danger btn-sm">
                                  Cek 
                                </Button>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem className={"id"+row.id} onClick={() => {cekStok(row.id)}}>
                                    <i className="fas fa-book" /><span>Kartu Stok</span>
                                </DropdownItem>
                                <DropdownItem className={"id"+row.id} onClick={() => {cekStokLokasi(row.id)}}>
                                  <i className="fas fa-book" /><span>Lokasi Stok</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                          )
                          }
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
                                // rowEvents={rowEvents}
                                pagination={paginationFactory({ ...paginationOption })}
                                onTableChange={handleTableChange}
                              />
                            </div>
                          )}
                        </ToolkitProvider>
                      </div>
              </CardBody>
              <Nav tabs>
                <NavItem>
                </NavItem>
              </Nav>
              {hide ? (
                <></>
              ) : (
                <>
                    <TabPane tabId="1">
                      <Row>
                        <Col md="12">
                          <Detail code={detailItemStok}/>
                        </Col>
                      </Row>
                    </TabPane>
                </>
              )}
          </div>
        </Row>
   
      <Modal isOpen={modal1} toggle={toggle1} style={{ minWidth: "70%"}}>
        <ModalHeader toggle={toggle1} className="text-center" align="center">{namaitem}</ModalHeader>
        <ModalBody align="center">
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
      <Modal isOpen={modal2} toggle={toggle2} style={{ minWidth: "70%"}}>
        <ModalHeader toggle={toggle2} className="text-center" align="center">{namaitem}</ModalHeader>
        <ModalBody align="center">
        <ToolkitProvider
              rowNumber={rowIndexLokasi}
              data={namaproyekLokasi}
              keyField="id"
              columns={[
                  {
                  dataField: "no",
                  text: "#",
                  sort: true,
                  page: 1,
                  formatter: (cell, row, index) => {
                      let currentRow = ++index;
                      return currentRow + rowIndexLokasi;
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
                      pagination={paginationFactory({ ...paginationOptionLokasi })}
                      onTableChange={handleTableChangeLokasi}
                  />
                  </div>
              )}
              </ToolkitProvider>
          <Button color="secondary" onClick={toggle2}>
            Cancel
          </Button>
        </ModalBody>
      </Modal> 
    </div>
  );
};

export default StockPribadi;
