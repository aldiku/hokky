/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Label,
  FormGroup,
  Row,
  Col,
  Input,
  Container,
  CardHeader,
  CardFooter,
  Button,
  Form,
  FormFeedback,
  Modal, ModalHeader, ModalBody
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function CreateUser() {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  const roleId = localStorage.authority;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [awal, setAwal] = useState("");
  const [warehousepusat, setWarehousePusat] = useState("");
  const [warehousepusats, setWarehousePusats] = useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  

  useEffect(() => {
    // getProvince();
    getPusat();
  }, []);

  const getPusat = () => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/warehouse/list/all`, { headers
    })
    .then(data => {
      // console.log(data)
      setWarehousePusats(data.data.response);
    })
      .catch(function (error) {
        console.log(error)
      })
  }

  // const getProvince = () => {
  //   const headers = {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   };
  //   axios
  //     .get(`${process.env.REACT_APP_API_BASE_URL}/province/list`, { headers })
  //     .then((data) => {
  //       setProvinces(data.data.response_data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  // const getCity = (provinceId) => {
  //   const headers = {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   };
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_API_BASE_URL}/city?province_id=${provinceId}`,
  //       { headers }
  //     )
  //     .then((data) => {
  //       setCities(data.data.response_data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  function CreateData() {
    setLoading(true);
    let data = {
      warehouse_id: parseInt(warehousepusat),
      username: username,
      name: name,
      email: email,
      password: password,
      gender: parseInt(gender),
      is_karyawan:1,
      role: [3],
      // address: address,
      // province: parseInt(province),
      // city: parseInt(city),
      // phone: phone,
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/users/register`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        history.push("/admin/user");
      })
      .then((json) => {
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleSubmit = (e) => {
    {
      CreateData();
    }
  };
  return (
    <>
      <SimpleHeader name="Buat User" parentName="Master" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <CardHeader>
                    <h3>Buat User</h3>
                  </CardHeader>
                  <Row md="12">
										<Col md="6">
                      <CardBody>
                      <FormGroup row>
                            <Label
                                for="exampleEmail"
                                sm={4}
                            >
                                Cabang
                                
                            </Label>
                            <Col sm={7}>
                                <Input
                                    autoComplete="off"
                                    className="form-control-alternative"
                                    type="select"
                                    value={warehousepusat}
                                    onChange={(e) => {
                                    setWarehousePusat(e.target.value);
                                    
                                    }}
                                >
                                    <option value={""}  selected disabled hidden>Pilih Cabang</option>
                                    {
                                    warehousepusats.map((a, key) => {
                                        return <option key={key} value={a.id}>{a.name}</option>
                                    })
                                    }
                                </Input>
                            </Col>
                        </FormGroup>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                  Username
                              </Label>
                              <Col sm={7}>
                                  <Input
                                    autoComplete="off"
                                      className="form-control-alternative"
                                      type="text"
                                      name="itemCode"
                                      placeholder="Masukan Username"
                                      value={username}
                                      onChange={(e) => {
                                          setUsername(e.target.value);
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
                                    autoComplete="off"
                                      className="form-control-alternative"
                                      type="text"
                                      name="barcode"
                                      placeholder="Masukan Nama"
                                      value={name}
                                      onChange={(e) => {
                                          setName(e.target.value);
                                      }}
                                  />
                              </Col>
                          </FormGroup>
                         
                          {/* <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                  Alamat
                              </Label>
                              <Col sm={7}>
                                  <Input
                                    autoComplete="off"
                                      className="form-control-alternative"
                                      name="Supplier"
                                      type="textarea"
                                      rows="5"
                                      placeholder="Masukan Alamat"
                                      value={address}
                                      onChange={(e) => {
                                          setAddress(e.target.value);
                                      }}
                                  />
                              </Col>
                          </FormGroup> */}
                      </CardBody>
										</Col>
										<Col md="6">
                      <CardBody>
                          <FormGroup row>
                                <Label
                                for="exampleEmail"
                                sm={4}
                                >
                                Jenis Kelamin
                                </Label>
                                <Col sm={7}>
                                    <div style={{ display: "flex" }}>
                                        <div className="custom-control custom-radio mb-4">
                                            <Input
                                              autoComplete="off"
                                              className="custom-control-input"
                                              id="customRadio10"
                                              name="custom-radio-4"
                                              type="radio"
                                              value={1}
                                              checked={gender === 1}
                                              onChange={() => setGender(1)}
                                            />
                                            <Label
                                              className="custom-control-label"
                                              htmlFor="customRadio10"
                                            >
                                              Laki-Laki
                                            </Label>
                                        </div>
                                        <div
                                            className="custom-control custom-radio mb-4"
                                            style={{ marginLeft: "20px" }}
                                        >
                                            <Input
                                              autoComplete="off"
                                              className="custom-control-input"
                                              id="customRadio11"
                                              name="custom-radio-4"
                                              type="radio"
                                              value={2}
                                              checked={gender === 2}
                                              onChange={() => setGender(2)}
                                            />
                                            <Label
                                              className="custom-control-label"
                                              htmlFor="customRadio11"
                                            >
                                              Perempuan
                                            </Label>
                                        </div>
                                    </div>
                                </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                  Email
                              </Label>
                              <Col sm={7}>
                                  <Input
                                    autoComplete="off"
                                      className="form-control-alternative"
                                      name="Supplier"
                                      type="text"
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
                                    autoComplete="off"
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
                                      getCity(e.target.value);
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
                                      cities.map((b, key) => {
                                          return <option key={key} value={b.id}>{b.name}</option>
                                      })
                                      }
                                  </Input>
                              </Col>
                          </FormGroup>
                          <FormGroup row>
                              <Label for="exampleEmail" sm={4}>
                                  Phone
                              </Label>
                              <Col sm={7}>
                                  <Input
                                    autoComplete="off"
                                      className="form-control-alternative"
                                      name="Supplier"
                                      type="text"
                                      placeholder="Masukan Phone"
                                      value={phone}
                                      onChange={(e) => {
                                          setPhone(e.target.value);
                                      }}
                                  />
                              </Col>
                          </FormGroup>
                            <FormGroup row>
                                <Label for="exampleEmail" sm={4}>
                                    Tanggal Recruitment
                                </Label>
                                <Col sm={7}>
                                    <Input
                                      autoComplete="off"
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
                            </FormGroup> */}
                        </CardBody>
										</Col>
									</Row>
                  <CardFooter>
                    <Button color="danger" onClick={toggle}>
                        Simpan
                    </Button>
                    <Link className="btn btn-info" to="/admin/user">
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
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
