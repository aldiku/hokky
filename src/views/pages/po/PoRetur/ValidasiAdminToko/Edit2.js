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

export default function EditPoRetur(props)  {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState("");
  const [pocode,setPoCode] = useState("");
  const [codeinvoice,setCodeInvoice ] = useState("");
  const [codereceiving, setCodeReceiving] = useState("");
  const [payment_method,setPaymentMethod] = useState(0);
  const [usernameinvoice,setUsernameInvoice ] = useState("");
  const [type,setType] =useState("");
  const [returtipe,setReturTipe] = useState("");
  const [coderetur,setCodeRetur] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [allJangkaWaktu, setAllJangkaWaktu] = useState([]);
  const [jangkaWaktu,setJangkaWaktu] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [savedItems, setSavedItems] = useState([]);
  const [input1, setInput1] = useState("");
  const [statusd, setStatusD] = useState("");
  const [statusm, setStatusM] = useState("");
  const [ongkir, setOngkir] = useState(0);
  const [lainnya, setLainnya] = useState(0);
  const [allpajak, setAllPajak] = useState([]);
  const [pajak, setPajak] = useState(1);
  const [diskonglobalnominal, setDiskonGlobalNominal] = useState(0);
  const [diskonglobalpersen, setDiskonGlobalPersen] = useState(0);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [editingItem, setEditingitem] = useState([{ editing: false}]);
  const [editable, setEditable] = useState(false);
  const [qtyTotal, setTotalQty] = useState(0);
  const [diskontotal, setDiskonTotal] = useState(0);
  const [isConfEditableOpen, setIsConfEditableOpen] = useState(false);
  const [confPassEditable, setConfPassEditable] = useState('');

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
        `${process.env.REACT_APP_API_BASE_URL}/po-retur/get/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        console.log(data);
        setUsernameInvoice(data.data.response.username);
        getPerson(data.data.response.person_id);
        setCodeRetur(data.data.response.retur_code);
        setCodeInvoice(data.data.response.invoice_code);
        getPajak(data.data.response.pajak_id);
        // setPoCode(data.data.response.code_po);
        setStatusD(data.data.response.status_d);
        setStatusM(data.data.response.status_ar);
        setType(data.data.response.type);
        setReturTipe(data.data.response.retur_type)
        setOngkir(data.data.response.ongkir);
        setTotalQty(data.data.response.price_real);
        setDiskonTotal(data.data.response.diskon_total);
        setLainnya(data.data.response.lainnya);
        setKeterangan(data.data.response.keterangan);
        setTotalPrice(data.data.response.price_total);
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

  const getItemDataSaved = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/po-retur/item`, {

        rpo_id: props.match.params.id

    }).then(async response => {
        let stateItem = [];
        let stateEditing = [];

        await Promise.all(response.data.response.map(async (data) => {
            stateItem = [...stateItem, {
                item_id: data.item_id,
                item_name:data.item_name,
                item_code:data.item_code,
                satuan : data.satuan,
                qty: data.qty,
                harga: data.harga,
                diskon_nominal: data.diskon_nominal,
                diskon_persen: data.diskon_persen,
                data: {
                    item_name: data.item_name,
                    qty: data.qty,
                    harga: data.harga
                },
            }];
                stateEditing = [...stateEditing, {
                  editing: false
            }];
      }));
        setEditingitem(stateEditing);
        setSavedItems(stateItem);
    })
}

  
  function EditData() {
    setLoading(true);
    let dataItems = [];
        savedItems.map((dataItem) => dataItems = [...dataItems, 
            { 
                item_id: dataItem.item_id, 
                qty: dataItem.qty, 
                harga: dataItem.harga,
                diskon_nominal:dataItem.diskon_nominal,
                diskon_persen:dataItem.diskon_persen,
            }]);
    let data = {
        warehouse_id : parseInt(warehouse),
        code_po: pocode,
        person_id: parseInt(person),
        keterangan: keterangan ,
        type: parseInt(type),
        code_invoice: codeinvoice,
        pajak_id : parseInt(pajak),
        diskon_global_nominal : parseFloat(diskonglobalnominal),
        diskon_global_persen : parseInt(diskonglobalpersen),
        payment_method: parseInt(payment_method),
        jangka_waktu: parseInt(jangkaWaktu),
        status_d: 3,
        status_ar: parseInt(statusm),
        admin_retur : username,
        return_type: parseInt(returtipe),
        ongkir : parseInt(ongkir),
        lainnya : parseInt(lainnya),
        items : dataItems,
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/po-retur/update/${props.match.params.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/po-retur");
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
    <SimpleHeader name="Validasi Kepala Purchasing" parentName="PO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
          <Card className="bg-secondary shadow">
                <Form onSubmit={handleSubmit}>
                    <CardHeader className="bg-white border-0">
                      <h3>Validasi Kepala Purchasing</h3>
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
                          {/* <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Kode Invoice
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                  placeholder="Masukan Kode Invoice"
                                  type="search"
                                  onChange={onChange1}
                                  onKeyDown={onKeyDown1}
                                  value={input1}
                              />
                              <AutoCompleTes1 />
                              </Col>                             
                            </FormGroup> */}
                          </Col>
                          {/* <Col md="6">
                          <Button color="primary" className="mb-3" onClick={() => saveItem1()}>Search</Button>
                          </Col> */}
                      </Row>
                        {/* <Col xs="12">
                            <hr />
                        </Col> */}
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
                                <option value='' disabled selected hidden>Pilih PPN</option>
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
                            <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Validasi
                            </Label>
                              <Col sm={6}>
                                <div style={{ display: "flex" }}>
                                  <div className="custom-control custom-radio mb-3">
                                    <Input
                                      className="custom-control-input"
                                      id="customRadio13"
                                      name="custom-radio-5"
                                      type="radio"
                                      value={5}
                                      checked={statusm === 5}
                                      onChange={() => setStatusM(5)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio13"
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
                                      id="customRadio14"
                                      name="custom-radio-5"
                                      type="radio"
                                      value={4}
                                      checked={statusm === 4}
                                      onChange={() => setStatusM(4)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio14"
                                    >
                                      Ditolak
                                    </Label>
                                  </div>
                                </div>
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
                      <h3>Tipe Retur</h3>
                    </CardHeader>
                    <CardBody>
                    <Row md="12">
                          <Col md="6">
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
                                <th><b>Harga</b></th>
                                <th><b>Qty</b></th>
                                <th><b>Diskon %</b></th>
                                <th><b>Diskon (N)</b></th>
                                <th><b>Sub Total</b></th>
                                {/* <th>
                                  {editable?(<Button color="danger" onClick={() => setEditable(false)} size="sm">Simpan</Button>
                                  ):(<Button onClick={() => setIsConfEditableOpen(true)} size="sm">Izinkan Edit</Button>)}
                                </th> */}
                              </tr>
                            </thead>
                              <tbody>
                              {
                                savedItems.map((savedItem, key) => {
                                  return (
                                    <tr key={key}>
                                      <td>{savedItem.item_name}</td>
                                      <td>{formatRupiah(savedItem.harga)}</td>
                                      <td>{savedItem.qty}</td>
                                      <td>{savedItem.diskon_persen}</td>
                                      <td>{formatRupiah(savedItem.diskon_nominal)}</td>
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
                        {/* <CardFooter >
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
                        </CardFooter> */}
                <CardFooter>
                      <Button color="danger" onClick={toggle}>
                          Simpan
                      </Button>
                      <Link className="btn btn-info" to="/admin/po-retur">
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
                <Modal isOpen={isConfEditableOpen} fade={false} style={{ minWidth: "70%", top: "-20%" }}>
				<ModalHeader toggle={() => setIsConfEditableOpen(!isConfEditableOpen)}>Konfirmasi Izinkan Edit</ModalHeader>
				<ModalBody
					cssModule={{
						alignText: "center",
					}}>
						<Row className="justify-content-center mt-4">
							<Col xs={4}>
								<Input
									autoComplete="off"
									placeholder="Masukan Password"
									type="password"
									value={confPassEditable}
									onChange={(e) => setConfPassEditable(e.target.value)}
								/>
								<br/>
								<Button color="primary" onClick={() => handleConfEditable()}>Cek</Button>
							</Col>
						</Row>
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