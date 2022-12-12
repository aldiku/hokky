import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  CardBody,
  CardHeader,
  CardFooter,
  Table,
  Modal, ModalHeader, ModalBody
} from "reactstrap";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

const ModalCetakSo = ({ open, toggle, data, }) => {
    const [currentSort, setCurrentSort] = useState("");
    const [rowIndex, setRowIndex] = useState(0);
    function print() {
      var printContents = document.getElementById("targetContent").innerHTML;
      var originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    }
return (
<Modal isOpen={open} toggle={toggle} style={{ minWidth: "70%", top: "-20%" }}>
    <ModalHeader toggle={toggle} align="center">
            <span>
                Cetak
            </span>
            <Button size="sm" color="info" className="ml-5" onClick={() => print()}>Print</Button>
    </ModalHeader>
    <ModalBody align="center" id="targetContent">
          <div className="col">
          <table border="0" cellpadding="1" cellspacing="1" style={{width: "100%"}}>
          <tbody>
            <tr>
              <td><img
                                    style={{ width: "20%" }}
                                    src={require("assets/img/theme/Hokky1.png").default}
                                /></td>
              <td>Head Office : {data.warehouserfq}<br></br>
                                Jl Menganti Karangan No.562 <br></br>
                                Surabaya - Jawa Timur<br></br>
                                Phone : 081 217 85 3300<br></br>
                                Email : hokkybangunan.sby@gmail.com
                                </td>
            </tr>
          </tbody>
        </table>
                <CardBody className="border">
                    <CardHeader>
                        <Row md="12">
                            <Col md="8">
                                <img
                                    style={{ width: "20%" }}
                                    src={require("assets/img/theme/Hokky1.png").default}
                                />
                            </Col>
                            <Col md="4" className="text-sm">
                                Head Office : {data.warehouserfq}<br></br>
                                Jl Menganti Karangan No.562 <br></br>
                                Surabaya - Jawa Timur<br></br>
                                Phone : 081 217 85 3300<br></br>
                                Email : hokkybangunan.sby@gmail.com
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardHeader>
                        <Row md="12">
                            <Col md="12">
                                <h3><b><center>SURAT JALAN</center></b></h3>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                          <Col md="6">
                            <div className="row align-items-center mb-3">
                                <div className="col-4">Kode SJ</div>
                                <div className="col-1 text-center">:</div>
                                <div className="col ">
                                    <b>{data.coderfq}</b>
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <div className="col-4">Issuing Date</div>
                                <div className="col-1 text-center">:</div>
                                <div className="col ">
                                    <b>{data.waktu}</b>
                                </div>
                            </div>
                          </Col>
                          <Col md="6">
                            {/* <div className="row align-items-center mb-3">
                                <div className="col-4">Pengiriman</div>
                                <div className="col-1 text-center">:</div>
                                <div className="col-4 ">
                                    <b>{pengiriman}</b>
                                </div>
                            </div> */}
                            <div className="row align-items-center mb-3">
                                <div className="col-4">Customer</div>
                                <div className="col-1 text-center">:</div>
                                <div className="col ">
                                    <b>{data.supplier}</b>
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <div className="col-4">Keterangan</div>
                                <div className="col-1 text-center">:</div>
                                <div className="col">
                                    <b>{data.keterangan}</b>
                                </div>
                            </div>
                          </Col>
                      </Row>
                      <ToolkitProvider
                  rowNumber={rowIndex}
                  data={data.listItem}
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
                      dataField: "item_name",
                      text: "Nama Item",
                      sort: true,
                    },
                    {
                        dataField: "barcode",
                        text: "Barcode",
                        sort: true,
                      },
                    {
                      dataField: "satuan",
                      text: "Satuan",
                      sort: true,
                    },
                    {
                      dataField: "qty",
                      text: "Qty",
                      sort: true,
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
                        // pagination={paginationFactory()}
                      />
                    </div>
                  )}
                </ToolkitProvider>
                    </CardBody>
                    <Table>
                    <CardHeader></CardHeader>
                    <center>Terms of Price, delivery & shipping required</center>
                    <CardFooter></CardFooter>
                        <tbody>
                          <tr>
                            <td>
                                <Row md="24">
                                    <Col md="3">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Kepala Gudang</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-5 ">
                                            <b>{data.validator}</b>
                                        </div>
                                    </div>
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Signature</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-4 ">
                                            <b>---------------------------</b>
                                        </div>
                                    </div>
                                    </Col>
                                </Row>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                </CardBody>
              
          </div>
    </ModalBody>
</Modal>
);
}

export default ModalCetakSo;