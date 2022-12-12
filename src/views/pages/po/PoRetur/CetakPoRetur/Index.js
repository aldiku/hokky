/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { 
    Card, 
    Button, 
    Row, 
    Col, 
    CardBody, 
    CardHeader, 
    ButtonGroup, 
    Form, 
    FormGroup, 
    Label, 
    Input ,
    DropdownItem,DropdownMenu, UncontrolledDropdown, DropdownToggle
} from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const CetakReturPo = () => {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  const redirectPrefix = `/cetak/po-retur/cetak/`;
  const redirectPrefix1 = `/admin/po-retur/detail-po-retur/`;
  const redirectPrefix2 = `/admin/po-retur/payment-bkm/`;
  const [rowIndex, setRowIndex] = useState(0);
  const [allPoRetur, setAllPoRetur] = useState([]);
  const [uomCode, setUomCode] = useState("");
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
      updateDataTable(page, perPage, currentSort, uomCode, description);
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

  const updateDataTable = (page, perPage, sort, uomCode, description) => {
    getPoRetur(page, perPage, sort, uomCode, description);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setUomCode(uomCode);
    setDescription(description);
  }

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`
      updateDataTable(page, perPage, sort,  uomCode, description)
    }
  }

  
  useEffect(() => {
    getPoRetur(page, perPage, currentSort);
  }, []);

  // fungsi dari ambil data
  const getPoRetur = (page, perPage, currentSort) => {
    
    let filter = { 
      
      page: page, 
      per_page: perPage,
      status_ar:5,
      status_d:5,
      warehouse_id : parseInt(warehouse),
      
    };
    const data = filter;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/po-retur/page`, data, {
        headers,
      })
      .then((data) => {
        setAllPoRetur(data.data.response);
        setPage(data.data.current_page + 1);
        setPerpage(data.data.per_page);
        setTotalItem(data.data.total_item);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const reset = () => {
    setUomCode("");
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
                  <h3>Cetak PO Retur</h3>
                </div>
              </CardHeader>
              <CardBody>
                      <Form>
                        <Row md="12">
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Kode Po Retur</Label>
                              <Input
                              className="form-control-alternative"
                                type="text"
                                placeholder="Masukan Kode PO Retur"
                                value={uomCode}
                                onChange={e => updateDataTable(1, perPage, currentSort, e.target.value, description)}
                              />
                            </FormGroup>
                          </Col>
                          {/* <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Keterangan</Label>
                              <Input
                              className="form-control-alternative"
                                type="text"
                                placeholder="Masukan Deskripsi"
                                value={description}
                                onChange={e => updateDataTable(1, perPage, currentSort, uomCode, e.target.value)}
                              />
                            </FormGroup>
                          </Col> */}
                        </Row>
                        <Row>
                          <Col>
                            <Button type="button" onClick={reset} color="secondary">Reset</Button>
                          </Col>
                        </Row>
                      </Form>
                    <ToolkitProvider
                            rowNumber={rowIndex}
                            data={allPoRetur}
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
                                dataField: "retur_code",
                                text: "Kode Retur",
                                sort: true,
                            },
                            {
                                dataField: "keterangan",
                                text: "Keterangan",
                                sort: true,
                            },
                            {
                                dataField: "status_d",
                                text: "Status",
                                sort: true,
                                formatter: (cell, row) => {
                                  return row.status_m === 3
                                    ? 'proses'
                                    : row.status_m === 4
                                    ? 'Tidak Setuju'
                                    : 'Setuju';
                                },
                            },
                            {
                                dataField: "", text: "", formatter: (cell, row, index) => {
                                return (
                                  <UncontrolledDropdown nav>
                                  <DropdownToggle className="nav-link pr-0" color="" tag="a">
                                      <Link className="btn btn-danger" to="/#">
                                         Tindakan
                                      </Link>
                                  </DropdownToggle>
                                  <DropdownMenu>
                                      {/* <Link to={redirectPrefix1 + row.id}
                                          id={"tooltip_" + row.id}>
                                        <DropdownItem>
                                          <i className="fas fa-book" /><span>Cek Jurnal</span>
                                        </DropdownItem>
                                        </Link> */}
                                        {/* {updateButton && updateButton === "YES" && ( */}
                                        <Link to={redirectPrefix2 + row.id}
                                          id={"tooltip_" + row.id}>
                                        <DropdownItem>
                                          <i className="fa fa-money" aria-hidden="true"/><span>Payment</span>
                                        </DropdownItem>
                                        </Link>
                                        {/* )}}
                                        {/* {updateButton && updateButton === "YES" && ( */}
                                        <Link to={redirectPrefix1 + row.id}
                                          id={"tooltip_" + row.id}>
                                        <DropdownItem>
                                          <i className="fas fa-book" /><span>Detail</span>
                                        </DropdownItem>
                                        </Link>
                                        {/* )}
                                        {updateButton && updateButton === "YES" && ( */}
                                        <Link  to={redirectPrefix + row.id}
                                          id={"tooltip_" + row.id}
                                          target="_blank">
                                        <DropdownItem>
                                          <i className="fas fa-print" /><span>Cetak</span>
                                        </DropdownItem>
                                        </Link>
                                        {/* )} */}
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

export default CetakReturPo;