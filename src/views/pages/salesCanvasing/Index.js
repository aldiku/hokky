/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  Container,
  Button,
  // UncontrolledTooltip,
  // ButtonGroup,
  // Collapse,
  // Form,
  // FormGroup,
  // Label,
  // Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import classnames from "classnames";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
// import SweetAlert from "react-bootstrap-sweetalert";

import Detail from "views/pages/salesCanvasing/salesTrack/Detail1.js";

const salesTracking = () => {
  const token = localStorage.token;
  const [activeTab, setActiveTab] = useState("1");
  const redirectPrefix = `/admin/price/edit/`;
  const [alert, setAlert] = React.useState(null);
  const [hide, setHide] = useState(true);
  const [selectAcquirerId, setSelectedAcquirerId] = useState(0);
  const [selectAcquirerName, setSelectAcquirerName] = useState("");
  const [rowIndex, setRowIndex] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const [allHistoryCanvasing, setAllHistoryCanvasing] = useState([]);
  const [salesTracking, setSalesTracking] = useState([]);
  const [selectedSalesTracking, setSelectedTracking] = useState(0);

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
      updateDataTable(page, perPage, currentSort);
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

  const updateDataTable = (page, perPage, sort) => {
    getSalesTracking(page, perPage, sort);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
  };

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`;
      updateDataTable(page, perPage, sort);
    }
  };

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    getSalesTracking(page, perPage, currentSort);
  }, []);

  const getSalesTracking = (page, perPage, currentSort) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const data = { page: page, per_page: perPage };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/sales-track/page`, data, {
        headers,
      })
      .then((data) => {
        setSalesTracking(data.data.response);
        // setPage(data.data.current_page + 1);
        // setPerpage(data.data.per_page);
        // setTotalItem(data.data.total_item);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const rowEvents = {
    onDoubleClick: (e, row, rowIndex) => {
      setHide(false);
      setSelectedTracking(row.tracking_code);
    },
  };

  return (
    <div>
      {alert}
      <SimpleHeader name="Sales Tracking" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>List Sales Tracking</h3>
                </div>
              </CardHeader>
              <CardBody>
                <ToolkitProvider
                  rowNumber={rowIndex}
                  data={salesTracking}
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
                      dataField: "tracking_code",
                      text: "Kode Tracking",
                      sort: true,
                    },
                    {
                      dataField: "username",
                      text: "Username",
                      sort: true,
                    },
                    {
                      dataField: "warehouse_name",
                      text: "Gudang",
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
                        rowEvents={rowEvents}
                        pagination={paginationFactory({ ...paginationOption })}
                        onTableChange={handleTableChange}
                      />
                    </div>
                  )}
                </ToolkitProvider>
              </CardBody>
            </Card>
            <Card>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    Sales Tracking
                  </NavLink>
                </NavItem>
              </Nav>
              {hide ? (
                <></>
              ) : (
                <>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Col md="12">
                          <Detail code={selectedSalesTracking} />
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </>
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default salesTracking;
