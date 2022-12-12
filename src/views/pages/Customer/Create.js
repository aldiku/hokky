/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Label,
  FormGroup,
  Row,
  Input,
  Container,
  CardHeader,
  CardFooter,
  Button,
  Form, FormFeedback,
  Modal, ModalHeader, ModalBody
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function CreateCustomer() {
  const token = localStorage.token;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState("");
  const [provinceError, setProvinceError] = useState(null);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState(null);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const [pricetype, setPriceType] = useState("");
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("")
  const [emailerror, setEmailError] = useState(null)
  const toggle = () => setModal(!modal);

  // const validateForm = () => {
  //   let error = false;
  //   if (name === "") {
  //     setNameError("invalid");
  //     error = true;
  //   }
  //   if (province === "") {
  //     setProvinceError("invalid");
  //     error = true;
  //   }
  //   if (city === "") {
  //     setCityError("invalid");
  //     error = true;
  //   }
  //   if (address === "") {
  //     setAddressError("invalid");
  //     error = true;
  //   }
  //   if (phoneNumber === "") {
  //     setPhoneNumberError("invalid");
  //     error = true;
  //   }
  //   if (email === "") {
  //     setEmailError("invalid");
  //     error = true;
  //   }
  //   return error;
  // };

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

  function CreateData() {
    setLoading(true);
    let data = {
      name: name,
      active_flag: 1,
      province: province,
      city: city,
      customer_email : email,
      address: address,
      phone: phoneNumber,
      price_type : pricetype,
    }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/customer/save`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(function (response) {
        history.push("/admin/customer");
      })
      .then(json => {
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const handleSubmit = (e) => {
      CreateData();
  }
  return (
    <>
      <SimpleHeader name="Daftar Customer" parentName="Master" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit} >
                  <CardHeader>
                    <h3>Daftar Customer</h3>
                  </CardHeader>
                  <CardBody>
                  <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nama
                      </Label>
                      <Input
                        autoComplete="off"
                        type="text"
                        name="nama"
                        placeholder="Masukan Nama"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                      <FormFeedback>
                        Name tidak boleh kosong
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Province
                      </Label>
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
                      <FormFeedback>Province tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Kota
                      </Label>
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
                      <FormFeedback>Kota tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Alamat
                                            </Label>
                      <Input
                      autoComplete="off"
                        type="text"
                        name="alamat"
                        placeholder="Masukan Alamat"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                      />
                      <FormFeedback>
                        Alamat tidak boleh kosong
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nomor Telpon
                      </Label>
                      <Input
                      autoComplete="off"
                        type="text"
                        name="phoneNumber"
                        placeholder="Masukan Nomor Telpon"
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                        }}
                      />
                      <FormFeedback>
                        Nomor Telpon tidak boleh kosong
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Email
                                            </Label>
                      <Input
                      autoComplete="off"
                        type="text"
                        name="phoneNumber"
                        placeholder="Masukan Email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                      <FormFeedback>
                        Email tidak boleh kosong
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Tipe Harga
                      </Label>
                      <Input
                        autoComplete="off"
                        type="select"
                        value={pricetype}
                        onChange={(e) => {
                          setPriceType(e.target.value)
                        }}
                      >
                        <option value="" selected hidden>Pilih Tipe Harga</option>
                        <option value="1">Level 1</option>
                        <option value="2">Level 2</option>
                        <option value="3">Level 3</option>
                        <option value="4">Level 4</option>
                        <option value="5">Level 5</option>
                      </Input>
                      <FormFeedback>
                        Tipe Harga tidak boleh kosong
                      </FormFeedback>
                    </FormGroup>
                  </CardBody>
                  <CardFooter>
                    <Button color="danger" onClick={toggle}>
                        Simpan
                    </Button>
                    <Link className="btn btn-info" to="/admin/customer">
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
