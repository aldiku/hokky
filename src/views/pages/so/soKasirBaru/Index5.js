/*eslint-disable*/
import React, { useEffect, useState, useRef } from "react";
import { Card, CardBody, Row, Col, Input, Container,CardFooter,InputGroupText,FormGroup, Form, Table, Button,InputGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import { Br, Cut, Line, Printer, Text} from 'react-thermal-printer';

// cetak
import { useReactToPrint } from 'react-to-print';
import { ViewCetakSoKasir } from "utils/CetakCetak1";
import { customerkasir} from "views/pages/CustomerKasir/Index"

export default function CreateSalesOrder() {
	const token = localStorage.token;
	const warehouse = localStorage.warehouse;
	const username = localStorage.username;
    const [isLoading, setLoading] = useState(false);
	const name = localStorage.name;

	// cetak
	const componentCetakSoKasir = useRef();
	const handleCetak = useReactToPrint({
		content: () => componentCetakSoKasir.current,
	});
	function simpanCetakSoKasir (data) {
		axios.post(`${process.env.REACT_APP_API_BASE_URL}/sales-order/cashier/save`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then(function () {
			handleCetak();
			setIsKembalianOpen(true);
			setTimeout(() => setIsKembalianOpen(false), 5000);
			// setTimeout(() => (window.location.reload("/admin/kasir-sales-order/so-kasir")), 5000);
		})
		.then((json) => {
			setLoading(false);
		})
		.catch(function (error) {
			console.log(error);
		});
	};

	// tampilan
	const [isKembalianOpen, setIsKembalianOpen] = useState(false);
	const [alamatKirimDisabled, setAlamatKirimDisabled] = useState(false);
	const [addingItem, setAddingItem] = useState(false);
	const [addingItemm, setAddingItemm] = useState(false);
	let history = useHistory();
	const [isOpen, setIsOpen] = useState(false);
    const [isOpenCustomer, setIsOpenCustomer] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
	const [barcode, setBarcode] = useState("");
	const [pengiriman, setPengiriman] = useState([]);
	const [customers, setCustomers] = useState([]);
	const [customer, setCustomer] = useState(1);
	const [payment_method1, setPaymentMethod1] = useState([]);
	const [payment_method2, setPaymentMethod2] = useState([]);
	const [keterangan1, setKeterangan1] = useState("");
	const [keterangan2, setKeterangan2] = useState("");
	const [savedItems, setSavedItems] = useState([]);
	// const [isShow, setIsShow] = useState(false);
	// const [active, setActive] = useState(0);
	// const [filtered, setFiltered] = useState([]);
	// const [qty, setQty] = useState(1);
	const [payment_method, setPaymentMethod] = useState([]);
	const [pay1, setPay1] = useState(0);
	const [pay2, setPay2] = useState(0);
	const [change, setChange] = useState(0);
	const [banks, setBanks] = useState([]);
	const [jenisTransaksi, setJenisTransaksi] = useState("");
	const [ppn, setPPN] = useState(0);
	const [ongkir, setOngkir] = useState(0);
	const [ongkir1, setOngkir1] = useState(0);
	const [totaldiskon, setTotalDiskon] = useState(0);
    const [totaldiskon1, setTotalDiskon1] = useState(0);
	const [grandtotal, setGrandTotal] = useState(0);
	const [editingItem, setEditingitem] = useState([{ editing: false}]);
	const [alamatcustomer, setAlamatCustomer] = useState("");
	const [alamatlain, setAlamatLain] = useState("");
	const [diskonglobalnominal, setDiskonGlobalNominal] = useState(0);
	const [diskonglobalpersen, setDiskonGlobalPersen] = useState(0);
	const [pajak, setPajak] = useState(1);
	const [allpajak, setAllPajak] = useState([]);
	const [sales, setSales] = useState("");
	const [itemIdd, setItemIdd] = useState("");
	const [itemIddd, setItemIddd] = useState("");
	const [allItemm, setAllItemm] = useState([]);
	const [allItemmm, setAllItemmm] = useState([]);
	const [queryy, setQueryy] = useState("");
	const [queryyy, setQueryyy] = useState("");
	const [isSearchShoww, setIsSearchShoww] = useState(false);
	const [isSearchShowww, setIsSearchShowww] = useState(false);
	const [ppnnew, setPPNNEW] = useState(0);
	const [diskonglobal, setDiskonGLobal] = useState(0);
    const [totalPrice1, setTotalPrice1] = useState(0);
	const headers = { Authorization: `Bearer ${token}` };
    const [diskonglobalnominal1, setDiskonGlobalNominal1] = useState(0)
    const [a, setA] = useState(0);
	const [b, setB] = useState(0);
    const [namecustomer, setNameCustomer] = useState("");
    const [provinces, setProvinces] = useState([]);
    const [province, setProvince] = useState("");
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
	const [pricetype, setPriceType] = useState("");

    function CreateDataCustomer() {
        setLoading(true);
        let data = {
          name: namecustomer,
          active_flag: 1,
          province: province,
          city: city,
          address: address,
          phone: phoneNumber,
          email: email,
		  price_type : pricetype,
        }
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/customer/save`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
          .then(function (response) {
            // history.push("/admin/customer");
            getCustomer();
            setIsOpenCustomer(!isOpenCustomer)

          })
          .then(json => {
            setLoading(false);
          })
          .catch(function (error) {
            console.log(error)
          })
      }

    useEffect(() => {
        getProvince();
      }, []);
    
      const getProvince = () => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/province/list`, { headers
        })
        .then(data => {
            setProvinces(data.data.response_data)
        })
          .catch(function (error) {
            console.log(error)
          })
      }
    
      const getCity = (provinceId) => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/city?province_id=${provinceId}`, { headers
        })
        .then(data => {
            setCities(data.data.response_data)
        })
          .catch(function (error) {
            console.log(error)
          })
      }

    useEffect(() => {
		setDiskonGlobalNominal1(diskonglobalnominal);
	}, [diskonglobalnominal]);

    // diskon bayangan
    useEffect(() => {
		setTotalDiskon(diskonglobalnominal1);
	}, [diskonglobalnominal1]);

    //diskon tampil
    useEffect(() => {
		setTotalDiskon1(totaldiskon - a);
	}, [totaldiskon, a]);


	//ongkir tampil
	useEffect(() => {
		setOngkir1(ongkir - b);
	}, [ongkir, b]);


    useEffect(() => {
		setTotalPrice1( totalPrice - ppnnew + totaldiskon1 + ongkir1 );
	}, [totalPrice, ppnnew,totaldiskon1, ongkir1]);


    // diskonglobalnominal dan persen
    useEffect(() => {
		diskonglobalnominal && diskonglobal === "diskonglobalnominal" && setDiskonGlobalPersen((diskonglobalnominal / totalPrice) * 100);
		diskonglobalpersen && diskonglobal === "diskonglobalpersen"  && setDiskonGlobalNominal(totalPrice * (diskonglobalpersen / 100));
	}, [diskonglobalnominal, totalPrice, diskonglobalpersen]);

    // hasil nominal dari PPN
    useEffect(() => {
        setPPNNEW(grandtotal * (ppn / 100));
   }, [grandtotal,ppn]);

    // hasil grandtotal
	useEffect(() => {
		setGrandTotal((totalPrice - totaldiskon1 + ongkir1 - a) );
	}, [totalPrice, totaldiskon1, ongkir1, a]);


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
        getById2();
	}, [customer]);

	const getById2 = () => {
	    const headers = {
	      "Content-Type": "application/json",
	      Authorization: `Bearer ${token}`,
	    };
	    axios
	      .get(
	        `${process.env.REACT_APP_API_BASE_URL}/customer/get/${customer}`,
	        { headers }
	      )
	      .then((data) => {
            setAlamatCustomer(data.data.response.address)
	      })
	      .catch(function (error) {
	        console.log(error);
	      });
	  };

	useEffect(() => {
		getCustomer();
		getBank();
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

	const getCustomer = () => {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		};
		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/customer/list`, { headers })
			.then((data) => {
				setCustomers(data.data.response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const getBank = () => {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		};
		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/bank/get-by-wh/${warehouse}`, { headers })
			.then((data) => {
				setBanks(data.data.response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	  const searchh = async () => {
		if (Number(queryy) > 0) {
			const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items`, { item_name: queryy , warehouse_id: parseInt(warehouse),  }, { headers });
			if (res.data.status !== 404) setAllItemm(res.data);
			else {
				const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items`, { item_name: queryy, warehouse_id: parseInt(warehouse), }, { headers });
				if (res.data.status !== 404) setAllItemm(res.data);
				else setAllItemm(null);
			}
		} else {
			const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items`, { item_name: queryy, warehouse_id: parseInt(warehouse), }, { headers });
			if (res.data.status !== 404) setAllItemm(res.data);
			else setAllItemm(null);
		}
		setIsSearchShoww(true);
	};

	const searchhh = async () => {
		if (Number(queryy) > 0) {
			const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items`, { item_code: queryyy , warehouse_id: parseInt(warehouse),  }, { headers });
			if (res.data.status !== 404) setAllItemmm(res.data);
			else {
				const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items`, { item_code: queryyy, warehouse_id: parseInt(warehouse), }, { headers });
				if (res.data.status !== 404) setAllItemmm(res.data);
				else setAllItemmm(null);
			}
		} else {
			const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/items`, { item_code: queryyy, warehouse_id: parseInt(warehouse), }, { headers });
			if (res.data.status !== 404) setAllItemmm(res.data);
			else setAllItemmm(null);
		}
		setIsSearchShowww(true);
	};

	// save
	const saveItemOrUpdate = (item) => {
		const diskonnominal = 0 ;
		const diskonpersen = 0 ;
		const qtydef = 1;
		let oldobj = savedItems.find(o => o.item_id === item.id);
		if(oldobj===undefined){
			setSavedItems([...savedItems,{
				item_id: item.id,
				item_name: item.item_name,
				item_code: item.item_code,
				barcode: barcode,
				qty: qtydef,
				diskon_nominal : diskonnominal,
				diskon_persen:  diskonpersen,
				harga: item.price,
			}]);
			setEditingitem([...editingItem, {
				editing: false
			}]);
			return setTotalPrice(totalPrice + item.price * qtydef - diskonnominal);
		}else{
			let findedindex = savedItems.findIndex(e=>e.item_id===item.id);
			let updateList = savedItems;
			let qtyupdate = updateList[findedindex].qty+1;
			updateList[findedindex] = {...updateList[findedindex], qty: qtyupdate};
			setSavedItems(updateList);
			return setTotalPrice(updateList[findedindex].harga * qtyupdate - diskonnominal);
		};
		// const headers = {
		// 		"Content-Type": "application/json",
		// 		Authorization: `Bearer ${token}`,
		// 	};
		// 	axios
		// 		.get(
		// 			`${process.env.REACT_APP_API_BASE_URL}/items-by-price?item_id=${itemIdd}&qty=${qtyy}
	    //             `,
		// 			{ headers }
		// 		)
		// 		.then(async (response) => {
		// 			await Promise.all(
		// 				response.data.response.map(async (saveditem) => {
		// 					let index = savedItems.findIndex(object => {
		// 						return object.item_id === itemIdd;
		// 					});
		// 					if(index===-1){
		// 						setSavedItems([...savedItems, {
		// 							item_id: itemIdd,
		// 							item_name: saveditem.item_name,
		// 							barcode: saveditem.barcode,
		// 							qty: qtyy,
		// 							diskon_nominal : diskonnominal,
		// 							diskon_persen:  diskonpersen,
		// 							harga: saveditem.harga,
		// 							data: {
		// 								item_name: saveditem.item_name,
		// 								harga: saveditem.harga,
		// 								barcode: saveditem.barcode,
		// 								diskon_nominal : diskonnominal,
		// 								diskon_persen: diskonpersen,
		// 								qty: qtyy,
		// 							},
		// 						}]);
		// 						setEditingitem([...editingItem, {
		// 							editing: false
		// 						}]);
		// 						setTotalPrice(totalPrice + saveditem.harga * qty - saveditem.diskon_nominal);
		// 					}else{
		// 						savedItems.map(async (item)=>{
		// 							if(item.item_id===itemIdd){
		// 								const settt = {
		// 									...item,
		// 									qty: 20,
		// 									harga: item.harga,
		// 									data: {
		// 										item_name: item.item_name,
		// 										harga: item.harga,
		// 										barcode: item.barcode,
		// 										diskon_nominal : diskonnominal,
		// 										diskon_persen: diskonpersen,
		// 										qty: 20,
		// 									},
		// 								};
		// 								setEditingitem([...editingItem, {
		// 									editing: false
		// 								}]);
		// 								return setSavedItems(settt);
		// 							};
		// 						});
		// 					};
		// 				})
		// 			);
		// 		});
	}

	const saveItemOrUpdatee = (item) => {
		const diskonnominal = 0 ;
		const diskonpersen = 0 ;
		const qtydef = 1;
		let oldobj = savedItems.find(o => o.item_id === item.id);
		if(oldobj===undefined){
			setSavedItems([...savedItems,{
				item_id: item.id,
				item_name: item.item_name,
				item_code: item.item_code,
				barcode: barcode,
				qty: qtydef,
				diskon_nominal : diskonnominal,
				diskon_persen:  diskonpersen,
				harga: item.price,
			}]);
			setEditingitem([...editingItem, {
				editing: false
			}]);
			return setTotalPrice(totalPrice + item.price * qtydef - diskonnominal);
		}else{
			let findedindex = savedItems.findIndex(e=>e.item_id===item.id);
			let updateList = savedItems;
			let qtyupdate = updateList[findedindex].qty+1;
			updateList[findedindex] = {...updateList[findedindex], qty: qtyupdate};
			setSavedItems(updateList);
			return setTotalPrice(updateList[findedindex].harga * qtyupdate - diskonnominal);
		};
		
	}

    const saveItem = (data) => {
        const diskonnominal = 0 ;
        const diskonpersen = 0 ;
        const qtyy = 1;
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        axios
            .get(
                `${process.env.REACT_APP_API_BASE_URL}/items-by-barcode?barcode=${barcode}&warehouse_id=${warehouse}&qty=${qtyy}
                `,{headers}
            )
            .then(async (datas) => {
                    let oldobj = savedItems.find(o => o.item_id === datas.id);
                    if(oldobj===undefined){
                        datas.data.response.map(async (datas) => {
                        setSavedItems([...savedItems,{
                            item_id: datas.id,
                            item_name: datas.item_name,
							item_code : datas.item_code,
                            barcode: barcode,
                            qty: qtyy,
                            diskon_nominal : diskonnominal,
                            diskon_persen:  diskonpersen,
                            harga: datas.harga,
                        }]);
                        setEditingitem([...editingItem, {
                            editing: false
                        }]);
                        return setTotalPrice(totalPrice + datas.harga * qtyy - diskonnominal);
                    })
                    }
                    else {
                        let findedindex = savedItems.findIndex(e => e.item_id === datas.id);
                        let updateList = savedItems;
                        let qtyupdate = updateList[findedindex].qty+1;
                        updateList[findedindex] = {...updateList[findedindex], qty: qtyupdate};
                        setSavedItems(updateList);
                        return setTotalPrice(updateList[findedindex].harga * qtyupdate - diskonnominal);
                    };
                });
            // .then(async (response) => {
            //     let oldobj = savedItems.find(o => o.item_id === response.id);
            //     // const idd = datas.id
            //     if(oldobj===undefined){
            //     let stateItem = [];
            //     await Promise.all(
            //         response.data.response.map(async (data) => {
            //             stateItem = [
            //                 ...savedItems,
            //                 {
            //                     item_id: data.id,
            //                     item_name: data.item_name,
            //                     barcode: barcode,
            //                     qty: qtyy,
            //                     diskon_nominal : diskonnominal,
            //                     diskon_persen:  diskonpersen,
            //                     harga: data.harga,
            //                     data: {
            //                         item_name: data.item_name,
            //                         harga: data.harga,
            //                         diskon_nominal : diskonnominal,
            //                         diskon_persen: diskonpersen,
            //                           qty: qtyy,
            //                     },
            //                 },
            //             ];
            //             let stateEditing = [...editingItem, {
            //                 editing: false
            //             }];
            //             setEditingitem(stateEditing);
            //             setTotalPrice(totalPrice + data.harga * qty - data.diskon_nominal);
            //             setSavedItems(stateItem);
            //         })
            //     );
            // }
            // else {
            //     let findedindex = savedItems.findIndex(e => e.item_id===response.id);
            //     let updateList = savedItems;
            //     let qtyupdate = updateList[findedindex].qty+1;
            //     updateList[findedindex] = {...updateList[findedindex], qty: qtyupdate};
            //     setSavedItems(updateList);
            //     return setTotalPrice(updateList[findedindex].harga * qtyupdate - diskonnominal);
            // };
            // });
            }

	

