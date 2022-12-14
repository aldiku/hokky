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

const CreateBiaya = () => {

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
			const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/account/page`, { account_name: queryy , warehouse_id: parseInt(warehouse),  }, { headers });
			if (res.data.status !== 404) setAllItemm(res.data);
			else {
				const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/account/page`, { account_name: queryy, warehouse_id: parseInt(warehouse), }, { headers });
				if (res.data.status !== 404) setAllItemm(res.data);
				else setAllItemm(null);
			}
		} else {
			const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/account/page`, { account_name: queryy, warehouse_id: parseInt(warehouse), }, { headers });
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
		let oldobj = savedItems.find(o => o.id === item.id);
		if(oldobj===undefined){
			setSavedItems([...savedItems,{
				id: item.id,
				account_name: item.account_name,
                pic : item.pic,
                note : item.note,
				account_code: item.account_code,
                debet_total : item.debet_total,
                kredit_total : item.kredit_total,
                saldo_total: item.saldo_total,
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
    getPerson();
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
        setPerson(id)
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
                id: dataItem.id,
                account_id : dataItem.id,
				account_name: dataItem.account_name,
                pic : dataItem.pic,
                note : dataItem.note,
				account_code: dataItem.account_code,
                debet_total : dataItem.debet_total,
                kredit_total : dataItem.kredit_total,
                saldo_total: dataItem.saldo_total,
            }]);
    let data = {
      warehouse_id : parseInt(warehouse),
      account_id : parseInt(account),
      tgl_transaksi: tgl,
      pic : pic,
      note : keterangan,
      debet_total : parseInt(debet),
      kredit_total : parseInt(kredit),
      saldo_total : parseInt(saldo),
      keterangan: keterangan,
      keluaran : dataItems
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/account-journal/keluaran-lain/save`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          setTimeout(() => (window.location.reload("/admin/biaya")), 1);
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
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/rfq-po/page`, {

        page: 1,
        per_page: 10,
        rfq_code: input1,
        status_rfq: 5,
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

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/rfq-po/page`, {
        page: 1,
        per_page: 1,
        rfq_code: input1,
        warehouse_id : parseInt(warehouse),
    }).then(res => {
        const length = res.data.response.length;
        if (length === 0)
            return;
            const idItem = res.data.response[0].id;
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/rfq-po/get/${idItem}`)
            .then(async response => {
                return {
                    item: response.data.response,
                };
              }).then((data) => {
                getPerson(data.item.person_id);
                setCodeRfq(data.item.rfq_code);
                setKeterangan(data.item.keterangan);
                getItemDataSaved();
              })
              .catch(function (error) {
                console.log(error);
              });
    });
}

const getItemDataSaved = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/rfq-po/item-by-code`, {

        rfq_code: input1

    }).then(async response => {
        let stateItem = [];

        await Promise.all(response.data.response.map(async (data) => {
          console.log(data);
            stateItem = [...stateItem, {
                editing:false,
                item_id: data.item_id,
                item_name:data.item_name,
                qty: data.qty,
                satuan : data.satuan,
                harga: 1,
                diskon_persen: data.diskon_persen,
                diskon_nominal: data.diskon_nominal,
                data: {
                    item_name: data.item_name,
                    harga: 1,
                    diskon_persen: data.diskon_persen,
                    diskon_nominal: data.diskon_nominal,
                    qty: data.qty,
                },
            }];
        }));
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
    <SimpleHeader name="Buat Biaya Lain Lain" parentName="PO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col"> 
                <CardBody>
                <Card className="bg-secondary shadow">
                          <CardHeader className="bg-white border-0">
                              <h3>Akun Asal</h3>
                          </CardHeader>
                    <CardBody>
                      <Row md="12">
                          <Col md="6">
                          <FormGroup row>
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
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                PIC
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Pic"
                                  value={pic}
                                  onChange={(e) => {
                                    setPic(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                           
                            <FormGroup row>
                                <Label
                                    sm={4}
                                >
                                    Akun
                                </Label>
                                <Col sm={7}>
                                <Input
                                autoComplete="off"
                                    name="coa"
                                    type="select"
                                    value={account}
                                    onChange={(e) => {
                                    setAccount(e.target.value);
                                    }}
                                >
                                    <option value="" disabled selected hidden>Pilih Akun</option>
                                    {accounts.map((coa, key) => {
                                    return (
                                        <option key={key} value={coa.id}>
                                        {coa.account_name} {coa.account_code}
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
                            {/* <FormGroup row>
                                <Label for="exampleEmail" sm={4}>
                                    PPN
                                </Label>
                                <Col sm={7}>
                                    <Input
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
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Total Debet
                              </Label>
                              <Col sm={7}>
                                <Input
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
                                  className="form-control-alternative"
                                  type="number"
                                  placeholder="Masukan Total Saldo"
                                  value={saldo}
                                  onChange={(e) => {
                                    setSaldo(e.target.value);
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
                      <h3>Akun Tujuan</h3>
                    </CardHeader>
                        <CardBody>
                          <Table size="sm" responsive>
                            <thead>
                              <tr>
                                <th hidden><b>Id Akun</b></th>
                                <th><b>Nama Akun</b></th>
                                <th><b>Kode Akun</b></th>
                                <th><b>PIC</b></th>
                                <th><b>Note</b></th>
                                <th><b>Debet</b></th>
                                <th><b>Kredit</b></th>
                                <th><b>Saldo</b></th>
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
                                      <td hidden>{savedItem.id}</td>
                                      <td>{savedItem.account_name}</td>
                                      <td>{savedItem.account_code}</td>
                                      <td>{savedItem.pic}</td>
                                      <td>{savedItem.note}</td>
                                      <td>{savedItem.debet_total}</td>
                                      <td>{savedItem.kredit_total}</td>
                                      <td>{savedItem.saldo_total}</td>
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
                                            placeholder="Masukan Account"
                                            type="search"
                                            onKeyDown={searchh}
                                            value={queryy}
                                            onChange={(e) => setQueryy(e.target.value)}
                                          />
                                        {isSearchShoww && queryy && (
                                        <Card className="position-sticky boxShadow" style={{ maxHeight: "15.5rem", overflowY: "auto", paddingTop: "1rem", position: "relative" }}>
                                          <div style={{ position: "absolute", top: "2.5px", right: "1rem", cursor: "pointer", fontSize: "1rem" }}>
                                            <i className="fas fa-window-close text-danger" onClick={() => setIsSearchShoww(false)}></i>
                                          </div>
                                          {allItemm?.response ? (
                                            allItemm.response.map((item) => (
                                              <CardBody key={item.id} style={{ minHeight: "5rem", padding: "1rem" }} className="bgSearch" onClick={() => {saveItemOrUpdate(item);setQueryy('');setIsSearchShoww(false);}}>
                                                <div>
                                                  <b>Nama Akun:</b> {item.account_name}
                                                </div>
                                              </CardBody>
                                            ))
                                          ) : (
                                            <div className="text-center mb-3 text-danger">Akun "{queryy}" tidak ada bosku!</div>
                                          )}
                                        </Card>
                                      )}
                                  </Form></>
                                  </td>
                                 </tr>
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
    </Container>
    </>
  );
}

export default CreateBiaya;