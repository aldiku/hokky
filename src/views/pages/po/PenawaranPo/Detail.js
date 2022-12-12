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
  FormGroup,
  Label,
  Input,
  
} from "reactstrap";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function DetailPenawaranPo(props)  {
  const token = localStorage.token;
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState("");
  const [payment_method,setPaymentMethod] = useState([]);
  const [keterangan, setKeterangan] = useState("");
  const [jangkaWaktu,setJangkaWaktu] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [editingItem, setEditingitem] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [coderfq, setCodeRfq] = useState([]);
  const [ongkir, setOngkir] = useState(0);
  const [lainnya, setLainnya] = useState(0);
  const [allpajak,setAllPajak] = useState([]);
  const [pajak,setPajak] = useState("");
  const [ppn, setPPN] = useState(0);
  const [totaldiskon, setTotalDiskon] = useState(0);
  const [grandtotal, setGrandTotal] = useState(0);
  const [diskonglobalnominal, setDiskonGlobalNominal] = useState(0);
  const [diskonglobalpersen, setDiskonGlobalPersen] = useState(0);

  useEffect(() => {
		setGrandTotal(totalPrice);
	}, [totalPrice]);
  
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
        `${process.env.REACT_APP_API_BASE_URL}/purchase-order/get/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        getPerson(data.data.response.person_id);
        getPajak(data.data.response.pajak_id);
        setCodeRfq(data.data.response.code_rfq);
        setPaymentMethod(data.data.response.payment_method);
        setJangkaWaktu(data.data.response.jangka_waktu);
        setTotalPrice(data.data.response.price_total)
        setKeterangan(data.data.response.keterangan);
        setOngkir(data.data.response.ongkir);
        setLainnya(data.data.response.lainnya);
        setDiskonGlobalNominal(data.dara.response.diskon_global_nominal);
        setDiskonGlobalPersen(data.data.response.diskon_global_persen);
        getItemDataSaved();
       
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
        let stateEditing = [];

        await Promise.all(response.data.response.map(async (data) => {
          stateItem = [...stateItem, {
            editing:false,
            item_id: data.item_id,
            item_name:data.item_name,
            item_code : data.item_code,
            satuan : data.satuan,
            qty: data.qty,
            harga: data.harga,
            diskon_persen: data.diskon_persen,
            diskon_nominal: data.diskon_nominal,
            data: {
                item_name: data.item_name,
                qty: data.qty,
                harga: data.harga,
                diskon_persen: data.diskon_persen,
                diskon_nominal: data.diskon_nominal,
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
          setPerson(id);
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

  const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID',
        { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
    ).format(money);
  }
  

  return (
    <>
    <SimpleHeader name="Detail Penawaran PO" parentName="PO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
              <Card>
                <CardBody>
                    <CardHeader>
                      <h3>Detail Penawaran PO</h3>
                    </CardHeader>
                    <CardBody>
                                <Input
                                disabled
                                  type="hidden"
                                  name="desc"
                                  placeholder="Masukan Keterangan"
                                  value={coderfq}
                                  onChange={(e) => {
                                    setCodeRfq(e.target.value);
                                  }}
                                />
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
                                disabled
                                className="form-control-alternative"
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
                                disabled
                                className="form-control-alternative"
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
                                />
                              </Col>
                            </FormGroup>
                          </Col>
                          <Col md="6">
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
                                <option value={2}>Termin</option>
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
                              <Col sm={7}>
                                <Input
                                disabled
                                className="form-control-alternative"
                                  type="number"
                                  name="desc"
                                  placeholder="Masukan Jangka Waktu"
                                  value={jangkaWaktu}
                                  onChange={(e) => {
                                    setJangkaWaktu(e.target.value);
                                  }}
                                />
                              </Col>                             
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
                      <br></br>
                      <br></br>
                      <br></br>
                        <Table>
                        <thead>
                          <tr>
                              <th>
                              Nama Item
                              </th>
                              <th>
                              Kode Item
                              </th>
                              <th>
                              Harga 
                              </th>
                              <th>
                              Qty
                              </th>
                              <th>
                              Satuan
                              </th>
                              <th>
                              Diskon %
                              </th>
                              <th>
                              Diskon (N)
                              </th>
                              <th>
                              Sub Total
                              </th>
                              {/* <th>
                              Aksi
                              </th> */}
                          </tr>
                        </thead>
                        <tbody>
                        {
                            savedItems.map((savedItem, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{savedItem.data.item_name}</td>
                                        <td>{savedItem.data.item_code}</td>
                                        <td>
                                            {editingItem[key].editing ? (
                                                <Input
                                                disabled
                                                    placeholder="Harga Per Item"
                                                    type="number"
                                                    row="3"
                                                    value={savedItems[key].harga}
                                                    onChange={(e) => {
                                                        setSavedItems([
                                                            ...savedItems.slice(0, key),
                                                            Object.assign({}, savedItems[key], { harga: e.target.value, totalPrice: e.target.value * savedItem.qty }),
                                                            ...savedItems.slice(key + 1)
                                                        ]);
                                                    }}
                                                />
                                            ) : (
                                                    <>{formatRupiah(savedItem.harga)}</>
                                                )}
                                        </td>
                                        <td>
                                            {editingItem[key].editing ? (
                                                    <Input
                                                    disabled
                                                        placeholder="qty"
                                                        type="number"
                                                        value={savedItems[key].qty}
                                                        onChange={(e) => {
                                                            setSavedItems([
                                                                ...savedItems.slice(0, key),
                                                                Object.assign({}, savedItems[key], { qty: e.target.value, totalPrice: savedItem.harga * e.target.value }),
                                                                ...savedItems.slice(key + 1)
                                                            ]);
                                                        }}
                                                    />
                                            ) : (
                                                        <>{savedItem.qty}</>
                                                    )}
                                        </td>
                                        <td><>{savedItem.satuan}</></td>
                                        <td>
                                            {editingItem[key].editing ? (
                                                <Input
                                                disabled
                                                    placeholder="Diskon Persen"
                                                    type="number"
                                                    value={savedItems[key].diskon_persen}
                                                    onChange={(e) => {
                                                        setSavedItems([
                                                            ...savedItems.slice(0, key),
                                                            Object.assign({}, savedItems[key], { diskon_persen: e.target.value, totalPrice: savedItem.harga * savedItem.qty / e.target.value}),
                                                            ...savedItems.slice(key + 1)
                                                        ]);
                                                    }}
                                                />
                                            ) : (
                                                    <>{savedItem.diskon_persen}</>
                                                )}
                                        </td>
                                        <td>
                                            {editingItem[key].editing ? (
                                                <Input
                                                disabled
                                                    placeholder="Diskon nominal"
                                                    type="number"
                                                    value={savedItems[key].diskon_nominal}
                                                    onChange={(e) => {
                                                        setSavedItems([
                                                            ...savedItems.slice(0, key),
                                                            Object.assign({}, savedItems[key], { diskon_nominal: e.target.value, totalPrice: savedItem.harga * savedItem.qty - e.target.value }),
                                                            ...savedItems.slice(key + 1)
                                                        ]);
                                                    }}
                                                />
                                            ) : (
                                                    <>{formatRupiah(savedItem.diskon_nominal)}</>
                                                )}
                                        </td>
                                        <td>
                                            {editingItem[key].editing ? (
                                                <Input
                                                disabled
                                                    placeholder="Total"
                                                    type="number"
                                                    value={savedItems[key].totalPrice}
                                                />
                                            ) : (
                                                    <>{formatRupiah(savedItem.data.harga * savedItem.qty)}</>
                                                )}
                                        </td>
                                        <td>
                                            {editingItem[key].editing ? (
                                                <>
                                                    <Button color="warning" onClick={() => changeItemDataTable({
                                                        index: key,
                                                        itemName: savedItem.data.item_name,
                                                        qty: savedItem.data.qty,
                                                        harga : savedItem.data.harga,
                                                        diskon_nominal: savedItem.data.diskon_nominal,
                                                        diskon_persen: savedItem.data.diskon_persen
                                                    })}>Update</Button>
                                                    <Button color="danger" onClick={() => {
                                                        setSavedItems([
                                                            ...savedItems.slice(0, key),
                                                            Object.assign({}, savedItems[key], 
                                                              {  qty: savedItem.data.qty,
                                                                harga : savedItem.data.harga,
                                                                diskon_nominal: savedItem.data.diskon_nominal,
                                                                diskon_persen: savedItem.data.diskon_persen
                                                              }),
                                                            ...savedItems.slice(key + 1)
                                                        ]);

                                                        changePriceStatus(key, false);
                                                    }}>Cancel</Button>
                                                </>
                                            ) : (
                                                    <>
                                                        {/* <Button color="warning" onClick={() => changePriceStatus(key, true)}>Edit</Button>
                                                        <Button color="danger" onClick={() => deleteItem(savedItem.item_id)}>Delete</Button> */}
                                                    </>
                                                )}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                      </Table>
                    </CardBody>
                    <CardFooter >
                      <Row md="12">
                          <Col md="4">
                          </Col>
                          <Col md="4">
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                                size="small"
                              >
                                Sub Total
                              </Label>
                              <Col sm={6}>
                              <Input
                                  disabled
                                  className="form-control-alternative"
                                  type="text"
                                  name="barcode"
                                  placeholder="Harga Total"
                                  value={totalPrice}
                                  onChange={(e) => {
                                    setTotalPrice(e.target.value);
                                  }}
                                  
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Total Diskon
                              </Label>
                              <Col sm={6}>
                              <Input
                                  disabled
                                  className="form-control-alternative"
                                  type="text"
                                  name="barcode"
                                  placeholder="Total Diskon"
                                  value={totaldiskon}
                                  onChange={(e) => {
                                    setTotalDiskon(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                PPN
                              </Label>
                              <Col sm={6}>
                              <Input
                                  disabled
                                  className="form-control-alternative"
                                  type="text"
                                  name="barcode"
                                  placeholder="PPN"
                                  value={ppn}
                                  onChange={(e) => {
                                    setPPN(e.target.value);
                                  }}
                                  
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Grand Total
                              </Label>
                              <Col sm={6}>
                              <Input
                                  disabled
                                  className="form-control-alternative"
                                  type="text"
                                  name="barcode"
                                  placeholder="Grand Total"
                                  value={grandtotal}
                                  onChange={(e) => {
                                    setGrandTotal(e.target.value);
                                  }}
                                  
                                />
                              </Col>
                            </FormGroup>
                          </Col>
                          <Col md="4">
                          </Col>
                      </Row>
                    </CardFooter>
                </CardBody>
                <CardFooter>
                      <Link className="btn btn-info" to="/admin/purchase-order">
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