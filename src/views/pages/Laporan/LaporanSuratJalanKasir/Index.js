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

const LaporanSuratJalanKasir = () => {
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
      status: 1, 
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
      .post(`${process.env.REACT_APP_API_BASE_URL}/surat-jalan-so/page`, data, {
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


  const downloadExcel1 = async ()=> {
    var fileName = 'Laporan-Surat-Jalan-Kasir'
    // get data all by filter
    var filter = { 
      page: page, 
      status: 1,
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
      .post(`${process.env.REACT_APP_API_BASE_URL}/surat-jalan-so/page`, filter, {
        headers,
      })
      .then((res) => {
        var apiData = res.data.response.map((i)=>{
          return {
            'Tanggal' : i.created_at,
            'Username' : i.username,
            'Kode SJ' : i.sj_code,
            'Kode SO' : i.code_so,
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

  const downloadExcel = async ()=> {
    var fileName = 'Laporan-Surat-Jalan-Kasir'
    const fs = require('fs');
    // get data all by filter
    var filter = { 
      page: page,
      status: 1, 
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
      .post(`${process.env.REACT_APP_API_BASE_URL}/surat-jalan-so/page`, filter, {
        headers,
      })
      .then((res) => {
        var apiData = res.data.response;
        var tableToExcel = (function() {
          var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>',
            base64 = function(s) {
              return window.btoa(unescape(encodeURIComponent(s)))
            },
            format = function(s, c) {
              return s.replace(/{(\w+)}/g, function(m, p) {
                return c[p];
              })
            }
          return function(table, name) {
            var heading = 'Laporan Sales Order';
            var imgsrc1 = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhAVKx5R3RdjeXQuRdKan2RNLsZn2U4qXYOgU4jqILz6u6MLSzlvzY1b5x9Xiz4sKHhM0UJ1NKKoFVx6ZEI8JqgANlrZ8KwCJ2j9pOmJN-e50-HzVhTFRvEahjCJB51O4oMmJ25V2yQtYOGfxV2b7C2aT9VKBruh0_znTbORz66pu9P47DMB5aP4SuF/s320/Hokky1.png';
            var items = '';
            var i ;
            for(i=0; i < apiData.length; i++){
              items += `
                <tr style="border: 1px solid black">
                  <td>${apiData[i].created_at}</td>
                  <td>${apiData[i].username}</td>
                  <td>${apiData[i].sj_code}</td>
                  <td>${apiData[i].code_so}</td>
                  <td>${apiData[i].qty_total}</td>
                  <td>${apiData[i].price_total}</td>
                  <td>${apiData[i].partial_code}</td>
                  <td>${apiData[i].keterangan}</td>
                </tr>
              `
            }
            var table = `
            <table className="table table-striped" id="account_table">
                <tbody>
                  <tr>
                    <td><img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhAVKx5R3RdjeXQuRdKan2RNLsZn2U4qXYOgU4jqILz6u6MLSzlvzY1b5x9Xiz4sKHhM0UJ1NKKoFVx6ZEI8JqgANlrZ8KwCJ2j9pOmJN-e50-HzVhTFRvEahjCJB51O4oMmJ25V2yQtYOGfxV2b7C2aT9VKBruh0_znTbORz66pu9P47DMB5aP4SuF/s320/Hokky1.png" style="float:left;clear:none;margin-right:50px " height=100 width=200 /> </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td colspan="2">Hokky Bangunan</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td colspan="2">Jl Menganti Karangan No.562,wiyung<br>surabaya barat - Jawa Timur</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td colspan="2">Telp: 081 217 85 3300 </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="8"><center>Laporan Purchase Order<center></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Start Date :</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Nama : </td>
                    <td>Dewa</td>
                </tr>
                <tr>
                    <td>End Date : </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Tanggal Cetak :</td>
                    <td>22-Nov-22</td>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                  <tr style="border: 1px solid black">
                      <th>Tangal Pembuatan</th>
                      <th>Username</th>
                      <th>Kode SJ</th>
                      <th>Kode SO</th>
                      <th>Total Barang</th>
                      <th>Total Harga</th>
                      <th>Parsial</th>
                      <th>Keterangan</th>
                  </tr>
                  ${items}
                </tbody>
            </table>
            `;
            var ctx = {
              worksheet: name || 'Worksheet',
              imgsrc1: imgsrc1,
              heading: heading,
              table: table
            }
            var blob = new Blob([format(template, ctx)]);
            return blob;
          }
        })()
        var blobURL = tableToExcel('account_table', 'data_order');
        FileSaver.saveAs(blobURL, fileName+'.xls');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
        <SimpleHeader name="Laporan Surat Jalan Kasir" parentName="Report" />
        <Container className="mt--6" fluid>
            <Row>
            <div className="col">
            <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>Laporan Surat Jalan Kasir</h3>
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
                                          fileName="Report Surat Jalan Kasir.pdf"
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
                                      dataField: "sj_code",
                                      text: "Kode SJ",
                                      sort: true,
                                  },
                                  {
                                      dataField: "code_so",
                                      text: "Kode SO",
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
                                //   {
                                //       dataField: "status_receive",
                                //       text: "Status",
                                //       sort: true,
                                //       formatter: (cell, row) => {
                                //         return row.status_ap === 3
                                //           ? 'proses'
                                //           : row.status_ap === 4
                                //           ? 'Tidak Setuju'
                                //           : 'Setuju';
                                //       },
                                //   },
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

export default LaporanSuratJalanKasir;