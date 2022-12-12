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
    Input, 
    ButtonDropdown, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import SimpleHeader from "components/Headers/SimpleHeader.js";
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

import {PDFDownloadLink} from '@react-pdf/renderer';
import PdfReportSo from './Pdf';

const JurnalUmum = () => {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  const redirectPrefix = `/admin/sales-order/so-penawaran/edit/`;
  const redirectPrefix1 = `/admin/sales-order/so-penawaran/detail/`;
  const [rowIndex, setRowIndex] = useState(0);
  const [allPenawaranSo, setAllPenawaranSo] = useState([]);
  const [status, setStatus] = useState(0);
  const [description, setDescription] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(1000000);
  const [totalItem, setTotalItem] = useState(0);
  const [currentSort, setCurrentSort] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [statusph, setStatusph] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  let paginationOption = {
    page: page,
    alwaysShowAllBtns: true,
    override: true,
    showTotal: true,
    withFirstAndLast: false,
    sizePerPage: perPage,
    totalSize: totalItem,
    onPageChange: (page) => {
      updateDataTable(page, perPage, currentSort, start, end, statusph);
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

  const updateDataTable = (page, perPage, sort, start,end,statusph) => {
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setStart(start);
    setEnd(end);
    setStatusph(statusph);
    getPenawaranSo(page, perPage, sort, start,end,statusph);
  }

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`
      updateDataTable(page, perPage, sort,  start,end,statusph)
    }
  }

  
  useEffect(() => {
    // getPenawaranSo(page, perPage, currentSort);
  }, []);

  // fungsi dari ambil data
  const getPenawaranSo = async (page, perPage, currentSort, start='',end='',statusph='') => {
    
    let filter = { 
      page: page, 
      per_page: perPage,
      warehouse_id : parseInt(warehouse)
    };
    if (start !== '') {
      filter = Object.assign(filter, { start_date: start })
    }
    if (end !== '') {
      filter = Object.assign(filter, { end_date: end })
    }
    if (statusph !== '') {
      filter = Object.assign(filter, { status_ph: statusph })
    }
    const data = filter;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/account-journal/umum`, data, {
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

  const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID',
        { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
    ).format(money);
  }

  const downloadExcel1 = async ()=> {
    var fileName = 'jurnal-umum'
    // get data all by filter
    var filter = { 
      page: page, 
      per_page: 100000,
      warehouse_id : parseInt(warehouse)
    };
    if (start !== '') {
      filter = Object.assign(filter, { start_date: start })
    }
    if (end !== '') {
      filter = Object.assign(filter, { end_date: end })
    }
    if (statusph !== '') {
      filter = Object.assign(filter, { status_ph: statusph })
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/account-journal/umum`, filter, {
        headers,
      })
      .then((res) => {
        var apiData = res.data.response.map((i)=>{
          return {
            // 'So Code' : i.no,
            'Tanggal Buat' : i.created_at ,
            'Cabang' : i.warehouse_id ,
            // 'Tipe Penjualan' : i. ,
            'No SO' : i.so_code ,
            'Sales' : i.sales ,
            'Customer' : i.customer_id ,
            'Alamat' : i.manual_address ,
            // 'Jenis Pembayaran' : i. ,
            'Total QTY' : i.qty_total ,
            'Total Harga' : i.price_total ,
            'PPN' : i.persen_pajak ,
            'Total Diskon' : i.diskon_total ,
            'Total Promo' : i.promo_total,
            'Total Pembayaran' : i.payment_total,
            // 'No' : i. ,
            // 'Item' : i. ,
            // 'Kode' : i. ,
            // 'QTY' : i. ,
            // 'Diskon %' : i. ,
            // 'Diskon Rp' : i. ,
            // 'Sub Total' : i. ,
            // 'No' : i. ,
            // 'Kode Promo' : i. ,
            // 'Total Promo' : i. ,
            // 'So Code' : i.so_code,
            // 'Address' : i.manual_address,
            // 'Total Barang' : i.qty_total,
            // 'Harga Total' : i.price_total,
            // 'Diskon Total' : i.diskon_total,
            // 'Harga ongkir' : i.ongkir,
            // 'Harga Payment' : i.payment_total,
            // 'Keterangan' : i.keterangan,
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
    var fileName = 'Data-order';
    const fs = require('fs');
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
      .post(`${process.env.REACT_APP_API_BASE_URL}/account-journal/umum`, filter, {
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
                  <td>${apiData[i].account_id}</td>
                  <td>${apiData[i].account_level}</td>
                  <td>${apiData[i].account_code}</td>
                  <td>${apiData[i].account_name}</td>
                  <td>${apiData[i].tgl_transaksi}</td>
                  <td>${apiData[i].transaction_code}</td>
                  <td>${apiData[i].pic}</td>
                  <td>${apiData[i].note}</td>
                  <td>${apiData[i].debet_total}</td>
                  <td>${apiData[i].kredit_total}</td>
                  <td>${apiData[i].saldo_total}</td>
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
                      <th>Akun Id</th>
                      <th>Akun Level</th>
                      <th>Kode Akun</th>
                      <th>Nama Akun</th>
                      <th>Tgl Transaksi</th>
                      <th>Kode Transaksi</th>
                      <th>Pic</th>
                      <th>Note</th>
                      <th>Debet</th>
                      <th>kredit</th>
                      <th>Saldo</th>
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
    <>
        <SimpleHeader name="Jurnal Umum" parentName="Report" />
        <Container className="mt--6" fluid>
        <Row>
          <div className="col">
          <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3>Jurnal Umum</h3>
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
                        <Col md="" sm="4">
                            <FormGroup>
                              <Label>Start Date</Label>
                              <Input
                                className="form-control-alternative"
                                name="start"
                                type="date"
                                value={start}
                                onChange={e => updateDataTable(1, perPage, currentSort, e.target.value, end, statusph)}
                              >
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col md="" sm="4">
                            <FormGroup>
                              <Label>End Date</Label>
                              <Input
                                className="form-control-alternative"
                                name="end"
                                type="date"
                                value={end}
                                onChange={e => updateDataTable(1, perPage, currentSort, start, e.target.value, statusph)}
                              >
                              </Input>
                            </FormGroup>
                          </Col>
                          {/* <Col md="" sm="6">
                            <FormGroup>
                              <Label>Status</Label>
                              <Input
                                className="form-control-alternative"
                                name="statusph"
                                type="select"
                                value={statusph}
                                onChange={e => updateDataTable(1, perPage, currentSort, start, end, e.target.value)}
                              >
                                  <option value="">--all--</option>
                                  <option value="3">Proses</option>
                                  <option value="4">Ditolak</option>
                                  <option value="5">Disetujui</option>
                              </Input>
                            </FormGroup>
                          </Col> */}
                          {/* <Col md="" sm="6">
                            <FormGroup>
                              <Label htmlFor="exampleFormControlSelect3">Status</Label>
                              <Input
                                className="form-control-alternative"
                                name="Tipe So"
                                type="select"
                                value={status}
                                onChange={e => updateDataTable(1, perPage, currentSort, e.target.value, description,start,end,statusph)}
                              >
                                <option value="">Pilih Sales Order</option>
                                <option value="1">Cahsier</option>
                                <option value="2">Project</option>
                                <option value="3">E-commerce</option>
                                <option value="4">Canvaser</option>
                              </Input>
                            </FormGroup>
                          </Col> */}
                          <Col md="" sm="4">
                          <Label>&nbsp;</Label>
                          <br></br>
                            <Button type='button' onClick={e => updateDataTable(1, perPage, currentSort, start, end, statusph)} className="btn btn-info"><i className="fa fa-filter"></i></Button>
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
                                      <PdfReportSo data={{start, end, statusph}}/>}
                                      fileName="Report Laporan SO.pdf"
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
                    <CardBody className="bg-white border-0">
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
                                dataField: "tgl_transaksi",
                                text: "Tanggal Transaksi",
                                sort: true,
                            },
                            {
                                dataField: "transaction_code",
                                text: "Kode Transaksi",
                                sort: true,
                            },
                            {
                                dataField: "account_name",
                                text: "Nama Akun",
                                sort: true,
                            },
                            {
                                dataField: "debet_total",
                                text: "Debet",
                                sort: true,
                                formatter: (value) => formatRupiah(value)
                            },
                            {
                                dataField: "kredit_total",
                                text: "Kredit",
                                sort: true,
                                formatter: (value) => formatRupiah(value)
                            },
                            {
                              dataField: "saldo_total",
                              text: "Saldo",
                              sort: true,
                              formatter: (value) => formatRupiah(value)
                          },
                            // {
                            //     dataField: "status_ph",
                            //     text: "Status",
                            //     sort: true,
                            //     formatter: (cell, row) => {
                            //       return row.status_ph === 3
                            //         ? 'proses'
                            //         : row.status_ph === 4
                            //         ? 'Tidak Setuju'
                            //         : 'Setuju';
                            //     },
                            // },
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
                                // pagination={paginationFactory({ ...paginationOption })}
                                // onTableChange={handleTableChange}
                                />
                            </div>
                          )}
                    </ToolkitProvider>
                    </CardBody>
              </CardBody>
            </Card>
          </div>
        </Row>
        </Container>
    </>
  );
}

export default JurnalUmum;