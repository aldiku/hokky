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
} from "reactstrap";
import axios from "axios";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

export default function CetakPO(props) {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  const [savedItems, setSavedItems] = useState([]);
  const [usernamea, setUsernamea] = useState("");
  const [codepo, setCodePo] = useState("");
  const [payment_method,setPaymentMethod] = useState([]);
  const [keterangan, setKeterangan] = useState("");
  const [supplier, setSupplier] = useState("");
  const [jangkaWaktu,setJangkaWaktu] = useState([]);
  const [warehouserfq, setWarehouseRfq] = useState("");
  const [coderfq, setCodeRfq] = useState([]);
  const [ongkir, setOngkir] = useState(0);
  const [lainnya, setLainnya] = useState(0);
  const [listItem,setListItem] = useState([]);
  const [waktu,setWaktu] = useState([]);
  const [hargatotal, setHargaTotal] = useState([]);
  const [rowIndex, setRowIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [validator, setValidator] = useState("");
  const [validator1, setValidator1] = useState("");
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [npwp, setNpwp] = useState("")
  const [,] = useState("")
  const [,] = useState("")
  const [,] = useState("")
  const [,] = useState("")
  const [,] = useState("")
  const [,] = useState("")



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
        `${process.env.REACT_APP_API_BASE_URL}/purchase-order/cetak/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {  
        setCodeRfq(data.data.response.po.code_rfq);
        setAddress(data.data.response.po.address)
        setNpwp(data.data.response.po.npwp)
        setPhone(data.data.response.po.phone)
        setSupplier(data.data.response.po.supplier);
        setPaymentMethod(data.data.response.po.payment_method);
        setJangkaWaktu(data.data.response.po.jangka_waktu);
        setWaktu(data.data.response.po.created)
        setWarehouseRfq(data.data.response.po.warehouse);
        setHargaTotal(data.data.response.po.price_total);
        setKeterangan(data.data.response.po.keterangan);
        setOngkir(data.data.response.po.ongkir);
        setCodePo(data.data.response.po.po_code);
        setLainnya(data.data.response.po.lainnya);
        setValidator(data.data.response.po.validator1);
        setValidator1(data.data.response.po.validator2);
        setListItem(data.data.response.list);
       
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getItemDataSaved = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/purchase-order/item`, {

        po_id: props.match.params.id

    }).then(async response => {
        let stateItem = [];

        await Promise.all(response.data.response.map(async (data) => {
            stateItem = [...stateItem, {
                item_id: data.item_id,
                item_name:data.item_name,
                qty: data.qty,
                harga: data.harga,
                diskon_persen: data.diskon_persen,
                diskon_nominal: data.diskon_nominal,
                data: {
                    item_name: data.item_name,
                    harga: data.harga
                },
            }];
        }));

        setSavedItems(stateItem);
    })
}



