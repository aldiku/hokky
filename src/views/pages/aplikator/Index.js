/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
	Card,
	CardBody,
	Label,
	FormGroup,
	Row,
	Input,
	CardHeader,
	Col,
	Button,
	Table,
	Container,
	Form,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function Aplikator() {
	const token = localStorage.token;
	const warehouseId = localStorage.warehouse;
	const username = localStorage.username;
	let history = useHistory();
    const [isLoading, setLoading] = useState(false);
    const [itemId, setItemId] = useState(1);
	const [itemTotal, setItemTotal] = useState(null);
	const [allItem, setAllItem] = useState([]);
    const [editingItem, setEditingitem] = useState([]);
    const [savedItems, setSavedItems] = useState([]);
	const [query, setQuery] = useState(null);
    const [nama,setNama] = useState("");
    const [kodeaplikator, setKodeAplikator] = useState("");
    const [keterangan, setKeterangan] = useState("");
    const [ongkir, setOngkir] = useState(0);
    const [lainnya, setLainnya] = useState(0);
    const [survey, setSurvey] = useState([]);
    const [nameFunction, setNameFunction] = useState([]);
	const [nameFunctions, setNameFunctions] = useState([]);
	const [isSearchShow, setIsSearchShow] = useState(false);
	const headers = { Authorization: `Bearer ${token}` };

	useEffect(() => {
        getById();
		getUser();
        getFunction();
	}, [itemId]);

	  const getById = () => {
	    const headers = {
	      "Content-Type": "application/json",
	      Authorization: `Bearer ${token}`,
	    };
	    axios
	      .get(
	        `${process.env.REACT_APP_API_BASE_URL}/aplikator/get/${itemId}`,
	        { headers }
	      )
	      .then((data) => {
            setNama(data.data.response.name);
            setKodeAplikator(data.data.response.aplikator_code);
            setOngkir(data.data.response.ongkir),
            setKeterangan(data.data.response.keterangan);
            setLainnya(data.data.response.lainnya);
            setSurvey(data.data.response.durasi_survey)
            getFunction( data.data.response.function_id);
            getItemDataSaved();
	      })
	      .catch(function (error) {
	        console.log(error);
	      });
	  };

      const getItemDataSaved = () => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };

        axios.post(`${process.env.REACT_APP_API_BASE_URL}/aplikator/items`, {
    
            apk_id: itemId
    
        }, { headers }).then(async response => {
            let stateItem = [];
            let stateEditing = [];
    
            await Promise.all(response.data.response.map(async (data) => {
                stateItem = [...stateItem, {
                    id: data.id,
                    item_id: data.item_id,
                    item_name: data.item_name,
                    qty: data.qty,
                    harga: data.harga,
                    data: {
                        item_id: data.item_id,
                        item_name: data.item_name,
                        qty: data.qty,
                        harga: data.harga,
                    },
                }];
    
                stateEditing = [...stateEditing, {
                    editing: false
                }];
            }));
            setEditingitem(stateEditing);
            setSavedItems(stateItem);
        })
    }

    const getFunction = (id) => {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		};
		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/item-function/list`, { headers })
			.then((data) => {
				setNameFunctions(data.data.response);
				setNameFunction(id);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		{
			// EditPrice();
			// EditData();
		}
	};
    function EditData() {
        setLoading(true);{
            UpdateSupplier();
        }
      }
    
      const UpdateSupplier = () => {
        let dataItems = [];
        savedItems.map((dataItem) => dataItems = [...dataItems, 
            { 
                item_id: dataItem.item_id, 
                qty: dataItem.qty, 
                harga : dataItem.harga,
            }]);
        let data = {
            warehouse_id : parseInt(warehouseId),
            username : username,
            function_id: parseInt(nameFunction),
            name : nama,
            durasi_survey : "",
            ongkir : parseFloat(ongkir),
            lainnya : parseFloat(lainnya),
            keterangan: keterangan ,
            items : dataItems
        };
          axios.post(`${process.env.REACT_APP_API_BASE_URL}/aplikator/update/${itemId}`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
            .then(function (response) {
              window.location.reload("/admin/aplikator");
            })
            .then(json => {
              setLoading(false);
            })
            .catch(function (error) {
              console.log(error)
            })
      };

    const formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID',
            { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
        ).format(money);
      }

	const getUser = async () => {
		let filter = {
			page: 1,
			per_page: 10,
			warehouse_id: parseInt(warehouseId),
		};
		const data = filter;

		const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/aplikator/page`, data, { headers });
		setItemTotal(res.data.total_item);
	};

	const search = async () => {
		if (Number(query) > 0) {
			const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/aplikator/page`, { aplikator_code: query  }, { headers });
			if (res.data.status !== 404) setAllItem(res.data);
			else {
				const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/aplikator/page`, { name: query }, { headers });
				if (res.data.status !== 404) setAllItem(res.data);
				else setAllItem(null);
			}
		} else {
			const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/aplikator/page`, { name: query }, { headers });
			if (res.data.status !== 404) setAllItem(res.data);
			else setAllItem(null);
		}
		setIsSearchShow(true);
	};

	const searchShow = (item) => {
		setItemId(item.id);
		setIsSearchShow(false);
	};

    const changeItemDataTable = async (arg) => {
        // setTotalPrice(totalPrice - arg.defaultPrice + savedItems[arg.index].harga);
    
        setSavedItems([
            ...savedItems.slice(0, arg.index),
            Object.assign({}, savedItems[arg.index], {
                data: {
                    item_name: arg.itemName,
                    qty: savedItems[arg.index].qty,
                    harga: savedItems[arg.index].harga,
                }
            }),
            ...savedItems.slice(arg.index + 1)
        ]);
    
        changePriceStatus(arg.index, false);
    }
    
    const changePriceStatus = (index, status) => {
      setEditingitem([
          ...editingItem.slice(0, index),
          Object.assign({}, editingItem[index], { editing: status }),
          ...editingItem.slice(index + 1)
      ]);
    }

	// Change separator
	const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

	const handleSeparator = (e) => setInputAngka(addCommas(removeNonNumeric(e.target.value)));

	return (
		<>
			<div>
				<SimpleHeader name="Aplikator" parentName="Master" />
				<Container className="mt--6" fluid>
					<Row>
						<div className="col">
							<Form onSubmit={handleSubmit}>
								{/* <CardBody> */}
								{/* Button card */}
								<Card className="position-sticky boxShadow" style={{ top: 0, zIndex: "5" }}>
									<CardBody className="ml-3 pb-0">
										<Row md="12">
											<Col md="5">
												<Button onClick={() => setItemId(4)} color="danger" type="button">
													First
												</Button>
												<Button onClick={() => setItemId((prev) => prev - 1)} disabled={itemId === 1} color="success" type="button">
													<i className="ni ni-bold-left" /> Prev
												</Button>
												<Button onClick={() => setItemId((prev) => prev + 1)} disabled={itemId === itemTotal} color="success" type="button">
													Next <i className="ni ni-bold-right" />
												</Button>
												<Button onClick={() => setItemId(itemTotal)} disabled={itemTotal === null} color="warning" type="button">
													End
												</Button>
											</Col>
											<Col md="4">
												<FormGroup row>
													<Col sm={7}>
														<Input
															className="form-control-alternative"
															placeholder="Search Aplikator"
															type="search"
															onChange={(e) => setQuery(e.target.value)}
															onKeyDown={search}
														/>
													</Col>
													{/* <Col sm={2}>
														<Button color="primary" className="mb-3" onClick={search}>
															<i className="fa fa-search"></i>
														</Button>
													</Col> */}
												</FormGroup>
											</Col>
											<Col md="3">
												<div style={{ textAlign: "right" }}>
                                                    <Button
                                                        color="info"
                                                        onClick={() => EditData()}
                                                    >
                                                        Edit
                                                    </Button>
													<Link className="btn btn-danger" to="/admin/aplikator/create">
														Tambah
													</Link>
												</div>
											</Col>
										</Row>
									</CardBody>
								</Card>

								{/* Search card */}
								{isSearchShow && query && (
									<Card className="boxShadow" style={{ maxHeight: "15.5rem", overflowY: "auto", paddingTop: "1rem", position: "relative" }}>
										<div style={{ position: "absolute", top: "2.5px", right: "1rem", cursor: "pointer", fontSize: "2rem" }}>
											<i className="fas fa-window-close text-danger" onClick={() => setIsSearchShow(false)}></i>
										</div>
										<span className="text-center mb-3">
											<b>Pencarian berdasarkan:</b> {query}
										</span>
										{allItem?.response ? (
											allItem.response.map((item) => (
												<CardBody key={item.id} style={{ minHeight: "6rem", padding: "1rem" }} className="bgSearch" onClick={() => searchShow(item)}>
													<div>
														<b>Nama :</b> {item.name}
													</div>
													<div>
														<b>Kode Aplikator:</b> {item.aplikator_code ? item.aplikator_code : "(Not available)"}
													</div>
													<hr style={{ margin: "0.75rem -1rem 0 -1rem" }} />
												</CardBody>
											))
										) : (
											<div className="text-center mb-3 text-danger">User "{query}" tidak ada bosku!</div>
										)}
									</Card>
								)}
                                <Card className="bg-secondary shadow">
                                    <CardHeader className="bg-white border-0">
                                        <h3>Aplikator</h3>
                                    </CardHeader>
                                    <Row md="12">
										<Col md="6">
                                            <CardBody>
                                                <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        Kode Aplikator
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input
                                                            className="form-control-alternative"
                                                            type="text"
                                                            name="itemCode"
                                                            placeholder="Masukan Username"
                                                            value={kodeaplikator}
                                                            onChange={(e) => {
                                                                setKodeAplikator(e.target.value);
                                                            }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        Nama
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input
                                                            className="form-control-alternative"
                                                            type="text"
                                                            name="barcode"
                                                            placeholder="Masukan Nama"
                                                            value={nama}
                                                            onChange={(e) => {
                                                                setNama(e.target.value);
                                                            }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        keterangan
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input
                                                            className="form-control-alternative"
                                                            name="Supplier"
                                                            type="textarea"
                                                            rows="5"
                                                            placeholder="Masukan Keterangan"
                                                            value={keterangan}
                                                            onChange={(e) => {
                                                                setKeterangan(e.target.value);
                                                            }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                            </CardBody>
										</Col>
										<Col md="6">
                                            <CardBody>
                                                <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        Function
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input
                                                            className="form-control-alternative"
                                                            name="function"
                                                            type="select"
                                                            value={nameFunction}
                                                            onChange={(e) => {
                                                                setNameFunction(e.target.value);
                                                            }}>
                                                            <option value="">Pilih Function</option>
                                                            {nameFunctions.map((nameFunction, key) => {
                                                                return (
                                                                    <option key={key} value={nameFunction.id}>
                                                                        {nameFunction.name}
                                                                    </option>
                                                                );
                                                            })}
                                                        </Input>
                                                    </Col>
												</FormGroup>
                                                <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        Ongkir
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input
                                                            className="form-control-alternative"
                                                            type="text"
                                                            name="barcode"
                                                            placeholder="Masukan Nama"
                                                            value={ongkir}
                                                            onChange={(e) => {
                                                                setOngkir(e.target.value);
                                                            }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        Lainnya
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input
                                                            className="form-control-alternative"
                                                            type="text"
                                                            name="barcode"
                                                            placeholder="Masukan Nama"
                                                            value={lainnya}
                                                            onChange={(e) => {
                                                                setLainnya(e.target.value);
                                                            }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                            </CardBody>
										</Col>
									</Row>
                                </Card>
                                <Card className="bg-secondary shadow">
                                    <CardHeader className="bg-white border-0">
                                        <h3>ITEM</h3>
                                    </CardHeader>
                                    <CardBody>
                                        <Table>
                                            <thead>
                                            <tr>
                                                <th>
                                                    Nama Item
                                                </th>
                                                <th>
                                                    Qty
                                                </th>
                                                <th>
                                                    Harga
                                                </th>
                                                <th>
                                                   
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                savedItems.map((savedItem, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>{savedItem.data.item_name}</td>
                                                            <td>
                                                                {editingItem[key].editing ? (
                                                                    <Input
                                                                        placeholder="Harga Per Item"
                                                                        type="text"
                                                                        row="3"
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
                                                            <td>
                                                                {editingItem[key].editing ? (
                                                                        <Input
                                                                            placeholder="qty"
                                                                            type="text"
                                                                            value={savedItems[key].harga}
                                                                            onChange={(e) => {
                                                                                setSavedItems([
                                                                                    ...savedItems.slice(0, key),
                                                                                    Object.assign({}, savedItems[key], { harga: e.target.value}),
                                                                                    ...savedItems.slice(key + 1)
                                                                                ]);
                                                                            }}
                                                                        />
                                                                ) : (
                                                                            <>{formatRupiah(savedItem.harga)}</>
                                                                        )}
                                                            </td>
                                                            <td>
                                                                {editingItem[key].editing ? (
                                                                    <>
                                                                        <Button color="warning" onClick={() => changeItemDataTable({
                                                                            index: key,
                                                                            itemName: savedItem.data.item_name,
                                                                            qty: savedItem.data.qty,
                                                                            harga: savedItem.data.harga,
                                                                        })}>Update</Button>
                                                                        <Button color="danger" onClick={() => {
                                                                            setSavedItems([
                                                                                ...savedItems.slice(0, key),
                                                                                Object.assign({}, savedItems[key], { privilegename: savedItem.data.privilege_name}),
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
                                </Card>
							</Form>
						</div>
					</Row>
				</Container>
			</div>
		</>
	);
}
