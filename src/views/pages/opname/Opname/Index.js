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
    Input 
} from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const OpnamePage = () => {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  const redirectPrefix = `/admin/stock-opname/edit/`;
  const redirectPrefix1 = `/cetak/stock-opname/cetak/`;
  const [rowIndex, setRowIndex] = useState(0);
  const [allOpname, setAllOpname] = useState([]);
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
    getOpname(page, perPage, sort, uomCode, description);
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
    getOpname(page, perPage, currentSort);
  }, []);

  // fungsi dari ambil data
  const getOpname = (page, perPage, currentSort,opname_code='',keterangan='' ) => {
    
    let filter = { 
      
      page: page, 
      per_page: perPage,
      status_d:3,
      warehouse_id : parseInt(warehouse),
    };
    if (opname_code !== null) {
      filter = Object.assign(filter, { opname_code: opname_code });
    }
    if (keterangan !== null) {
      filter = Object.assign(filter, { keterangan: keterangan });
    }
    const data = filter;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/opname/page`, data, {
        headers,
      })
      .then((data) => {
        setAllOpname(data.data.response);
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
            <Card>
              <CardHeader>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3>Opname</h3>
                  <div style={{ textAlign: 'right' }}>
                    <Link className="btn btn-info" to="/admin/stock-opname/create">
                      Tambah
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                      <Form>
                        <Row md="12">
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Kode Opname</Label>
                              <Input
                                type="text"
                                placeholder="Masukan Kode Opname"
                                value={uomCode}
                                onChange={e => updateDataTable(1, perPage, currentSort, e.target.value, description)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Keterangan</Label>
                              <Input
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
                            data={allOpname}
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
                                dataField: "opname_code",
                                text: "Kode Opname",
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
                                        >
                                        <i className="fas fa-user-edit" /> Edit
                                        </Link>
                                    </Button>
                                    &nbsp;
                                    <Button>
                                        <Link
                                        to={redirectPrefix1 + row.id}
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

export default OpnamePage;