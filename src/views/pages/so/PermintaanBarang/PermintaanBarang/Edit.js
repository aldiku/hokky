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
import Select2 from "react-select2-wrapper";

export default function EditPermintaanBarang(props) {
    const token = localStorage.token;
    const warehouse = localStorage.warehouse;
    const username = localStorage.username;
    let history = useHistory();
    const [persons, setPersons] = useState([]);
    const [person, setPerson] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [rfq_code,setRfqCode] = useState("");
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
    const [isSearchShoww, setIsSearchShoww] = useState(false);
    const [allItemm, setAllItemm] = useState([]);
    const [queryy, setQueryy] = useState("");
    const headers = { Authorization: `Bearer ${token}` };
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
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
      satuan:item.satuan,
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
                    satuan : data.satuan,
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
    
    function EditData() {
      setLoading(true);
      let dataItems = [];
        savedItems.map((dataItem) => dataItems = [...dataItems, 
            { 
                item_id: dataItem.item_id, 
                qty: dataItem.qty, 
                harga : dataItem.harga,
                diskon_nominal: dataItem.diskon_nominal,
                diskon_persen : dataItem.diskon_persen,
            }]);
        let data = {
        warehouse_id : parseInt(warehouse),
        pajak_id : parseInt(pajak),
        username : username,
        customer_id: parseInt(customer),
        status_rfq: 3,
        status : 3,
        pengiriman : parseInt(pengiriman),
        type : parseInt(typereq),
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
          `${process.env.REACT_APP_API_BASE_URL}/rfq-so/update/${props.match.params.id}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
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
    <SimpleHeader name="Edit Penawaran SO" parentName="PSO" />
    <Container className="mt--6" fluid>
        <Row>
        <div className="col">
            <CardBody>
              <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                      <h3>Edit Penawaran SO</h3>
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
                                  placeholder="Diskon (N)"
                                  disabled={totalPrice < 1000}
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
                        <CardFooter >
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
                    <Button color="primary" onClick={() => EditData()}>
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
            <Modal isOpen={isConfEditableOpen} fade={false} style={{ minWidth: "70%"}}>
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
