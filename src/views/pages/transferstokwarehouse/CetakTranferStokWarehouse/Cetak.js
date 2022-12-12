/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  CardFooter,
  Table,
} from "reactstrap";
import axios from "axios";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

export default function CetakTranferStokWarehouse(props) {
  const token = localStorage.token;
  const username = localStorage.username;
  const [tw,setTw] = useState("")
  const [code, setCode] = useState("")
  const [cabang, setCabang] = useState("")
  const [waktu, setWaktu] = useState("")
  const [warehouse,setWarehouse] = useState("")
  const [keterangan,setKeterangan] = useState("")
  const [manajer,setManajer] = useState("")
  const [direktur,setDirektur] = useState("")
  const [listitem,setListItem] = useState("")
  const [rowIndex, setRowIndex] = useState(0);

  useEffect(() => {
    getById();
  }, []);


  const getById = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/transfer-warehouse/cetak/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        setTw(data.data.response.tw.tw_code);
        setCode(data.data.response.tw.kode_cabang_penerima);
        setCabang(data.data.response.tw.nama_cabang_penerima);
        setWaktu(data.data.response.tw.created)
        setWarehouse(data.data.response.tw.warehouse);
        setKeterangan(data.data.response.tw.keterangan);
        setManajer(data.data.response.tw.manajer);
        setDirektur(data.data.response.tw.direktur);
        setListItem(data.data.response.list);
       
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
        <Row>
          <div className="col">
            <CardBody>
            <Card>
                <CardBody>
                    <CardHeader>
                        <Row md="12">
                            <Col md="8">
                                <img
                                    style={{ width: "20%" }}
                                    src={require("assets/img/theme/Hokky1.png").default}
                                />
                            </Col>
                            <Col md="4">
                                Head Office : {warehouse}<br></br>
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
                                <h3><b><center>TRANSFER ITEM ANTAR CABANG</center></b></h3>
                            </Col>
                        </Row>
                    </CardHeader>
                    <Table>
                        <tbody>
                            <tr>
                                <td>
                                    <Row md="24">
                                        <Col md="6">
                                        <div className="row align-items-center mb-3">
                                            <div className="col-4">Kode TW</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-5 ">
                                                <b>{tw}</b>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-4">Issuing Date</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>{waktu}</b>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-4">Keterangan</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>{keterangan}</b>
                                            </div>
                                        </div>
                                        </Col>
                                        <Col md="6">
                                        <div className="row align-items-center mb-3">
                                            <div className="col-4">Kode Cabang</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-5 ">
                                                <b>{code}</b>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-4">Nama Cabang</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-5 ">
                                                <b>{cabang}</b>
                                            </div>
                                        </div>
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <CardBody>
                       <ToolkitProvider
                  rowNumber={rowIndex}
                  data={listitem}
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
                        dataField: "qty",
                        text: "Qty",
                        sort: true,
                    },
                    {
                      dataField: "satuan",
                      text: "Satuan",
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
                    <CardHeader></CardHeader>
                        <center>Terms of Price, delivery & shipping required</center>
                        <CardFooter></CardFooter>
                    <Table>
                            <tbody>
                            <tr>
                                <td>
                                <Row md="12">
                                    <Col md="6">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Manajer</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-5 ">
                                            <b>{manajer}</b>
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
                                    <Col md="6">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Direktur</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-5 ">
                                            <b>{direktur}</b>
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
              </Card>
            </CardBody>
          </div>
        </Row>
    </>
  );
}