const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID',
        { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
    ).format(money);
  }
    
   
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
                                Head Office : {warehouserfq}<br></br>
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
                                <h3><b><center>PURCHASE ORDER</center></b></h3>
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
                                            <div className="col-4">Kode PO</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-5 ">
                                                <b>{codepo}</b>
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
                                            <div className="col-4">Issuing Kode RFQ</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>{coderfq}</b>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-4">Keterangan</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>{keterangan}</b>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-4"></div>
                                            <div className="col-1 text-center"></div>
                                            <div className="col-4 ">
                                            </div>
                                        </div>
                                        {/* <div className="row align-items-center mb-3">
                                            <div className="col-4">Alamat Kirim</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>---------------------------</b>
                                            </div>
                                        </div> */}
                                        </Col>
                                        <Col md="6">
                                        <div className="row align-items-center mb-3">
                                            <div className="col-4">Supplier</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-5 ">
                                                <b>{supplier}</b>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-4">Address</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>{address}</b>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-4">Telephone</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>{phone}</b>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-4">Bank Account</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>---------------------------</b>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-4">Npwp</div>
                                            <div className="col-1 text-center">:</div>
                                            <div className="col-4 ">
                                                <b>{npwp}</b>
                                            </div>
                                        </div>
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                            </tbody>
                    </Table>
                    <CardBody>
                      <br></br>
                      {/* <Table>
                        <thead>
                        <tr>
                            <th>
                            <b>Kode Item</b>
                            </th>
                            <th>
                            <b>Nama Item</b>
                            </th>
                            <th>
                            <b>Brand</b>
                            </th>
                            <th>
                            <b>Qty</b>
                            </th>
                            <th>
                            <b>Sat</b>
                            </th>
                            <th>
                            <b>Price List</b>
                            </th>
                            <th>
                            <b>Disc %</b>
                            </th>
                            <th>
                            <b>Disc %</b>
                            </th>
                            <th>
                            <b>Unit Price</b>
                            </th>
                            <th>
                            <b>Total Price</b>
                            </th>
                            <th>
                            <b>Delivery</b>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            savedItems.map((savedItem, key) => {
                                return (
                                    <tr key={key}><td>{savedItem.qty}</td>
                                        <td>{savedItem.data.item_name}</td>
                                        <td>{savedItem.qty_total}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                      </Table> */}
                      {/* <Table>
                      <thead>
                        <tr>
                            <th>
                            Nama Item
                            </th>
                            <th>
                            Harga Per Item
                            </th>
                            <th>
                            Quantity
                            </th>
                            <th>
                            Diskon %
                            </th>
                            <th>
                            Diskon (N)
                            </th>
                            <th>
                            Sub Harga
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            savedItems.map((savedItem, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{savedItem.data.item_name}</td>
                                        <td>{formatRupiah(savedItem.harga)}</td>
                                        <td>{savedItem.qty}</td>
                                        <td>{savedItem.diskon_persen}</td>
                                        <td>{formatRupiah(savedItem.diskon_nominal)}</td>
                                        <td>{formatRupiah(savedItem.harga * savedItem.qty)}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                      </Table> */}
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
                        dataField: "item_code",
                        text: "Kode Item",
                        sort: true,
                      },
                      {
                        dataField: "barcode",
                        text: "barcode",
                        sort: true,
                      },
                      {
                        dataField: "harga",
                        text: "Harga",
                        sort: true,
                        formatter: (cell, row) => {
                            return formatRupiah(row.harga)
                        }
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
                            return formatRupiah(row.sub_total)
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
                        // pagination={paginationFactory()}
                      />
                    </div>
                  )}
                </ToolkitProvider>
                    <Table>
                            <tbody>
                            <tr>
                                <Row md="16">
                                    <Col md="3">
                                    <div className="row align-items-center mb-3">
                                    </div>
                                    <div className="row align-items-center mb-3">
                                    </div>
                                    </Col>
                                    <Col md="3">
                                    <div className="row align-items-center mb-3">
                                    &nbsp;
                                    </div>
                                    <div className="row align-items-center mb-3">
                                    </div>
                                    </Col>
                                    <Col md="3">
                                    <div className="row align-items-center mb-3">
                                    </div>
                                    <div className="row align-items-center mb-3">
                                    </div>
                                    </Col>
                                    <Col md="3">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Harga Total</div>
                                        <div className="col-1 text-center">:</div>
                                        <div className="col-5 ">
                                            <b>{formatRupiah(hargatotal)}</b>
                                        </div>
                                    </div>
                                    </Col>
                                </Row>
                            </tr>
                            </tbody>
                    </Table>
              </CardBody>
                    </CardBody>
                    <CardHeader></CardHeader>
                        <center>Terms of Price, delivery & shipping required</center>
                        <CardFooter></CardFooter>
                    <Table>
                            <tbody>
                            <tr>
                                <td>
                                <Row md="12">
                                    <Col md="4">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Purchasing Head</div>
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
                                    {/* <Col md="4">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Head Store</div>
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
                                    </Col> */}
                                    <Col md="4">
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
                                </Row>
                                {/* <Col xs="25">
                                <hr />
                                </Col>
                                <Row md="12">
                                <Col md="4">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Merchandiser</div>
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
                                <Col md="4">
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
                                    <Col md="4">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-4">Supplier Name</div>
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