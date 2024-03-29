/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  CardBody,
  CardHeader,
  UncontrolledTooltip,
  ButtonGroup,
  Form,
  FormGroup,
  Label,
  Input,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const PenawaranPo = () => {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  const redirectPrefix = `/admin/purchase-order/edit/`;
  const redirectPrefix1 = `/admin/purchase-order/detail/`;
  // const redirectPrefix1 = `/admin/cetak-po/`;
  const [rowIndex, setRowIndex] = useState(0);
  const [allPenawaranPo, setAllPenawaranPo] = useState([]);
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

  const updateDataTable = (page, perPage, sort, uomCode, description) => {
    getPenawaranPo(page, perPage, sort, uomCode, description);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setUomCode(uomCode);
    setDescription(description);
  };

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`;
      updateDataTable(page, perPage, sort, uomCode, description);
    }
  };

  useEffect(() => {
    getPenawaranPo(page, perPage, currentSort);
  }, []);

  // fungsi dari ambil data
  const getPenawaranPo = (
    page,
    perPage,
    currentSort,
    po_code = null,
    person_name = null
  ) => {
    let filter = {
      page: page,
      per_page: perPage,
      approve: 3,
      status_ap: 3,
      status_d: 3,
      warehouse_id: parseInt(warehouse),
    };
    if (po_code !== null) {
      filter = Object.assign(filter, { po_code: po_code });
    }
    if (person_name !== null) {
      filter = Object.assign(filter, { person_name: person_name });
    }
    const data = filter;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/purchase-order/page`, data, {
        headers,
      })
      .then((data) => {
        setAllPenawaranPo(data.data.response);
        setPage(data.data.current_page + 1);
        // setPerpage(data.data.per_page);
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
  };

  return (
    <div>
      <Row>
        <div className="col">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Penawaran PO</h3>
                <div style={{ textAlign: "right" }}>
                  <Link
                    className="btn btn-info"
                    to="/admin/purchase-order/create"
                  >
                    <i className="fas fa-plus" /> Tambah
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <Form>
                <Row md="12">
                  <Col md="3">
                    <FormGroup>
                      <Label htmlFor="exampleFormControlSelect3">Kode PO</Label>
                      <Input
                        className="form-control-alternative"
                        type="text"
                        placeholder="Masukan Kode PO"
                        value={uomCode}
                        onChange={(e) =>
                          updateDataTable(
                            1,
                            perPage,
                            currentSort,
                            e.target.value,
                            description
                          )
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                    <FormGroup>
                      <Label htmlFor="exampleFormControlSelect3">
                        Nama Supplier
                      </Label>
                      <Input
                        className="form-control-alternative"
                        type="text"
                        placeholder="Masukan Nama Supplier"
                        value={description}
                        onChange={(e) =>
                          updateDataTable(
                            1,
                            perPage,
                            currentSort,
                            uomCode,
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
              <ToolkitProvider
                rowNumber={rowIndex}
                data={allPenawaranPo}
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
                    dataField: "po_code",
                    text: "Kode PO",
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
                    dataField: "keterangan",
                    text: "Keterangan",
                    sort: true,
                  },
                  {
                    dataField: "status_ap",
                    text: "Status",
                    sort: true,
                    formatter: (cell, row) => {
                      return row.status_ap === 3
                        ? "proses"
                        : row.status_ap === 4
                        ? "Tidak Setuju"
                        : "Setuju";
                    },
                  },
                  {
                    dataField: "",
                    text: "",
                    formatter: (cell, row, index) => {
                      return (
                        <UncontrolledDropdown nav>
                          <DropdownToggle
                            className="nav-link pr-0"
                            color=""
                            tag="a"
                          >
                            <Button className="btn btn-danger">Tindakan</Button>
                          </DropdownToggle>
                          <DropdownMenu>
                            {/* <Link to={redirectPrefix1 + row.id}
                                          id={"tooltip_" + row.id}>
                                        <DropdownItem>
                                          <i className="fas fa-book" /><span>Cek Jurnal</span>
                                        </DropdownItem>
                                        </Link> */}
                            {/* {updateButton && updateButton === "YES" && ( */}
                            <Link
                              to={redirectPrefix1 + row.id}
                              id={"tooltip_" + row.id}
                            >
                              <DropdownItem>
                                <i className="fas fa-book" />
                                <span>Detail</span>
                              </DropdownItem>
                            </Link>
                            {/* )}
                                        {updateButton && updateButton === "YES" && ( */}
                            <Link
                              to={redirectPrefix + row.id}
                              id={"tooltip_" + row.id}
                            >
                              <DropdownItem>
                                <i className="fas fa-user-edit" />
                                <span>Edit</span>
                              </DropdownItem>
                            </Link>
                            {/* )} */}
                          </DropdownMenu>
                        </UncontrolledDropdown>
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
    </div>
  );
};

export default PenawaranPo;
