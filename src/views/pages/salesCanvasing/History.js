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
import classnames from "classnames";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import SweetAlert from "react-bootstrap-sweetalert";
import GoogleMapReact from 'google-map-react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Detail from "views/pages/salesCanvasing/salesTrack/Detail.js";

// import SalesTracking from "views/pages/salesCanvasing/salesTrack/Index.js";

const SalesCanvasing = () => {
  const token = localStorage.token;
  const [activeTab, setActiveTab] = useState("1");
  const [alert, setAlert] = React.useState(null);
  const [hide, setHide] = useState(true);
  const [rowIndex, setRowIndex] = useState(0);
  const [allCanvasing, setAllCanvasing] = useState([]);
  const [selectedSalesCanvasing, setSelectedSalesCanvasing] = useState(0);

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
    getCanvasing(page, perPage, sort);
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

  

  useEffect(() => {
    getCanvasing(page, perPage, currentSort);
  }, []);

  const getCanvasing = (page, perPage, currentSort) => {
    let filter = { page: page, per_page: perPage };
    const data = filter;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/canvasing/page`, data, {
        headers,
      })
      .then((data) => {
        setAllCanvasing(data.data.response);
        setPage(data.data.current_page + 1);
        setPerpage(data.data.per_page);
        setTotalItem(data.data.total_item);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const rowEvents = {
    onDoubleClick: (e, row, rowIndex) => {
      setHide(false);
      setSelectedSalesCanvasing(row.canvasing_code);
    },
  };

  return (
    <div>
      {alert}
      <SimpleHeader name="Dokument Canvaser" parentName="Tracking" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>Dokument Canvaser</h3>
                </div>
              </CardHeader>
              <CardBody>
                <ToolkitProvider
                  rowNumber={rowIndex}
                  data={allCanvasing}
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
                      dataField: "canvasing_code",
                      text: "Kode Canvasing",
                      sort: true,
                    },
                    {
                      dataField: "nama_proyek",
                      text: "Nama Proyek",
                      sort: true,
                    },
                    {
                      dataField: "pic_phone",
                      text: "PIC Phone",
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
                </NavItem>
              </Nav>
              
                <></>
                <>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Col md="12">
                          <Detail code={selectedSalesCanvasing}/>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default SalesCanvasing;
