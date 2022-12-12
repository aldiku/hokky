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
import Select2 from "react-select2-wrapper";

const CreatePenawaranSo = () => {
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
  const [isShow1, setIsShow1] = useState(false);
  const [allJangkaWaktu, setAllJangkaWaktu] = useState([]);
  const [jangkaWaktu,setJangkaWaktu] = useState(0);
  const [tempSavedItems, setTempSavedItems] = useState([]);
  const [qty, setQty] = useState([]);
  const [active, setActive] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [active1, setActive1] = useState(0);
  const [filtered1, setFiltered1] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [savedItems, setSavedItems] = useState([]);
  const [coderfq, setCodeRfq] = useState("");
  const [input, setInput] = useState("");
  const [input1, setInput1] = useState("");
  const [isSearchShoww, setIsSearchShoww] = useState(false);
  const [itemIdd, setItemIdd] = useState("");
	const [allItemm, setAllItemm] = useState([]);
	const [queryy, setQueryy] = useState("");
  const [editingItem, setEditingitem] = useState([{ editing: false}]);
  const [addingItem, setAddingItem] = useState(false);
  const headers = { Authorization: `Bearer ${token}` };
  // const [pay1,setPay1] =useState("");
  // const [payment_method1,setPaymentMethod1] = useState("");
  // const [keteranganbayar,setKeteranganBayar] = useState("");
  const [manualaddress, setManualAddress] = useState("");
  const [allpajak, setAllPajak] = useState([]);
  const [ppn, setPPN] = useState(0);
  const [totaldiskon, setTotalDiskon] = useState(0);
  const [grandtotal, setGrandTotal] = useState(0);
  const [diskonglobalnominal, setDiskonGlobalNominal] = useState(0);
  const [diskonglobalpersen,setDiskonGlobalPersen] = useState(0);
  const [ongkir, setOngkir] = useState(0);
  const [pajak, setPajak] = useState(1);
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
	const [editable, setEditable] = useState(false);
	const [isConfEditableOpen, setIsConfEditableOpen] = useState(false);
	const [confPassEditable, setConfPassEditable] = useState('');
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


const searchh = async () => {
  if (Number(queryy) > 0) {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items-so`, { item_info: queryy , warehouse_id: parseInt(warehouse),  }, { headers });
    if (res.data.status !== 404) setAllItemm(res.data);
    else {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items-so`, { item_info: queryy, warehouse_id: parseInt(warehouse), }, { headers });
      if (res.data.status !== 404) setAllItemm(res.data);
      else setAllItemm(null);
    }
  } else {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items-so`, { item_info: queryy, warehouse_id: parseInt(warehouse), }, { headers });
    if (res.data.status !== 404) setAllItemm(res.data);
    else setAllItemm(null);
  }
  setIsSearchShoww(true);
};

const handleConfEditable = () => {
  let pass = '123';
  if(confPassEditable===pass){
    setEditable(true);setIsConfEditableOpen(false);setConfPassEditable('');
  }else{
    setEditable(false);setIsConfEditableOpen(false);setConfPassEditable('');
  }
}

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
    setTotalPrice(totalPrice+plusTotal-minTotal);
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

// save
const saveItemOrUpdate = (item) => {
  let oldobj = savedItems.find(o => o.item_id === item.id);
  if(oldobj===undefined){
    setSavedItems([...savedItems,{
      item_id: item.id,
      item_name: item.item_name,
      item_code : item.item_code,
      satuan : item.satuan,
      barcode: item.barcode,
      qty: 1,
      diskon_nominal : diskonglobalnominal,
      diskon_persen:  diskonglobalpersen,
      harga: item.price,
    }]);
    return setTotalPrice(totalPrice + item.price * 1 - diskonglobalnominal),
        setTotalQty(qtyTotal + item.price * 1),
        setDiskonTotal(diskontotal + diskonglobalnominal * 1)
  }else{
    let index = savedItems.findIndex(e=>e.item_id===item.id);
    let updateList = savedItems;
    let minTotal = parseInt(savedItems[index].harga) * parseInt(savedItems[index].qty) - parseInt(savedItems[index].diskon_nominal);
    let qtyTotall = parseInt(updateList[index].harga) * parseInt(updateList[index].qty);
    let diskontotall = parseInt(updateList[index].diskon_nominal) * parseInt(updateList[index].qty);
    let qtyupdate = parseInt(updateList[index].qty)+parseInt(1);
    updateList[index] = {...updateList[index], qty: qtyupdate};
    setSavedItems(updateList);
    let fixPrice = totalPrice - minTotal;
    let fixQty = qtyTotal - qtyTotall ;
    let fixDiskon = diskontotal - diskontotall ;
    return setTotalPrice(fixPrice + parseInt(updateList[index].harga) * qtyupdate - diskonglobalnominal),
    setTotalQty(fixQty + parseInt(updateList[index].harga) * qtyupdate),
    setDiskonTotal(fixDiskon + parseInt(updateList[index].diskon_nominal) * qtyupdate)
  };
}

const handleSubmit = async (e) => {
  e.preventDefault();
  {
    setQueryy("");
    setIsSearchShoww("");
    return true
  }
};

  const deleteItem = (id) => {
    let array = [...savedItems];

    let index = array.findIndex(object => {
      return object.item_id === id;
    });

    if (index !== -1) {
      setTotalPrice(totalPrice - array[index].harga * array[index].qty - array[index].diskon_nominal);
      setTotalQty(qtyTotal - array[index].harga * array[index].qty);
      setDiskonTotal(diskontotal - array[index].diskon_nominal * array[index].qty);
      array.splice(index, 1);
      setSavedItems(array);
    }
  }

  useEffect(() => {
    getCustomer();
    getPajak();
    getJangkaWaktu();
  }, []);

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

  const getPajak = (id) => {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `bearer ${token}`,
		};
		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/pajak/list`, { headers })
			.then((data) => {
				setAllPajak(data.data.response);
        // setPPN(data.data.response.persentase)
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
                diskon_persen: dataItem.diskon_persen,
                diskon_nominal: dataItem.diskon_nominal
            }]);
    let data = {
      warehouse_id : parseInt(warehouse),
      username : username,
      pajak_id: parseInt(pajak),
      code_rfq: coderfq,
      customer_id: parseInt(customer),
      type : parseInt(typereq),
      pengiriman: parseInt(pengiriman),
      payment_method: parseInt(payment_method),
      // pay_1:parseFloat(pay1),
      // payment_method1: parseFloat(payment_method1),
      // keterangan1 : keteranganbayar,
      status:2,
      ongkir: parseFloat(ongkir),
      lainnya:parseFloat(lainnya),
      manual_address: alamat,
      jangka_waktu:parseInt(jangkaWaktu),
      keterangan: keterangan ,
      diskon_global_nominal: parseFloat(diskonglobalnominal),
      diskon_global_persen : parseFloat(diskonglobalpersen),
      items : dataItems
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/sales-order/save`,
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

const onChange1 = (e) => {
    const input1 = e.currentTarget.value;

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/rfq-so/page`, {
        page: 1,
        per_page: 10,
        status_rfq : 5,
        rfq_code: input1,
        warehouse_id : parseInt(warehouse),
    }).then(async response => {
        let suggests = [];

        await Promise.all(response.data.response.map((data) =>
            suggests = [...suggests, data.rfq_code]
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

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/rfq-so/page`, {
        page: 1,
        per_page: 1,
        status_rfq : 5,
        rfq_code: input1,
        warehouse_id : parseInt(warehouse),
    }).then(res => {
        const length = res.data.response.length;
        if (length === 0)
            return;
            const idItem = res.data.response[0].id;

            axios.get(`${process.env.REACT_APP_API_BASE_URL}/rfq-so/get/${idItem}`)
            .then(async response => {
                return {
                    item: response.data.response,
                };
              }).then((data) => {
                // console.log(data);
                getCustomer(data.item.customer_id);
                getPajak(data.item.pajak_id);
                getItemDataSaved();
                setCodeRfq(data.item.rfq_code);
                setHarga(data.item.harga);
                setTypeReq(data.item.type);
                setPengiriman(data.item.pengiriman);
                setKeterangan(data.item.keterangan);
                setTotalPrice(data.item.price_total);
                setTotalQty(data.item.price_real);
                setDiskonTotal(data.item.diskon_total);
                setJangkaWaktu(data.item.jangka_waktu);
                setOngkir(data.item.ongkir);
                setLainnya(data.item.lainnya);
                setPaymentMethod(data.item.payment_method);
                setDiskonGlobalNominal(data.item.diskon_global_nominal);
                setDiskonGlobalPersen(data.item.diskon_global_persen);
                setAlamat(data.item.manual_address);
              })
              .catch(function (error) {
                console.log(error);
              });
    });
}

const getItemDataSaved = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/rfq-so/item-by-code`, {

        rfq_code: input1

    }).then(async response => {
        let stateItem = [];
        let stateEditing = [];

        await Promise.all(response.data.response.map(async (data) => {
            stateItem = [...stateItem, {
                item_id: data.item_id,
                item_name:data.item_name,
                item_code: data.item_code,
                satuan: data.satuan,
                qty: data.qty,
                harga: data.harga,
                diskon_persen: data.diskon_persen,
                diskon_nominal: data.diskon_nominal,
                data: {
                    item_name: data.item_name,
                    harga: data.harga,
                    diskon_persen: data.diskon_persen,
                    diskon_nominal: data.diskon_nominal,
                    qty: data.qty,
                },
            }];
              stateEditing = [...stateEditing, {
              editing: false
            }];
              // setTotalQty(data.harga * data.qty);
              // setDiskonTotal(data.qty * data.diskon_nominal);
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
 

  return (
    <>
    <SimpleHeader name="Buat Sales Order" parentName="SO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <CardBody>
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                      <h3>Buat Sales Order</h3>
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
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={3}
                              >
                                Kode RFQ
                              </Label>
                              <Col sm={6}>
                                <Input
                                className="form-control-alternative"
                                  placeholder="Kode RFQ "
                                  type="search"
                                  // style={{ height: 38 }}
                                  onChange={onChange1}
                                  onKeyDown={onKeyDown1}
                                  value={input1}
                              />
                              {!isLoading && (
                              <AutoCompleTes1 />
                              )}
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
                                sm={3}
                              >
                                Customer
                              </Label>
                              <Col sm={6}>
                              {/* <Input
                                  className="form-control-alternative"
                                  name="person"
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
                                  </Input> */}
                                <Select2
                                      className="form-control-alternative"
                                      defaultValue=""
                                      value={customer}
                                      onChange={(e) => {
                                        setCustomer(e.target.value);
                                      }}
                                      options={{
                                        placeholder: "Pilih Customer"
                                      }}
                                      data={customers.map((customer) => {
                                        return (
                                        { id: customer.id, text: customer.name}
                                        );
                                      })}
                                    />
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
                            className="form-control-alternative"
                                name="Tipe Request"
                                type="select"
                                value={pengiriman}
                                onChange={(e) => {
                                  setPengiriman(e.target.value);
                                }}
                              >
                                <option value="" disabled hidden selected>Pilih Pengiriman</option>
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
                              Tipe SO
                            </Label>
                            <Col sm={7}>
                            <Input
                            className="form-control-alternative"
                                name="Tipe Request"
                                type="select"
                                value={typereq}
                                onChange={(e) => {
                                  setTypeReq(e.target.value);
                                }}
                              >
                                <option value="" disabled hidden selected>Pilih Tipe SO</option>
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
                                <th>
                                  {editable?(<Button color="danger" onClick={() => setEditable(false)} size="sm">Simpan</Button>
                                  ):(<Button onClick={() => setIsConfEditableOpen(true)} size="sm">Izinkan Edit</Button>)}
                                </th>
                              </tr>
                            </thead>
                              <tbody>
                              {
                                savedItems.map((savedItem, key) => {
                                  return (
                                    <tr key={key}>
                                      <td>{savedItem.item_name}</td>
                                      <td>{savedItem.item_code}</td>
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
                                      <td>{savedItem.satuan}</td>
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
                              <tr>
                                <td>
                                  <><Form onSubmit={handleSubmit}>
                                          <Input
                                            autoComplete="off"
                                            placeholder="Masukan Item Manual"
                                            type="search"
                                            onKeyDown={searchh}
                                            value={queryy}
                                            onChange={(e) => setQueryy(e.target.value)}
                                          />
                                          {/* <Button type="submit"><i className="fa fa-search" /></Button> */}
                                        
                                        {isSearchShoww && queryy && (
                                        <Card className="position-sticky boxShadow" style={{ maxHeight: "15.5rem", overflowY: "auto", paddingTop: "1rem", position: "relative" }}>
                                          <div style={{ position: "absolute", top: "2.5px", right: "1rem", cursor: "pointer", fontSize: "1rem" }}>
                                            <i className="fas fa-window-close text-danger" onClick={() => setIsSearchShoww(false)}></i>
                                          </div>
                                          {allItemm?.response ? (
                                            allItemm.response.map((item) => (
                                              <CardBody key={item.id} style={{ minHeight: "5rem", padding: "1rem" }} className="bgSearch" onClick={() => {saveItemOrUpdate(item);setQueryy('');setIsSearchShoww(false);}}>
                                                <div>
                                                  <b>Nama item:</b> {item.item_name}
                                                </div>
                                              </CardBody>
                                            ))
                                          ) : (
                                            <div className="text-center mb-3 text-danger">Item "{queryy}" tidak ada bosku!</div>
                                          )}
                                        </Card>
                                      )}
                                  </Form></>
                                  </td>
                                 </tr>
                              </tbody>
                          </Table>
                        </CardBody>
                        <CardFooter>
                          <Row md="12">
                            <Col md="6">
                            <FormGroup row>
                              <Col sm={7}>
                                <Input
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
          </div>
        </Row>
    </Container>
    </>
  );
}

export default CreatePenawaranSo;