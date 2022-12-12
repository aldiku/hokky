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
import moment from "moment";

const ValidasiBkkFinance = (props) => {

  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [harga, setHarga] = useState([]);
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState("");
  const [durasis, setDurasis] = useState([]);
  const [durasi, setDurasi] = useState("");
  const [payment_method,setPaymentMethod] = useState(0);
  const [keterangan, setKeterangan] = useState("");
  const [allJangkaWaktu, setAllJangkaWaktu] = useState([]);
  const [jangkaWaktu,setJangkaWaktu] = useState(0);
  const [qty, setQty] = useState([]);
  const [active1, setActive1] = useState(0);
  const [filtered1, setFiltered1] = useState([]);
  const [isShow1, setIsShow1] = useState(false);
  const [statusaf, setStatusAf] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [savedItems, setSavedItems] = useState([]);
  const [coderfq, setCodeRfq] = useState("");
  const [input, setInput] = useState("");
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
  const [isSearchShoww, setIsSearchShoww] = useState(false);
	const [allItemm, setAllItemm] = useState([]);
	const [queryy, setQueryy] = useState("");
  const [editingItem, setEditingitem] = useState([{ editing: false}]);
  const headers = { Authorization: `Bearer ${token}`};
  const [bank, setBank] = useState("");
  const[banks, setBanks] = useState([]);
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
    const [account, setAccount] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [tgl, setTgl] = useState("");
    const [debet, setDebet] = useState(0);
    const [kredit, setKredit] = useState(0);
    const [saldo, setSaldo] = useState(0);
    const [pic, setPic] = useState("");

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
            `${process.env.REACT_APP_API_BASE_URL}/bkk/get/${props.match.params.id}`,
            { headers }
          )
          .then((data) => {
            getPerson(data.data.response.person_id);
            getbank(data.data.response.payment_method);
            setKeterangan(data.data.response.keterangan1);
            getItemDataSaved();
          })
          .catch(function (error) {
            console.log(error);
          });
      };

      
  const getItemDataSaved = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/bkk/item`, {

        bkk_id: props.match.params.id

    }).then(async response => {
        let stateItem = [];

        await Promise.all(response.data.response.map(async (data) => {
            stateItem = [...stateItem, {
                warehouse_id: data.warehouse_id,
                code_invoice : data.code_invoice,
                payment_total : data.payment_total,
                keterangan2 : data.keterangan2,
				potongan: data.potongan,
                bayar : data.bayar,
                data: {
                    warehouse_id: data.warehouse_id,
                    code_invoice : data.code_invoice,
                    payment_total : data.payment_total,
                    keterangan2 : data.keterangan2,
                    potongan: data.potongan,
                    bayar : data.bayar,
                },
            }];
            // setTotalQty(data.harga * data.qty);
            // setDiskonTotal(data.qty * data.diskon_nominal);
        }));
        setSavedItems(stateItem);
    })
}
    

    useEffect(() => {
		getCoa();
	}, []);

    const getCoa = () => {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        axios
          .get(`${process.env.REACT_APP_API_BASE_URL}/account/list/${warehouse}`, { headers })
          .then((data) => {
            setAccounts(data.data.response);
          })
          .catch(function (error) {
            console.log(error);
          });
      };

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
        setPPNNEW( (qtyTotal -diskontotal) * (ppn / 100));
   }, [qtyTotal,diskontotal,ppn]);

    // hasil grandtotal
	useEffect(() => {
		setGrandTotal(( qtyTotal - totaldiskon2) + ppnnew + ongkir1- a );
	}, [qtyTotal, totaldiskon2,ppnnew, ongkir1, a]);


	useEffect(() => {
        getById4();
	}, [pajak]);

	const getById4 = () => {
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
		getPajak();
	}, []);

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

	  const searchh = async () => {
		if (Number(queryy) > 0) {
			const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/invoice-po/page`, { invoice_code: queryy , warehouse_id: parseInt(warehouse), person_id:parseInt(person) }, { headers });
			if (res.data.status !== 404) setAllItemm(res.data);
			else {
				const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/invoice-po/page`, { invoice_code: queryy, warehouse_id: parseInt(warehouse), person_id:parseInt(person) }, { headers });
				if (res.data.status !== 404) setAllItemm(res.data);
				else setAllItemm(null);
			}
		} else {
			const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/invoice-po/page`, { invoice_code: queryy, warehouse_id: parseInt(warehouse), person_id:parseInt(person) }, { headers });
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

	// save
	const saveItemOrUpdate = (item) => {
		let oldobj = savedItems.find(o => o.invoice_code === item.invoice_code);
		if(oldobj===undefined){
			setSavedItems([...savedItems,{
				invoice_code: item.invoice_code,
				tgl_tempo: item.tgl_tempo,
                payment_total : item.payment_total,
                keterangan : item.keterangan,
				potongan: 0,
                bayar : 0
			}]);
			return setTotalPrice(totalPrice + item.price * 1 - diskonglobalnominal),
					setTotalQty(qtyTotal + item.price * 1),
					setDiskonTotal(diskontotal + diskonglobalnominal * 1)
		}else{
			let index = savedItems.findIndex(e=>e.item_id===item.id);
			let updateList = savedItems;
			let minTotal = parseInt(savedItems[index].potongan) * parseInt(savedItems[index].bayar) - parseInt(savedItems[index].potongan);
			let bayarTotall = parseInt(updateList[index].potongan) * parseInt(updateList[index].bayar);
			let diskontotall = parseInt(updateList[index].potongan) * parseInt(updateList[index].bayar);
			let bayarupdate = parseInt(updateList[index].bayar)+parseInt(1);
			updateList[index] = {...updateList[index], bayar: qtyupdate};
			setSavedItems(updateList);
			let fixPrice = totalPrice - minTotal;
			let fixQty = qtyTotal - qtyTotall ;
			let fixDiskon = diskontotal - diskontotall ;
			return setTotalPrice(fixPrice + parseInt(updateList[index].potongan) * qtyupdate - diskonglobalnominal),
			setTotalQty(fixQty + parseInt(updateList[index].potongan) * qtyupdate),
			setDiskonTotal(fixDiskon + parseInt(updateList[index].potongan) * qtyupdate)
		};
	}

    const handleEditQty = (index, value) => {
        let updateList = savedItems;
        let aqtyTotal = parseInt(updateList[index].harga) + value;
        
        if(!isNaN(value) && value.length > -1){
          updateList[index] = {...updateList[index], potongan: value};
          setSavedItems(updateList);
          // setTotalPrice(totalPrice+plusTotal-minTotal);
          setTotalQty(qtyTotal + aqtyTotal);
          // setDiskonTotal(diskontotal + diskonnominal1 - diskonnominal2)
        }else{return false}
      }

      const handleEditQty1 = (index, value) => {
        let updateList = savedItems;
        let aqtyTotal = parseInt(updateList[index].harga) + value;
        
        if(!isNaN(value) && value.length > -1){
          updateList[index] = {...updateList[index], bayar: value};
          setSavedItems(updateList);
          // setTotalPrice(totalPrice+plusTotal-minTotal);
          setTotalQty(qtyTotal + aqtyTotal);
          // setDiskonTotal(diskontotal + diskonnominal1 - diskonnominal2)
        }else{return false}
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
    getPerson();
    getbank();
    getJangkaWaktu();
    getDurasiOperasional();

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
        setPerson(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getbank = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/bank/get-by-wh/${warehouse}`,
        { headers }
      )
      .then((data) => {
        setBanks(data.data.response);
        setBank(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getDurasiOperasional = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/durasi-operasional/list`,
        { headers }
      )
      .then((data) => {
        setDurasis(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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

  function CreateData() {
    setLoading(true);
    let dataItems = [];
        savedItems.map((dataItem) => dataItems = [...dataItems, 
            { 
                warehouse_id: dataItem.warehouse_id,
                code_invoice : dataItem.code_invoice,
                payment_total : dataItem.payment_total,
                keterangan2 : dataItem.keterangan,
				potongan: dataItem.potongan,
                bayar : dataItem.bayar,
            }]);
    let data = {
      warehouse_id : parseInt(warehouse),
      account_id : parseInt(bank),
      person_id : parseInt(person),
      payment_method : parseInt(bank),
      keterangan1 : keterangan,
      status_af : parseInt(statusaf),
      status_d :3,
      list : dataItems
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/bkk/update/${props.match.params.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
        //   setTimeout(() => (window.location.reload("/admin/pemasukan")), 1);
        history.push("/admin/bkk-finance");
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
    <SimpleHeader name="Validasi Kepala Finance" parentName="PO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col"> 
                <CardBody>
                <Card className="bg-secondary shadow">
                          <CardHeader className="bg-white border-0">
                              <h3>Validasi Kepala Finance</h3>
                          </CardHeader>
                    <CardBody>
                      <Row md="12">
                          <Col md="6">
                          {/* <FormGroup row>
                            <Label htmlFor="exampleFormControlSelect3"  sm={4}>
                                Tanggal Transaksi
                            </Label>
                            <Col sm={7}>
                            <Input
                                autoComplete="off"
                                id="example-date-input"
                                type="date"
                                value={tgl}
                                onChange={(e) => {
                                setTgl(e.target.value);
                                }}
                            />
                            </Col>
                            </FormGroup> */}
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
                            {/* <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Metode Pembayaran
                              </Label>
                              <Col sm={7}>
                                <Input
                                disabled
                                  name="person"
                                  type="select"
                                  value={person}
                                  onChange={(e) => {
                                    setPerson(e.target.value);
                                  }}
                                >
                                  <option value=''>Metode Pembayaran</option>
                                  {persons.map((person, key) => {
                                      return (
                                        <option key={key} value={person.id}>
                                          {person.person_name}
                                        </option>
                                      );
                                    })}
                                </Input>
                              </Col>
                            </FormGroup> */}
                            <FormGroup row>
                                <Label
                                    sm={4}
                                >
                                    Akun
                                </Label>
                                <Col sm={7}>
                                <Input
                                disabled
                                autoComplete="off"
                                    name="coa"
                                    type="select"
                                    value={bank}
                                    onChange={(e) => {
                                    setBank(e.target.value);
                                    }}
                                >
                                    <option value="" disabled selected hidden>Pilih Akun</option>
                                    {banks.map((coa, key) => {
                                    return (
                                        <option key={key} value={coa.id}>
                                        {coa.account_name}
                                        </option>
                                    );
                                    })}
                                </Input>
                                </Col>
                            </FormGroup>
                           
                            {/* <FormGroup row>
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
                                <option value="" disabled selected hidden>Pilih PPN</option>
                                  {allpajak.map((warehouse2, key) => {
                                    return (
                                        <option key={key} value={warehouse2.id}>
                                          {warehouse2.keterangan}
                                        </option>
                                    );
                                  })}
                                </Input>
														</Col>
													  </FormGroup> */}
                          </Col>
                          <Col md="6">
                            {/* <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Total Debet
                              </Label>
                              <Col sm={7}>
                                <Input
                                disabled
                                  className="form-control-alternative"
                                  type="number"
                                  placeholder="Masukan Total Debet"
                                  value={debet}
                                  onChange={(e) => {
                                    setDebet(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Total Kredit
                              </Label>
                              <Col sm={7}>
                                <Input
                                disabled
                                  className="form-control-alternative"
                                  type="number"
                                  placeholder="Masukan Total Kredit"
                                  value={kredit}
                                  onChange={(e) => {
                                    setKredit(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Total Saldo
                              </Label>
                              <Col sm={7}>
                                <Input
                                disabled
                                  className="form-control-alternative"
                                  type="number"
                                  placeholder="Masukan Total Saldo"
                                  value={saldo}
                                  onChange={(e) => {
                                    setSaldo(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup> */}
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
                                      id="customRadio8"
                                      name="custom-radio-3"
                                      type="radio"
                                      value={5}
                                      checked={statusaf === 5}
                                      onChange={() => setStatusAf(5)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio8"
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
                                      id="customRadio9"
                                      name="custom-radio-3"
                                      type="radio"
                                      value={4}
                                      checked={statusaf === 4}
                                      onChange={() => setStatusAf(4)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio9"
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
                      <h3>Invoice</h3>
                    </CardHeader>
                        <CardBody>
                          <Table size="sm" responsive>
                            <thead>
                              <tr>
                                <th hidden><b>Cabang</b></th>
                                <th><b>Kode Invoce</b></th>
                                {/* <th><b>Tgl Jatuh Tempo</b></th> */}
                                <th><b>Pembayaran</b></th>
                                <th><b>Keterangan</b></th>
                                <th><b>Potongan</b></th>
                                <th><b>Bayar</b></th>
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
                                      <td hidden>{savedItem.warehouse_id}</td>
                                      <td>{savedItem.code_invoice}</td>
                                      {/* <td>{savedItem.tgl_tempo}</td> */}
                                      <td><>{formatRupiah(savedItem.payment_total)}</></td>
                                      <td>{savedItem.keterangan2}</td>
                                      <td><>{formatRupiah(savedItem.potongan)}</></td>
                                      <td><>{formatRupiah(savedItem.bayar)}</></td>
                                      {/* <td>
                                        <Button color="danger" onClick={() => deleteItem(savedItem.item_id)}>Delete</Button>
                                      </td> */}
                                    </tr>
                                  )
                                })
                              }
                              </tbody>
                          </Table>
                        </CardBody>
                        {/* <CardFooter>
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
                      <Link className="btn btn-info" to="/admin/biaya">
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

export default ValidasiBkkFinance;