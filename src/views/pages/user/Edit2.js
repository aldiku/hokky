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
    Modal, ModalHeader, ModalBody
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function Userss(props) {
	const token = localStorage.token;
	const warehouseId = localStorage.warehouse;
	const username = localStorage.username;
	let history = useHistory();
    const [isLoading, setLoading] = useState(false);
    const [usernameusers, setUsernameUsers] = useState("");
    const [nama,setNama] = useState("");
    const [awal, setAwal] = useState("");
    const [resign, setResign] = useState("");
    const [itemId, setItemId] = useState(4);
    const [warehouse,setWarehouse] = useState("");
    const [warehouses,setWarehouses] = useState([]);
    const [editingItem, setEditingitem] = useState([]);
    const [savedItems, setSavedItems] = useState([]);
	const headers = {Authorization: `Bearer ${token}`};
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [status, setStatus] = useState("");
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [totalqty, setTotalQty] = useState("");
    const [qtyTotal, setQtyTotal] = useState("");
    const [harga, setHarga] = useState("");

  const handleEditQty = (index, value) => {
    let updateList = savedItems;
    let aqtyTotal = parseInt(updateList[index].harga) + value;
    
    if(!isNaN(value) && value.length > -1){
      updateList[index] = {...updateList[index], qty: value};
      setSavedItems(updateList);
      // setTotalPrice(totalPrice+plusTotal-minTotal);
      setTotalQty(qtyTotal + aqtyTotal);
      // setDiskonTotal(diskontotal + diskonnominal1 - diskonnominal2)
    }else{return false}
  }


	useEffect(() => {
        getById();
	}, [itemId]);

	  const getById = () => {
	    const headers = {
	      "Content-Type": "application/json",
	      Authorization: `Bearer ${token}`,
	    };
	    axios
	      .get(
	        `${process.env.REACT_APP_API_BASE_URL}/users/get/${props.match.params.id}`,
	        { headers }
	      )
	      .then((data) => {
            setUsernameUsers(data.data.response.username)
            setNama(data.data.response.name)
            setEmail(data.data.response.email)
            setPassword(data.data.response.password)
            setAddress(data.data.response.address)
            setStatus(data.data.response.status_akun)
            setWarehouse(data.data.response.warehouse_id)
            getWarehouse(data.data.response.office)
            setAwal(data.data.response.recruit)
            setResign(data.data.response.resign)
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

        axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/list-privileges`, {
    
            user_id: props.match.params.id
    
        }, { headers }).then(async response => {
            let stateItem = [];
            let stateEditing = [];
    
            await Promise.all(response.data.response.map(async (data) => {
                stateItem = [...stateItem, {
                    id: data.id,
                    user_id: data.user_id,
                    privilege_id: data.privilege_id,
                    privilege_name: data.privilege_name,
                    create_access: data.create_access,
                    read_access: data.read_access,
                    update_access: data.update_access,
                    delete_access: data.delete_access,
                    data: {
                        user_id: data.user_id,
                        privilege_id: data.privilege_id,
                        privilege_name: data.privilege_name,
                        create_access: data.create_access,
                        read_access: data.read_access,
                        update_access: data.update_access,
                        delete_access: data.delete_access
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

    const getWarehouse = () => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
    axios
        .get(
        `${process.env.REACT_APP_API_BASE_URL}/warehouse/list/all`,
        { headers }
        )
        .then((data) => {
             setWarehouses(data.data.response);
        })
        .catch(function (error) {
        console.log(error);
        });
    };


    const changeItemDataTable = async (arg) => {
        setSavedItems([
            ...savedItems.slice(0, arg.index),
            Object.assign({}, savedItems[arg.index], {
                data: {
                    privilege_name: arg.privilegename,
                    create_access: savedItems[arg.index].create_access,
                    read_access: savedItems[arg.index].read_access,
                    update_access: savedItems[arg.index].update_access,
                    delete_access: savedItems[arg.index].delete_access,
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

	return (
		<>
			<div>
				<SimpleHeader name="Edit User" parentName="Master" />
				<Container className="mt--6" fluid>
					<Row>
						<div className="col">
                                <Card className="position-sticky boxShadow" style={{ top: 0, zIndex: "5" }}>
									<CardBody>
										<Row md="12">
											<Col md="5">
											</Col>
											<Col md="4">
												<FormGroup row>
													<Col sm={7}>
														{/* <Input
															className="form-control-alternative"
															placeholder="Search Users"
															type="search"
															onChange={(e) => setQuery(e.target.value)}
															onKeyDown={search}
														/> */}
													</Col>
												</FormGroup>
											</Col>
											<Col md="3">
												<div style={{ textAlign: "right" }}>
                                                   
                                                    <Button
                                                        color="info"
                                                        onClick={toggle}
                                                        disabled
                                                    >
                                                        <i className="fas fa-book" /> Update
                                                    </Button>
												</div>
											</Col>
										</Row>
									</CardBody>
								</Card>
                                <Card className="bg-secondary shadow">
                                    <CardHeader className="bg-white border-0">
                                        <h3>Edit User</h3>
                                    </CardHeader>
                                    <Row md="12">
										<Col md="6">
                                            <CardBody>
                                                <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        Username
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input
                                                        disabled
                                                            className="form-control-alternative"
                                                            type="text"
                                                            name="itemCode"
                                                            placeholder="Masukan Username"
                                                            value={usernameusers}
                                                            onChange={(e) => {
                                                                setUsernameUsers(e.target.value);
                                                            }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        Cabang
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input
                                                        disabled
                                                        className="form-control-alternative"
                                                        name="person"
                                                        type="select"
                                                        value={warehouse}
                                                        onChange={(e) => {
                                                            setWarehouse(e.target.value);
                                                        }}
                                                        >
                                                        <option value=''>Pilih Cabang</option>
                                                        {warehouses.map((warehouse2, key) => {
                                                            return (
                                                                <option key={key} value={warehouse2.id}>
                                                                {warehouse2.name}
                                                                </option>
                                                            );
                                                            })}
                                                        </Input>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        Nama
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input
                                                        disabled
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
                                               
                                            </CardBody>
										</Col>
										<Col md="6">
                                            <CardBody>
                                            <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        Email
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input
                                                        disabled
                                                            className="form-control-alternative"
                                                            type="text"
                                                            name="email"
                                                            placeholder="Masukan Email"
                                                            value={email}
                                                            onChange={(e) => {
                                                                setEmail(e.target.value);
                                                            }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        Password
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input
                                                        disabled
                                                            className="form-control-alternative"
                                                            name="Supplier"
                                                            type="text"
                                                            placeholder="Masukan Password"
                                                            value={password}
                                                            onChange={(e) => {
                                                                setPassword(e.target.value);
                                                            }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                {/* <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        Tanggal Recruitment
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input
                                                            className="form-control-alternative"
                                                            type="date"
                                                            name="itemCode"
                                                            placeholder="Tanggal Pembuatan"
                                                            value={awal}
                                                            onChange={(e) => {
                                                                setAwal(e.target.value);
                                                            }}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="exampleEmail" sm={4}>
                                                        Tanggal Resign
                                                    </Label>
                                                    <Col sm={7}>
                                                        <Input
                                                            className="form-control-alternative"
                                                            type="date"
                                                            name="barcode"
                                                            placeholder="Tanggal Resign"
                                                            value={resign}
                                                            onChange={(e) => {
                                                                setResign(e.target.value);
                                                            }}
                                                        />
                                                    </Col>
                                                </FormGroup> */}
                                                <FormGroup row>
                                                    <Label
                                                    for="exampleEmail"
                                                    sm={4}
                                                    >
                                                    Status Akun
                                                    </Label>
                                                    <Col sm={7}>
                                                        <div style={{ display: "flex" }}>
                                                            <div className="custom-control custom-radio mb-4">
                                                                <Input
                                                                disabled
                                                                className="custom-control-input"
                                                                id="customRadio10"
                                                                name="custom-radio-4"
                                                                type="radio"
                                                                value={1}
                                                                checked={status === 1}
                                                                onChange={() => setStatus(1)}
                                                                />
                                                                <Label
                                                                className="custom-control-label"
                                                                htmlFor="customRadio10"
                                                                >
                                                                Aktif
                                                                </Label>
                                                            </div>
                                                            <div
                                                                className="custom-control custom-radio mb-4"
                                                                style={{ marginLeft: "20px" }}
                                                            >
                                                                <Input
                                                                disabled
                                                                className="custom-control-input"
                                                                id="customRadio11"
                                                                name="custom-radio-4"
                                                                type="radio"
                                                                value={2}
                                                                checked={status === 2}
                                                                onChange={() => setStatus(2)}
                                                                />
                                                                <Label
                                                                className="custom-control-label"
                                                                htmlFor="customRadio11"
                                                                >
                                                                Tidak Aktif
                                                                </Label>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </FormGroup>
                                            </CardBody>
										</Col>
									</Row>
                                    <CardHeader className="bg-white border-0">
                                                <h3>PRIVILEGE</h3>
                                            </CardHeader>
                                </Card>
                                <Card className="bg-secondary shadow">
                                   
                                </Card>
                                <Card className="bg-secondary shadow">
                                    <CardBody>
                                        <Table size="sm" responsive>
                                            <thead>
                                            <tr>
                                                <th>
                                                    Menu
                                                </th>
                                                <th>
                                                    Create
                                                </th>
                                                <th>
                                                    Read
                                                </th>
                                                <th>
                                                    Update
                                                </th>
                                                <th>
                                                    Delete
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
                                                            <td>{savedItem.data.privilege_name}</td>
                                                            <td>
                                                            {/* <Input
                                                                className="form-control-alternative"
                                                                placeholder="qty"
                                                                type="number"
                                                                value={savedItem.qty}
                                                                onChange={(e) => {
                                                                    handleEditQty(key, e.target.value);
                                                                }}/> */}
                                                                <label className="custom-toggle custom-toggle-primary">
                                                                    <Input 
                                                                    type="checkbox" 
                                                                    checked=""
                                                                    value={savedItem.create_access}
                                                                    onChange={(e) => {
                                                                        handleEditQty(key, e.target.value);
                                                                    }}/>  
                                                                    <span className="custom-toggle-slider rounded-circle" data-label-off="NO" data-label-on="YES"></span>
                                                                </label>
                                                            </td>
                                                            <td>
                                                            <label className="custom-toggle custom-toggle-primary">
                                                                    <Input 
                                                                    type="checkbox" 
                                                                    checked=""
                                                                    value={savedItem.read_access}
                                                                    onChange={(e) => {
                                                                        handleEditQty(key, e.target.value);
                                                                    }}/>  
                                                                    <span className="custom-toggle-slider rounded-circle" data-label-off="NO" data-label-on="YES"></span>
                                                                </label>
                                                            </td>
                                                            <td>
                                                            <label className="custom-toggle custom-toggle-primary">
                                                                    <Input 
                                                                    type="checkbox" 
                                                                    checked=""
                                                                    value={savedItem.update_access}
                                                                    onChange={(e) => {
                                                                        handleEditQty(key, e.target.value);
                                                                    }}/>  
                                                                    <span className="custom-toggle-slider rounded-circle" data-label-off="NO" data-label-on="YES"></span>
                                                                </label>
                                                            </td>
                                                            <td>
                                                            <label className="custom-toggle custom-toggle-primary">
                                                                    <Input 
                                                                    type="checkbox" 
                                                                    checked=""
                                                                    value={savedItem.delete_access}
                                                                    onChange={(e) => {
                                                                        handleEditQty(key, e.target.value);
                                                                    }}/>  
                                                                    <span className="custom-toggle-slider rounded-circle" data-label-off="NO" data-label-on="YES"></span>
                                                                </label>
                                                            </td>
                                                            <td>
                                                                {editingItem[key].editing ? (
                                                                    <>
                                                                        <Button color="warning" onClick={() => changeItemDataTable({
                                                                            index: key,
                                                                            privilegename: savedItem.data.privilege_name,
                                                                            create_access: savedItem.data.create_access,
                                                                            read_access: savedItem.data.read_access,
                                                                            update_access: savedItem.data.update_access,
                                                                            delete_access: savedItem.data.delete_access,
                                                                        })}>Update</Button>
                                                                        <Button color="danger" onClick={() => {
                                                                            setSavedItems([
                                                                                ...savedItems.slice(0, key),
                                                                                Object.assign({}, savedItems[key], 
                                                                                    {   privilegename: savedItem.data.privilege_name,
                                                                                        create_access: savedItem.data.create_access,
                                                                                        read_access: savedItem.data.read_access,
                                                                                        update_access: savedItem.data.update_access,
                                                                                        delete_access: savedItem.data.delete_access,
                                                                                    }),
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
                                </Card>
							{/* </Form> */}
						</div>
					</Row>
				</Container>
			</div>
		</>
	);
}
