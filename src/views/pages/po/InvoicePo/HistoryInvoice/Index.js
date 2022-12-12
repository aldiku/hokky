/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import { 
    Card, 
    Button, 
    Row, 
    Col, 
    CardBody, 
    CardHeader, 
    UncontrolledTooltip, 
    ButtonGroup, 
    Collapse, 
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

const HistoryInvoicePo = () => {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  const redirectPrefix = `/admin/po/history-invoice-po/edit/`;
  const [rowIndex, setRowIndex] = useState(0);
  const [allInvoicePo, setAllInvoicePo] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
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
    getInvoicePo(page, perPage, sort, uomCode, description);
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
    getInvoicePo(page, perPage, currentSort);
  }, []);

  // fungsi dari ambil data
  const getInvoicePo = (page, perPage, currentSort) => {
    
    let filter = { 
      page: page, 
      per_page: perPage, 
      
    };
    const data = filter;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/invoice-po/page`, data, {
        headers,
      })
      .then((data) => {
        setAllInvoicePo(data.data.response);
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
                  <h3>Invoice PO</h3>
                </div>
              </CardHeader>
              <CardBody>
              <h3 onClick={toggleOpen} >Search &nbsp;
                  {
                    isOpen === true ? <i className="fa fa-angle-down" aria-hidden="true"></i> : <i className="fa fa-angle-right" aria-hidden="true"></i>
                  }
                </h3>
                <Collapse isOpen={isOpen}>
                  <Form>
                        <Row md="12">
                          <Col md="3">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Kode Invoice</Label>
                              <Input
                              className="form-control-alternative"
                                type="text"
                                placeholder="Masukan Kode Uom"
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
                    </Collapse>
                    <ToolkitProvider
                            rowNumber={rowIndex}
                            data={allInvoicePo}
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
                                dataField: "invoice_code",
                                text: "Kode Invoice",
                                sort: true,
                            },
                            {
                                dataField: "code_po",
                                text: "Kode PO",
                                sort: true,
                            },
                            {
                                dataField: "person_id",
                                text: "Supplier",
                                sort: true,
                            },
                            {
                                dataField: "qty_total",
                                text: "Jumlah Total",
                                sort: true,
                            },
                            {
                                dataField: "price_total",
                                text: "Harga Total",
                                sort: true,
                                formatter: (value) => formatRupiah(value)
                            },
                            {
                                dataField: "fisik_total",
                                text: "Fisik Total",
                                sort: true,
                            },
                            // {
                            //     dataField: "pembayaran_total",
                            //     text: "Pembayaran Total",
                            //     sort: true,
                            // },
                            {
                                dataField: "status_af",
                                text: "Status Admin Finance",
                                sort: true,
                                formatter: (cell, row) => {
                                  return row.status_barang === 0
                                    ? 'proses'
                                    : row.status_barang === 1
                                    ? 'Setuju'
                                    : 'Tidak Setuju';
                                },
                            },
                            {
                                dataField: "status_d",
                                text: "Status Pimpinan",
                                sort: true,
                                formatter: (cell, row) => {
                                  return row.status_barang === 0
                                    ? 'proses'
                                    : row.status_barang === 1
                                    ? 'Setuju'
                                    : 'Tidak Setuju';
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
                                        <i className="fas fa-user-edit" />
                                        </Link>
                                    </Button>
                                    <UncontrolledTooltip delay={0} target={"tooltip_" + row.id}>
                                        Edit
                                    </UncontrolledTooltip>
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

export default HistoryInvoicePo;
