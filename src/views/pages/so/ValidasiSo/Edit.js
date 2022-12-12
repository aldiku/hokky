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
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function EditValidasiSo(props)  {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [harga, setHarga] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");
  const [typereq, setTypeReq] = useState([]);
  const [pengiriman, setPengiriman] = useState([]);
  const [payment_method,setPaymentMethod] = useState([]);
  const [keterangan, setKeterangan] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [allJangkaWaktu, setAllJangkaWaktu] = useState([]);
  const [jangkaWaktu,setJangkaWaktu] = useState(0);
  const [qty, setQty] = useState(0);
  const [active, setActive] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [savedItems, setSavedItems] = useState([]);
  const [coderfq, setCodeRfq] = useState("");
  const [input, setInput] = useState("");
  const [statusph,setStatusPh] = useState("");
  const [status, setStatus] = useState("")
  const [pay1,setPay1] =useState([]);
  const [payment_method1,setPaymentMethod1] = useState([]);
  const [keteranganbayar,setKeteranganBayar] = useState("");
  const [manualaddress, setManualAddress] = useState("");
  const [ppn, setPPN] = useState(0);
  const [totaldiskon, setTotalDiskon] = useState(0);
  const [grandtotal, setGrandTotal] = useState(0);
  const [diskonglobalnominal, setDiskonGlobalNominal] = useState();
  const [diskonglobalpersen,setDiskonGlobalPersen] = useState();
  const [ongkir, setOngkir] = useState(0);
  const [allpajak, setAllPajak] = useState([]);
  const [pajak, setPajak] = useState("");
  const [lainnya, setLainnya] = useState(0);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [alamat, setAlamat] = useState("");
  const [ongkir1, setOngkir1] = useState(0);
  const [totaldiskon1, setTotalDiskon1] = useState(0);
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
        `${process.env.REACT_APP_API_BASE_URL}/sales-order/get/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        getCustomer(data.data.response.customer_id);
        getPajak(data.data.response.pajak_id);
        getItemDataSaved();
        setPaymentMethod(data.data.response.payment_method);
        setStatus(data.data.response.status);
        getJangkaWaktu(data.data.response.jangka_waktu);
        setStatusPh(data.data.response.status_ph);
        setKeterangan(data.data.response.keterangan);
        setCodeRfq(data.data.response.code_rfq);
        setPengiriman(data.data.response.pengiriman);
        setTypeReq(data.data.response.type);
        setTotalPrice(data.data.response.price_total);
        setTotalQty(data.data.response.price_real);
        setDiskonTotal(data.data.response.diskon_total);
        setOngkir(data.data.response.ongkir);
        setLainnya(data.data.response.lainnya);
        setPay1(data.data.response.pay_1);
        setPaymentMethod1(data.data.response.payment_method1);
        setKeteranganBayar(data.data.response.keterangan1);
        setAlamat(data.data.response.manual_address);
        setDiskonGlobalNominal(data.data.response.diskon_global_nominal);
        setDiskonGlobalPersen(data.data.response.diskon_global_persen);
       
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
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/sales-order/item`, {

        so_id: props.match.params.id

    }).then(async response => {
        let stateItem = [];

        await Promise.all(response.data.response.map(async (data) => {
            stateItem = [...stateItem, {
                item_id: data.item_id,
                item_name:data.item_name,
                item_code : data.item_code,
                satuan : data.satuan,
                qty: data.qty,
                harga: data.harga,
                diskon_nominal: data.diskon_nominal,
                diskon_persen: data.diskon_persen,
                data: {
                    item_name: data.item_name,
                    harga: data.harga
                },
            }];
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

  function EditData() {
    setLoading(true);
    let dataItems = [];
        savedItems.map((dataItem) => dataItems = [...dataItems, 
            { 
                item_id: dataItem.item_id, 
                qty: dataItem.qty, 
                harga:dataItem.harga,
                diskon_nominal: dataItem.diskon_nominal,
                diskon_persen:dataItem.diskon_persen,
            }]);
    let data = {
        warehouse_id : parseInt(warehouse),
        code_rfq: coderfq,
        customer_id: parseInt(customer),
        type : parseInt(typereq),
        pengiriman: parseInt(pengiriman),
        status_ph : parseInt(statusph),
        status : parseInt(status),
        purchasing_head : username,
        payment_method: parseInt(payment_method),
        jangka_waktu:parseInt(jangkaWaktu),
        pay_1:parseFloat(pay1),
        payment_method1: parseFloat(payment_method1),
        keterangan1 : keteranganbayar,
        ongkir: parseFloat(ongkir),
        lainnya:parseFloat(lainnya),
        manual_address: alamat,
        pajak_id: parseInt(pajak),
        keterangan: keterangan ,
        diskon_global_nominal: parseFloat(diskonglobalnominal),
        diskon_global_persen : parseFloat(diskonglobalpersen),
        items : dataItems
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/sales-order/update/${props.match.params.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/sales-order");
        })
        .then((json) => {
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
  }


const formatRupiah = (money) => {
  return new Intl.NumberFormat('id-ID',
      { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
  ).format(money);
}
  
  const handleSubmit = (e) => {
    {
      EditData();
    }
  };

  return (
    <>
    <SimpleHeader name="Validasi Admin SO" parentName="SO" />
    <Container className="mt--6" fluid>
        <Row>
        <div className="col">
            <CardBody>
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                      <h3>Validasi Admin SO</h3>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                            <Col md="6">
                            <Input
                            className="form-control-alternative"
                                    type="hidden"
                                    name="desc"
                                    placeholder="Masukan Keterangan"
                                    value={coderfq}
                                    onChange={(e) => {
                                      setCodeRfq(e.target.value);
                                    }}
                                  />
                            </Col>
                        </Row>
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
                                value={payment_method}
                                onChange={(e) => {
                                    setPaymentMethod(e.target.value);
                                }}
                              >
                                <option value={""} disabled selected hidden>Pilih Metode Pembayaran</option>
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
                            <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Validasi
                            </Label>
                              <Col sm={7}>
                                <div style={{ display: "flex" }}>
                                  <div className="custom-control custom-radio mb-3">
                                    <Input
                                      className="custom-control-input"
                                      id="customRadio10"
                                      name="custom-radio-4"
                                      type="radio"
                                      value={5}
                                      checked={statusph === 5}
                                      onChange={() => setStatusPh(5)}
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
                                      className="custom-control-input"
                                      id="customRadio11"
                                      name="custom-radio-4"
                                      type="radio"
                                      value={4}
                                      checked={statusph === 4}
                                      onChange={() => setStatusPh(4)}
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
                                      <td><>{formatRupiah(savedItem.harga)}</> </td>
                                      <td><>{savedItem.qty}</></td>
                                      <td>{savedItem.satuan}</td>
                                      <td><>{savedItem.diskon_persen}</> </td>
                                      <td><>{formatRupiah(savedItem.diskon_nominal)}</> </td>
                                      <td>
                                        {formatRupiah((savedItem.harga - savedItem.diskon_nominal) * savedItem.qty)}
                                      </td>
                                    </tr>
                                  )
                                })
                              }
                              </tbody>
                          </Table>
                        </CardBody>
                        <CardFooter>
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
                      <Button color="danger" onClick={toggle}>
                          Simpan
                      </Button>
                      <Link className="btn btn-info" to="/admin/sales-order">
                        Kembali
                      </Link>
                </CardFooter>
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle} align="center"></ModalHeader>
                  <ModalBody align="center">
                  <font size="5"><b>Apakah Anda Sudah Yakin ?</b></font><br></br><br></br><br></br>
                  {!isLoading && (
                    <Button color="primary" onClick={() => handleSubmit()}>
                    Lanjutkan
                    </Button>
                  )}
                  {isLoading && (
                    <Button color="primary" disabled>
                    <i className="fas fa-spinner fa-spin"></i>
                    {""}
                    loading...
                    </Button>
                  )}
                  <Button color="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                  </ModalBody>
                </Modal>
              </Card>
            </CardBody>
          </div>
        </Row>
    </Container>
    </>
  );
}