const handleSubmit = async (e) => {
    e.preventDefault();
    {
        saveItem();
        setBarcode("");
        setQueryy("");
        setIsSearchShoww("");
    }
};

const handleSubmit1 = async (e) => {
        e.preventDefault();
        {
            CreateDataCustomer();
            setNameCustomer("");
            setAddress("");
            setEmail("");
            setCity("");
            setProvince("");
            setPhoneNumber("");
			setPriceType("");
        }
      }

	const deleteItem = (id) => {
		let array = [...savedItems];

		let index = array.findIndex(object => {
			return object.item_id === id;
		});

		if (index !== -1) {
			setTotalPrice(totalPrice - array[index].harga * array[index].qty - array[index].diskon_nominal);
			array.splice(index, 1);
			setSavedItems(array);
		}
	}

	const changePriceStatus = (index, status) => {
	  setEditingitem([
		  ...editingItem.slice(0, index),
		  Object.assign({}, editingItem[index], { editing: status }),
		  ...editingItem.slice(index + 1)
	  ]);
	}

	const changeItemDataTable = async (arg) => {
		setTotalPrice(totalPrice + arg.harga * savedItems[arg.index].qty - savedItems[arg.index].diskon_nominal);

		setSavedItems([
			...savedItems.slice(0, arg.index),
			Object.assign({}, savedItems[arg.index], {
				data: {
					item_name: arg.itemName,
					qty:savedItems[arg.index].qty,
					harga: arg.harga,
					diskon_nominal: savedItems[arg.index].diskon_nominal,
					diskon_persen: savedItems[arg.index].diskon_persen,
				}
			}),
			...savedItems.slice(arg.index + 1)
		]);

		changePriceStatus(arg.index, false);
	}

	const formatRupiah = (money) => {
		return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(money);
	};

	return (
		<>
			<SimpleHeader name="Cashier" parentName="SO" />
			<Container className="mt--6" fluid>
				<Row>
					<div className="col">
						<Card className="bg-secondary shadow">
							<CardBody>
								<Row>
									<Col xs={6} className="mb-3">
										<textarea
											className="form-control"
											disabled
											style={{
												fontWeight: 'bold',
												fontSize: 50,
												paddingTop: 20,
												top: "50%",
												height: 117,
												resize: "none",
											}}
											value={"Rp." + grandtotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}></textarea>
									</Col>
									<Col xs={3}>
										<Label>
											<b>SHIFT : "{name}"</b>
										</Label>
									</Col>
									<Col xs={3} className="mb-3">
										<Button
											style={{
												fontSize: 40,
												paddingTop: 10,
												height: 117,
												resize: "none",
												}}
											block
											color="primary"
											onClick={() => setIsOpen(!isOpen)}>
												Bayar
										</Button>
									</Col>
								</Row>
                                <Form onSubmit={handleSubmit}>
                                    <Row className="mb-3">
                                            <Col xs={3}>
												<Input
                                                    style={{marginTop:'20px'}}
                                                	autoComplete="off"
                                                    name="customer"
                                                    placeholder="Masukan Barcode"
                                                    type="text"
                                                    value={barcode}
                                                    onChange={(e) => {
                                                        setBarcode(e.target.value);
                                                    }}  
												/>
											</Col>
                                            <Button type="submit" hidden><i className="fa fa-search" /></Button>
                                        <Col xs={3}>
                                            <Input
                                                style={{marginTop:'20px'}}
                                                autoComplete="off"
                                                    // className="form-control-alternative"
                                                    name="customer"
                                                    placeholder="Masukan Nama Sales"
                                                    type="text"
                                                    value={sales}
                                                    onChange={(e) => {
                                                        setSales(e.target.value);
                                                    }}
                                                />
                                        </Col>
                                        <Col xs={3}>
                                        </Col>
                                        <Col xs={3}>
                                            <Link className="btn btn-danger mt-4" to="/admin/kasir-sales-order/detail">
                                                    Closing Cashier
                                            </Link>
                                        </Col>
                                    </Row>
                                </Form>
								<Row className="mb-3">
									<Col xs={3}>
										<InputGroup>
										<Input
                                            autoComplete="off"
											// className="form-control-alternative"
											name="customer"
											type="select"
											value={customer}
											onChange={(e) => {
												setCustomer(e.target.value);
											}}>
											<option value="" disabled selected hidden>Pilih Customer</option>
											{customers.map((customer, key) => {
												return (
													<option key={key} value={customer.id}>
														{customer.name}
													</option>
												);
											})}
                                            {/* <option value="https://erp.hokkybangunan.co.id" >Tambah Customer</option> */}
										</Input>
										<Button
											// onClick={() => setIsOpenCustomer(!isOpenCustomer)}
                                            onClick={() => setIsOpenCustomer(!isOpenCustomer)}
											color="secondary"
											type="button">
											<i className="ni ni-fat-add" />
										</Button>
										</InputGroup>
									</Col>
									<Col xs={3}>
										<Input
                                            autoComplete="off"
											// className="form-control-alternative"
											placeholder="Masukan Alamat Customer"
											name="Tipe Request"
											type="text"
											value={alamatcustomer}
											onChange={(e) => {
												setAlamatCustomer(e.target.value);
											}}
											/>
									</Col>
                                    {/* {jenisTransaksi === 2 && ( */}
									<Col xs={3}>
										<Input
                                            autoComplete="off"
											// className="form-control-alternative"
											name="customer"
											placeholder="Masukan Alamat Kirim "
											type="text"
											value={alamatlain}
											onChange={(e) => {
												setAlamatLain(e.target.value);
											}}
											disabled={alamatKirimDisabled}
										/>
									</Col>
                                    {/* )} */}
								</Row>
								<Row className="mb-3">
									{/* <Col xs={0.3}>
										<Label
											for="exampleEmail"
											sm={2}
										>
											%
										</Label>
									</Col> */}
									<Col xs={3}>
									<Label style={{ color: "darkgray", fontSize: "14px" }}>Diskon (persen) :</Label>
									<InputGroup>
											<InputGroupText>
											 %
											</InputGroupText>
										<Input
                                        	autoComplete="off"
											name="customer"
											placeholder="Masukan Diskon (%)"
											type="text"
											disabled={totalPrice < 1000}
											value={diskonglobalpersen}
											onChange={(e) => {
												setDiskonGlobalPersen(e.target.value);
											}}
											onClick={() => setDiskonGLobal("diskonglobalpersen")}
										/>
										</InputGroup>
									</Col>
									<Col xs={3}>
									<Label style={{ color: "darkgray", fontSize: "14px" }}>Diskon (Nominal) :</Label>
										<InputGroup>
											<InputGroupText>
											Rp
											</InputGroupText>
											<Input
												autoComplete="off"
												name="customer"
												disabled={totalPrice < 1000}
												placeholder="Masukan Diskon (N)"
												type="text"
												value={diskonglobalnominal}
												onChange={(e) => {
													setDiskonGlobalNominal(e.target.value);
												}}
												onClick={() => setDiskonGLobal("diskonglobalnominal")}
											/>
										</InputGroup>
									</Col>
									<Col xs={3}>
									<Label style={{ color: "darkgray", fontSize: "14px" }}>Pajak :</Label>
                                    <Input
                                    autoComplete="off"
											// className="form-control-alternative"
											name="customer"
											type="select"
											value={pajak}
											onChange={(e) => {
												setPajak(e.target.value);
											}}>
											<option value="" disabled selected hidden>Pilih PPN</option>
											{allpajak.map((customer, key) => {
												return (
													<option key={key} value={customer.id}>
														{customer.keterangan}
													</option>
												);
											})}
										</Input>
									</Col>
								</Row>
								<Row>
										<Col xs={3}>
											<Input
                                            autoComplete="off"
												// className="form-control-alternative"
												name="Tipe Po"
												type="select"
												value={payment_method}
												onChange={(e) => {
													setPaymentMethod(e.target.value);
												}}>
												<option value="" selected disabled hidden>Jenis Transaksi</option>
												<option value={1} >
													Tunai
												</option>
												<option value={3} >
													Inden DP
												</option>
												<option value={4} >
													Inden Lunas
												</option>
											</Input>
										</Col>
										<Col xs={3}>
											<Input
                                            autoComplete="off"
												// className="form-control-alternative"
												name="Tipe Request"
												type="select"
												value={pengiriman}
												onChange={(e) => {
													setPengiriman(e.target.value);
												}}>
												<option value="" selected disabled hidden>Pilih Pengiriman</option>
												<option value={1} onClick={()=> setAlamatKirimDisabled(false)}>Ambil Sendiri</option>
												<option value={2} onClick={() => {setJenisTransaksi(2); setAlamatKirimDisabled(false)}}>
													Delivery
												</option>
												<option value={3} onClick={()=> setAlamatKirimDisabled(false)}>Kurir</option>
											</Input>
										</Col>
										<Col xs={3}>
										<InputGroup>
											<InputGroupText>
											 Ongkir
											</InputGroupText>
											<Input
												autoComplete="off"
												name="Tipe Request"
												type="number"
												value={ongkir}
												onChange={(e) => {
													setOngkir(e.target.value);
												}} />
											</InputGroup>
										</Col>
								</Row>
								<br></br>
								<br></br>
								<br></br>
								<Table>
									<thead>
										<tr>
											<th>Nama Item</th>
											<th>Kode Item</th>
											<th>Harga</th>
											<th>Qty</th>
											<th>Diskon %</th>
											<th>Diskon (N)</th>
											<th>Sub Total</th>
											<th>
                                                {/* <Button style={{
												fontSize: 12,
												height: 30,
												paddingTop: 4,
												resize: "none",
												}} color="success" onClick={() => setAddingItem(true)} disabled={addingItem}>+ ITEM</Button> */}
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
														<td>{formatRupiah(savedItem.harga)}</td>
														<td>
															{editingItem[key].editing ? (
																	<Input
																	className="form-control-alternative"
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
														<td>
															{/* {editingItem[key].editing ? (
																<Input
																className="form-control-alternative"
																	placeholder="Diskon Persen"
																	type="number"
																	value={savedItems[key].diskon_persen}
																	onChange={(e) => {
																		setSavedItems([
																			...savedItems.slice(0, key),
																			Object.assign({}, savedItems[key], { diskon_persen: e.target.value, totalPrice: savedItem.data.harga * savedItem.qty / e.target.value}),
																			...savedItems.slice(key + 1)
																		]);
																	}}
																/>
															) : (
                                                                <>{savedItem.diskon_persen}</>
                                                            )} */}
															<>{savedItem.diskon_persen}</>
														</td>
														<td>
															{/* {editingItem[key].editing ? (
																<Input
																className="form-control-alternative"
																	placeholder="Diskon nominal"
																	type="number"
																	value={savedItems[key].diskon_nominal}
																	onChange={(e) => {
																		setSavedItems([
																			...savedItems.slice(0, key),
																			Object.assign({}, savedItems[key], { diskon_nominal: e.target.value, totalPrice: savedItem.data.harga * savedItem.qty - e.target.value }),
																			...savedItems.slice(key + 1)
																		]);
																	}}
																/>
															) : (
                                                                <>{formatRupiah(savedItem.diskon_nominal)}</>
                                                            )} */}
															<>{formatRupiah(savedItem.diskon_nominal)}</>
														</td>
														<td>
															{editingItem[key].editing ? (
																<Input
																className="form-control-alternative"
																	placeholder="Total"
																	type="number"
																	value={savedItems[key].totalPrice}
																	disabled
																/>
															) : (
																<>{formatRupiah(savedItem.harga * savedItem.qty - savedItem.diskon_nominal)}</>
                                                            )}
														</td>
														<td>
															{editingItem[key].editing ? (
																<>
																	<Button color="warning" onClick={() => changeItemDataTable({
																		index: key,
																		itemName: savedItem.item_name,
																		qty: savedItem.qty,
																		harga : savedItem.harga,
																		diskon_nominal: savedItem.diskon_nominal,
																		diskon_persen: savedItem.diskon_persen,
																	})}>Update</Button>
																	<Button color="danger" onClick={() => {
																		setSavedItems([
																			...savedItems.slice(0, key),
																			Object.assign({}, savedItems[key], {
																				itemName: savedItem.data.item_name,
																				harga: savedItem.data.harga,
																				diskon_nominal: savedItem.data.diskon_nominal,
																				diskon_persen: savedItem.data.diskon_persen,
																				qty: savedItem.data.qty,}),
																			...savedItems.slice(key + 1)
																		]);

																		changePriceStatus(key, false);
																	}}>Cancel</Button>
																</>
															) : (
                                                                <>
                                                                    <Button color="warning" onClick={() => changePriceStatus(key, true)}>Edit</Button>
                                                                    <Button color="danger" onClick={() => deleteItem(savedItem.item_id)}>Delete</Button>
                                                                </>
                                                            )}
														</td>
													</tr>
												)
											})
										}
                                            <tr>
											<td>
													
													{/* <Form onSubmit={handleSubmit}>
                                    <Row className="mb-3">
                                            <Col xs={3}>
												<Input
                                                    style={{marginTop:'20px'}}
                                                	autoComplete="off"
                                                    name="customer"
                                                    placeholder="Masukan Barcode"
                                                    type="text"
                                                    value={barcode}
                                                    onChange={(e) => {
                                                        setBarcode(e.target.value);
                                                    }}  
												/>
											</Col>
                                            <Button type="submit" hidden><i className="fa fa-search" /></Button>
                                    </Row>
                                </Form> */}
												
                                                    <Input
                                                        style={{marginTop:'6px'}}
                                                        autoComplete="off"
                                                        placeholder="Masukan Item"
                                                        type="search"
                                                        onKeyDown={searchh}
                                                        value={queryy}
                                                        onChange={(e) => setQueryy(e.target.value)}
                                                    />
                                                    {/* <Button type="submit"><i className="fa fa-search" /></Button> */}
                                                    {/* </InputGroup> */}
                                                    {isSearchShoww && queryy && (
                                                    <Card className="position-sticky boxShadow" style={{ maxHeight: "15.5rem", overflowY: "auto", paddingTop: "1rem", position: "relative" }}>
                                                        <div style={{ position: "absolute", top: "2.5px", right: "1rem", cursor: "pointer", fontSize: "1rem" }}>
                                                            <i className="fas fa-window-close text-danger" onClick={() => setIsSearchShoww(false)}></i>
                                                        </div>
                                                        {allItemm?.response ? (
                                                            allItemm.response.map((item) => (
                                                                <CardBody key={item.id} style={{ minHeight: "5rem", padding: "1rem" }} className="bgSearch" onClick={() => {saveItemOrUpdate(item);setItemIdd(item.id);setIsSearchShoww(false);setAddingItem(false);}}>
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
                                                </td>
												{/* <td>
												<Form onSubmit={handleSubmit}>
															<Input
																style={{marginTop:'6px'}}
																autoComplete="off"
																name="customer"
																placeholder="Masukan Barcode"
																type="text"
																value={barcode}
																onChange={(e) => {
																	setBarcode(e.target.value);
																}}  
															/>
														<Button type="submit" hidden><i className="fa fa-search" /></Button>
													</Form>
												</td> */}
												<td>
												<Input
                                                        style={{marginTop:'6px'}}
                                                        autoComplete="off"
                                                        placeholder="Masukan Item Code"
                                                        type="search"
                                                        onKeyDown={searchhh}
                                                        value={queryyy}
                                                        onChange={(e) => setQueryyy(e.target.value)}
                                                    />
                                                    {isSearchShowww && queryyy && (
                                                    <Card className="position-sticky boxShadow" style={{ maxHeight: "15.5rem", overflowY: "auto", paddingTop: "1rem", position: "relative" }}>
                                                        <div style={{ position: "absolute", top: "2.5px", right: "1rem", cursor: "pointer", fontSize: "1rem" }}>
                                                            <i className="fas fa-window-close text-danger" onClick={() => setIsSearchShowww(false)}></i>
                                                        </div>
                                                        {allItemmm?.response ? (
                                                            allItemmm.response.map((item) => (
                                                                <CardBody key={item.id} style={{ minHeight: "5rem", padding: "1rem" }} className="bgSearch" onClick={() => {saveItemOrUpdatee(item);setItemIddd(item.id);setIsSearchShowww(false);setAddingItemm(false);}}>
                                                                    <div>
                                                                        <b>Kode Item:</b> {item.item_code}
                                                                    </div>
                                                                </CardBody>
                                                            ))
                                                        ) : (
                                                            <div className="text-center mb-3 text-danger">Item "{queryy}" tidak ada bosku!</div>
                                                        )}
                                                    </Card>
                                                    )}
												</td>
                                            </tr>
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
											value={"Rp." + totaldiskon1.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}
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
									<Col md="4">
									</Col>
								</Row>
							</CardFooter>
						</Card>
					</div>
				</Row>
			</Container>
			{/* Customer */}
            
            <Modal toggle={() => setIsOpenCustomer(!isOpenCustomer)} isOpen={isOpenCustomer} fade={false} style={{ minWidth: "70%"}}>
				<ModalHeader toggle={() => setIsOpenCustomer(!isOpenCustomer)}>Daftar Customer</ModalHeader>
                <Form onSubmit={handleSubmit1}>
                    <ModalBody
                        cssModule={{
                            alignText: "center",
                        }}>

                        <div className="container">
                            <div className="row align-items-center mb-3">
                                <div className="col-3">Nama</div>
                                <div className="col-1 text-center">:</div>
                                <div className="col-4 text-center">
                                    <Input className="form-control-alternative"
                                        type="text"
                                        value={namecustomer}
                                        placeholder="Masukan Nama Customer"
                                        onChange={(e) => 
                                        setNameCustomer(e.target.value)}>
                                    </Input>
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <div className="col-3">Provinsi</div>
                                <div className="col-1 text-center">:</div>
                                <div className="col-4 text-center">
                                    <Input
                                        autoComplete="off"
                                        name="Province"
                                        type="select"
                                        value={province}
                                        onChange={(e) => {
                                        setProvince(e.target.value);
                                        getCity(e.target.value);
                                        }}
                                    >
                                        <option value="">Pilih Province</option>
                                        {
                                        provinces.map((prov, key) => {
                                            return <option key={key} value={prov.id}>{prov.name}</option>
                                        })
                                        }
                                    </Input>
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <div className="col-3">Kota</div>
                                <div className="col-1 text-center">:</div>
                                <div className="col-4 text-center">
                                    <Input
                                        autoComplete="off"
                                        name="Kota"
                                        type="select"
                                        value={city}
                                        onChange={(e) => {
                                        setCity(e.target.value);
                                        }}
                                    >
                                        <option value="">Pilih Kota</option>
                                        {
                                        cities.map((city, key) => {
                                            return <option key={key} value={city.id}>{city.name}</option>
                                        })
                                        }
                                    </Input>
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <div className="col-3">Alamat</div>
                                <div className="col-1 text-center">:</div>
                                <div className="col-4 text-center">
                                    <Input
                                        autoComplete="off"
                                        type="text"
                                        placeholder="Masukan Alamat"
                                        value={address}
                                        onChange={(e) => {
                                        setAddress(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <div className="col-3">Phone</div>
                                <div className="col-1 text-center">:</div>
                                <div className="col-4 text-center">
                                    <Input
                                        autoComplete="off"
                                        type="text"
                                        placeholder="Masukan Nomor Telpon"
                                        value={phoneNumber}
                                        onChange={(e) => {
                                        setPhoneNumber(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="row align-items-center mb-3">
                                <div className="col-3">Email</div>
                                <div className="col-1 text-center">:</div>
                                <div className="col-4 text-center">
                                    <Input
                                        autoComplete="off"
                                        type="text"
                                        placeholder="Masukan Email"
                                        value={email}
                                        onChange={(e) => {
                                        setEmail(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
							<div className="row align-items-center mb-3">
                                <div className="col-3">Tipe Harga</div>
                                <div className="col-1 text-center">:</div>
                                <div className="col-4 text-center">
                                    <Input
                                        autoComplete="off"
                                        type="select"
                                        value={pricetype}
                                        onChange={(e) => {
                                        setPriceType(e.target.value);
                                        }}
                                    >
										<option value="" selected hidden>Pilih Level Harga</option>
										<option value="1" >Level 1</option>
										<option value="2" >Level 2</option>
										<option value="3" >Level 3</option>
										<option value="4" >Level 4</option>
										<option value="5" >Level 5</option>
										</Input>
                                </div>
                            </div>
                        </div>
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="danger"
                            outline
                            type="submit"
                            // disabled={parseInt(pay1) + parseInt(pay2) < 10}
                            >
                            Tambahkan
                        </Button>{" "}
                        <Button onClick={() => setIsOpenCustomer(!isOpenCustomer)}>Cancel</Button>
                    </ModalFooter>
                </Form>
			</Modal>
            
			
            {/* modal pembayaran */}
			<Modal toggle={() => setIsOpen(!isOpen)} isOpen={isOpen} fade={false} style={{ minWidth: "70%"}}>
				<ModalHeader toggle={() => setIsOpen(!isOpen)}>Metode Pembayaran</ModalHeader>
				<ModalBody
					cssModule={{
						alignText: "center",
					}}>
					<div className="container">
						<div className="row align-items-center mb-3">
							<div className="col-3">Nominal Pembayaran 1</div>
							<div className="col-1 text-center">:</div>
							<div className="col-4 text-center">
								<Input className="form-control-alternative"
									type="number"
									value={pay1}
									placeholder="Masukan Nomminal Pembayaran"
									onChange={(event) => {
										console.log(parseInt(change) - parseInt(event.target.value));
										setChange(parseInt(change) - parseInt(event.target.value));
										setPay1(event.target.value);
									}}></Input>
							</div>
							<div className="col-4 text-center">
								<Input className="form-control-alternative"
									name="Tipe Po"
									type="select"
									placeholder="Metode Pembayaran 1"
									value={payment_method1}
									onChange={(e) => {
										setPaymentMethod1(e.target.value);
									}}>
									<option value="">Pilih Metode Pembayaran</option>
									{banks.map((bank, key) => {
										return (
											<option key={key} value={bank.id}>
												{bank.bank_name}
											</option>
										);
									})}
								</Input>
							</div>
						</div>
						<div className="row align-items-center mb-3">
							<div className="col-3">Keterangan 1</div>
							<div className="col-1 text-center">:</div>
							<div className="col-4 text-center">
								<Input className="form-control-alternative"
									name="Tipe Po"
									type="text"
									placeholder="Keterangan 2"
									value={keterangan1}
									onChange={(e) => {
										setKeterangan1(e.target.value);
									}}></Input>
							</div>
						</div>
						<div className="row align-items-center mb-3">
							<div className="col-3">Nominal Pembayaran 2</div>
							<div className="col-1 text-center">:</div>
							<div className="col-4 text-center">
								<Input className="form-control-alternative" type="number" value={pay2} onChange={(event) => setPay2(event.target.value)} placeholder="Masukan Nomminal Pembayaran"></Input>
							</div>
							<div className="col-4 text-center">
								<Input className="form-control-alternative"
									name="Tipe Po"
									type="select"
									placeholder="Metode Pembayaran 2"
									value={payment_method2}
									onChange={(e) => {
										setPaymentMethod2(e.target.value);
									}}>
									<option value="">Pilih Metode Pembayaran</option>
									{banks.map((bank, key) => {
										return (
											<option key={key} value={bank.id}>
												{bank.bank_name}
											</option>
										);
									})}
								</Input>
							</div>
						</div>
						<div className="row align-items-center mb-3">
							<div className="col-3">Keterangan 2</div>
							<div className="col-1 text-center">:</div>
							<div className="col-4 text-center">
								<Input className="form-control-alternative"
									name="Tipe Po"
									type="text"
									placeholder="Keterangan 2"
									value={keterangan2}
									onChange={(e) => {
										setKeterangan2(e.target.value);
									}}></Input>
							</div>
						</div>
						<div className="row align-items-center mb-3">
							<div className="col-3 text-start  display-1">Total</div>
							<div className="col-1 text-center">:</div>
							<div className="col-6 text-center">
								<textarea
									className="form-control"
									disabled
									value={"Rp." + grandtotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}
									style={{
										fontSize: 40,
										paddingTop: 20,
										top: "50%",
										height: 95,
                                        fontWeight: 'bold',
										resize: "none",
									}}></textarea>
							</div>
						</div>
						<div className="row align-items-center mb-3">
							<div className="col-3  display-3">Kembali</div>
							<div className="col-1 text-center">:</div>
							<div className="col-6 text-center">
								<textarea
									className="form-control"
									disabled
									value={"Rp." + (-1 * parseInt(grandtotal) + parseInt(pay1) + parseInt(pay2)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}
									style={{
										fontSize: 40,
										paddingTop: 20,
                                        fontWeight: 'bold',
										top: "50%",
										height: 95,
										resize: "none",
									}}></textarea>
							</div>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button
						color="danger"
						outline
						disabled={parseInt(pay1) + parseInt(pay2) < 10}
						onClick={() => {
							if (-1 * parseInt(grandtotal) + parseInt(pay1) + parseInt(pay2) < -100000000) {
								alert("Nominal Belum Mencukupi");
							} else {
								let dataItems = [];
								savedItems.map(
									(dataItem) =>
										(dataItems = [
											...dataItems,
											{
												item_id: dataItem.item_id,
												qty: dataItem.qty,
												harga: dataItem.harga,
												diskon_nominal : dataItem.diskon_nominal,
												diskon_persen : dataItem.diskon_persen
											},
										])
								);
								let data = {
									warehouse_id: parseInt(warehouse),
									username: username,
									code_rfq: "",
									customer_id: parseInt(customer),
									diskon_global_nominal : parseFloat(diskonglobalnominal),
									diskon_global_persen : parseInt(diskonglobalpersen),
									sales : sales,
									ongkir : parseInt(ongkir),
									pajak_id: parseInt(pajak),
									manual_address: alamatlain,
									pengiriman: parseInt(pengiriman),
									payment_method: parseInt(payment_method),
									jangka_waktu: "",
									keterangan: "",
									pay_1: parseInt(pay1),
									payment_method1: parseInt(payment_method1),
									keterangan1: keterangan1,
									pay_2: parseInt(pay2),
									payment_method2: parseInt(payment_method2),
									keterangan2: keterangan2,
									pay_3: 0,
									payment_method3: 1,
									keterangan3: "0",
									pay_4: 0,
									payment_method4: 1,
									keterangan4: "0",
									pay_5: 0,
									payment_method5: 1,
									keterangan5: "0",
									pay_6: 0,
									payment_method6: 1,
									keterangan6: "0",
									items: dataItems,
								};
								simpanCetakSoKasir(data);
							}
						}}>
						Konfirmasi Pembayaran
					</Button>{" "}
					<Button onClick={() => setIsOpen(!isOpen)}>Cancel</Button>
				</ModalFooter>
			</Modal>

			{/* modal kembalian */}
			<Modal isOpen={isKembalianOpen} fade={false} style={{ minWidth: "20%", top: "-20%" }}>
			<ModalHeader toggle={() => setIsOpen(!isOpen)}>Kembalian</ModalHeader>
			<ModalBody
				style={{
					alignText: "center",
					align:"center"
				}}>
					<center>
						<div className="container">
							<p style={{fontSize:'50px', fontFamily:'Tahoma'}}><strong>{"Rp." + (-1 * parseInt(grandtotal) + parseInt(pay1) + parseInt(pay2)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}</strong></p>
						</div>
					</center>
			</ModalBody>
			</Modal>

			{/* cetak */}
			{<div style={{visibility:'hidden', display:'none'}}><ViewCetakSoKasir

			customer={customer} alamatcustomer={alamatcustomer} alamatlain={alamatlain}
			detailpembelian={savedItems}
			total={"Rp." + totalPrice1.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}
			diskon={"Rp." + totaldiskon1.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}
			ppn={"Rp." + ppnnew.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}
			grandtotal={"Rp." + grandtotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}
			dibayar={"Rp." + (parseInt(pay1) + parseInt(pay2)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}
			kembali={"Rp." + (-1 * parseInt(grandtotal) + parseInt(pay1) + parseInt(pay2)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + ",-"}

			ref={componentCetakSoKasir}/></div>}
		</>
	);
}