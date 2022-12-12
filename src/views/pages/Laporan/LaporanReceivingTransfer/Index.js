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
    Input ,
    ButtonDropdown,UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import paginationFactory from "react-bootstrap-table2-paginator";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import {PDFDownloadLink} from '@react-pdf/renderer';
import PdfReportSo from './Pdf';

const LaporanReceivingTransfer = () => {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  const [rowIndex, setRowIndex] = useState(0);
  const [allPenawaranSo, setAllPenawaranSo] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [currentSort, setCurrentSort] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");


  const updateDataTable = (page, perPage, sort, startdate, enddate) => {
    getPenawaranSo(page, perPage, sort, startdate, enddate);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setStartDate(startdate);
    setEndDate(enddate);
  }
  
  useEffect(() => {
    // getPenawaranSo(page, perPage, currentSort);
  }, []);

  // fungsi dari ambil data
  const getPenawaranSo = async (page, perPage, currentSort, startdate= '', enddate = '') => {
    
    let filter = { 
      page: page, 
      per_page: perPage,
      warehouse_id : parseInt(warehouse)
    }
    if (startdate !== '') {
      filter = Object.assign(filter, { start_date: startdate })
    }
    if (enddate !== '') {
        filter = Object.assign(filter, { end_date: enddate });
    }
    const data = filter;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/transfer-receiving/page`, data, {
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

  const downloadExcel = async ()=> {
    var fileName = 'Laporan-Receiving-PO'
    // get data all by filter
    var filter = { 
      page: page, 
      per_page: 1000,
      warehouse_id : parseInt(warehouse)
    };
    if (startdate !== '') {
      filter = Object.assign(filter, { start_date: startdate })
    }
    if (enddate !== '') {
      filter = Object.assign(filter, { end_date: enddate })
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/transfer-receiving/page`, filter, {
        headers,
      })
      .then((res) => {
        var apiData = res.data.response.map((i)=>{
          return {
            'Tanggal' : i.created_at,
            'Username' : i.username,
            'Kode Receiving' : i.tr_code,
            'Kode Transfer' : i.code_tw,
            'Total Barang' : i.qty_total,
            // 'Harga Total' : i.price_total,
            // 'Kode Partial' : i.partial_code,
            'Keterangan' : i.keterangan,
          }
        });
        const ws = XLSX.utils.json_to_sheet(apiData);
        const fileType ="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const fileExtension = ".xlsx";
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
        <SimpleHeader name="Laporan Receiving Transfer" parentName="Report" />
        <Container className="mt--6" fluid>
            <Row>
            <div className="col">
            <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>Laporan Receiving Transfer</h3>
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
                                {/* <Col md="3">
                                    <FormGroup> */}
                                    {/* <Label hidden htmlFor="exampleFormControlSelect3">Status PO</Label>
                                    <Input hidden
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
                                    </Input> */}
                                    {/* </FormGroup>
                                </Col> */}
                                <Col sm="3">
                                    <FormGroup>
                                    <Label htmlFor="exampleFormControlSelect3">Start Date</Label>
                                    <Input
                                        autoComplete="off"
                                        className="form-control-alternative"
                                        type="date"
                                        name="itemCode"
                                        placeholder="Tanggal Bekerja"
                                        value={startdate}
                                        onChange={e => updateDataTable(1, perPage, currentSort,e.target.value, enddate)}
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
                                        value={enddate}
                                        onChange={e => updateDataTable( 1, perPage, currentSort,startdate, e.target.value )}
                                    />
                                    </FormGroup>
                                </Col>
                                <Col md="" sm="3">
                                <Label>&nbsp;</Label>
                                <br></br>
                                  <Button type='button' onClick={e => updateDataTable(1, perPage, currentSort, startdate, enddate)} className="btn btn-info"><i className="fa fa-filter"></i></Button>
                                  {/* <ButtonDropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(true)}> */}
                                  <UncontrolledDropdown nav>
                                      <DropdownToggle caret color="primary">
                                          Download
                                      </DropdownToggle>
                                      <DropdownMenu>
                                        <DropdownItem onClick={()=> {downloadExcel(allPenawaranSo)}}>Excel</DropdownItem>
                                        {/* <DropdownItem>PDF</DropdownItem> */}
                                        <DropdownItem>
                                      <PDFDownloadLink
                                          document={
                                          <PdfReportSo data={{startdate, enddate}}/>}
                                          fileName="Report Receiving Transfer.pdf"
                                          style={{color: '#000'}}>
                                            PDF
                                      </PDFDownloadLink>
                                    </DropdownItem>
                                      </DropdownMenu>
                                  </UncontrolledDropdown>
                                  {/* </ButtonDropdown> */}
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
                                      dataField: "code_po",
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
                                      dataField: "status_receive",
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
                                    // pagination={paginationFactory({ ...paginationOption })}
                                    // onTableChange={handleTableChange}
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

export default LaporanReceivingTransfer;