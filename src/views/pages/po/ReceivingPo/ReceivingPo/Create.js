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

const CreateReceivingPo = () => {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [isShow1, setIsShow1] = useState(false);
  const [active1, setActive1] = useState(0);
  const [filtered1, setFiltered1] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [ongkir, setOngkir] = useState([]);
  const [lainnya, setLainnya] = useState([]);
  const [pocode, setPoCode] = useState([]);
  const [input1, setInput1] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [totalPrice, setTotalPrice] = useState(0);
  const [allpajak, setAllPajak] = useState([]);
  const [pajak, setPajak] = useState(1);
  const [ppn, setPPN] = useState(0);
  const [totaldiskon, setTotalDiskon] = useState(0);
  const [grandtotal, setGrandTotal] = useState(0);
  const [diskonglobalnominal, setDiskonGlobalNominal] = useState(0);
  const [diskonglobalpersen, setDiskonGlobalPersen] = useState(0);
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

  const searchh = async () => {
		if (Number(queryy) > 0) {
			const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items-po`, { item_info: queryy , warehouse_id: parseInt(warehouse),  }, { headers });
			if (res.data.status !== 404) setAllItemm(res.data);
			else {
				const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items-po`, { item_info: queryy, warehouse_id: parseInt(warehouse), }, { headers });
				if (res.data.status !== 404) setAllItemm(res.data);
				else setAllItemm(null);
			}
		} else {
			const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items-po`, { item_info: queryy, warehouse_id: parseInt(warehouse), }, { headers });
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

  function CreateData() {
    setLoading(true);
    let dataItems = [];
        savedItems.map((dataItem) => dataItems = [...dataItems, 
            { 
                item_id: dataItem.item_id, 
                qty: dataItem.qty, 
                harga: dataItem.harga,
                diskon_persen : dataItem.diskon_persen,
                diskon_nominal : dataItem.diskon_nominal,
            }]);
    let data = {
      warehouse_id : parseInt(warehouse),
      username : username,
      code_po: pocode,
      ongkir: parseInt(ongkir),
      lainnya: parseInt(lainnya),
      person_id: parseInt(person),
      status_receive : 3, 
      keterangan: keterangan ,
      items : dataItems
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/receiving-po/save`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/receiving-po");
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

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/purchase-order/page`, {
        page: 1,
        per_page: 10,
        approve:5, 
        status_ap:5,
        status_d: 5,
        po_code: input1,
        warehouse_id: parseInt(warehouse)
        
    }).then(async response => {
        let suggests = [];

        await Promise.all(response.data.response.map((data) =>
            suggests = [...suggests, data.po_code]
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

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/purchase-order/page`, {
        page: 1,
        per_page: 1,
        approve:5, 
        status_ap:5,
        status_d: 5,
        po_code: input1,
        warehouse_id: parseInt(warehouse)
    }).then(res => {
        const length = res.data.response.length;
        if (length === 0)
            return;
            const idItem = res.data.response[0].id;

            axios.get(`${process.env.REACT_APP_API_BASE_URL}/purchase-order/get/${idItem}`)
            .then(async response => {
                return {
                    item: response.data.response,
                };
              }).then((data) => {
                getPerson(data.item.person_id);
                setPoCode(data.item.po_code);
                setLainnya(data.item.lainnya);
                setOngkir(data.item.ongkir);
                setKeterangan(data.item.keterangan);
                getItemDataSaved();
              })
              .catch(function (error) {
                console.log(error);
              });
    });
}

