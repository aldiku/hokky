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
  Modal, ModalHeader, ModalBody
  
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function DetailPermintaanBarang(props) {
    const token = localStorage.token;
    const warehouse = localStorage.warehouse;
    const username = localStorage.username;
    let history = useHistory();
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState("");
    const [qty,setQty] = useState([]);
    const [harga,setHarga] = useState([]);
    const [typereq,setTypeReq] = useState([]);
    const [pengiriman, setPengiriman] = useState([]);
    const [keterangan,setKeterangan] = useState("");
    const [totalPrice,setTotalPrice] = useState(0);
    const [allpajak, setAllPajak] = useState([]);
    const [ppn, setPPN] = useState(0);
    const [totaldiskon, setTotalDiskon] = useState(0);
    const [grandtotal, setGrandTotal] = useState(0);
    const [savedItems, setSavedItems] = useState([]);
    const [alamat, setAlamat] = useState("");
    const [diskonglobalnominal, setDiskonGlobalNominal] = useState(0);
    const [diskonglobalpersen,setDiskonGlobalPersen] = useState(0);
    const [ongkir, setOngkir] = useState(0);
    const [pajak, setPajak] = useState("");
    const [payment, setPayment] = useState("");
    const [allJangkaWaktu, setAllJangkaWaktu] = useState([]);
    const [jangkaWaktu,setJangkaWaktu] = useState(0);
    const [lainnya, setLainnya] = useState(0);
    const [ongkir1, setOngkir1] = useState(0);
    const [ppnnew, setPPNNEW] = useState(0);
    const [diskonglobal, setDiskonGLobal] = useState(0);
    const [totalPrice1, setTotalPrice1] = useState(0);
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [diskonglobalnominal1,setDiskonGlobalNominal1] = useState(0)
	const [totaldiskon2, setTotalDiskon2] = useState(0);
	const [totaldiskon3, setTotalDiskon3] = useState(0);
	const [qtyTotal, setTotalQty] = useState(0);
	const [diskontotal, setDiskonTotal] = useState(0);

  useEffect(() => {
		setDiskonGlobalNominal1(diskonglobalnominal);
	}, [diskonglobalnominal]);

    // diskon bayangan
    useEffect(() => {
		setTotalDiskon(diskonglobalnominal1);
	}, [diskonglobalnominal1]);

	useEffect(() => {
		setTotalDiskon3(diskontotal-a);
	}, [diskontotal, a]);

    //diskon tampil
    useEffect(() => {
		setTotalDiskon2(totaldiskon + totaldiskon3 - a);
	}, [totaldiskon3, totaldiskon, a]);

	//ongkir tampil
	useEffect(() => {
		setOngkir1(ongkir - b);
	}, [ongkir, b]);


    useEffect(() => {
		setTotalPrice1(qtyTotal);
	}, [qtyTotal]);


    // diskonglobalnominal dan persen
    useEffect(() => {
		// diskonglobalnominal && diskonglobal === "diskonglobalnominal" && setDiskonGlobalPersen((qtyTotal - diskontotal) * diskonglobalpersen);
		diskonglobalpersen && diskonglobal === "diskonglobalpersen"  && setDiskonGlobalNominal((qtyTotal - diskontotal) * (diskonglobalpersen/100));
	}, [diskonglobalnominal, qtyTotal, diskonglobalpersen]);

    // hasil nominal dari PPN
    useEffect(() => {
        setPPNNEW( (qtyTotal - diskontotal) * (ppn / 100));
   }, [qtyTotal,diskontotal,ppn]);

    // hasil grandtotal
	useEffect(() => {
		setGrandTotal(( qtyTotal - totaldiskon2) + ppnnew + ongkir1- a );
	}, [qtyTotal, totaldiskon2,ppnnew, ongkir1, a]);
 
  useEffect(() => {
    getById();
}, [pajak]);

const getById = () => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  axios
    .get(
      `${process.env.REACT_APP_API_BASE_URL}/pajak/${pajak}`,
      { headers }
    )
    .then((data) => {;
      setPPN(data.data.response.persentase);
    })
    .catch(function (error) {
      console.log(error);
    });
};


    useEffect(() => {
      getByIdss();
      getPajak();
    }, []);
  
    const getByIdss = () => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/rfq-so/get/${props.match.params.id}`,
          { headers }
        )
        .then((data) => {
          getCustomer(data.data.response.customer_id);
          getPajak(data.data.response.pajak_id);
          getItemDataSaved();
          setRfqCode(data.data.response.rfq_code);
          setQty(data.data.response.qty_total);
          setHarga(data.data.response.harga);
          setTypeReq(data.data.response.type);
          setPengiriman(data.data.response.pengiriman);
          setKeterangan(data.data.response.keterangan);
          setTotalPrice(data.data.response.price_total);
          setTotalQty(data.data.response.price_real);
          setDiskonTotal(data.data.response.diskon_total);
          getJangkaWaktu(data.data.response.jangka_waktu);
          setOngkir(data.data.response.ongkir);
          setLainnya(data.data.response.lainnya);
          setPayment(data.data.response.payment_method);
          setDiskonGlobalNominal(data.data.response.diskon_global_nominal);
          setDiskonGlobalPersen(data.data.response.diskon_global_persen);
          setAlamat(data.data.response.manual_address);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const getJangkaWaktu = (id) => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/jwkredit/list`, { headers })
        .then((data) => {
          setAllJangkaWaktu(data.data.response);
          setJangkaWaktu(id);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const getPajak = (id) => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      };
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/pajak/list`, { headers })
        .then((data) => {
          setAllPajak(data.data.response);
          setPajak(id);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    const getItemDataSaved = () => {
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/rfq-so/item`, {

            rfq_id: props.match.params.id

        }).then(async response => {
            let stateItem = [];
            let stateEditing = [];

            await Promise.all(response.data.response.map(async (data) => {
                stateItem = [...stateItem, {
                    item_id: data.item_id,
                    item_name:data.item_name,
                    item_code : data.item_code,
                    satuan: data.satuan,
                    qty: data.qty,
                    harga : data.harga,
                    diskon_nominal : data.diskon_nominal,
                    diskon_persen : data.diskon_persen,
                    data: {
                        item_name: data.item_name,
                        harga: data.harga,
                        qty: data.qty,
                        diskon_nominal : data.diskon_nominal,
                        diskon_persen : data.diskon_persen,
                    },
                }];
                  stateEditing = [...stateEditing, {
                  editing: false
                }];
                // setTotalQty(data.harga * data.qty);
                // setDiskonTotal(data.qty * data.diskon_nominal);
            }));
            setSavedItems(stateItem);
        })
    }

    const getCustomer = (id) => {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        axios
          .get(
            `${process.env.REACT_APP_API_BASE_URL}/customer/list`,
            { headers }
          )
          .then((data) => {
            setCustomers(data.data.response);
            setCustomer(id);
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
        
  return (
    <>
    <SimpleHeader name="Detail Penawaran SO" parentName="SO" />
    <Container className="mt--6" fluid>
        <Row>
        <div className="col">
            <CardBody>
              <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                      <h3>Detail Penawaran SO</h3>
                  </CardHeader>
                    <CardBody>
                      <Row md="12">
                          <Col md="6">
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={3}
                              >
                                Customer
                              </Label>
                              <Col sm={6}>
                              <Input
                              disabled
                              className="form-control-alternative"
                                  name="person"
                                  type="select"
                                  value={customer}
                                  onChange={(e) => {
                                    setCustomer(e.target.value);
                                  }}
                                >
                                  <option value=''>Pilih Customer</option>
                                  {customers.map((customer, key) => {
                                      return (
                                        <option key={key} value={customer.id}>
                                          {customer.name}
                                        </option>
                                      );
                                    })}
                                  </Input>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={3}
                              >
                                Alamat
                              </Label>
                              <Col sm={6}>
                                <Input
                                disabled
                                className="form-control-alternative"
                                  type="textarea"
                                  name="keterangan"
                                  rows = "4"
                                  placeholder="Masukan Alamat"
                                  value={alamat}
                                  onChange={(e) => {
                                    setAlamat(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                           
                            <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={3}
                            >
                              Pengiriman
                            </Label>
                            <Col sm={6}>
                            <Input
                            disabled
                            className="form-control-alternative"
                                name="Tipe Request"
                                type="select"
                                value={pengiriman}
                                onChange={(e) => {
                                  setPengiriman(e.target.value);
                                }}
                              >
                                <option value="">Pilih Pengiriman</option>
                                <option value={1}>Ambil Sendiri</option>
                                <option value={2}>Delivery</option>
                              </Input>
                            </Col>
                            </FormGroup>
                            
                            <FormGroup row>
                              <Label for="exampleEmail" sm={3}>
                                Diskon
                              </Label>
                              <Col sm={3}>
                                <Input
                                disabled
                                  autoComplete="off"
                                  className="form-control-alternative"
                                  type="number"
                                  placeholder="Diskon (%)"
                                  value={diskonglobalpersen}
                                  onChange={(e) => {
                                    setDiskonGlobalPersen(e.target.value);
                                  }}
                                  onClick={() => setDiskonGLobal("diskonglobalpersen")}
                                />
                              </Col>
                              <Col sm={3}>
                                <Input
                                disabled
                                  autoComplete="off"
                                  className="form-control-alternative"
                                  type="number"
                                  placeholder="Diskon (N)"
                                  value={diskonglobalnominal}
                                  onChange={(e) => {
                                    setDiskonGlobalNominal(e.target.value);
                                  }}
                                  onClick={() => setDiskonGLobal("diskonglobalnominal")}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="exampleEmail" sm={3}>
                                PPN
                              </Label>
                              <Col sm={6}>
                                <Input
                                disabled
                                  className="form-control-alternative"
                                    type="select"
                                    value={pajak}
                                    onChange={(e) => {
                                      setPajak(e.target.value);
                                    }}>
                                    <option value=''>Pilih PPN</option>
                                      {allpajak.map((warehouse2, key) => {
                                        return (
                                            <option key={key} value={warehouse2.id}>
                                              {warehouse2.keterangan}
                                            </option>
                                        );
                                      })}
                                </Input>
                              </Col>
                            </FormGroup>
                            
                          </Col>
                          <Col md="6">
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Tipe SO
                            </Label>
                            <Col sm={7}>
                            <Input
                            disabled
                            className="form-control-alternative"
                                name="Tipe Request"
                                type="select"
                                value={typereq}
                                onChange={(e) => {
                                  setTypeReq(e.target.value);
                                }}
                              >
                                <option value="">Pilih Tipe SO</option>
                                <option value={1}>Ready</option>
                                <option value={2}>Indent</option>
                              </Input>
                            </Col>
                            </FormGroup>
                            <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Metode Pembayaran
                            </Label>
                            <Col sm={7}>
                            <Input
                            disabled
                            className="form-control-alternative"
                                name="Tipe Po"
                                type="select"
                                value={payment}
                                onChange={(e) => {
                                    setPayment(e.target.value);
                                }}
                              >
                                <option value={""}>Pilih Metode Pembayaran</option>
                                <option value={1}>Tunai</option>
                                <option value={2}>Tempo</option>
                                {/* <option value={3}>Termin Of Payment</option>
                                <option value={4}>Indent DP</option>
                                <option value={5}>Indent Lunas</option> */}
                              </Input>
                            </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Jangka Waktu
                              </Label>
                              <Col sm={4}>
                                <Input
                                disabled
                                className="form-control-alternative"
                                  type="select"
                                  name="desc"
                                  value={jangkaWaktu}
                                  onChange={(e) => {
                                    setJangkaWaktu(e.target.value);
                                  }}
                                >
                                <option value="">Pilih</option>
                                {allJangkaWaktu.map((waktu, key) => {
                                  return (
                                    <option key={key} value={waktu.durasi}>
                                      {waktu.durasi}
                                    </option>
                                  );
                                })}
                              </Input>
                              </Col> 
                              <Label for="exampleEmail" sm={4}>
                                <b>Hari</b>
                              </Label>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Ongkir
                              </Label>
                              <Col sm={7}>
                                <Input
                                disabled
                                className="form-control-alternative"
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Ongkir"
                                  value={ongkir}
                                  onChange={(e) => {
                                    setOngkir(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                            {/* <FormGroup row>
                              <Label
                              disabled
                                for="exampleEmail"
                                sm={4}
                              >
                                Lain-Lain
                              </Label>
                              <Col sm={7}>
                                <Input
                                disabled
                                className="form-control-alternative"
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Lainnya"
                                  value={lainnya}
                                  onChange={(e) => {
                                    setLainnya(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup> */}
                            
                          </Col>
                      </Row>
                    </CardBody>
              </Card>
              <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                      <h3>Item</h3>
                  </CardHeader>
                        <CardBody>
                          <Table size="sm" responsive>
                            <thead>
                              <tr>
                                <th><b>Nama Item</b></th>
                                <th><b>Kode Item</b></th>
                                <th><b>Harga</b></th>
                                <th><b>Qty</b></th>
                                <th><b>Satuan</b></th>
                                <th><b>Diskon %</b></th>
                                <th><b>Diskon (N)</b></th>
                                <th><b>Sub Total</b></th>
                              </tr>
                            </thead>
                              <tbody>
                              {
                                savedItems.map((savedItem, key) => {
                                  return (
                                    <tr key={key}>
                                      <td>{savedItem.item_name}</td>
                                      <td>{savedItem.item_code}</td>
                                      <td><>{formatRupiah(savedItem.harga)}</></td>
                                      <td>{savedItem.qty}</td>
                                      <td>{savedItem.satuan}</td>
                                      <td><>{savedItem.diskon_persen}</></td>
                                      <td><>{formatRupiah(savedItem.diskon_nominal)}</></td>
                                      <td>{formatRupiah((savedItem.harga - savedItem.diskon_nominal) * savedItem.qty)}</td>
                                    </tr>
                                  )
                                })
                              }
                              </tbody>
                          </Table>
                        </CardBody>
                        <CardFooter >
                          <Row md="12">
                            <Col md="6">
                            <FormGroup row>
                              <Col sm={7}>
                                <Input
                                disabled
                                  type="textarea"
                                  name="keterangan"
                                  rows="10"
                                  placeholder="Masukan Keterangan"
                                  value={keterangan}
                                  onChange={(e) => {
                                    setKeterangan(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            </Col>
                            <Col md="2">
                            </Col>
                            <Col md="4">
                              <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                                size="small"
                              >
                                <b>Total</b>
                              </Label>
                              <Col sm={6}>
                              <Input
                              className="form-control-alternative"
                                disabled
                                style={{fontWeight: 'bold'}}
                                type="text"
                                name="barcode"
                                placeholder="Harga Total"
                                // value={totalPrice1}
                                value={"Rp." + totalPrice1.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}
                                />
                              </Col>
                              </FormGroup>
                              <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                <b>Total Diskon</b>
                              </Label>
                              <Col sm={6}>
                              <Input
                                className="form-control-alternative"
                                style={{fontWeight: 'bold'}}
                                disabled
                                type="text"
                                name="barcode"
                                placeholder="Total Diskon"
                                value={"Rp." + totaldiskon2.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}
                                />
                              </Col>
                              </FormGroup>
                              <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                <b>PPN</b>
                              </Label>
                              <Col sm={6}>
                              <Input
                                className="form-control-alternative"
                                disabled
                                style={{fontWeight: 'bold'}}
                                type="text"
                                name="barcode"
                                placeholder="PPN"
                                value={"Rp." + ppnnew.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}
                                />
                              </Col>
                              </FormGroup>
                              <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                <b>Ongkir</b>
                              </Label>
                              <Col sm={6}>
                              <Input
                                className="form-control-alternative"
                                disabled
                                style={{fontWeight: 'bold'}}
                                type="text"
                                name="barcode"
                                placeholder="PPN"
                                value={"Rp." + ongkir1.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}
                                />
                              </Col>
                              </FormGroup>
                              <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                <b>Grand Total</b>
                              </Label>
                              <Col sm={6}>
                              <Input
                              className="form-control-alternative"
                                disabled
                                type="text"
                                name="barcode"
                                style={{fontWeight: 'bold'}}
                                placeholder="Grand Total"
                                value={"Rp." + grandtotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}
                                />
                              </Col>
                              </FormGroup>

                            </Col>
                          </Row>
                        </CardFooter>
                <CardFooter>
                      <Link className="btn btn-info" to="/admin/penawaran-barang">
                        Kembali
                      </Link>
                </CardFooter>
              </Card>
            </CardBody>
          </div>
        </Row>
    </Container>  
    </>
  );
}
