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
  Form,
} from "reactstrap";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

export default function CetakReceivingPo(props) {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [harga, setHarga] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");
  const [pengiriman, setPengiriman] = useState([]);
  const [qty, setQty] = useState(0);
  const [savedItems, setSavedItems] = useState([]);
  const [codeso, setCodeSo] = useState("");
  const [usernamea, setUsernamea] = useState("");
  const [logo,setLogo] = useState();
  const [warehousename,setWarehouseName] = useState();
  const [creator,setCreator] = useState();
  const [codereceiving,setCodeReceiving] = useState();
  const [codepo, setCodePO] = useState();
  const [supplier, setSupplier] = useState();
  const [ongkir, setOngkir] = useState();
  const [lainnya, setLainnya] = useState();
  const [keterangan, setKeterangan] = useState();
  const [validator,setValidator] = useState();
  const [created,setCreated] = useState();
  const [countdown,setCountdown] = useState();
  const [rowIndex, setRowIndex] = useState(0);
  const [listItem,setListItem] = useState([]);
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
        `${process.env.REACT_APP_API_BASE_URL}/receiving-po/cetak/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        setWarehouseName(data.data.response.receivingpo.warehouse);
        setLogo(data.data.response.receivingpo.logo);
        setCreator(data.data.response.receivingpo.creator);
        setCodeReceiving(data.data.response.receivingpo.receiving_code);
        setCodePO(data.data.response.receivingpo.code_po);
        setSupplier(data.data.response.receivingpo.supplier);
        setOngkir(data.data.response.receivingpo.ongkir);
        setLainnya(data.data.response.receivingpo.lainnya);
        setKeterangan(data.data.response.receivingpo.keterangan);
        setValidator(data.data.response.receivingpo.validator);
        setCreated(data.data.response.receivingpo.created);
        setCountdown(data.data.response.receivingpo.countdown);
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
                                Head Office : {warehousename}<br></br>
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
                                <h3><b><center>RECEIVING PO</center></b></h3>
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
                                            <div className="col-2">Kode PO</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-5 ">
                                                <b>{codepo}</b>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-2">Issuing Date</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>{created}</b>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-2">Kode Receiving</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>{codereceiving}</b>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-2">Keterangan</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>{keterangan}</b>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-2"></div>
                                            <div className="col-1 text-center"></div>
                                            <div className="col-4 ">
                                            </div>
                                        </div>
                                        {/* <div className="row align-items-center mb-3">
                                            <div className="col-2">Alamat Kirim</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>---------------------------</b>
                                            </div>
                                        </div> */}
                                        </Col>
                                        <Col md="6">
                                        <div className="row align-items-center mb-3">
                                            <div className="col-3">Supplier Name</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-5 ">
                                                <b>{supplier}</b>
                                            </div>
                                        </div>
                                        {/* <div className="row align-items-center mb-3">
                                            <div className="col-3">Address</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>{}</b>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-3">Telephone</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>{}</b>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-3">Email</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>{}</b>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-3">Name Sales</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>{}</b>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-3">Bank Account</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>{}</b>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-3">Npwp</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>{}</b>
                                            </div>
                                        </div> */}
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                            </tbody>
                    </Table>
                    <CardBody>
                    <ToolkitProvider
                        rowNumber={rowIndex}
                        data={listItem}
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
                      {/* <Table>
                        <tbody>
                            <tr>
                                <td>
                                    <Row md="16">
                                        <Col md="3">
                                        </Col>
                                        <Col md="3">
                                        </Col>
                                        <Col md="2">
                                        </Col>
                                        <Col md="3">
                                            <div className="row align-items-center mb-3">
                                                <div className="col-6">Sub Total </div>
                                                <div className="col-1 text-center">:</div>
                                                <div className="col-4 ">
                                                    <b>---------------------------</b>
                                                </div>
                                            </div>
                                            <div className="row align-items-center mb-3">
                                                <div className="col-6">PPN 11% </div>
                                                <div className="col-1 text-center">:</div>
                                                <div className="col-4 ">
                                                    <b>---------------------------</b>
                                                </div>
                                            </div>
                                            <div className="row align-items-center mb-3">
                                                <div className="col-6">Total Diskon</div>
                                                <div className="col-1 text-center">:</div>
                                                <div className="col-4 ">
                                                    <b>---------------------------</b>
                                                </div>
                                            </div>
                                            <div className="row align-items-center mb-3">
                                                <div className="col-6">Ongkir dan Lain</div>
                                                <div className="col-1 text-center">:</div>
                                                <div className="col-4 ">
                                                    <b>---------------------------</b>
                                                </div>
                                            </div>
                                            <div className="row align-items-center mb-3">
                                                <div className="col-6">Grand Total</div>
                                                <div className="col-1 text-center">:</div>
                                                <div className="col-4 ">
                                                    <b>Hahahahaha</b>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                        </tbody>
                      </Table> */}
                    </CardBody>
                    <CardHeader></CardHeader>
                        <center>Terms of Price, delivery & shipping required</center>
                        <CardFooter></CardFooter>
                    <Table>
                            <tbody>
                            <tr>
                                <td>
                                <Row md="12">
                                    <Col md="3">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Kepala Gudang</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-5 ">
                                            <b>{validator}</b>
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
                                    {/* <Col md="3">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Head Store</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-5 ">
                                            <b>Isbianto Asnanto</b>
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
                                    <Col md="3">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Head Store</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-5 ">
                                            <b>Isbianto Asnanto</b>
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
                                    <Col md="3">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Head Purchasing</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-5 ">
                                            <b>---------------------------</b>
                                        </div>
                                    </div>
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Kasir</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-4 ">
                                            <b>---------------------------</b>
                                        </div>
                                    </div>
                                    </Col> */}
                                </Row>
                                {/* <Col xs="25">
                                <hr />
                                </Col>
                                <Row md="12">
                                    <Col md="3">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Accounting</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-5 ">
                                            <b>---------------------------</b>
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
                                    <Col md="3">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Delivery Place</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-5 ">
                                            <b>-------------------------- CIF</b>
                                        </div>
                                    </div>
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Shipping & Packing</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-4 ">
                                            <b>-------------------------- Days</b>
                                        </div>
                                    </div>
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Validity of Offer</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-4 ">
                                            <b>-------------------------- Days</b>
                                        </div>
                                    </div>
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Availability</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-4 ">
                                            <b>-------------------------- Days</b>
                                        </div>
                                    </div>
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Quote Validity</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-4 ">
                                            <b>-------------------------- Days</b>
                                        </div>
                                    </div>
                                    </Col>
                                    <Col md="3">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Delivery Place</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-5 ">
                                            <b>-------------------------- CIF</b>
                                        </div>
                                    </div>
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Shipping & Packing</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-4 ">
                                            <b>-------------------------- Days</b>
                                        </div>
                                    </div>
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Validity of Offer</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-4 ">
                                            <b>-------------------------- Days</b>
                                        </div>
                                    </div>
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Availability</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-4 ">
                                            <b>-------------------------- Days</b>
                                        </div>
                                    </div>
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Quote Validity</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-4 ">
                                            <b>-------------------------- Days</b>
                                        </div>
                                    </div>
                                    </Col>
                                    <Col md="3">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Pembeli</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-5 ">
                                            <b>---------------------------</b>
                                        </div>
                                    </div>
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Date</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-5 ">
                                            <b>---------------------------</b>
                                        </div>
                                    </div>
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Signature</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-4 ">
                                            <b>{username}</b>
                                        </div>
                                    </div>
                                    </Col>
                                </Row> */}
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