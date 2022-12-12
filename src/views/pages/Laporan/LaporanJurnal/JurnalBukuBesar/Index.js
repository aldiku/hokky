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
import SimpleHeader from "components/Headers/SimpleHeader.js";
import paginationFactory from "react-bootstrap-table2-paginator";

const LaporanJurnalBukuBesar = () => {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  const redirectPrefix = `/admin/sales-order/so-penawaran/edit/`;
  const redirectPrefix1 = `/admin/sales-order/so-penawaran/detail/`;
  const [rowIndex, setRowIndex] = useState(0);
  const [allPenawaranSo, setAllPenawaranSo] = useState([]);
  const [status, setStatus] = useState(0);
  const [description, setDescription] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [currentSort, setCurrentSort] = useState("");
  const [warehouseid, setWarehouseId] = useState("");
  const [warehouseids, setWarehouseIds] = useState([]);
  const [coderfq, setCodeRfq] = useState("");
  const [customerid, setCustomerId] = useState("");
  const [customerids, setCustomerIds] = useState("");
  const [statusph, setStatusPh] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [socode, setSoCode] = useState("");
  const [awal, setAwal] = useState("");
  const [end, setEnd] = useState("");

useEffect(() => {
    getPusat();
  }, []);

const getPusat = () => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/warehouse/pusat/list`, { headers
    })
    .then(data => {
      setWarehouseIds(data.data.response);
    })
      .catch(function (error) {
        console.log(error)
      })
  }
  
  let paginationOption = {
    page: page,
    alwaysShowAllBtns: true,
    override: true,
    showTotal: true,
    withFirstAndLast: false,
    sizePerPage: perPage,
    totalSize: totalItem,
    onPageChange: (page) => {
      updateDataTable(page, perPage, currentSort, statusph);
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

  const updateDataTable = (page, perPage, sort, statusph, awal, end) => {
    getPenawaranSo(page, perPage, sort, statusph, awal, end);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setSoCode(socode);
    setCodeRfq(coderfq);
    setStatusPh(statusph);
    setAwal(awal);
    setEnd(end);
  }

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`
      updateDataTable(page, perPage, sort, statusph, awal, end)
    }
  }

  
  useEffect(() => {
    getPenawaranSo(page, perPage, currentSort);
  }, []);

  // fungsi dari ambil data
  const getPenawaranSo = async (page, perPage, currentSort, status_ph = null , start_date= null , end_date = null) => {
    
    let filter = { 
      page: page, 
      per_page: perPage,
      warehouse_id : parseInt(warehouse)
    }
    if (status_ph !== null) {
        filter = Object.assign(filter, { status_ph: parseInt(status_ph) });
    }
    if (start_date !== null) {
      filter = Object.assign(filter, { start_date: start_date })
    }
    if (end_date !== null) {
        filter = Object.assign(filter, { end_date: end_date });
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
        <SimpleHeader name="Jurnal Buku Besar" parentName="Report" />
        <Container className="mt--6" fluid>
            <Row>
            <div className="col">
            <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>Jurnal Buku Besar</h3>
                    {/* <div style={{ textAlign: 'right' }}>
                        <Link className="btn btn-info" to="/admin/sales-order/so-penawaran/create">
                        Tambah
                        </Link>
                    </div> */}
                    </div>
                </CardHeader>
                <CardBody>
                        <Form>
                            <Row md="12">
                                <Col md="3">
                                    <FormGroup>
                                    <Label htmlFor="exampleFormControlSelect3">Status PO</Label>
                                    <Input
                                        className="form-control-alternative"
                                        name="Tipe So"
                                        type="select"
                                        value={statusph}
                                        onChange={e => updateDataTable(1, perPage, currentSort,  e.target.value , awal, end)}
                                    >
                                        <option value="">Pilih Status PO</option>
                                        <option value="3">Proses</option>
                                        <option value="4">Totak</option>
                                        <option value="5">Setuju</option>
                                    </Input>
                                    </FormGroup>
                                    
                                </Col>
                                <Col sm="3">
                                    <FormGroup>
                                    <Label htmlFor="exampleFormControlSelect3">Start Date</Label>
                                    <Input
                                        autoComplete="off"
                                        className="form-control-alternative"
                                        type="date"
                                        name="itemCode"
                                        placeholder="Tanggal Bekerja"
                                        value={awal}
                                        onChange={e => updateDataTable(1, perPage, currentSort, statusph, e.target.value, end)}
                                    />
                                    </FormGroup>
                                </Col>
                                <Col sm="3">
                                <FormGroup>
                                    <Label htmlFor="exampleFormControlSelect3">End Date</Label>
                                    <Input
                                        autoComplete="off"
                                        className="form-control-alternative"
                                        type="date"
                                        name="itemCode"
                                        placeholder="Tanggal Bekerja"
                                        value={end}
                                        onChange={e => updateDataTable( 1, perPage, currentSort, statusph, awal, e.target.value )}
                                    />
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
                                          ? 'proses'
                                          : row.status_ap === 4
                                          ? 'Tidak Setuju'
                                          : 'Setuju';
                                      },
                                  },
                                // {
                                //     dataField: "", text: "", formatter: (cell, row, index) => {
                                //     return (
                                //         <ButtonGroup>
                                //         <Button>
                                //             <Link
                                //             to={redirectPrefix + row.id}
                                //             id={"tooltip_" + row.id}
                                //             >
                                //             <i className="fas fa-user-edit" /> Edit
                                //             </Link>
                                //         </Button>
                                //         &nbsp;
                                //         <Button>
                                //             <Link
                                //             to={redirectPrefix1 + row.id}
                                //             id={"tooltip1_" + row.id}
                                //             >
                                //             <i className="fas fa-user-edit" /> Detail
                                //             </Link>
                                //         </Button>
                                //         </ButtonGroup>
                                //     )
                                //     }
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

export default LaporanJurnalBukuBesar;