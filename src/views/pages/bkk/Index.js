/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  Row,
  Col,
  CardBody,
  CardHeader,
  Container,
  UncontrolledTooltip,
  ButtonGroup,
  Collapse,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import SweetAlert from "react-bootstrap-sweetalert";

const Bkk = (props) => {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  const [activeTab, setActiveTab] = useState("1");
  const redirectPrefix = `/admin/bkk/edit/`;
  const [alert, setAlert] = React.useState(null);
  const [rowIndex, setRowIndex] = useState(0);
  const [allAsset, setAllAsset] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const [bkkCode, setBkkCode] = useState("");
  const [poCode, setPoCode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
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
        bkkCode,
        poCode,
        startDate,
        endDate
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

  const updateDataTable = (
    page,
    perPage,
    sort,
    bkkCOde,
    PoCode,
    startDate,
    endDate
  ) => {
    getAsset(page, perPage, sort, bkkCOde, PoCode, startDate, endDate);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setBkkCode(bkkCOde);
    setPoCode(PoCode);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`;
      updateDataTable(page, perPage, sort, bkkCode, poCode, startDate, endDate);
    }
  };

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    getAsset(page, perPage, currentSort, "", "", "", "", "");
  }, []);

  const getAsset = (
    page,
    perPage,
    currentSort,
    bkk_code = null,
    po_code = null,
    start_date = null,
    end_date = null
  ) => {
    let filter = { page: page, per_page: perPage, warehouse_id: warehouse };
    if (bkk_code !== null) {
      filter = Object.assign(filter, { bkk_code: bkk_code });
    }
    if (po_code !== null) {
      filter = Object.assign(filter, { po_code: po_code });
    }
    if (start_date !== null) {
      filter = Object.assign(filter, { start_date: start_date });
    }
    if (end_date !== null) {
      filter = Object.assign(filter, { end_date: end_date });
    }
    const data = filter;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/bkk`, data, { headers })
      .then((data) => {
        setAllAsset(data.data.response);
        setPage(data.data.current_page + 1);
        setPerpage(data.data.per_page);
        setTotalItem(data.data.total_item);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const reset = () => {
    setBkkCode("");
    setPoCode("");
    setStartDate("");
    setEndDate("");
    updateDataTable(1, perPage, currentSort, "", "", "", "");
  };

  return (
    <div>
      {alert}
      <SimpleHeader name="Bukti Kas Keluar" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>List Bukti Kas Keluar</h3>
                  <div style={{ textAlign: "right" }}>
                    <Link className="btn btn-info" to="/admin/bkk/create">
                      Add
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <h3 onClick={toggleOpen}>
                  Filter &nbsp;
                  {isOpen === true ? (
                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                  ) : (
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                  )}
                </h3>
                <Collapse isOpen={isOpen}>
                  <Form>
                    <Row md="12">
                      <Col md="3">
                        <FormGroup>
                          <Label htmlFor="exampleFormControlSelect3">
                            Kode BKK
                          </Label>
                          <Input
                            type="text"
                            placeholder="Masukan Kode BKK"
                            value={bkkCode}
                            onChange={(e) =>
                              updateDataTable(
                                1,
                                perPage,
                                currentSort,
                                e.target.value,
                                poCode,
                                startDate,
                                endDate
                              )
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label htmlFor="exampleFormControlSelect3">
                            Kode PO
                          </Label>
                          <Input
                            type="text"
                            placeholder="Masukan Kode PO"
                            value={poCode}
                            onChange={(e) =>
                              updateDataTable(
                                1,
                                perPage,
                                currentSort,
                                bkkCode,
                                e.target.value,
                                startDate,
                                endDate
                              )
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label htmlFor="exampleFormControlSelect3">
                            Start Date
                          </Label>
                          <Input
                            id="example-date-input"
                            type="date"
                            value={startDate}
                            onChange={(e) =>
                              updateDataTable(
                                1,
                                perPage,
                                currentSort,
                                bkkCode,
                                poCode,
                                e.target.value,
                                endDate
                              )
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <FormGroup>
                          <Label htmlFor="exampleFormControlSelect3">
                            End Date
                          </Label>
                          <Input
                            id="example-date-input"
                            type="date"
                            value={endDate}
                            onChange={(e) =>
                              updateDataTable(
                                1,
                                perPage,
                                currentSort,
                                bkkCode,
                                poCode,
                                startDate,
                                e.target.value
                              )
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button type="button" onClick={reset} color="secondary">
                          Reset
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Collapse>
                <ToolkitProvider
                  rowNumber={rowIndex}
                  data={allAsset}
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
                      dataField: "bkk_code",
                      text: "Kode BKK",
                      sort: true,
                    },
                    {
                      dataField: "po_code",
                      text: "Kode PO",
                      sort: true,
                    },
                    {
                      dataField: "kas_bank",
                      text: "Kas Bank",
                      sort: true,
                    },
                    {
                      dataField: "created_at",
                      text: "Tanggal Beli",
                      sort: true,
                      formatter: (cell, row) => {
                        return moment(cell).format("L");
                      },
                    },
                    {
                      dataField: "status_transaksi",
                      text: "Status",
                      sort: true,
                      formatter: (cell, row) => {
                        return cell === 0 ? "Proses" : "Selesai";
                      },
                    },
                    {
                      dataField: "",
                      text: "",
                      formatter: (cell, row, index) => {
                        return (
                          <ButtonGroup>
                            <Button>
                              <Link
                                to={redirectPrefix + row.id}
                                id={"tooltip_" + row.id}
                              >
                                <i className="fas fa-user-edit" />
                              </Link>
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target={"tooltip_" + row.id}
                            >
                              Edit
                            </UncontrolledTooltip>
                          </ButtonGroup>
                        );
                      },
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
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Bkk;
