/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { 
    Card, 
    Button, 
    Row, 
    Col, 
    CardBody, 
    CardHeader, 
    Container,
    ButtonGroup, 
    Form, 
    FormGroup, 
    Label, 
    Input 
} from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const CetakTransferStokWarehouse = () => {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  const redirectPrefix = `/cetak/transfer-warehouse-stock/cetak/`;
  const [rowIndex, setRowIndex] = useState(0);
  const [allTransferStokWarehouse, setAllTransferStokWarehouse] = useState([]);
  const [tw_code, setTwCode] = useState("");
  const [description, setDescription] = useState("");
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
      updateDataTable(page, perPage, currentSort, tw_code);
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
                updateDataTable(page, e.target.value, currentSort)
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
  }

  const updateDataTable = (page, perPage, sort, tw_code) => {
    getTSW(page, perPage, sort, tw_code);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setTwCode(tw_code);
    setDescription(description);
  }

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`
      updateDataTable(page, perPage, sort, tw_code)
    }
  }

  
  useEffect(() => {
    getTSW(page, perPage, currentSort);
  }, []);

  // fungsi dari ambil data
  const getTSW = (page, perPage, currentSort, tw_code=null) => {
    
    let filter = { 
      
      page: page, 
      per_page: perPage,
      status_d: 5,
      status_m: 5, 
      warehouse_id : parseInt(warehouse),
      
    };
    if (tw_code !== null) {
      filter = Object.assign(filter, { tw_code: tw_code })
    }
    const data = filter;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/transfer-warehouse/page`, data, {
        headers,
      })
      .then((data) => {
        setAllTransferStokWarehouse(data.data.response);
        setPage(data.data.current_page + 1);
        setPerpage(data.data.per_page);
        setTotalItem(data.data.total_item);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const reset = () => {
    setTwCode("");
    setDescription("");
    updateDataTable(1, perPage, currentSort, "", "");
  }

  return (
    <div>
        <Row>
          <div className="col">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3>Cetak Transfer Stok Warehouse</h3>
                </div>
              </CardHeader>
              <CardBody>
                      <Form>
                        <Row md="12">
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Kode Transfer Stok</Label>
                              <Input
                                type="text"
                                placeholder="Masukan Kode Invoice"
                                value={tw_code}
                                onChange={e => updateDataTable(1, perPage, currentSort, e.target.value)}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Button type="button" onClick={reset} color="secondary">Reset</Button>
                          </Col>
                        </Row>
                      </Form>
                    <ToolkitProvider
                            rowNumber={rowIndex}
                            data={allTransferStokWarehouse}
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
                                dataField: "created_at",
                                text: "Tanggal Buat",
                                sort: true,
                            },
                            {
                                dataField: "tw_code",
                                text: "Kode Transfer Warehouse",
                                sort: true,
                            },
                            {
                                dataField: "keterangan",
                                text: "Keterangan",
                                sort: true,
                            },
                            {
                                dataField: "status_d",
                                text: "Status Direktur",
                                sort: true,
                                formatter: (cell, row) => {
                                  return row.status_d === 3
                                    ? 'proses'
                                    : row.status_d === 4
                                    ? 'Tidak Setuju'
                                    : 'Setuju';
                                },
                            },
                            {
                                dataField: "", text: "", formatter: (cell, row, index) => {
                                return (
                                    <ButtonGroup>
                                    <Button>
                                        <Link
                                        to={redirectPrefix + row.id}
                                        id={"tooltip_" + row.id}
                                        target="_blank"
                                        >
                                        <i className="fas fa-print" /> Cetak
                                        </Link>
                                    </Button>
                                    </ButtonGroup>
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
    </div>
  );
}

export default CetakTransferStokWarehouse;