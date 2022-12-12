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
    Col,
    Button,
    Container,
    Modal, ModalHeader, ModalBody
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function EditSupplier(props) {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
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
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  
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
        `${process.env.REACT_APP_API_BASE_URL}/person/${props.match.params.id}`,
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
        
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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


  function EditData() {
    setLoading(true);
    let data = {
        person_name: namePerson,
    //   description: description,
      phone : phone,
      address: address,
      province : province,
      city : city,
      bank_name1: bankname1 ,
      bank_name2: bankname2,
      bank_name3: bankname3,
      bank_account1: bankaccount1,
      bank_account2: bankaccount2,
      bank_account3: bankaccount3,
      bank_number1 : banknumber1,
      bank_number2 : banknumber2,
      bank_number3 : banknumber3,
      limit_piutang: parseInt(limitPiutang),
      limit_hutang: parseInt(limitHutang),
      active_flag: 1,
      npwp: npwp,
    }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/person/update/${props.match.params.id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(function (response) {
        history.push("/admin/person");
      })
      .then(json => {
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <>
      <SimpleHeader name="Edit Supplier" parentName="Master" />
      <Container className="mt--6" fluid>
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
                                        autoComplete="off"
                                            className="form-control-alternative"
                                            type="number"
                                            pattern='[0-9]{0,5}'
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
                                        autoComplete="off"
                                            className="form-control-alternative"
                                            type="text"
                                            pattern='[0-9]{0,5}'
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
                                        autoComplete="off"
                                            className="form-control-alternative"
                                            type="number"
                                            pattern='[0-9]{0,5}'
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
                                        autoComplete="off"
                                            className="form-control-alternative"
                                            type="number"
                                            pattern='[0-9]{0,5}'
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
                                                                
                                                                autoComplete="off"
                                                                    className="form-control-alternative"
                                                                    type="number"
                                                                    pattern='[0-9]{0,5}'
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
                                                                
                                                                autoComplete="off"
                                                                    className="form-control-alternative"
                                                                    type="number"
                                                                    pattern='[0-9]{0,5}'
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
                                                                
                                                                autoComplete="off"
                                                                    className="form-control-alternative"
                                                                    type="number"
                                                                    pattern='[0-9]{0,5}'
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
                                    <Button color="danger" onClick={toggle}>
                                        Simpan
                                    </Button>
                                    <Link className="btn btn-info" to="/admin/pajak">
                                    Kembali
                                    </Link>
                                </CardFooter>
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
            </div>
        </Row>
      </Container>
    </>
  );
}
