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

const CreatePermintaanBarang = () => {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [qty,setQty] = useState([]);
  const [harga, setHarga] = useState([]);
  const [typereq, setTypeReq] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");
  const [keterangan,setKeterangan] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [active, setActive] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [savedItems, setSavedItems] = useState([]);
  const [barcode, setBarcode] = useState("");
  const [isSearchShoww, setIsSearchShoww] = useState(false);
  const [isSearchShowww, setIsSearchShowww] = useState(false);
  const [isSearchShowwww, setIsSearchShowwww] = useState(false);
  const [itemIdd, setItemIdd] = useState("");
	const [allItemm, setAllItemm] = useState([]);
  const [allItemmm, setAllItemmm] = useState([]);
  const [allItemmmm, setAllItemmmm] = useState([]);
	const [queryy, setQueryy] = useState("");
  const [queryyy, setQueryyy] = useState("");
  const [queryyyy, setQueryyyy] = useState("");
  const [editingItem, setEditingitem] = useState([{ editing: false}]);
  const [addingItem, setAddingItem] = useState(false);
  const headers = { Authorization: `Bearer ${token}` };
  const [pengiriman, setPengiriman] = useState("");
  const [input, setInput] = useState("");
  const [allpajak, setAllPajak] = useState([]);
  const [ppn, setPPN] = useState(0);
  const [totaldiskon, setTotalDiskon] = useState(0);
  const [grandtotal, setGrandTotal] = useState(0);
  const [alamat, setAlamat] = useState("");
  const [diskonglobalnominal, setDiskonGlobalNominal] = useState(0);
  const [diskonglobalpersen,setDiskonGlobalPersen] = useState(0);
  const [ongkir, setOngkir] = useState(0);
  const [pajak, setPajak] = useState(1);
  const [payment, setPayment] = useState("");
  const [allJangkaWaktu, setAllJangkaWaktu] = useState([]);
  const [jangkaWaktu,setJangkaWaktu] = useState(0);
  const [lainnya, setLainnya] = useState(0);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
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

const searchhh = async () => {
  if (Number(queryyy) > 0) {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items-so`, { item_info: queryyy , warehouse_id: parseInt(warehouse),  }, { headers });
    if (res.data.status !== 404) setAllItemmm(res.data);
    else {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items-so`, { item_info: queryyy, warehouse_id: parseInt(warehouse), }, { headers });
      if (res.data.status !== 404) setAllItemmm(res.data);
      else setAllItemmm(null);
    }
  } else {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items-so`, { item_info: queryyy, warehouse_id: parseInt(warehouse), }, { headers });
    if (res.data.status !== 404) setAllItemmm(res.data);
    else setAllItemmm(null);
  }
  setIsSearchShowww(true);
};

const searchhhh = async () => {
  if (queryyyy) {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items-so`, { item_info: queryyyy , warehouse_id: parseInt(warehouse),  }, { headers });
    if (res.data.status !== 404) setAllItemmmm(res.data);
    setAllItemmmm(null);
  } else {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items-so`, { item_info: queryyyy, warehouse_id: parseInt(warehouse), }, { headers });
    if (res.data.status !== 404) setAllItemmmm(res.data);
    else setAllItemmmm(null);
  }
  setIsSearchShowwww(true);
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
      item_code:item.item_code,
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

const saveItemOrUpdatee = (item) => {
  let oldobj = savedItems.find(o => o.item_id === item.id);
  if(oldobj===undefined){
    setSavedItems([...savedItems,{
      item_id: item.id,
      item_name: item.item_name,
      item_code:item.item_code,
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

const saveItemOrUpdateee = (item) => {
  let oldobj = savedItems.find(o => o.item_id === item.id);
  if(oldobj===undefined){
    setSavedItems([...savedItems,{
      item_id: item.id,
      item_name: item.item_name,
      satuan : item.satuan,
      item_code:item.item_code,
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

const handleSubmit2 = async (e) => {
  e.preventDefault();
  {
    setBarcode("");
    setQueryyy("");
    setIsSearchShowww("");
    return true
  }
};

const handleSubmit3 = async (e) => {
  e.preventDefault();
  {
    setBarcode("");
    setQueryyyy("");
    setIsSearchShowwww("");
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

  const getJangkaWaktu = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/jwkredit/list`, { headers })
      .then((data) => {
        setAllJangkaWaktu(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getPajak = () => {
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

  const getCustomer = () => {
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
                diskon_nominal : dataItem.diskon_nominal,
                diskon_persen: dataItem.diskon_persen,
            }]);
    let data = {
      warehouse_id : parseInt(warehouse),
      username : username,
      customer_id: parseInt(customer),
      type : parseInt(typereq),
      pajak_id : parseInt(pajak),
      status_rfq: 3,
      status : 3,
      pengiriman : parseInt(pengiriman),
      keterangan: keterangan,
      manual_address : alamat, 
      diskon_global_nominal : diskonglobalnominal,
      diskon_global_persen : diskonglobalpersen,
      ongkir : parseInt(ongkir),
      lainnya : parseInt(lainnya),
      payment_method: parseInt(payment),
      jangka_waktu : parseInt(jangkaWaktu),
      items : dataItems
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/rfq-so/save`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/penawaran-barang");
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
    

  return (
    <>
    <SimpleHeader name="Buat Penawaran SO" parentName="SO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <CardBody>
              <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                      <h3>Buat Penawaran SO</h3>
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
                              {/* <Input
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
                                  </Input> */}
                                <Select2
                                      className="form-control-alternative"
                                      defaultValue="1"
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
                                  disabled={totalPrice < 1000}
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
                                  disabled={totalPrice < 1000}
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
                                value={payment}
                                onChange={(e) => {
                                    setPayment(e.target.value);
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
                                  type="text"
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
                                <th colspan="4"><b>Nama Item</b></th>
                                <th colspan="4"><b>Kode Item</b></th>
                                <th colspan="4"><b>Barcode</b></th>
                                <th colspan="4"><b>Harga</b></th>
                                <th colspan="4"><b>Qty</b></th>
                                <th colspan="4"><b>Satuan</b></th>
                                <th colspan="4"><b>Diskon %</b></th>
                                <th colspan="4"><b>Diskon (N)</b></th>
                                <th colspan="4"><b>Sub Total</b></th>
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
                                      <td colspan="4">{savedItem.item_name}</td>
                                      <td colspan="4">{savedItem.item_code}</td>
                                      <td colspan="4">{savedItem.barcode}</td>
                                      <td colspan="4">
                                      
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
                                      <td colspan="4">
                                        <Input
                                          className="form-control-alternative"
                                          placeholder="qty"
                                          type="number"
                                          value={savedItem.qty}
                                          onChange={(e) => {
                                              handleEditQty(key, e.target.value);
                                          }}/>
                                      </td>
                                      <td colspan="4">{savedItem.satuan}</td>
                                      {/* <td>
                                        {formatRupiah(savedItem.harga * savedItem.qty)}
                                      </td> */}
                                      <td colspan="4">
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
                                      <td colspan="4">
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
                                      <td colspan="4">
                                        {formatRupiah((savedItem.harga - savedItem.diskon_nominal) * savedItem.qty)}
                                      </td>
                                      <td colspan="4">
                                        <Button color="danger" onClick={() => deleteItem(savedItem.item_id)}>Delete</Button>
                                      </td>
                                    </tr>
                                  )
                                })
                              }
                              <tr>
                                  <td colspan="4">
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
                                  <td colspan="4">
                                    <><Form onSubmit={handleSubmit3}>
                                            <Input
                                              autoComplete="off"
                                              placeholder="Masukan Kode Item"
                                              type="search"
                                              onKeyDown={searchhhh}
                                              value={queryyyy}
                                              onChange={(e) => setQueryyyy(e.target.value)}
                                            />
                                            {/* <Button type="submit"><i className="fa fa-search" /></Button> */}
                                          
                                          {isSearchShowwww && queryyyy && (
                                          <Card className="position-sticky boxShadow" style={{ maxHeight: "15.5rem", overflowY: "auto", paddingTop: "1rem", position: "relative" }}>
                                            <div style={{ position: "absolute", top: "2.5px", right: "1rem", cursor: "pointer", fontSize: "1rem" }}>
                                              <i className="fas fa-window-close text-danger" onClick={() => setIsSearchShowwww(false)}></i>
                                            </div>
                                            {allItemmmm?.response ? (
                                              allItemmmm.response.map((item) => (
                                                <CardBody key={item.id} style={{ minHeight: "5rem", padding: "1rem" }} className="bgSearch" onClick={() => {saveItemOrUpdateee(item);setQueryyyy('');setIsSearchShowwww(false);}}>
                                                  <div>
                                                    <b>Kode Item:</b> {item.item_code}
                                                  </div>
                                                </CardBody> 
                                              ))
                                            ) : (
                                              <div className="text-center mb-3 text-danger">Kode Item "{queryyyy}" tidak ada bosku!</div>
                                            )}
                                          </Card>
                                        )}
                                    </Form></>
                                  </td>
                                  <td colspan="4">
                                    <><Form onSubmit={handleSubmit2}>
                                            <Input
                                              autoComplete="off"
                                              placeholder="Masukan Barcode"
                                              type="search"
                                              onKeyDown={searchhh}
                                              value={queryyy}
                                              onChange={(e) => setQueryyy(e.target.value)}
                                            />
                                            {/* <Button type="submit"><i className="fa fa-search" /></Button> */}
                                          
                                          {isSearchShowww && queryyy && (
                                          <Card className="position-sticky boxShadow" style={{ maxHeight: "15.5rem", overflowY: "auto", paddingTop: "1rem", position: "relative" }}>
                                            <div style={{ position: "absolute", top: "2.5px", right: "1rem", cursor: "pointer", fontSize: "1rem" }}>
                                              <i className="fas fa-window-close text-danger" onClick={() => setIsSearchShowww(false)}></i>
                                            </div>
                                            {allItemmm?.response ? (
                                              allItemmm.response.map((item) => (
                                                <CardBody key={item.id} style={{ minHeight: "5rem", padding: "1rem" }} className="bgSearch" onClick={() => {saveItemOrUpdatee(item);setQueryyy('');setIsSearchShowww(false);}}>
                                                  <div>
                                                    <b>Kode Barcode:</b> {item.barcode}
                                                  </div>
                                                </CardBody>
                                              ))
                                            ) : (
                                              <div className="text-center mb-3 text-danger">Item "{queryyy}" tidak ada bosku!</div>
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
                      <Link className="btn btn-info" to="/admin/penawaran-barang">
                        Kembali
                      </Link>
                </CardFooter>
                {/* modal */}
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
    </Container>  
    </>
  );
}

export default CreatePermintaanBarang;