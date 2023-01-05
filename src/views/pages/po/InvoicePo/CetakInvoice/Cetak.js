/*eslint-disable*/
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
  Container,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

export default function CetakInvoicePO(props) {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [harga, setHarga] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");
  const [pengiriman, setPengiriman] = useState([]);
  const [keterangan, setKeterangan] = useState("");
  const [qty, setQty] = useState(0);
  const [rowIndex, setRowIndex] = useState(0);
  const [codeinvoice, setCodeInvoice] = useState("");
  const [supplier, setSupplier] = useState("");
  const [validator, setValidator] = useState("");
  const [validator1, setValidator1] = useState("");
  const [waktu, setWaktu] = useState("");
  const [listItem, setListItem] = useState([]);
  const [cabang, setCabang] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentmethod, setPaymentMethod] = useState("");

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
        `${process.env.REACT_APP_API_BASE_URL}/invoice-po/cetak/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        setCodeInvoice(data.data.response.invoicepo.invoice_code);
        setSupplier(data.data.response.invoicepo.supplier);
        setListItem(data.data.response.list);
        setCabang(data.data.response.invoicepo.warehouse);
        setPaymentMethod(data.data.response.invoicepo.payment_method);
        // setJangkaWaktu(data.data.response.invoicepo.jangka_waktu);
        setWaktu(data.data.response.invoicepo.created);
        // setWarehouseRfq(data.data.response.invoicepo.warehouse);
        setTotalPrice(data.data.response.invoicepo.price_total);
        setKeterangan(data.data.response.invoicepo.keterangan);
        // setOngkir(data.data.response.invoicepo.ongkir);
        // setLainnya(data.data.response.invoicepo.lainnya);
        setValidator(data.data.response.invoicepo.validator1);
        setValidator1(data.data.response.invoicepo.validator2);
        setListItem(data.data.response.list);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const formatRupiah = (money) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(money);
  };

  return (
    <>
      <Row>
        <div className="col">
          <CardBody>
            <Row md="12">
              <Col md="3"></Col>
              <Col md="6">
                <Card>
                  <CardBody>
                    <CardHeader>
                      <Row md="20">
                        <Col md="8">
                          <img
                            style={{ width: "35%" }}
                            src={require("assets/img/theme/Hokky1.png").default}
                          />
                        </Col>
                        <Col md="4">
                          <text style={{ fontSize: "12px" }}>
                            Head Office : {cabang}
                            <br></br>
                            Jl Menganti Karangan No.562 <br></br>
                            Surabaya - Jawa Timur<br></br>
                            Phone : 081 217 85 3300<br></br>
                            Email : hokkybangunan.sby@gmail.com
                          </text>
                        </Col>
                      </Row>
                    </CardHeader>
                    <Col md="12">
                      <h3>
                        <b>
                          <center>INVOICE PO</center>
                        </b>
                      </h3>
                    </Col>
                    <Table size="sm" responsive>
                      <tbody>
                        <tr>
                          <td>
                            <Row md="24">
                              <Col md="6">
                                <div className="row align-items-center mb-1">
                                  <div className="col-4">
                                    {" "}
                                    <text style={{ fontSize: "12px" }}>
                                      No Invoice
                                    </text>
                                  </div>
                                  <div className="col-1 text-center">:</div>
                                  <div className="col-5 ">
                                    <b>
                                      <text style={{ fontSize: "12px" }}>
                                        {codeinvoice}
                                      </text>
                                    </b>
                                  </div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-4">Tanggal</div>
                                  <div className="col-1 text-center">:</div>
                                  <div className="col-4 ">
                                    <b>{waktu}</b>
                                  </div>
                                </div>
                                {/* <div className="row align-items-center mb-3">
                                                        <div className="col-4">Issuing Kode RFQ</div>
                                                        <div className="col-1 text-center">:</div>
                                                        <div className="col-4 ">
                                                            <b>---------------------------</b>
                                                        </div>
                                                    </div> */}
                                <div className="row align-items-center mb-1">
                                  <div className="col-4">Alamat Kirim</div>
                                  <div className="col-1 text-center">:</div>
                                  <div className="col-4 ">
                                    <b>---------------------------</b>
                                  </div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-4">Keterangan</div>
                                  <div className="col-1 text-center">:</div>
                                  <div className="col-4 ">
                                    <b>{keterangan}</b>
                                  </div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-4"></div>
                                  <div className="col-1 text-center"></div>
                                  <div className="col-4 "></div>
                                </div>
                              </Col>
                              <Col md="6">
                                <div className="row align-items-center mb-1">
                                  <div className="col-4">Supplier</div>
                                  <div className="col-1 text-center">:</div>
                                  <div className="col-5 ">
                                    <b>{supplier}</b>
                                  </div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-4">Alamat</div>
                                  <div className="col-1 text-center">:</div>
                                  <div className="col-4 ">
                                    <b>---------------------------</b>
                                  </div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-4">Telephone</div>
                                  <div className="col-1 text-center">:</div>
                                  <div className="col-4 ">
                                    <b>---------------------------</b>
                                  </div>
                                </div>
                                <div className="row align-items-center mb-1">
                                  <div className="col-4">Npwp</div>
                                  <div className="col-1 text-center">:</div>
                                  <div className="col-4 ">
                                    <b>---------------------------</b>
                                  </div>
                                </div>
                                {/* <div className="row align-items-center mb-1">
                                                        <div className="col-4">Name Sales</div>
                                                        <div className="col-1 text-center">:</div>
                                                        <div className="col-4 ">
                                                            <b></b>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center mb-1">
                                                        <div className="col-4">Bank Account</div>
                                                        <div className="col-1 text-center">:</div>
                                                        <div className="col-4 ">
                                                            <b>---------------------------</b>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center mb-1">
                                                        <div className="col-4">Npwp</div>
                                                        <div className="col-1 text-center">:</div>
                                                        <div className="col-4 ">
                                                            <b>---------------------------</b>
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
                        size="sm"
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
                            dataField: "item_code",
                            text: "kode Item",
                            sort: true,
                          },
                          {
                            dataField: "harga",
                            text: "Harga",
                            sort: true,
                            formatter: (cell, row) => {
                              return formatRupiah(row.harga);
                            },
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

                          {
                            dataField: "diskon_persen",
                            text: "Diskon (%)",
                            sort: true,
                          },
                          {
                            dataField: "diskon_nominal",
                            text: "Diskon (N)",
                            sort: true,
                          },
                          {
                            dataField: "sub_total",
                            text: "Sub Total",
                            sort: true,
                            formatter: (cell, row) => {
                              return formatRupiah(row.sub_total);
                            },
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
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>Jumlah Rp</td>
                                                    <td>Rp. 4.900.000</td>
                                                </tr>
                                    </tbody>
                                    <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>Discount</td>
                                                    <td></td>
                                                </tr>
                                    </tbody>
                                    <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>DPP</td>
                                                    <td></td>
                                                </tr>
                                    </tbody>
                                    <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>PPN</td>
                                                    <td></td>
                                                </tr>
                                    </tbody>
                                    <tbody>
                                                <tr>
                                                    <td>Terbilang</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>Empat Juta Sembilan Ratur</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>Rp. 4.900.000</td>
                                                </tr>
                                    </tbody>
                                </Table> */}
                    </CardBody>
                    <CardHeader></CardHeader>
                    <center>
                      Terms of Price, delivery & shipping required
                    </center>
                    <CardFooter></CardFooter>
                    <Table>
                      <tbody>
                        <tr>
                          <td>
                            <Row md="12">
                              <Col md="3">
                                <div className="row align-items-center mb-3">
                                  <div className="col-4">Finance</div>
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
                              <Col md="3">
                                <div className="row align-items-center mb-3">
                                  <div className="col-4">Direktur</div>
                                  <div className="col-1 text-center">:</div>
                                  <div className="col-5 ">
                                    <b>{validator1}</b>
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
              </Col>
              <Col md="3"></Col>
            </Row>
          </CardBody>
        </div>
      </Row>
    </>
  );
}
