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
  CardFooter,
  CardImg,
  Col,
  Button,
  Container,
  Form,
  CardGroup,
} from "reactstrap";
import { Link , useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function EditItem() {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  const [itemId, setItemId] = useState(1);
  const [itemTotal, setItemTotal] = useState(null);
  const [query, setQuery] = useState(null);
  const [isSearchShow, setIsSearchShow] = useState(false); 
  const headers = { Authorization: `Bearer ${token}` };
  const redirectPrefix = `/admin/person/edit/`;
  const [allItem, setAllItem] = useState([]);
  const [namePerson, setNamePerson] = useState("");
  const [limitPiutang, setLimitPiutang] = useState("");
  const [limitHutang, setLimitHutang] = useState("");
  const [npwp, setNpwp] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [citys, setCitys] = useState([]);
  const [city, setCity] = useState("");
  const [bankname1,setBankName1] = useState("");
  const [bankname2,setBankName2] = useState("");
  const [bankname3,setBankName3] = useState("");
  const [bankaccount1,setBankAccount1] = useState("");
  const [bankaccount2,setBankAccount2] = useState("");
  const [bankaccount3,setBankAccount3] = useState("");
  const [banknumber1,setBankNumber1] = useState("");
  const [banknumber2,setBankNumber2] = useState("");
  const [banknumber3,setBankNumber3] = useState("");

	useEffect(() => {
		getById();
        getUser();
	}, [itemId]);

	const getById = () => {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        axios
          .get(
            `${process.env.REACT_APP_API_BASE_URL}/person/${itemId}`,
            { headers }
          )
          .then((data) => {
            setNamePerson(data.data.response.person_name);
            setAddress(data.data.response.address);
            setLimitHutang(data.data.response.limit_hutang);
            setLimitPiutang(data.data.response.limit_piutang);
            setPhone(data.data.response.phone);
            setNpwp(data.data.response.npwp);
            getProvinsi(data.data.response.province);
            setCity(data.data.response.city);
            setBankName1(data.data.response.bank_name1);
            setBankName2(data.data.response.bank_name2);
            setBankName3(data.data.response.bank_name3);
            setBankAccount1(data.data.response.bank_account1);
            setBankAccount2(data.data.response.bank_account2);
            setBankAccount3(data.data.response.bank_account3);
            setBankNumber1(data.data.response.bank_number1);
            setBankNumber2(data.data.response.bank_number2);
            setBankNumber3(data.data.response.bank_number3);
            // setImage(data.data.response.logo);
            
          })
          .catch(function (error) {
            console.log(error);
          });
      };

    //   useEffect(() => {
    //     getProvinsi();
    //   }, []);
    
      const getProvinsi = (id) => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/province/list`, { headers
        })
        .then(data => {
          setProvinces(data.data.response_data);
          getKota(id)
          setProvince(id)
        //   setCity(id)
        })
          .catch(function (error) {
            console.log(error)
          })
      }
    
      const getKota = (id) => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/city?province_id=${id}`, { headers
        })
        .then(data => {
          setCitys(data.data.response_data);
        //   setCity(id)
        })
          .catch(function (error) {
            console.log(error)
          })
      }

  

  const getUser = async () => {
    let filter = {
        page: 1,
        per_page: 10,
        warehouse_id: parseInt(warehouse),
    };
    const data = filter;

    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/person`, data, { headers });
    setItemTotal(res.data.total_item);
};

const search = async () => {
    if (Number(query) > 0) {
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/person`, { person_name: query  }, { headers });
        if (res.data.status !== 404) setAllItem(res.data);
        else {
            const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/person`, { person_code: query }, { headers });
            if (res.data.status !== 404) setAllItem(res.data);
            else setAllItem(null);
        }
    } else {
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/person`, {person_name : query }, { headers });
        if (res.data.status !== 404) setAllItem(res.data);
        else setAllItem(null);
    }
    setIsSearchShow(true);
};

