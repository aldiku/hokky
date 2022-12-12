/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { Card, Button, Row, CardBody, CardHeader, Container } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import PreviewTable from "components/PreviewTable";
import store from "components/PreviewTable/redux";

const TransferStock = () => {
  const history = useHistory();
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  const [activeTab, setActiveTab] = useState("1");
  const redirectPrefix = `/admin/transfer-stock/edit/`;
  const [alert, setAlert] = React.useState(null);
  const [rowIndex, setRowIndex] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const [allTransferStock, setAllTransferStock] = useState([]);

  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [currentSort, setCurrentSort] = useState("");

  // preview table
  const [previewVisible, setPreviewVisible] = useState(false);
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    listenEvent();
  }, []);

  const listenEvent = () => {
    store.subscribe(() => {
      const state = store.getState();
      if (state.type === "close_modal_preview") {
        setPreviewVisible(false);
      }
    });
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
    getTransaferStock(page, perPage, sort);
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
    getTransaferStock(page, perPage, currentSort);
  }, []);

  const getTransaferStock = async (page, perPage, currentSort) => {
    let filter = {
      page: page,
      per_page: perPage,
    };
    const data = filter;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/transfer-stok/page`,
      data,
      { headers }
    );
    setAllTransferStock(res.data.response_data);
    setPage(res.data.current_page + 1);
    setPerpage(res.data.per_page);
    setTotalItem(res.data.total_item);
  };

  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <div>
      {alert}
      <SimpleHeader name="Transfer Stock" parentName="Admin" />
      <Container className="mt--6" fluid>
        <PreviewTable visible={previewVisible} data={detailData} />
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>List Transfer Stock</h3>
                  <div style={{ textAlign: "right" }}>
                    <Link
                      className="btn btn-info"
                      to="/admin/transfer-stock/create"
                    >
                      Add
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <ToolkitProvider
                  rowNumber={rowIndex}
                  data={allTransferStock}
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
                      dataField: "transfer_code",
                      text: "Transfer Kode",
                      sort: true,
                    },
                    {
                      dataField: "keterangan_ts",
                      text: "Keterangan Transfer Stock",
                      sort: true,
                    },
                    {
                      dataField: "keterangan_gudang",
                      text: "Keterangan Gudang",
                      sort: true,
                    },
                    {
                      dataField: "keterangan_validator",
                      text: "Keterangan Validator",
                      sort: true,
                    },
                    {
                      dataField: "status_barang",
                      text: "Status Barang",
                      sort: true,
                    },
                    {
                      dataField: "",
                      text: "",
                      formatter: (cell, row, index) => {
                        return (
                          <>
                            <Button
                              onClick={() => {
                                setDetailData(row);
                                setPreviewVisible(true);
                              }}
                              color="primary"
                              size="sm"
                            >
                              Detail
                            </Button>
                            <Button
                              color="warning"
                              onClick={() => {
                                history.push({
                                  pathname: `${redirectPrefix}${row.id}`,
                                });
                              }}
                              size="sm"
                            >
                              <Link
                                to={redirectPrefix + row.id}
                                id={"tooltip_" + row.id}
                              ></Link>
                              Edit
                            </Button>
                          </>
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

export default TransferStock;
