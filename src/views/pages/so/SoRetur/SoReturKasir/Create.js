/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, CardBody, CardHeader, CardFooter, Table, Container, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from "reactstrap";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

const CreateSoReturKasir = () => {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState("");
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");
  const [pocode,setPoCode] = useState("");
  const [codeinvoice,setCodeInvoice ] = useState("");
  const [codereceiving, setCodeReceiving] = useState("");
  const [payment_method,setPaymentMethod] = useState(0);
  const [usernameinvoice,setUsernameInvoice ] = useState("");
  const [type,setType] =useState("");
  const [returtipe,setReturTipe] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [allJangkaWaktu, setAllJangkaWaktu] = useState([]);
  const [jangkaWaktu,setJangkaWaktu] = useState(1);
  const [active1, setActive1] = useState(0);
  const [filtered1, setFiltered1] = useState([]);
  const [isShow1, setIsShow1] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [savedItems, setSavedItems] = useState([]);
  const [input1, setInput1] = useState("");
  const [ongkir, setOngkir] = useState(0);
  const [lainnya, setLainnya] = useState(0);
  const [allpajak, setAllPajak] = useState([]);
  const [pajak, setPajak] = useState(1);
  const [ppn, setPPN] = useState(0);
  const [totaldiskon, setTotalDiskon] = useState(0);
  const [grandtotal, setGrandTotal] = useState(0);
  const [diskonglobalnominal, setDiskonGlobalNominal] = useState(0);
  const [diskonglobalpersen, setDiskonGlobalPersen] = useState(0);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [editingItem, setEditingitem] = useState([{ editing: false}]);
  const headers = { Authorization: `Bearer ${token}`};
    const [ongkir1, setOngkir1] = useState(0);
    const [ppnnew, setPPNNEW] = useState(0);
    const [diskonglobal, setDiskonGLobal] = useState(0);
    const [totalPrice1, setTotalPrice1] = useState(0);
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [diskonglobalnominal1,setDiskonGlobalNominal1] = useState(0)
    const [totaldiskon2, setTotalDiskon2] = useState(0);
    const [totaldiskon3, setTotalDiskon3] = useState(0);
    const [editable, setEditable] = useState(false);
    const [qtyTotal, setTotalQty] = useState(0);
    const [diskontotal, setDiskonTotal] = useState(0);
    const [isConfEditableOpen, setIsConfEditableOpen] = useState(false);
    const [confPassEditable, setConfPassEditable] = useState('');

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

//   function CreateData() {
//     setLoading(true);
//     let dataItems = [];
//         savedItems.map((dataItem) => dataItems = [...dataItems, 
//             { 
//                 item_id: dataItem.item_id, 
//                 qty: dataItem.qty, 
//                 harga: dataItem.harga,
//                 diskon_persen: dataItem.diskon_persen,
//                 diskon_nominal: dataItem.diskon_nominal,
//             }]);
//     let data = {
//       warehouse_id : parseInt(warehouse),
//       username : username,
//       code_po: pocode,
//       pajak_id: parseInt(pajak),
//       code_receiving : codereceiving,
//       pay_1:parseFloat(pay1),
//       payment_method1: parseFloat(payment_method1),
//       payment_method : parseFloat(payment_method),
//       keterangan1 : keteranganbayar,
//       ongkir: parseFloat(ongkir),
//       jangka_waktu : parseInt(jangkaWaktu),
//       lainnya:parseFloat(lainnya),
//       person_id: parseInt(person),
//       keterangan: keterangan,
//       diskon_global_nominal : parseFloat(diskonglobalnominal),
//       diskon_global_persen : parseInt(diskonglobalpersen),

//       items : dataItems,
//     };
//     axios
//         .post(
//           `${process.env.REACT_APP_API_BASE_URL}/invoice-po/save`,
//           data,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         )
//         .then(function (response) {
//           history.push("/admin/invoice-po");
//         })
//         .then((json) => {
//           setLoading(false);
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//   }

   function CreateData() {
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
      username : username,
      code_transaction: codeinvoice,
      pajak_id : parseInt(pajak),
      diskon_global_nominal : parseFloat(diskonglobalnominal),
      diskon_global_persen : parseInt(diskonglobalpersen),
      payment_method: parseInt(payment_method),
      jangka_waktu: parseInt(jangkaWaktu),
      // code_po: pocode,
      // status_m: 3,
      status:1,
      status_ar:3,
      status_d : 3,
      customer_id: parseInt(customer),
      ongkir:parseFloat(ongkir),
      // lainnya:parseFloat(lainnya),
      keterangan: keterangan,
      type: parseInt(type),
      retur_type: parseInt(returtipe),
      items : dataItems,
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/so-retur/save`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/so-retur");
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

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/sales-order/page`, {
        page: 1,
        per_page: 10,
        // status_ph: 5,
        status: 1,
        so_code: input1,
        active_flag : 5,
        warehouse_id : parseInt(warehouse),
    }).then(async response => {
        let suggests = [];

        await Promise.all(response.data.response.map((data) =>
            suggests = [...suggests, data.so_code]
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

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/sales-order/page`, {
        page: 1,
        per_page: 1,
        status: 1,
        active_flag : 5,
        so_code: input1,
        warehouse_id : parseInt(warehouse),
    }).then(res => {
        const length = res.data.response.length;
        if (length === 0)
            return;
            const idItem = res.data.response[0].so_code;
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/sales-order/get-by-code/${idItem}`)
            .then(async response => {
                return {
                    item: response.data.response,
                };
              }).then((data) => {
                // console.log(data);
                setUsernameInvoice(data.item.username);
                getCustomer(data.item.customer_id);
                setCodeReceiving(data.item.code_receiving);
                setCodeInvoice(data.item.so_code);
                getPajak(data.item.pajak_id);
                setPoCode(data.item.code_po);
                setOngkir(data.item.ongkir);
                setTotalQty(data.item.price_real);
                setDiskonTotal(data.item.diskon_total);
                setLainnya(data.item.lainnya);
                setKeterangan(data.item.keterangan);
                setTotalPrice(data.item.price_total);
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


const getItemDataSaved = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/sales-order/item-by-code`, {

        so_code: input1

    }).then(async response => {
        let stateItem = [];
        let stateEditing  = [];
        await Promise.all(response.data.response.map(async (data) => {
        //   console.log(data);
            stateItem = [...stateItem, {
                item_id: data.item_id,
                item_name:data.item_name,
                qty: data.qty,
                harga: data.harga,
                diskon_persen: data.diskon_persen,
                diskon_nominal: data.diskon_nominal,
                data: {
                  item_name: data.item_name,
                  harga: data.harga,
                  qty: data.qty,
                  diskon_persen: data.diskon_persen,
                  diskon_nominal: data.diskon_nominal,
              },
          }];
          stateEditing = [...stateEditing, {
              editing: false
          }];
          // setTotalQty(data.harga * data.qty);
          // setDiskonTotal(data.qty * data.diskon_nominal)
      }));
      setEditingitem(stateEditing);
      setSavedItems(stateItem);
  })
}


const formatRupiah = (money) => {
  return new Intl.NumberFormat('id-ID',
      { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
  ).format(money);
}

  const handleSubmit = (e) => {
    {
      CreateData();
    }
  };

  return (
    <>
    <SimpleHeader name="Buat Retur Kasir" parentName="SO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
          <Card className="bg-secondary shadow">
                <Form onSubmit={handleSubmit}>
                    <CardHeader className="bg-white border-0">
                      <h3>Buat Retur Kasir</h3>
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
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Kode Transaksi
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                  placeholder="Masukan Kode Transaksi"
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
                              disabled
                              className="form-control-alternative"
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
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Tipe Retur
                              </Label>
                              <Col sm={7}>
                                <Input
                                  name="Tipe Po"
                                  type="select"
                                  value={returtipe}
                                  onChange={(e) => {
                                      setReturTipe(e.target.value);
                                  }}
                                >
                                   <option value="" selected hidden disabled>Pilih Retur</option>
                                  <option value={1}>Ganti Uang</option>
                                  <option value={2}>Ganti Barang</option>
                                </Input>
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
                                      <td>
                                      
                                      {editable ? (
                                          <Input
                                          className="form-control-alternative"
                                            placeholder="Diskon Persen"
                                            type="number"
                                            value={savedItem.harga}
                                            onChange={(e) => {
                                              handleEditHarga(key, e.target.value);
                                            }}
                                          />
                                        ) : (
                                            <>{formatRupiah(savedItem.harga)}</>
                                        )}
                                      
                                      </td>
                                      <td>
                                        <Input
                                          className="form-control-alternative"
                                          placeholder="qty"
                                          type="number"
                                          value={savedItem.qty}
                                          onChange={(e) => {
                                              handleEditQty(key, e.target.value);
                                          }}/>
                                      </td>
                                      {/* <td>
                                        {formatRupiah(savedItem.harga * savedItem.qty)}
                                      </td> */}
                                      <td>
                                        {editable ? (
                                          <Input
                                          className="form-control-alternative"
                                            placeholder="Diskon Persen"
                                            type="number"
                                            value={savedItem.diskon_persen}
                                            onChange={(e) => {
                                              handleEditDiskonPersen(key, e.target.value);
                                            }}
                                          />
                                        ) : (
                                            <>{savedItem.diskon_persen}</>
                                        )}
                                      </td>
                                      <td>
                                        {editable ? (
                                          <Input
                                          className="form-control-alternative"
                                            placeholder="Diskon nominal"
                                            type="number"
                                            value={savedItem.diskon_nominal}
                                            onChange={(e) => {
                                              handleEditDiskonNominal(key, e.target.value);
                                            }}
                                          />
                                        ) : (
                                            <>{formatRupiah(savedItem.diskon_nominal)}</>
                                        )}
                                      </td>
                                      <td>
                                        {formatRupiah((savedItem.harga - savedItem.diskon_nominal) * savedItem.qty)}
                                      </td>
                                      <td>
                                        <Button color="danger" onClick={() => deleteItem(savedItem.item_id)}>Delete</Button>
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

export default CreateSoReturKasir;

