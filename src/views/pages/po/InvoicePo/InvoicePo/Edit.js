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
  Modal,
  ModalHeader,
  ModalBody
  
} from "reactstrap";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function EditInvoicePo(props)  {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [harga, setHarga] = useState([]);
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [pembayaran,setPembayaran] = useState([]);
  const [qty, setQty] = useState(0);
  const [active, setActive] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [pocode, setPoCode] = useState([]);
  const [input, setInput] = useState("");
  const [pay1,setPay1] =useState([]);
  const [payment_method,setPaymentMethod] = useState([]);
  const [keteranganbayar,setKeteranganBayar] = useState("");
  const [ongkir, setOngkir] = useState(0);
  const [lainnya, setLainnya] = useState(0);
  const [allpajak,setAllPajak] = useState([]);
  const [pajak,setPajak] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [ppn, setPPN] = useState(0);
  const [totaldiskon, setTotalDiskon] = useState(0);
  const [grandtotal, setGrandTotal] = useState(0);
  const [diskonglobalnominal, setDiskonGlobalNominal] = useState(0);
  const [diskonglobalpersen, setDiskonGlobalPersen] = useState(0);
  const [jangkaWaktu,setJangkaWaktu] = useState(0);
  const [pajakpersen, setPajakPersen] = useState(0);
  const [pajaknominal, setPajakNominal] = useState(0);
  const [allJangkaWaktu, setAllJangkaWaktu] = useState([]);
  const [codereceiving, setCodeReceiving] = useState("");
  const [payment_method1, setPaymentMethod1] = useState(0);
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
  const [editingItem, setEditingitem] = useState([{ editing: false}]);
	const [totaldiskon2, setTotalDiskon2] = useState(0);
	const [totaldiskon3, setTotalDiskon3] = useState(0);
	const [editable, setEditable] = useState(false);
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
		getPajak1();
	}, []);

	const getPajak1 = () => {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `bearer ${token}`,
		};
		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/pajak/list`, { headers })
			.then((data) => {
				setAllPajak(data.data.response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const handleEditQty = (index, value) => {
		let updateList = savedItems;
		let minTotal = parseInt(updateList[index].harga) * parseInt(updateList[index].qty) - parseInt(updateList[index].diskon_nominal);
		let plusTotal = parseInt(updateList[index].harga) * value - parseInt(updateList[index].diskon_nominal);
		let aqtyTotala = parseInt(updateList[index].harga) * value ;
		let aqtyTotal = parseInt(updateList[index].harga) * parseInt(updateList[index].qty);
		let diskonnominal1 = parseInt(updateList[index].diskon_nominal) * value ;
		let diskonnominal2 = parseInt(updateList[index].qty) * parseInt(updateList[index].diskon_nominal);
		
		if(!isNaN(value)&&value.length>0){
			updateList[index] = {...updateList[index], qty: value};
			setSavedItems(updateList);
			setTotalPrice(totalPrice + plusTotal - minTotal);
			setTotalQty(qtyTotal + aqtyTotala - aqtyTotal);
			setDiskonTotal(diskontotal + diskonnominal1 - diskonnominal2)
		}else{return false}
	}

	const handleEditHarga = (index, value) => {
		if(!isNaN(value)&&value.length>0){
			let updateList = savedItems;
			let minTotal = parseInt(updateList[index].harga) * parseInt(updateList[index].qty) - parseInt(updateList[index].diskon_nominal);
			let aqtyTotal = parseInt(updateList[index].harga) * parseInt(updateList[index].qty);
			updateList[index] = {...updateList[index], harga: value};
			setSavedItems(updateList);
			let plusTotal = parseInt(updateList[index].qty) * value - parseInt(updateList[index].diskon_nominal);
			setTotalPrice(totalPrice + plusTotal - minTotal);
			let aqtyTotala = parseInt(updateList[index].qty) * value;
			setTotalQty(qtyTotal + aqtyTotala - aqtyTotal);
		}else{return false}
	}

	const handleEditDiskonNominal = (index, value) => {
		if(!isNaN(value)&&value.length>0){
			let updateList = savedItems;
			let diskonnominal1 = parseInt(updateList[index].qty) * value ;
			let diskonnominal2 = parseInt(updateList[index].qty) * parseInt(updateList[index].diskon_nominal);
			let persentasediskonnya = value / parseInt(updateList[index].harga) * 100;
			let aqtyTotal = parseInt(updateList[index].harga) * parseInt(updateList[index].qty);
			let minTotal = parseInt(updateList[index].harga) * parseInt(updateList[index].qty) - parseInt(updateList[index].diskon_nominal);
			updateList[index] = {...updateList[index], diskon_nominal: value, diskon_persen: persentasediskonnya};
			setSavedItems(updateList);
			let plusTotal = parseInt(updateList[index].qty) * parseInt(updateList[index].harga) - parseInt(updateList[index].diskon_nominal);
			setTotalPrice(totalPrice+plusTotal-minTotal);
			let aqtyTotala = parseInt(updateList[index].harga) * parseInt(updateList[index].qty);
			setTotalQty(qtyTotal + aqtyTotala - aqtyTotal);
			setDiskonTotal(diskontotal + diskonnominal1 - diskonnominal2)
		}else{return false}
	}

	const handleEditDiskonPersen = (index, value) => {
		if(!isNaN(value)&&value.length>0){
			let updateList = savedItems;
			let  nominaldiskonnya = parseInt(updateList[index].harga) * value/100;
			let minTotal = parseInt(updateList[index].harga) * parseInt(updateList[index].qty) - parseInt(updateList[index].diskon_nominal);
			updateList[index] = {...updateList[index], diskon_nominal: nominaldiskonnya, diskon_persen: value};
			setSavedItems(updateList);
			let plusTotal = parseInt(updateList[index].qty) * parseInt(updateList[index].harga) - parseInt(updateList[index].diskon_nominal);
			setTotalPrice(totalPrice+plusTotal-minTotal);
			let qatyTotal = parseInt(updateList[index].harga) * parseInt(updateList[index].qty);
			setTotalQty(qtyTotal + qatyTotal);
			let diskonnominal1 = parseInt(updateList[index].qty) * value ;
			let diskonnominal2 = parseInt(updateList[index].qty) * parseInt(updateList[index].diskon_nominal);
			setDiskonTotal(diskontotal + diskonnominal1 - diskonnominal2 )
		}else{return false}
	}

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
                item_code : data.item_code,
                satuan : data.satuan,
                qty: data.qty,
                harga: data.harga,
                diskon_persen: data.diskon_persen,
                diskon_nominal: data.diskon_nominal,
                sub_total:data.sub_total,
                data: {
                    item_name: data.item_name,
                    harga: data.harga,
                    qty: data.qty,
                    diskon_persen: data.diskon_persen,
                    diskon_nominal: data.diskon_nominal,
                },
            }];
            // setTotalQty(data.harga * data.qty);
            // setDiskonTotal(data.qty * data.diskon_nominal)
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


  function EditData() {
    setLoading(true);
    let dataItems = [];
        savedItems.map((dataItem) => dataItems = [...dataItems, 
            { 
                item_id: dataItem.item_id, 
                qty: dataItem.qty, 
                harga: dataItem.harga,
                diskon_nominal : dataItem.diskon_nominal,
                diskon_persen : dataItem.diskon_persen,
            }]);
    let data = {
      warehouse_id : parseInt(warehouse),
      username : username,
      code_po: pocode,
      pajak_id: parseInt(pajak),
      code_receiving : codereceiving,
      pay_1:parseFloat(pay1),
      payment_method1: parseFloat(payment_method1),
      payment_method : parseFloat(payment_method),
      keterangan1 : keteranganbayar,
      ongkir: parseFloat(ongkir),
      jangka_waktu : parseInt(jangkaWaktu),
      lainnya:parseFloat(lainnya),
      person_id: parseInt(person),
      status_af: 3,
      status_d: 3,
      keterangan: keterangan,
      diskon_global_nominal : parseFloat(diskonglobalnominal),
      diskon_global_persen : parseInt(diskonglobalpersen),
      items : dataItems
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/invoice-po/update/${props.match.params.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/invoice-po");
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
    <SimpleHeader name="Edit Invoice PO" parentName="PO" />
    <Container className="mt--6" fluid>
        <Row>
        <div className="col">
          <Card className="bg-secondary shadow">
                <Form onSubmit={handleSubmit}>
                    <CardHeader className="bg-white border-0">
                      <h3>Edit Invoice PO</h3>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                          <Col md="6">
                          <Input
                          className="form-control-alternative"
                                  type="hidden"
                                  name="desc"
                                  placeholder="Masukan Keterangan"
                                  value={pocode}
                                  onChange={(e) => {
                                    setPoCode(e.target.value);
                                  }}
                                />
                                <Input
                                className="form-control-alternative"
                                  type="hidden"
                                  name="desc"
                                  placeholder="Masukan Keterangan"
                                  value={codereceiving}
                                  onChange={(e) => {
                                    setCodeReceiving(e.target.value);
                                  }}
                                />
                          </Col>
                      </Row>
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
                            
                            {/* <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                Pajak
                              </Label>
                              <Col sm={3}>
                                <Input
                                disabled
                                autoComplete="off"
                                  className="form-control-alternative"
                                  type="text"
                                  placeholder="Pajak (%)"
                                  value={pajakpersen}
                                  onChange={(e) => {
                                    setPajakPersen(e.target.value);
                                  }}
                                />
                              </Col>
                              <Col sm={4}>
                                <Input
                                disabled
                                  autoComplete="off"
                                  className="form-control-alternative"
                                  type="text"
                                  name="lebar"
                                  placeholder="Pajak (N)"
                                  value={pajaknominal}
                                  onChange={(e) => {
                                    setPajakNominal(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup> */}
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
                          </Col>
                      </Row>
                    </CardBody>
                </Form>
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
                <Form onSubmit={handleSubmit}>
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
                                      <td><>{savedItem.qty}</></td>
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
                      <Link className="btn btn-info" to="/admin/invoice-po">
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
                </Form>
              </Card>
          </div>
        </Row>
    </Container>  
    </>
  );
}