const searchShow = (item) => {
    setItemId(item.id);
    setIsSearchShow(false);
};

    const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

  return (
    <>
      <div>
      <SimpleHeader name="Supplier" parentName="Master" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
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
                                                placeholder="Search Supplier"
                                                type="search"
                                                onChange={(e) => setQuery(e.target.value)}
                                                onKeyDown={search}
                                            />
                                        </Col>
                                    </FormGroup>
                                </Col>
                                <Col md="3">
                                    <div style={{ textAlign: "right" }}>
                                        {/* <Button
                                        color="info"
                                        onClick={() => EditData()}
                                        >
                                            Edit
                                        </Button> */}
                                            <Link className="btn btn-info" to={redirectPrefix + itemId}
                                        >
                                            <i className="fas fa-user-edit" /> Edit
                                        </Link>
                                        <Link className="btn btn-danger" to="/admin/person/create">
                                            Tambah
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
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
														<b>Nama :</b> {item.person_name}
													</div>
													<div>
														<b>Kode Supplier:</b> {item.person_code ? item.person_code : "(Not available)"}
													</div>
													<hr style={{ margin: "0.75rem -1rem 0 -1rem" }} />
												</CardBody>
											))
										) : (
											<div className="text-center mb-3 text-danger">User "{query}" tidak ada bosku!</div>
										)}
									</Card>
								)}
                <CardBody>
                    <Row>
						<div className="col">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <h3>Supplier</h3>
                                </CardHeader>
                                <Row md="12">
                                    <Col md="6">
                                        <CardBody>
                                            <FormGroup row>
                                                <Label for="exampleEmail" sm={4}>
                                                    Nama
                                                </Label>
                                                <Col sm={7}>
                                                    <Input
                                                    disabled
                                                    autoComplete="off"
                                                        className="form-control-alternative"
                                                        type="text"
                                                        placeholder="Masukan Nama Supplier"
                                                        value={namePerson}
                                                        onChange={(e) => {
                                                            setNamePerson(e.target.value);
                                                        }}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="exampleEmail" sm={4}>
                                                    Alamat
                                                </Label>
                                                <Col sm={7}>
                                                    <Input
                                                    disabled
                                                    autoComplete="off"
                                                        className="form-control-alternative"
                                                        type="textarea"
                                                        rows = "4"
                                                        placeholder="Masukan Alamat"
                                                        value={address}
                                                        onChange={(e) => {
                                                            setAddress(e.target.value);
                                                        }}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label
                                                    for="exampleEmail"
                                                    sm={4}
                                                >
                                                    Provinsi
                                                    
                                                </Label>
                                                <Col sm={7}>
                                                    <Input
                                                    disabled
                                                    autoComplete="off"
                                                        className="form-control-alternative"
                                                        type="select"
                                                        value={province}
                                                        onChange={(e) => {
                                                        setProvince(e.target.value);
                                                        getKota(e.target.value);
                                                        }}
                                                    >
                                                        <option>Pilih Provinsi</option>
                                                        {
                                                        provinces.map((a, key) => {
                                                            return <option key={key} value={a.id}>{a.name}</option>
                                                        })
                                                        }
                                                    </Input>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label
                                                    for="exampleEmail"
                                                    sm={4}
                                                >
                                                    Kota
                                                </Label>
                                                <Col sm={7}>
                                                    <Input
                                                    disabled
                                                    autoComplete="off"
                                                        className="form-control-alternative"
                                                        name="function"
                                                        type="select"
                                                        value={city}
                                                        onChange={(e) => {
                                                        setCity(e.target.value);
                                                        }}
                                                    >
                                                        <option>Pilih Kota</option>
                                                        {
                                                        citys.map((b, key) => {
                                                            return <option key={key} value={b.id}>{b.name}</option>
                                                        })
                                                        }
                                                    </Input>
                                                </Col>
                                            </FormGroup>
                                        </CardBody>
                                    </Col>
                                    <Col md="6">
                                        <CardBody>
                                            <FormGroup row>
                                                <Label for="exampleEmail" sm={4}>
                                                    Phone
                                                </Label>
                                                <Col sm={7}>
                                                    <Input
                                                    disabled
                                                    autoComplete="off"
                                                        className="form-control-alternative"
                                                        type="text"
                                                        
                                                        placeholder="Masukan No Phone"
                                                        value={phone}
                                                        onChange={(e) => {
                                                            setPhone(e.target.value);
                                                        }}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="exampleEmail" sm={4}>
                                                    Npwp
                                                </Label>
                                                <Col sm={7}>
                                                    <Input
                                                    disabled
                                                    autoComplete="off"
                                                        className="form-control-alternative"
                                                        type="text"
                                                        
                                                        placeholder="Masukan No NPWP"
                                                        value={npwp}
                                                        onChange={(e) => {
                                                            setNpwp(e.target.value);
                                                        }}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="exampleEmail" sm={4}>
                                                    Limit Hutang
                                                </Label>
                                                <Col sm={7}>
                                                    <Input
                                                    disabled
                                                    autoComplete="off"
                                                        className="form-control-alternative"
                                                        type="number"
                                                        
                                                        placeholder="Masukan Limit Hutang"
                                                        value={limitHutang}
                                                        onChange={(e) => {
                                                            setLimitHutang(e.target.value);
                                                        }}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="exampleEmail" sm={4}>
                                                    Limit Piutang
                                                </Label>
                                                <Col sm={7}>
                                                    <Input
                                                    disabled
                                                    autoComplete="off"
                                                        className="form-control-alternative"
                                                        type="number"
                                                        
                                                        placeholder="Masukan Limit Piutang"
                                                        value={limitPiutang}
                                                        onChange={(e) => {
                                                            setLimitPiutang(e.target.value);
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
                                                <h3>Bank</h3>
                                            </CardHeader>
                                            <Row md="12">
                                                <Col md="6">
                                                    <CardBody>
                                                        <FormGroup row>
                                                            <Label for="exampleEmail" sm={4}>
                                                                Nama Bank
                                                            </Label>
                                                            <Col sm={7}>
                                                                <Input
                                                                disabled
                                                                autoComplete="off"
                                                                    className="form-control-alternative"
                                                                    type="text"
                                                                    placeholder="Masukan Nama Bank"
                                                                    value={bankname1}
                                                                    onChange={(e) => {
                                                                        setBankName1(e.target.value);
                                                                    }}
                                                                />
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label for="exampleEmail" sm={4}>
                                                                Nama Rekening
                                                            </Label>
                                                            <Col sm={7}>
                                                                <Input
                                                                disabled
                                                                    autoComplete="off"
                                                                    className="form-control-alternative"
                                                                    type="text"
                                                                    placeholder="Masukan Atas Nama Rekening"
                                                                    value={bankaccount1}
                                                                    onChange={(e) => {
                                                                        setBankAccount1(e.target.value);
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
                                                                Nomor Rekening
                                                            </Label>
                                                            <Col sm={7}>
                                                                <Input
                                                                disabled
                                                                autoComplete="off"
                                                                    className="form-control-alternative"
                                                                    type="text"
                                                                
                                                                    placeholder="Masukan Nomor Rekening"
                                                                    value={banknumber1}
                                                                    onChange={(e) => {
                                                                        setBankNumber1(e.target.value);
                                                                    }}
                                                                />
                                                            </Col>
                                                        </FormGroup>
                                                    </CardBody>
                                                </Col>
                                            </Row>
                                            <Row md="12">
                                                <Col md="6">
                                                    <CardBody>
                                                        <FormGroup row>
                                                            <Label for="exampleEmail" sm={4}>
                                                                Nama Bank
                                                            </Label>
                                                            <Col sm={7}>
                                                                <Input
                                                                disabled
                                                                autoComplete="off"
                                                                    className="form-control-alternative"
                                                                    type="text"
                                                                    placeholder="Masukan Nama Bank"
                                                                    value={bankname2}
                                                                    onChange={(e) => {
                                                                        setBankName2(e.target.value);
                                                                    }}
                                                                />
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label for="exampleEmail" sm={4}>
                                                                Nama Rekening
                                                            </Label>
                                                            <Col sm={7}>
                                                                <Input
                                                                disabled
                                                                    autoComplete="off"
                                                                    className="form-control-alternative"
                                                                    type="text"
                                                                    placeholder="Masukan Akun Bank"
                                                                    value={bankaccount2}
                                                                    onChange={(e) => {
                                                                        setBankAccount2(e.target.value);
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
                                                                Nomor Rekening
                                                            </Label>
                                                            <Col sm={7}>
                                                                <Input
                                                                disabled
                                                                autoComplete="off"
                                                                    className="form-control-alternative"
                                                                    type="text"
                                                                
                                                                    placeholder="Masukan Nomor Rekening"
                                                                    value={banknumber2}
                                                                    onChange={(e) => {
                                                                        setBankNumber2(e.target.value);
                                                                    }}
                                                                />
                                                            </Col>
                                                        </FormGroup>
                                                    </CardBody>
                                                </Col>
                                            </Row>
                                            <Row md="12">
                                                <Col md="6">
                                                    <CardBody>
                                                        <FormGroup row>
                                                            <Label for="exampleEmail" sm={4}>
                                                                Nama Bank
                                                            </Label>
                                                            <Col sm={7}>
                                                                <Input
                                                                disabled
                                                                autoComplete="off"
                                                                    className="form-control-alternative"
                                                                    type="text"
                                                                    placeholder="Masukan Nama Bank"
                                                                    value={bankname3}
                                                                    onChange={(e) => {
                                                                        setBankName3(e.target.value);
                                                                    }}
                                                                />
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label for="exampleEmail" sm={4}>
                                                                Nama Rekening
                                                            </Label>
                                                            <Col sm={7}>
                                                                <Input
                                                                disabled
                                                                    autoComplete="off"
                                                                    className="form-control-alternative"
                                                                    type="text"
                                                                    placeholder="Masukan Atas Nama Rekening"
                                                                    value={bankaccount3}
                                                                    onChange={(e) => {
                                                                        setBankAccount3(e.target.value);
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
                                                                Nomor Rekening
                                                            </Label>
                                                            <Col sm={7}>
                                                                <Input
                                                                disabled
                                                                autoComplete="off"
                                                                    className="form-control-alternative"
                                                                    type="text"
                                                                
                                                                    placeholder="Masukan Nomor Rekening"
                                                                    value={banknumber3}
                                                                    onChange={(e) => {
                                                                        setBankNumber3(e.target.value);
                                                                    }}
                                                                />
                                                            </Col>
                                                        </FormGroup>
                                                    </CardBody>
                                                </Col>
                                            </Row>
                                        <CardFooter>
                                </CardFooter>
                            </Card>
						</div>
					</Row>
                </CardBody>
          </div>
        </Row>
      </Container>
      </div>
    </>
  );
}