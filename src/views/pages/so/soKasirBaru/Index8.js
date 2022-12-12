/*eslint-disable*/
import React, { useEffect, useState, useRef } from "react";
import { Card, CardBody, Row, Col, Input, Container,CardFooter,InputGroup, InputGroupAddon,InputGroupText,FormGroup, Form, Table, Button, Label, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import Select2 from "react-select2-wrapper";


// cetak
import { useReactToPrint } from 'react-to-print';
import { ViewCetakSoKasir } from "utils/CetakCetak";

export default function CreateSalesOrder() {
	const token = localStorage.token;
	const warehouse = localStorage.warehouse;
	const username = localStorage.username;
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
			setTimeout(() => setIsKembalianOpen(false), 3000);
			setTimeout(() => (window.location.reload("/admin/kasir-sales-order/so-kasir")), 5000);
		})
		.then((json) => {
			setLoading(false);
		})
		.catch(function (error) {
			console.log(error);
		});
	};

	// manual add w search n kembalian
	const [isKembalianOpen, setIsKembalianOpen] = useState(false);
	const [alamatKirimDisabled, setAlamatKirimDisabled] = useState(false);
	const viewTambahItem = () => {
		return(
			<><Form onSubmit={handleSubmit}>
			<Row className="justify-content-center mt-4">
				<Col xs={4}>
					<InputGroup>
						<Input
							autoComplete="off"
							placeholder="Masukan Item Manual"
							type="search"
							onKeyDown={searchh}
							value={queryy}
							onChange={(e) => setQueryy(e.target.value)}
						/>
						<Button type="submit"><i className="fa fa-search" /></Button>
					</InputGroup>
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
				</Col>
			</Row>
		</Form></>
		)
	};

	let history = useHistory();
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenCustomer, setIsOpenCustomer] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
	const [qtyTotal, setTotalQty] = useState(0);
	const [diskontotal, setDiskonTotal] = useState(0);
	const [barcode, setBarcode] = useState("");
	const [pengiriman, setPengiriman] = useState([]);
	const [customers, setCustomers] = useState([]);
	const [customer, setCustomer] = useState("");
	const [payment_method1, setPaymentMethod1] = useState([]);
	const [payment_method2, setPaymentMethod2] = useState([]);
	const [keterangan1, setKeterangan1] = useState("");
	const [keterangan2, setKeterangan2] = useState("");
	const [savedItems, setSavedItems] = useState([]);
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
	const [alamatcustomer, setAlamatCustomer] = useState("");
	const [alamatlain, setAlamatLain] = useState("");
	const [diskonglobalnominal, setDiskonGlobalNominal] = useState(0);
	const [diskonglobalpersen,setDiskonGlobalPersen] = useState(0);
	const [pajak, setPajak] = useState(1);
	const [allpajak, setAllPajak] = useState([]);
	const [sales, setSales] = useState("");
	const [allItemm, setAllItemm] = useState([]);
	const [allItemmm, setAllItemmm] = useState([]);
	const [queryy, setQueryy] = useState("");
	const [queryyy, setQueryyy] = useState("");
	const [isSearchShoww, setIsSearchShoww] = useState(false);
	const [isSearchShowww, setIsSearchShowww] = useState(false);
	const [ppnnew, setPPNNEW] = useState(0);
	const [diskonglobal, setDiskonGLobal] = useState(0);
    const [totalPrice1, setTotalPrice1] = useState(0);
	const headers = { Authorization: `Bearer ${token}`};
    const [a, setA] = useState(0);
	const [b, setB] = useState(0);
	const [diskonglobalnominal1,setDiskonGlobalNominal1] = useState(0)
	const [totaldiskon2, setTotalDiskon2] = useState(0);
	const [totaldiskon3, setTotalDiskon3] = useState(0);
	const [pricetype, setPriceType] = useState("");
	const [namecustomer, setNameCustomer] = useState("");
    const [provinces, setProvinces] = useState([]);
    const [province, setProvince] = useState("");
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
	const [editable, setEditable] = useState(false);
	const [isConfEditableOpen, setIsConfEditableOpen] = useState(false);
	const [confPassEditable, setConfPassEditable] = useState('');
	const [isLoading, setLoading] = useState(false);


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
	   
	//hahahaha ---------------------------------

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
		diskonglobalnominal && diskonglobal === "diskonglobalnominal" && setDiskonGlobalPersen((qtyTotal - diskontotal) * diskonglobalpersen);
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
				// setPajak(id);
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
		if (Number(queryyy) > 0) {
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

	// save
	const saveItemOrUpdatee = (item) => {
		let oldobj = savedItems.find(o => o.item_id === item.id);
		if(oldobj===undefined){
			setSavedItems([...savedItems,{
				item_id: item.id,
				item_name: item.item_name,
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
	  

	// barcode
	const handleBarcodeSubmit = (e) =>{
		e.preventDefault();{
			setBarcode("");
		}
		if(barcode.length>0){
			axios
				.get(
					`${process.env.REACT_APP_API_BASE_URL}/items-by-barcode?barcode=${barcode}&warehouse_id=${warehouse}&qty=1
	                `,
					{ headers }
				)
				.then(async (response) => {
					let item = [];
					item.push({
						id: response.data.response[0].id,
						item_name: response.data.response[0].item_name,
						item_code:response.data.response[0].item_code,
						barcode: response.data.response[0].barcode,
						price: response.data.response[0].harga,
					});
					saveItemOrUpdate(item[0]);
				}).catch(err => {
					console.log('DATA TIDAK DITEMUKAN');
				  });
		}else{
			return false;
		}
		
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		{
			setBarcode("");
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
			setTotalQty(qtyTotal - array[index].harga * array[index].qty);
			setDiskonTotal(diskontotal - array[index].diskon_nominal * array[index].qty);
			array.splice(index, 1);
			setSavedItems(array);
		}
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
										<Input
											style={{marginTop:'6px'}}
                                            autoComplete="off"
												// className="form-control-alternative"
												
												placeholder="Masukan Nama Sales"
												type="text"
												value={sales}
												onChange={(e) => {
													setSales(e.target.value);
												}}
											/>
									</Col>
									<Col xs={3} className="mb-3">
										<Button
											style={{
												fontSize: 40,
												paddingTop: 10,
												height: 80,
												resize: "none",
												}}
											block
											color="primary"
											onClick={() => setIsOpen(!isOpen)}>
												Bayar
										</Button>
										<Link className="btn btn-danger mt-4" to="/admin/kasir-sales-order/detail">
												Closing Cashsier
										</Link>
									</Col>
								</Row>
								<Row className="mb-3">
								<Col xs={3}>
									<Form onSubmit={handleBarcodeSubmit}>
												<Input
													autoComplete="off"
													
													placeholder="Masukan Barcode"
													type="text"
													value={barcode}
													onChange={(e) => {
														setBarcode(e.target.value);
													}}
													autoFocus
												/>
									</Form>
									</Col>
									<Col xs={3}>
									<InputGroup className="mb-3">
										{/* <Input
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
                                            <option value="https://erp.hokkybangunan.co.id" >Tambah Customer</option>
										</Input> */}
                                	<Select2
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
                                        { id: customer.id, text: customer.name }
                                        );
                                      })}
                                    />
										<InputGroupAddon addonType="append">
											<Button
												onClick={() => setIsOpenCustomer(!isOpenCustomer)}
												color="secondary"
												type="button">
												<i className="ni ni-fat-add" />
											</Button>
										</InputGroupAddon>
										</InputGroup>
									</Col>
									<Col xs={3}>
										<Input
                                        autoComplete="off"
											// className="form-control-alternative"
											placeholder="Masukan Alamat Customer"
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
												disabled={totalPrice < 1000}
												placeholder="Masukan Diskon (N)"
												type="text"
												value={diskonglobalnominal}
												onChange={(e) => {
													setDiskonGlobalNominal(e.target.value);
												}}
												// onClick={() => setDiskonGLobal("diskonglobalnominal")}
											/>
										</InputGroup>
									</Col>
									<Col xs={3}>
									<Label style={{ color: "darkgray", fontSize: "14px" }}>Pajak :</Label>
                                    	<Input
                                    		autoComplete="off"
											// className="form-control-alternative"
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
												
												type="select"
												value={pengiriman}
												onChange={(e) => {
													setPengiriman(e.target.value);
												}}>
												<option value="" selected disabled hidden>Pilih Pengiriman</option>
												<option value={1} onClick={()=> setAlamatKirimDisabled(true)}>Ambil Sendiri</option>
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
												
												type="number"
												value={ongkir}
												onChange={(e) => {
													setOngkir(e.target.value);
												}} />
											</InputGroup>
										</Col>
								</Row>
							</CardBody>
						</Card>
						<Card className="bg-secondary shadow">
						<CardBody>
								<Table size="sm" responsive>
									<thead>
										<tr>
											<th colspan="4"><b>Nama Item</b></th>
											<th colspan="4"><b>Kode Item</b></th>
											<th colspan="4"><b>Harga</b></th>
											<th colspan="4"><b>Qty</b></th>
											<th colspan="4"><b>Diskon %</b></th>
											<th colspan="4"><b>Diskon (N)</b></th>
											<th colspan="4"><b>Sub Total</b></th>
											<th>
												{editable?<Button color="danger" onClick={() => setEditable(false)} size="sm">Nonaktifkan Edit</Button>
												:<Button onClick={() => setIsConfEditableOpen(true)} size="sm">Izinkan Edit</Button>}
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
														<td>
															<Button color="danger" onClick={() => deleteItem(savedItem.item_id)}>Delete</Button>
														</td>
													</tr>
												)
											})
										}
										<tr>
											<td colspan="4">
													
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
												<><Form onSubmit={handleSubmit2}>
																<Input
																	autoComplete="off"
																	placeholder="Masukan Kode item"
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
																				<b>Kode Item:</b> {item.item_code}
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
												{/* <td>
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
												</td> */}
                                            </tr>
										</tbody>
								</Table>
							</CardBody>
							<CardFooter >
							<Row md="12">
								<Col md="4">
								</Col>
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
						</Card>
					</div>
				</Row>
			</Container>
			{/* modal pembayaran */}
			<Modal toggle={() => setIsOpen(!isOpen)} isOpen={isOpen} fade={false} style={{ minWidth: "70%", top: "-20%" }}>
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
									pajak_id: 1,
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

			{/* Customer */}
            
            <Modal toggle={() => setIsOpenCustomer(!isOpenCustomer)} isOpen={isOpenCustomer} fade={false} style={{ minWidth: "70%", top: "-20%" }}>
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
										<option hidden value="2" >Level 2</option>
										<option hidden value="3" >Level 3</option>
										<option hidden value="4" >Level 4</option>
										<option hidden value="5" >Level 5</option>
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

			{/* modal konfirmasi editable */}
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
