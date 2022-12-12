/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { Card, Button,Col, Row,FormGroup , Label, Input, CardBody, CardHeader, Form, Container, UncontrolledTooltip, ButtonGroup } from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import SimpleHeader from "components/Headers/SimpleHeader.js";
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import SweetAlert from "react-bootstrap-sweetalert";

const Account = () => {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  const redirectPrefix = `/admin/account/edit/`;
  const [alert, setAlert] = React.useState(null);
  const [rowIndex, setRowIndex] = useState(0);

  const [allAccount, setAllAccount] = useState([]);

  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [currentSort, setCurrentSort] = useState("");
  const [warehouseid, setWarehouseId] = useState("");
  const [warehouseids, setWarehouseIds] = useState([]);

  let paginationOption = {
    page: page,
    alwaysShowAllBtns: true,
    override: true,
    showTotal: true,
    withFirstAndLast: false,
    sizePerPage: perPage,
    totalSize: totalItem,
    onPageChange: (page) => {
      updateDataTable(page, perPage, currentSort, warehouseid);
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
                updateDataTable(page, e.target.value, currentSort, warehouseid)
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

  const updateDataTable = (page, perPage, sort, warehouseid) => {
    getAccount(page, perPage,sort, warehouseid);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setWarehouseId(warehouseid)
  }

  const handleTableChange = (type, { sortField, sortOrder, warehouseid }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`
      updateDataTable(page, perPage, sort, warehouseid)
    }
  }

  useEffect(() => {
    getAccount(page, perPage, currentSort);
    getPusat();
  }, []);

const getPusat = () => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/warehouse/list/all`, { headers
    })
    .then(data => {
      setWarehouseIds(data.data.response);
    })
      .catch(function (error) {
        console.log(error)
      })
  }

  const getAccount = async (page, perPage, currentSort, warehouse_id = null )  => {
    let filter = { 
      page: page, 
      per_page: perPage,
      warehouse_id: parseInt(warehouse)
    }
    // if (warehouse_id !== null) {
    //   filter = Object.assign(filter, { warehouse_id: warehouse_id })
    // }
    const data = filter;
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/account/page`, data, { headers
    })
    .then(data => {
        setAllAccount(data.data.response);
        setPage(data.data.current_page + 1);
        setPerpage(data.data.per_page);
        setTotalItem(data.data.total_item);
    })
      .catch(function (error) {
        console.log(error)
      })
  }

  // const delateAddress = (id) => {
  //   axios.post(`${process.env.REACT_APP_API_BASE_URL}/account/delete/${id}`, null, {

  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     }
  //   })
  //     .then(function (response) {
  //       setSuccessAlert();
  //       getAccount();
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }

  const setSuccessAlert = () => {
    setAlert(
      <SweetAlert
        success
        showConfirm
        confirmBtnText="Ok"
        title="Account deleted"
        onCancel={hideAlert}
        onConfirm={hideAlert}
      />
    )
  }

  const setQuestionAlert = (id) => {
    setAlert(
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={() => delateAddress(id)}
        onCancel={hideAlert}
        focusCancelBtn
      />
    )
  }

  const hideAlert = () => {
    setAlert(null);
  }

  // const rowEvents = {
  //   onDoubleClick: (e, row, rowIndex) => {
  //     setHide(false);
  //     setSelectedAcquirerId(row.acquirer_id);
  //     setSelectAcquirerName(row.acquirer_name);
  //   }
  // };

  return (
    <div>
      {alert}
      <SimpleHeader name="Account" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3>List Account</h3>
                  <div style={{ textAlign: "right" }}>
                    <Link to="/admin/account/create" className="btn btn-info" >
                      <i className="fas fa-plus" /> Tambah
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardBody>
              <Form>
                <Row md="12">
                  <Col md="3">
                    {/* <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Cabang
                      </Label>
                      <Input
                        name="account"
                        type="select"
                        value={warehouseid}
                        onChange={(e) =>
                          updateDataTable(
                            1,
                            perPage,
                            currentSort,
                            e.target.value,
                            // so_code,
                          )
                        }
                      >
                        <option value="">Pilih Cabang</option>
                        {warehouseids.map((dep, key) => {
                          return (
                            <option key={key} value={dep.id}>
                              {dep.name}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup> */}
                  </Col>
                      {/* <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Kode SO</Label>
                              <Input
                                type="text"
                                placeholder="Masukan Kode SO"
                                value={socode}
                                onChange={e => 
                                    updateDataTable(1,perPage,currentSort,e.target.value,coderfq,statusph)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Kode RFQ</Label>
                              <Input
                                type="text"
                                placeholder="Masukan Kode RFQ"
                                value={coderfq}
                                onChange={e => updateDataTable(1, perPage, currentSort, socode ,e.target.value, statusph)}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="3">
                                <FormGroup>
                                <Label htmlFor="exampleFormControlSelect3">Status SO</Label>
                                <Input
                                    className="form-control-alternative"
                                    name="Tipe So"
                                    type="select"
                                    value={statusph}
                                    onChange={e => updateDataTable(1, perPage, currentSort, socode, coderfq, e.target.value,)}
                                >
                                    <option value="">Pilih Status SO</option>
                                    <option value="3">Proses</option>
                                    <option value="4">Totak</option>
                                    <option value="5">Setuju</option>
                                </Input>
                                </FormGroup>
                                
                            </Col> */}
                            </Row>
                        </Form>
                <ToolkitProvider
                  rowNumber={rowIndex}
                  data={allAccount}
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
                      }
                    },
                    // {
                    //   dataField: "tgl_transaksi",
                    //   text: "Tanggal Transaksi",
                    //   sort: true,
                    // },
                    {
                      dataField: "account_code",
                      text: "Kode Account",
                      sort: true,
                    },
                    {
                      dataField: "account_name",
                      text: "Nama Account",
                      sort: true,
                    },
                    // {
                    //   dataField: "", text: "", formatter: (cell, row, index) => {
                    //     return (
                    //       <ButtonGroup>
                    //         <Button>
                    //           <Link
                    //             to={redirectPrefix + row.id}
                    //             id={"tooltip_" + row.id}
                    //           >
                    //             <i className="fas fa-user-edit" />
                    //           </Link>
                    //         </Button>
                    //         <UncontrolledTooltip delay={0} target={"tooltip_" + row.id}>
                    //           Edit
                    //         </UncontrolledTooltip>
                    //         <Button
                    //           id="btn-acquirer"
                    //           onClick={() => setQuestionAlert(row.id)}
                    //         >
                    //           <i className="fas fa-trash" />
                    //         </Button>
                    //         <UncontrolledTooltip
                    //           delay={0}
                    //           placement="top"
                    //           target="btn-acquirer"
                    //         >
                    //           Delete Alamat
                    //         </UncontrolledTooltip>
                    //       </ButtonGroup>
                    //     )
                    //   }
                    // },
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
                        // rowEvents={rowEvents}
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
}

export default Account;
