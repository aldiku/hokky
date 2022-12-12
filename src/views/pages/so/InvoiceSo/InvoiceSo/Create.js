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

const CreateInvoiceSo = () => {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");
  const [pengiriman, setPengiriman] = useState([]);
  const [keterangan, setKeterangan] = useState("");
  const [isShow1, setIsShow1] = useState(false);
  const [active1, setActive1] = useState(0);
  const [filtered1, setFiltered1] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [codeso, setCodeSo] = useState("");
  const [coderfq, setCodeRfq] = useState("");
  const [input1, setInput1] = useState("");
  const [pay1, setPay1] =useState(0);
  const [payment_method, setPaymentMethod] = useState(0);
  const [payment_method1, setPaymentMethod1] = useState(0)
  const [keteranganbayar,setKeteranganBayar] = useState("");
  const [allpajak, setAllPajak] = useState([]);
  const [ppn, setPPN] = useState(0);
  const [totaldiskon, setTotalDiskon] = useState(0);
  const [grandtotal, setGrandTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [diskonglobalnominal, setDiskonGlobalNominal] = useState(0);
  const [diskonglobalpersen,setDiskonGlobalPersen] = useState(0);
  const [ongkir, setOngkir] = useState(0);
  const [pajak, setPajak] = useState("");
  const [lainnya, setLainnya] = useState(0);
  const [allJangkaWaktu, setAllJangkaWaktu] = useState([]);
  const [jangkaWaktu,setJangkaWaktu] = useState(0);
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

	// useEffect(() => {
	// 	getPajak1();
	// }, []);

	// const getPajak1 = () => {
	// 	const headers = {
	// 		"Content-Type": "application/json",
	// 		Authorization: `bearer ${token}`,
	// 	};
	// 	axios
	// 		.get(`${process.env.REACT_APP_API_BASE_URL}/pajak/list`, { headers })
	// 		.then((data) => {
	// 			setAllPajak(data.data.response);
	// 		})
	// 		.catch(function (error) {
	// 			console.log(error);
	// 		});
	// };

  useEffect(() => {
    getCustomer();
    getPajak();
  }, []);

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

  function CreateData() {
    setLoading(true);
    let dataItems = [];
        savedItems.map((dataItem) => dataItems = [...dataItems, 
            { 
                item_id: dataItem.item_id, 
                qty: dataItem.qty, 
                harga: dataItem.harga,
                pembayaran : dataItem.pembayaran,
                diskon_nominal: dataItem.diskon_nominal,
                diskon_persen : dataItem.diskon_persen,
            }]);
    let data = {
      warehouse_id : parseInt(warehouse),
      pajak_id : parseInt(pajak),
      username : username,
      code_sj: coderfq,
      code_so : codeso,
      jangka_waktu : parseInt(jangkaWaktu),
      customer_id: parseInt(customer),
      pengiriman: parseInt(pengiriman),
      keterangan: keterangan ,
      payment_method : parseInt(payment_method),
      pay_1:parseFloat(pay1),
      payment_method1: parseFloat(payment_method1),
      diskon_global_nominal : parseFloat(diskonglobalnominal),
      diskon_global_persen : parseInt(diskonglobalpersen),
      keterangan1 : keteranganbayar,
      ongkir: parseFloat(ongkir),
      lainnya:parseFloat(lainnya),
      items : dataItems,
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/invoice-so/save`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/invoice-so");
        })
        .then((json) => {
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
  }

const onChange1 = (e) => {
    const input1 = e.currentTarget.value;

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/surat-jalan-so/page`, {
        page: 1,
        per_page: 10,
        status_sj: 5,
        sj_code: input1,
        warehouse_id : parseInt(warehouse),
    }).then(async response => {
        let suggests = [];

        await Promise.all(response.data.response.map((data) =>
            suggests = [...suggests, data.sj_code]
        ));

        setActive1(0);
        setFiltered1(suggests);
        setIsShow1(true);

    });

    setInput1(e.currentTarget.value);
};

const onClick1 = e => {
    setActive1(0);
    setFiltered1([]);
    setIsShow1(false);
    setInput1(e.currentTarget.innerText)
};

const onKeyDown1 = e => {
    if (e.keyCode === 13) { // enter key
        setActive1(0);
        setIsShow1(false);
        setInput1(filtered1[active1])
    }
    else if (e.keyCode === 38) { // up arrow
        return (active1 === 0) ? null : setActive1(active1 - 1);
    }
    else if (e.keyCode === 40) { // down arrow
        return (active1 - 1 === filtered1.length) ? null : setActive1(active1 + 1);
    }
};

const AutoCompleTes1 = () => {
    if (isShow1 && input1) {
        if (filtered1.length) {
            return (
                <ul className="autocomplete">
                    {filtered1.map((suggestion1, index1) => {
                        let className;
                        if (index1 === active1) {
                            className = "active";
                        }
                        return (
                            <li key={index1} className={className} onClick={onClick1}>
                                {suggestion1}
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            return (
                <div className="no-autocomplete">
                    <em>Not found</em>
                </div>
            );
        }
    }
    return <></>;
}

//menampilkan search getbyid
const saveItem1 = () => {

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/surat-jalan-so/page`, {
        page: 1,
        per_page: 1,
        status_sj:5,
        sj_code: input1,
        warehouse_id : parseInt(warehouse),
    }).then(res => {
        const length = res.data.response.length;
        if (length === 0)
            return;
            const idItem = res.data.response[0].sj_code;

            axios.get(`${process.env.REACT_APP_API_BASE_URL}/surat-jalan-so/get-by-code/${idItem}`)
            .then(async response => {
                return {
                    item: response.data.response,
                };
              }).then((data) => {
                getCustomer(data.item.customer_id);
                getPajak(data.item.pajak_id);
                getById(data.item.pajak_id);
                setCodeSo(data.item.so_code);
                setCodeRfq(data.item.code_sj);
                setOngkir(data.item.ongkir);
                setLainnya(data.item.lainnya);
                setPengiriman(data.item.pengiriman);
                setPay1(data.item.pay_1);
                setPaymentMethod(data.item.payment_method1);
                setKeteranganBayar(data.item.keterangan1);
                setKeterangan(data.item.keterangan);
                setTotalPrice(data.item.price_total);
                setTotalQty(data.item.price_real);
                setDiskonTotal(data.item.diskon_total);
                getJangkaWaktu(data.item.jangka_waktu);
                setPaymentMethod(data.item.payment_method);
                setDiskonGlobalNominal(data.item.diskon_global_nominal);
                setDiskonGlobalPersen(data.item.diskon_global_persen);
                getItemDataSaved();
                
              })
              .catch(function (error) {
                console.log(error);
              });
    });
}

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

const getItemDataSaved = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/surat-jalan-so/item-by-code`, {

        code_sj: input1

    }).then(async response => {
        let stateItem = [];

        await Promise.all(response.data.response.map(async (data) => {
            stateItem = [...stateItem, {
                item_id: data.item_id,
                item_name:data.item_name,
                item_code:data.item_code,
                satuan : data.satuan,
                qty: data.qty,
                harga: data.harga,
                pembayaran : data.pembayaran,
                diskon_persen: data.diskon_persen,
                diskon_nominal: data.diskon_nominal,
                data: {
                    item_name: data.item_name,
                    harga: data.harga,
                    qty: data.qty,
                    pembayaran : data.pembayaran,
                    diskon_persen: data.diskon_persen,
                    diskon_nominal: data.diskon_nominal,
                },
            }];
        }));
        setSavedItems(stateItem);
    })
}

  const handleSubmit = (e) => {
    e.preventDefault();
    {
      CreateData();
    }
  };

  const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID',
        { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
    ).format(money);
  }

  return (
    <>
    <SimpleHeader name="Buat Invoice SO" parentName="SO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <CardBody>
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                      <h3>Buat Invoice SO</h3>
                    </CardHeader>
                    <CardBody>
                    <Row md="12">
                          <Col md="6">
                          <Input
                          className="form-control-alternative"
                                  type="hidden"
                                  name="desc"
                                  placeholder="Masukan Keterangan"
                                  value={codeso}
                                  onChange={(e) => {
                                    setCodeSo(e.target.value);
                                  }}
                                />
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
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                <b>Kode SJ</b>
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                  placeholder="Masukan Kode SJ"
                                  type="search"
                                  onChange={onChange1}
                                  onKeyDown={onKeyDown1}
                                  value={input1}
                              />
                              <AutoCompleTes1 />
                              </Col>                             
                            </FormGroup>
                          </Col>
                          <Col md="6">
                          <Button color="primary" className="mb-3" onClick={() => saveItem1()}>Search</Button>
                          </Col>
                      </Row>
                        <Col xs="12">
                            <hr />
                        </Col>
                      
                      <Row md="12">
                          <Col md="6">
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Customer
                              </Label>
                              <Col sm={7}>
                              <Input
                              className="form-control-alternative"
                              disabled
                                  name="customer"
                                  type="select"
                                  value={customer}
                                  onChange={(e) => {
                                    setCustomer(e.target.value);
                                  }}
                                >
                                  <option value='' disabled hidden selected>Pilih Customer</option>
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
                                <option value='' disabled hidden selected>Pilih PPN</option>
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
                                <option value="" disabled hidden selected>Pilih Metode Pembayaran</option>
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
                                <option value="" disabled hidden selected>Pilih</option>
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
              </Card>
              <Card className="bg-secondary shadow">
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
                                 autoComplete="off"
                                className="form-control-alternative"
                                  name="Tipe Po"
                                  type="select"
                                  value={payment_method1}
                                  onChange={(e) => {
                                      setPaymentMethod1(e.target.value);
                                  }}
                                >
                                  <option value="" disabled hidden selected>Pilih Metode Pembayaran</option>
                                  <option value={1}>Tunai</option>
                                  <option value={2}>Tempo</option>
                                  {/* <option value={3}>Termin Of Payment</option>
                                  <option value={4}>Indent DP</option>
                                  <option value={5}>Indent Lunas</option> */}
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
                                  name="desc"
                                  rows ="5"
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
                      <Link className="btn btn-info" to="/admin/invoice-so">
                        Kembali
                      </Link>
                </CardFooter>
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={toggle} align="center"></ModalHeader>
                  <ModalBody align="center">
                  <font size="5"><b>Apakah Anda Sudah Yakin ?</b></font><br></br><br></br><br></br>
                  {!isLoading && (
                    <Button color="primary" onClick={() => CreateData()}>
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

export default CreateInvoiceSo;