const getItemDataSaved = () => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/purchase-order/item-by-code`, {

        po_code: input1

    }).then(async response => {
        let stateItem = [];
        let stateEditing = [];
        await Promise.all(response.data.response.map(async (data) => {
            stateItem = [...stateItem, {
                item_id: data.item_id,
                item_name:data.item_name,
                item_code : data.item_code,
                qty: data.qty,
                harga: data.harga,
                diskon_nominal: data.diskon_nominal,
                diskon_persen: data.diskon_persen,
                data: {
                    item_name: data.item_name,
                    item_code:data.item_code,
                    satuan:data.satuan,
                    qty: data.qty,
                },
            }]; stateEditing = [...stateEditing, {
              editing: false
          }];
      }));
      setEditingitem(stateEditing);
      setSavedItems(stateItem);
    })
}

const changePriceStatus = (index, status) => {
  setEditingitem([
      ...editingItem.slice(0, index),
      Object.assign({}, editingItem[index], { editing: status }),
      ...editingItem.slice(index + 1)
  ]);
}

const changeItemDataTable = async (arg) => {
    setSavedItems([
        ...savedItems.slice(0, arg.index),
        Object.assign({}, savedItems[arg.index], {
            data: {
                item_name: arg.itemName,
                item_code: arg.item_code,
                satuan: arg.satuan,
                qty:savedItems[arg.index].qty,
                harga:savedItems[arg.index].harga,
                diskon_nominal:savedItems[arg.index].diskon_nominal,
                diskon_persen:savedItems[arg.index].diskon_persen
            }
        }),
        ...savedItems.slice(arg.index + 1)
    ]);

    changePriceStatus(arg.index, false);
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
    <SimpleHeader name="Buat Receiving PO" parentName="PO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
          <Card className="bg-secondary shadow">
                <Form onSubmit={handleSubmit}>
                    <CardHeader className="bg-white border-0">
                      <h3>Buat Receiving PO</h3>
                    </CardHeader>
                    <CardBody>
                    <Row md="12">
                          <Col md="6">
                            <Input
                            className="form-control-alternative"
                                autoComplete="off"
                                type="hidden"
                                name="desc"
                                placeholder="Masukan Keterangan"
                                value={pocode}
                                onChange={(e) => {
                                setPoCode(e.target.value);
                                }}
                            />
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Kode PO
                              </Label>
                              <Col sm={7}>
                                <Input
                                className="form-control-alternative"
                                    autoComplete="off"
                                  placeholder="Cari Kode PO"
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
                                Supplier
                              </Label>
                              <Col sm={7}>
                                <Input
                                disabled
                                className="form-control-alternative"
                                    autoComplete="off"
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
                                disabled
                                className="form-control-alternative"
                                    autoComplete="off"
                                  type="textarea"
                                  rows = "6"
                                  name="desc"
                                  placeholder="Masukan Keterangan"
                                  value={keterangan}
                                  onChange={(e) => {
                                    setKeterangan(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                          </Col>
                      </Row>
                    </CardBody>
                </Form>
              </Card>
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
                            <th><b>Qty</b></th>
                            <th><b>Satuan</b></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            savedItems.map((savedItem, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{savedItem.data.item_name}</td>
                                        <td>{savedItem.data.item_code}</td>
                                        <td hidden>{formatRupiah(savedItem.harga)}</td>
                                        <td>
                                            {editingItem[key].editing ? (
                                                    <Input
                                                    className="form-control-alternative"
                                                        autoComplete="off"
                                                        placeholder="qty"
                                                        type="number"
                                                        value={savedItems[key].qty}
                                                        onChange={(e) => {
                                                            setSavedItems([
                                                                ...savedItems.slice(0, key),
                                                                Object.assign({}, savedItems[key], { qty: e.target.value}),
                                                                ...savedItems.slice(key + 1)
                                                            ]);
                                                        }}
                                                    />
                                            ) : (
                                                        <>{savedItem.qty}</>
                                                    )}
                                        </td>
                                        <td>{savedItem.data.satuan}</td>
                                        <td hidden>{savedItem.diskon_persen}</td>
                                        <td hidden>{formatRupiah(savedItem.diskon_nominal)}</td>
                                        <td>
                                            {editingItem[key].editing ? (
                                                <>
                                                    <Button color="warning" onClick={() => changeItemDataTable({
                                                        index: key,
                                                        itemName: savedItem.data.item_name,
                                                        item_code : savedItem.data.item_code,
                                                        satuan : savedItem.data.satuan,
                                                        qty: savedItem.data.qty,
                                                        harga: savedItem.data.harga,
                                                        diskon_nominal: savedItem.data.diskon_nominal,
                                                        diskon_persen : savedItem.data.diskon_persen
                                                    })}>Update</Button>
                                                    <Button color="danger" onClick={() => {
                                                        setSavedItems([
                                                            ...savedItems.slice(0, key),
                                                            Object.assign({}, savedItems[key], { 
                                                              qty: savedItem.data.qty,
                                                              itemName: savedItem.data.item_name,
                                                              item_code : savedItem.data.item_code,
                                                              satuan : savedItem.data.satuan,}),
                                                            ...savedItems.slice(key + 1)
                                                        ]);

                                                        changePriceStatus(key, false);
                                                    }}>Cancel</Button>
                                                </>
                                            ) : (
                                                    <>
                                                        <Button color="warning" onClick={() => changePriceStatus(key, true)}>Edit</Button>
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
                <CardFooter>
                      <Button color="danger" onClick={toggle}>
                          Simpan
                      </Button>
                      <Link className="btn btn-info" to="/admin/receiving-po">
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

export default CreateReceivingPo;

