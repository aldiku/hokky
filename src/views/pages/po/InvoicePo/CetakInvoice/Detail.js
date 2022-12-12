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
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function ValidasiPimpinan(props)  {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [savedItems, setSavedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [pocode, setPoCode] = useState("");
  const [adminfinance, setAdminFinance] = useState("");
  const [statusaf,setStatusAF] = useState("");
  const [statusd,setStatusD] = useState("");
  const [ongkir, setOngkir] = useState(0);
  const [lainnya, setLainnya] = useState(0);
  const [allpajak,setAllPajak] = useState([]);
  const [pajak,setPajak] = useState("");
  const [ppn, setPPN] = useState(0);
  const [totaldiskon, setTotalDiskon] = useState(0);
  const [grandtotal, setGrandTotal] = useState(0);
  const [diskonglobalnominal, setDiskonGlobalNominal] = useState(0);
  const [diskonglobalpersen, setDiskonGlobalPersen] = useState(0);
  const [allJangkaWaktu, setAllJangkaWaktu] = useState([]);
  const [jangkaWaktu,setJangkaWaktu] = useState(0);
  const [pajakpersen, setPajakPersen] = useState(0);
  const [pajaknominal, setPajakNominal] = useState(0);
  const [codereceiving, setCodeReceiving] = useState("");
  const [payment_method1, setPaymentMethod1] = useState(0);
  const [payment_method,setPaymentMethod] = useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [ongkir1, setOngkir1] = useState(0);
  const [totaldiskon1, setTotalDiskon1] = useState(0);
	const [ppnnew, setPPNNEW] = useState(0);
	const [diskonglobal, setDiskonGLobal] = useState(0);
  const [totalPrice1, setTotalPrice1] = useState(0);
  const [diskonglobalnominal1, setDiskonGlobalNominal1] = useState(0)
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
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
		setTotalDiskon3(diskontotal - a);
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
    getByIds();
}, [pajak]);

