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
    Input,
    DropdownItem,DropdownMenu, UncontrolledDropdown, DropdownToggle, 
} from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const ReceivingPo = () => {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  const redirectPrefix = `/cetak/receiving-po/cetak/`;
  const redirectPrefix1 = `/admin/receiving-po/detail-receving/`;
  const [rowIndex, setRowIndex] = useState(0);
  const [allReceivingPo, setAllReceivingPo ] = useState([]);
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
    getReceivingPo(page, perPage, sort, uomCode, description);
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
    getReceivingPo(page, perPage, currentSort);
  }, []);

  // fungsi dari ambil data
  const getReceivingPo = (page, perPage, currentSort) => {
    
    let filter = { 
      
      page: page, 
      per_page: perPage,
      status_receive : 5 ,
      warehouse_id : parseInt(warehouse),
      
    };
    const data = filter;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/receiving-po/page`, data, {
        headers,
      })
      .then((data) => {
        setAllReceivingPo(data.data.response);
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
                  <h3>Cetak Receiving</h3>
                </div>
              </CardHeader>
              <CardBody>
                      <Form>
                        <Row md="12">
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Kode Receiving</Label>
                              <Input
                              className="form-control-alternative"
                                type="text"
                                placeholder="Masukan Kode Receiving"
                                value={uomCode}
                                onChange={e => updateDataTable(1, perPage, currentSort, e.target.value, description)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="3">
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
                            data={allReceivingPo}
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
                                dataField: "receiving_code",
                                text: "Kode Receiving",
                                sort: true,
                            },
                            
                            {
                                dataField: "code_po",
                                text: "Kode Po",
                                sort: true,
                            },
                            {
                                dataField: "person_name",
                                text: "Supplier",
                                sort: true,
                            },
                            {
                                dataField: "qty_total",
                                text: "Jumlah Total",
                                sort: true,
                            },
                            {
                                dataField: "status_receive",
                                text: "Status",
                                sort: true,
                                formatter: (cell, row) => {
                                  return row.status_receive === 3
                                    ? 'proses'
                                    : row.status_receive === 4
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
                                            {/* <Link to={redirectPrefix1 + row.id}
                                              id={"tooltip_" + row.id}>
                                            <DropdownItem>
                                              <i className="fas fa-book" /><span>Detail</span>
                                            </DropdownItem>
                                            </Link> */}
                                            <Link  to={redirectPrefix + row.id}
                                              id={"tooltip_" + row.id}
                                              target="_blank">
                                            <DropdownItem>
                                              <i className="fas fa-print" /><span>Cetak</span>
                                            </DropdownItem>
                                            </Link>
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

export default ReceivingPo;

