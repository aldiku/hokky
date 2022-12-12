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

const SoReturProyek = () => {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  const redirectPrefix = `/admin/so-retur/`;
  const redirectPrefix1 = `/admin/so-retur/proyek/detail/`;
  const [rowIndex, setRowIndex] = useState(0);
  const [allPenawaranSo, setAllPenawaranSo] = useState([]);
  const [status, setStatus] = useState(0);
  const [description, setDescription] = useState("");
  const [retur_code, setReturCode] = useState("")
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
      updateDataTable(page, perPage, currentSort, retur_code );
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
                updateDataTable(page, e.target.value, currentSort, retur_code)
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

  const updateDataTable = (page, perPage, sort,retur_code) => {
    getPenawaranSo(page, perPage, sort,retur_code);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    // setStatus(status);
    // setDescription(description);
    setReturCode(retur_code);
  }

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`
      updateDataTable(page, perPage, sort, retur_code )
    }
  }

  
  useEffect(() => {
    getPenawaranSo(page, perPage, currentSort);
  }, []);

  // fungsi dari ambil data
  const getPenawaranSo = async (page, perPage, currentSort,retur_code = null) => {
    
    let filter = { 
      
      page: page, 
      per_page: perPage,
      status_ar1:5,
      status_ar2 :3,
      status_d :3,
      status:2,
      warehouse_id : parseInt(warehouse)
    };
    if (retur_code !== null) {
        filter = Object.assign(filter, { retur_code: retur_code })
    }
    // if (status !== null) {
    //   filter = Object.assign(filter, { status: status })
    // }
    const data = filter;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/so-retur/page`, data, {
        headers,
      })
      .then((data) => {
        setAllPenawaranSo(data.data.response);
        setPage(data.data.current_page + 1);
        setPerpage(data.data.per_page);
        setTotalItem(data.data.total_item);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // const reset = () => {
  //   setStatus("");
  //   setDescription("");
  //   updateDataTable(1, perPage, currentSort, "", "");
  // }


  return (
    <div>
        <Row>
          <div className="col">
          <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3>Retur Proyek</h3>
                  <div style={{ textAlign: 'right' }}>
                    <Link className="btn btn-info" to="/admin/so-retur/proyek/create">
                    <i className="fas fa-plus" /> Tambah
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                      <Form>
                        <Row md="12">
                          {/* <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Kode Retur</Label>
                              <Input
                                className="form-control-alternative"
                                placeholder="Masukan Kode Retur"
                                type="tex"
                                value={status}
                                onChange={e => updateDataTable(1, perPage, currentSort, e.target.value)}
                              >
                                <option value="" selected hidden disabled>Pilih Status</option>
                                <option value={1}>Cahsier</option>
                                <option value={2}>Project</option>
                                <option value={3}>E-commerce</option>
                                <option value={4}>Canvaser</option>
                              </Input>
                            </FormGroup>
                          </Col> */}
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Kode Retur</Label>
                              <Input
                                className="form-control-alternative"
                                placeholder="Masukan Kode Retur"
                                type="text"
                                value={retur_code}
                                onChange={e => updateDataTable(1, perPage, currentSort, e.target.value)}
                              >
                              </Input>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    <ToolkitProvider
                            rowNumber={rowIndex}
                            data={allPenawaranSo}
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
                                dataField: "code_transaction",
                                text: "Kode Transaksi",
                                sort: true,
                            },
                            {
                                dataField: "qty_total",
                                text: "Jumlah Total",
                                sort: true,
                            },
                            {
                                dataField: "status_ar2",
                                text: "Status",
                                sort: true,
                                formatter: (cell, row) => {
                                  return row.status_ar2 === 3
                                    ? 'proses'
                                    : row.status_ar2 === 4
                                    ? 'Tidak Setuju'
                                    : 'Setuju';
                                },
                            },
                            // {
                            //     dataField: "", text: "", formatter: (cell, row, index) => {
                            //     return (
                            //       <UncontrolledDropdown nav>
                            //       <DropdownToggle className="nav-link pr-0" color="" tag="a">
                            //           <Link className="btn btn-danger" to="/#">
                            //              Tindakan
                            //           </Link>
                            //       </DropdownToggle>
                            //       <DropdownMenu>
                            //             {/* <Link to={redirectPrefix1 + row.id}
                            //               id={"tooltip_" + row.id}>
                            //             <DropdownItem>
                            //               <i className="fas fa-print" /><span>Pembayaran</span>
                            //             </DropdownItem>
                            //             </Link> */}
                            //             {/* {updateButton && updateButton === "YES" && ( */}
                            //             <Link to={redirectPrefix1 + row.id}
                            //               id={"tooltip_" + row.id}>
                            //             <DropdownItem>
                            //               <i className="fas fa-book" /><span>Detail</span>
                            //             </DropdownItem>
                            //             </Link>
                            //             {/* )} */}
                            //             {/* {updateButton && updateButton === "YES" && ( */}
                            //             <Link  to={redirectPrefix + row.id}
                            //               id={"tooltip_" + row.id}>
                            //             <DropdownItem>
                            //               <i className="fas fa-user-edit" /><span>Edit</span>
                            //             </DropdownItem>
                            //             </Link>
                            //             {/* )} */}
                            //       </DropdownMenu>
                            //   </UncontrolledDropdown>
                            //       )
                            //     }
                            //   },
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

export default SoReturProyek;