const getByIds = () => {
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
    getById();
  }, []);

  const getById = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/invoice-po/get/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        getPerson(data.data.response.person_id);
        setCodeReceiving(data.data.response.receiving_code);
        getPajak(data.data.response.pajak_id);
        setPoCode(data.data.response.code_po);
        setOngkir(data.data.response.ongkir);
        setLainnya(data.data.response.lainnya);
        setKeterangan(data.data.response.keterangan);
        setTotalPrice(data.data.response.price_total);
        setTotalQty(data.data.response.price_real);
        setDiskonTotal(data.data.response.diskon_total);
        getJangkaWaktu(data.data.response.jangka_waktu);
        setPaymentMethod(data.data.response.payment_method);
        setStatusD(data.data.response.status_d);
        setStatusAF(data.data.response.status_af);
        setDiskonGlobalNominal(data.data.response.diskon_global_nominal);
        setDiskonGlobalPersen(data.data.response.diskon_global_persen);
        getItemDataSaved();
       
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
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/invoice-po/item`, {

        invoice_id: props.match.params.id

    }).then(async response => {
        let stateItem = [];

        await Promise.all(response.data.response.map(async (data) => {
            stateItem = [...stateItem, {
                item_id: data.item_id,
                item_name:data.item_name,
                qty: data.qty,
                harga: data.harga,
                pembayaran: data.pembayaran,
                diskon_nominal: data.diskon_nominal,
                diskon_persen:data.diskon_persen,
                data: {
                    item_name: data.item_name,
                    harga: data.harga,
                    pembayaran: data.pembayaran
                },
            }];
        }));

        setSavedItems(stateItem);
    })
}

  useEffect(() => {
    getPerson();

  }, []);

  const getPerson = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/person/list`,
        { headers }
      )
      .then((data) => {
        setPersons(data.data.response);
        setPerson(id)
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
    <SimpleHeader name="Detail Invoice" parentName="PO" />
    <Container className="mt--6" fluid>
        <Row>
        <div className="col">
          <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                      <h3>Detail Invoice</h3>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                          <Col md="6">
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Supplier
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                disabled
                                  name="person"
                                  type="select"
                                  value={person}
                                  onChange={(e) => {
                                    setPerson(e.target.value);
                                  }}
                                >
                                  <option value=''>Pilih Supplier</option>
                                  {persons.map((person, key) => {
                                      return (
                                        <option key={key} value={person.id}>
                                          {person.person_name}
                                        </option>
                                      );
                                    })}
                                </Input>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Keterangan
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                disabled
                                  type="textarea"
                                  name="desc"
                                  rows = "4"
                                  placeholder="Masukan Keterangan"
                                  value={keterangan}
                                  onChange={(e) => {
                                    setKeterangan(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                            
                            <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                Diskon
                              </Label>
                              <Col sm={3}>
                                <Input
                                disabled
                                autoComplete="off"
                                  className="form-control-alternative"
                                  type="text"
                                  placeholder="Diskon (%)"
                                  value={diskonglobalpersen}
                                  onChange={(e) => {
                                    setDiskonGlobalPersen(e.target.value);
                                  }}
                                  onClick={() => setDiskonGLobal("diskonglobalpersen")}
                                />
                              </Col>
                              <Col sm={4}>
                                <Input
                                disabled
                                  autoComplete="off"
                                  className="form-control-alternative"
                                  type="text"
                                  name="lebar"
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
														<Label for="exampleEmail" sm={4}>
															PPN
														</Label>
														<Col sm={7}>
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
                              Metode Pembayaran
                            </Label>
                            <Col sm={7}>
                            <Input
                            disabled
                            className="form-control-alternative"
                                name="Tipe Po"
                                type="select"
                                value={payment_method}
                                onChange={(e) => {
                                    setPaymentMethod(e.target.value);
                                }}
                              >
                                <option value={""}>Pilih Metode Pembayaran</option>
                                <option value={1}>Tunai</option>
                                <option value={2}>Tempo</option>
                                {/* <option value={3}>Dp Cicil</option>
                                <option value={4}>Dp Lunas</option> */}
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
                                className="form-control-alternative"
                                disabled
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
                                for="exampleEmail"
                                sm={4}
                              >
                                Lain-Lain
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                disabled
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
                            <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Validasi Admin PO
                            </Label>
                                <Col sm={7}>
                                    <div style={{ display: "flex" }}>
                                    <div className="custom-control custom-radio mb-3">
                                        <Input
                                        disabled
                                        className="custom-control-input"
                                        id="customRadio10"
                                        name="custom-radio-4"
                                        type="radio"
                                        value={5}
                                        checked={statusaf === 5}
                                        onChange={() => setStatusAF(5)}
                                        />
                                        <Label
                                        className="custom-control-label"
                                        htmlFor="customRadio10"
                                        >
                                        Disetujui
                                        </Label>
                                    </div>
                                    <div
                                        className="custom-control custom-radio mb-3"
                                        style={{ marginLeft: "20px" }}
                                    >
                                        <Input
                                        disabled
                                        className="custom-control-input"
                                        id="customRadio11"
                                        name="custom-radio-4"
                                        type="radio"
                                        value={4}
                                        checked={statusaf === 4}
                                        onChange={() => setStatusAF(4)}
                                        />
                                        <Label
                                        className="custom-control-label"
                                        htmlFor="customRadio11"
                                        >
                                        Ditolak
                                        </Label>
                                    </div>
                                    </div>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Validasi Direktur
                            </Label>
                              <Col sm={7}>
                                <div style={{ display: "flex" }}>
                                  <div className="custom-control custom-radio mb-3">
                                    <Input
                                    disabled
                                      className="custom-control-input"
                                      id="customRadio12"
                                      name="custom-radio-5"
                                      type="radio"
                                      value={5}
                                      checked={statusd === 5}
                                      onChange={() => setStatusD(5)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio12"
                                    >
                                      Disetujui
                                    </Label>
                                  </div>
                                  <div
                                    className="custom-control custom-radio mb-3"
                                    style={{ marginLeft: "20px" }}
                                  >
                                    <Input
                                    disabled
                                      className="custom-control-input"
                                      id="customRadio13"
                                      name="custom-radio-5"
                                      type="radio"
                                      value={4}
                                      checked={statusd === 4}
                                      onChange={() => setStatusD(4)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio13"
                                    >
                                      Ditolak
                                    </Label>
                                  </div>
                                </div>
                              </Col>
                            </FormGroup>
                          </Col>
                      </Row>
                    </CardBody>
              </Card>
              {/* <Card className="bg-secondary shadow">
                <Form onSubmit={handleSubmit}>
                    <CardHeader className="bg-white border-0">
                      <h3>Pembayaran</h3>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                          <Col md="6">
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Bayar
                              </Label>
                              <Col sm={7}>
                                <Input
                                autoComplete="off"
                                className="form-control-alternative"
                                  name="person"
                                  type="number"
                                  placeholder="Masukan Pembayaran Total"
                                  value={pay1}
                                  onChange={(e) => {
                                    setPay1(e.target.value);
                                  }}
                                />
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
                                className="form-control-alternative"
                                  name="Tipe Po"
                                  type="select"
                                  value={payment_method1}
                                  onChange={(e) => {
                                      setPaymentMethod1(e.target.value);
                                  }}
                                >
                                  <option value={""}>Pilih Metode Pembayaran</option>
                                  <option value={1}>Tunai</option>
                                  <option value={2}>Transfer</option>
                                  <option value={3}>Termin Of Payment</option>
                                  <option value={4}>Indent DP</option>
                                  <option value={5}>Indent Lunas</option>
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
                                Keterangan
                              </Label>
                              <Col sm={7}>
                                <Input
                                autoComplete="off"
                                className="form-control-alternative"
                                  type="textarea"
                                  rows ="5"
                                  name="desc"
                                  placeholder="Masukan Keterangan Pembayaran"
                                  value={keteranganbayar}
                                  onChange={(e) => {
                                    setKeteranganBayar(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                          </Col>
                      </Row>
                    </CardBody>
                </Form>
              </Card> */}
              <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                      <h3>Item</h3>
                    </CardHeader>
                    <CardBody>
                          <Table size="sm" responsive>
                            <thead>
                              <tr>
                                <th><b>Nama Item</b></th>
                                <th><b>Harga</b></th>
                                <th><b>Qty</b></th>
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
                                      <td><>{formatRupiah(savedItem.harga)}</> </td>
                                      <td><>{savedItem.qty}</></td>
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
                      <Link className="btn btn-info" to="/admin/invoice-po">
                        Kembali
                      </Link>
                </CardFooter>
              </Card>
          </div>
        </Row>
    </Container>  
    </>
  );
}


