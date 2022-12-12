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
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function EditTransferStock(props) {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  const role = localStorage.authority;
  const namaDepartment = localStorage.department;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [usernameTs, setUsernameTs] = useState(username);
  const [usernameKurir, setUsernameKurir] = useState(username);
  const [usernammeGudang, setUsernameGudang] = useState(username);
  const [usernameValidator, setUsernameValidator] = useState(username);
  const [descriptionValidator, setDescriptionValidator] = useState("");
  const [descriptionTs, setDescriptionTs] = useState("");
  const [descriptionGudang, setDescriptionGudang] = useState("");
  const [statusBarang, setStatusBarang] = useState(0);
  const [clear, setClear] = useState(0);
  const [tsType, setTsType] = useState("");
  const [typeItemId, setTypeItemId] = useState(1);
  const [code, setCode] = useState("");

  const [items, setItems] = useState([]);

  const [inputList, setInputList] = useState([
    {
      item_id: "",
      qty: "",
      qty_fisik: "",
      keterangan_fisik: "",
    },
  ]);

  const validateForm = () => {
    let error = false;
    // if (paymentMethod === "") {
    //   setPaymentMethodError("invalid");
    //   error = true;
    // }
    return error;
  };

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
        `${process.env.REACT_APP_API_BASE_URL}/transfer-stok/get/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        getTs(data.data.response_data.id);
        setUsernameTs(data.data.response_data.username_ts);
        setUsernameGudang(data.data.response_data.username_gudang);
        setUsernameKurir(data.data.response_data.username_kurir);
        setUsernameValidator(data.data.response_data.username_validator);
        setDescriptionGudang(data.data.response_data.keterangan_gudang);
        setDescriptionTs(data.data.response_data.keterangan_ts);
        setDescriptionValidator(data.data.response_data.keterangan_validator);
        setTsType(data.data.response_data.ts_type);
        setClear(data.data.response_data.clear);
        setStatusBarang(data.data.response_data.status_barang);
        setCode(data.data.response_data.transfer_code);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getTs = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const data = {
      ts_id: parseInt(id),
    };
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/transfer-stok/ts-items`,
        data,
        {
          headers,
        }
      )
      .then((data) => {
        getItem();
        let item = [];
        let qty = [];
        let qty_fisik = [];
        let keterangan_fisik = [];
        data.data.response_data.map((x, i) => {
          item.push(x.item_id);
          qty.push(x.qty);
          qty_fisik.push(x.qty_fisik);
          keterangan_fisik.push(x.keterangan_fisik);
          setInputList([
            {
              item_id: x.item_id,
              qty: x.qty,
              qty_fisik: x.qty_fisik,
              keterangan_fisik: x.keterangan_fisik,
            },
          ]);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getItem();
  }, [typeItemId, setTypeItemId]);

  const getItem = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/items/type`,
        { params: { warehouse_id: warehouse, type: typeItemId } },
        { headers }
      )
      .then((data) => {
        setItems(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = name === "keterangan_fisik" ? value : parseInt(value);
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        item_id: "",
        qty: "",
        qty_fisik: "",
        keterangan_fisik: "",
      },
    ]);
  };

  function EditData() {
    setLoading(true);
    let data = {
      warehouse_id: parseInt(warehouse),
      username_ts: usernameTs,
      username_gudang: usernammeGudang,
      status_barang: parseInt(statusBarang),
      keterangan_gudang: descriptionGudang,
      username_kurir: usernameKurir,
      username_validator: usernameValidator,
      clear: parseInt(clear),
      keterangan_validator: descriptionValidator,
      active_flag: 1,
      ts_type: tsType,
      keterangan_ts: descriptionTs,
      items: inputList,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/transfer-stok/update/${props.match.params.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        history.push("/admin/transfer-stock");
      })
      .then((json) => {
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      EditData();
    }
  };
  return (
    <>
      <SimpleHeader name="Edit Transfer Stock" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            {role === "ROLE_ADMIN" &&
            namaDepartment === "Front Office Manager" ? (
              <Card>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <CardHeader>
                      <h3>Edit Sales Order</h3>
                    </CardHeader>
                    <CardBody>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Order Code
                        </Label>
                        <Input
                          disabled
                          type="text"
                          name="po"
                          placeholder="Masukan Kode"
                          value={code}
                          onChange={(e) => {
                            setCode(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Keterangan TS
                        </Label>
                        <Input
                          disabled
                          type="text"
                          name="descSo"
                          placeholder="Masukan Keterangan TS"
                          value={descriptionTs}
                          onChange={(e) => {
                            setDescriptionTs(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Keterangan Validator
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="descValidator"
                          placeholder="Masukan Keterangan Validator"
                          value={descriptionValidator}
                          onChange={(e) => {
                            setDescriptionValidator(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlSelect3"
                        >
                          Clear
                        </Label>
                        <Row>
                          <Col>
                            <div style={{ display: "flex" }}>
                              <div className="custom-control custom-radio mb-3">
                                <Input
                                  className="custom-control-input"
                                  id="customRadio5"
                                  name="custom-radio-2"
                                  type="radio"
                                  value={1}
                                  checked={clear === 1}
                                  onChange={() => setClear(1)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio5"
                                >
                                  Disetujui
                                </Label>
                              </div>
                              <div
                                className="custom-control custom-radio mb-3"
                                style={{ marginLeft: "20px" }}
                              >
                                <Input
                                  className="custom-control-input"
                                  id="customRadio6"
                                  name="custom-radio-2"
                                  type="radio"
                                  value={2}
                                  checked={clear === 2}
                                  onChange={() => setClear(2)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio6"
                                >
                                  Ditolak
                                </Label>
                              </div>
                              <div
                                className="custom-control custom-radio mb-3"
                                style={{ marginLeft: "20px" }}
                              >
                                <Input
                                  className="custom-control-input"
                                  id="customRadio7"
                                  name="custom-radio-2"
                                  type="radio"
                                  value={3}
                                  checked={clear === 3}
                                  onChange={() => setClear(3)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio7"
                                >
                                  Dibatalkan
                                </Label>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                      {inputList.map((x, i) => {
                        return (
                          <div className="box">
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlSelect3"
                              >
                                Item
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                disabled
                                name="item_id"
                                type="select"
                                value={parseInt(x.item_id)}
                                onChange={(e) => handleInputChange(e, i)}
                              >
                                <option value="">Pilih Item</option>
                                {items.map((item, key) => {
                                  return (
                                    <option key={key} value={item.id}>
                                      {item.item_name}
                                    </option>
                                  );
                                })}
                              </Input>
                              <FormFeedback>
                                Item tidak boleh kosong
                              </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Quality
                              </Label>
                              <Input
                                disabled
                                type="text"
                                name="qty"
                                placeholder="Masukan Quality"
                                value={x.qty}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlSelect3"
                              >
                                Satuan
                              </Label>
                              <Input
                                disabled
                                name="satuan"
                                type="select"
                                value={x.satuan}
                                onChange={(e) => handleInputChange(e, i)}
                              >
                                <option value="">Pilih Satuan</option>
                                {allSatuan.map((satuan, key) => {
                                  return (
                                    <option key={key} value={satuan.id}>
                                      {satuan.uom_code}
                                    </option>
                                  );
                                })}
                              </Input>
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlSelect3"
                              >
                                Person
                              </Label>
                              <Input
                                disabled
                                name="person"
                                type="select"
                                value={x.person}
                                onChange={(e) => handleInputChange(e, i)}
                              >
                                <option value="">Pilih Person</option>
                                {persons.map((person, key) => {
                                  return (
                                    <option key={key} value={person.id}>
                                      {person.person_name}
                                    </option>
                                  );
                                })}
                              </Input>
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Harga
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                disabled
                                type="text"
                                name="harga"
                                placeholder="Masukan Harga"
                                value={x.harga}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Quality Fisik
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                disabled
                                type="text"
                                name="qty_fisik"
                                placeholder="Masukan Quality Fidik"
                                value={x.qty_fisik}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Keterangan Fisik
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                disabled
                                type="text"
                                name="keterangan_fisik"
                                placeholder="Masukan Keterangna Fisik"
                                value={x.keterangan_fisik}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </FormGroup>
                            <div className="btn-box">
                              {inputList.length !== 1 && (
                                <Button
                                  color="default"
                                  onClick={() => handleRemoveClick(i)}
                                >
                                  Remove
                                </Button>
                              )}
                              {inputList.length - 1 === i && (
                                <Button
                                  color="default"
                                  onClick={handleAddClick}
                                >
                                  Add
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </CardBody>
                    <CardFooter>
                      {!isLoading && (
                        <Button color="primary" type="submit">
                          Simpan
                        </Button>
                      )}
                      {isLoading && (
                        <Button color="primary" disabled>
                          <i className="fas fa-spinner fa-spin"></i>
                          {""}
                          loading...
                        </Button>
                      )}
                      <Link className="btn btn-info" to="/admin/sales-order">
                        Kembali
                      </Link>
                    </CardFooter>
                  </Form>
                </CardBody>
              </Card>
            ) : role === "ROLE_ADMIN" && namaDepartment === "Gudang" ? (
              <Card>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <CardHeader>
                      <h3>Edit Sales Order</h3>
                    </CardHeader>
                    <CardBody>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Order Code
                        </Label>
                        <Input
                          disabled
                          type="text"
                          name="po"
                          placeholder="Masukan Kode"
                          value={code}
                          onChange={(e) => {
                            setCode(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Keterangan Gudang
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="descGudang"
                          placeholder="Masukan Keterangan Gudang"
                          value={descriptionGudang}
                          onChange={(e) => {
                            setDescriptionGudang(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlSelect3"
                        >
                          Status Barang
                        </Label>
                        <Row>
                          <Col>
                            <div style={{ display: "flex" }}>
                              <div className="custom-control custom-radio mb-3">
                                <Input
                                  className="custom-control-input"
                                  id="customRadio11"
                                  name="custom-radio-4"
                                  type="radio"
                                  value={1}
                                  checked={statusBarang === 1}
                                  onChange={() => setStatusBarang(1)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio11"
                                >
                                  Diterima
                                </Label>
                              </div>
                              <div
                                className="custom-control custom-radio mb-3"
                                style={{ marginLeft: "20px" }}
                              >
                                <Input
                                  className="custom-control-input"
                                  id="customRadio12"
                                  name="custom-radio-4"
                                  type="radio"
                                  value={2}
                                  checked={statusBarang === 2}
                                  onChange={() => setStatusBarang(2)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio12"
                                >
                                  Ditolak
                                </Label>
                              </div>
                              <div
                                className="custom-control custom-radio mb-3"
                                style={{ marginLeft: "20px" }}
                              >
                                <Input
                                  className="custom-control-input"
                                  id="customRadio13"
                                  name="custom-radio-4"
                                  type="radio"
                                  value={3}
                                  checked={statusBarang === 3}
                                  onChange={() => setStatusBarang(3)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio13"
                                >
                                  Dibatalkan
                                </Label>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                      {inputList.map((x, i) => {
                        return (
                          <div className="box">
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlSelect3"
                              >
                                Item
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                disabled
                                name="item_id"
                                type="select"
                                value={parseInt(x.item_id)}
                                onChange={(e) => handleInputChange(e, i)}
                              >
                                <option value="">Pilih Item</option>
                                {items.map((item, key) => {
                                  return (
                                    <option key={key} value={item.id}>
                                      {item.item_name}
                                    </option>
                                  );
                                })}
                              </Input>
                              <FormFeedback>
                                Item tidak boleh kosong
                              </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Quality
                              </Label>
                              <Input
                                disabled
                                type="text"
                                name="qty"
                                placeholder="Masukan Quality"
                                value={x.qty}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlSelect3"
                              >
                                Satuan
                              </Label>
                              <Input
                                disabled
                                name="satuan"
                                type="select"
                                value={x.satuan}
                                onChange={(e) => handleInputChange(e, i)}
                              >
                                <option value="">Pilih Satuan</option>
                                {allSatuan.map((satuan, key) => {
                                  return (
                                    <option key={key} value={satuan.id}>
                                      {satuan.uom_code}
                                    </option>
                                  );
                                })}
                              </Input>
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlSelect3"
                              >
                                Person
                              </Label>
                              <Input
                                disabled
                                name="person"
                                type="select"
                                value={x.person}
                                onChange={(e) => handleInputChange(e, i)}
                              >
                                <option value="">Pilih Person</option>
                                {persons.map((person, key) => {
                                  return (
                                    <option key={key} value={person.id}>
                                      {person.person_name}
                                    </option>
                                  );
                                })}
                              </Input>
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Harga
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                disabled
                                type="text"
                                name="harga"
                                placeholder="Masukan Harga"
                                value={x.harga}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Quality Fisik
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                disabled
                                type="text"
                                name="qty_fisik"
                                placeholder="Masukan Quality Fidik"
                                value={x.qty_fisik}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Keterangan Fisik
                                <span className="text-danger">*</span>
                              </Label>
                              <Input
                                disabled
                                type="text"
                                name="keterangan_fisik"
                                placeholder="Masukan Keterangna Fisik"
                                value={x.keterangan_fisik}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </FormGroup>
                            <div className="btn-box">
                              {inputList.length !== 1 && (
                                <Button
                                  color="default"
                                  onClick={() => handleRemoveClick(i)}
                                >
                                  Remove
                                </Button>
                              )}
                              {inputList.length - 1 === i && (
                                <Button
                                  color="default"
                                  onClick={handleAddClick}
                                >
                                  Add
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </CardBody>
                    <CardFooter>
                      {!isLoading && (
                        <Button color="primary" type="submit">
                          Simpan
                        </Button>
                      )}
                      {isLoading && (
                        <Button color="primary" disabled>
                          <i className="fas fa-spinner fa-spin"></i>
                          {""}
                          loading...
                        </Button>
                      )}
                      <Link className="btn btn-info" to="/admin/sales-order">
                        Kembali
                      </Link>
                    </CardFooter>
                  </Form>
                </CardBody>
              </Card>
            ) : (
              <Card>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <CardHeader>
                      <h3>Edit Transfer Stock</h3>
                    </CardHeader>
                    <CardBody>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Username TS
                        </Label>
                        <Input
                          disabled
                          type="text"
                          name="ts"
                          placeholder="Masukan Username TS"
                          value={usernameTs}
                          onChange={(e) => {
                            setUsernameTs(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Keterangan TS
                        </Label>
                        <Input
                          type="text"
                          name="descSo"
                          placeholder="Masukan Keterangan TS"
                          value={descriptionTs}
                          onChange={(e) => {
                            setDescriptionTs(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Username Kurir
                        </Label>
                        <Input
                          disabled
                          type="text"
                          name="kurir"
                          placeholder="Masukan Username Kurir"
                          value={usernameKurir}
                          onChange={(e) => {
                            setUsernameKurir(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Username Gudang
                        </Label>
                        <Input
                          disabled
                          type="text"
                          name="usernameGudang"
                          placeholder="Masukan Username Gudang"
                          value={usernammeGudang}
                          onChange={(e) => {
                            setUsernameGudang(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Keterangan Gudang
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="descGudang"
                          placeholder="Masukan Keterangan Gudang"
                          value={descriptionGudang}
                          onChange={(e) => {
                            setDescriptionGudang(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Username Validator
                        </Label>
                        <Input
                          disabled
                          type="text"
                          name="usernameValidation"
                          placeholder="Masukan Username Validator"
                          value={usernameValidator}
                          onChange={(e) => {
                            setUsernameValidator(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Keterangan Validator
                          <span className="text-danger">*</span>
                        </Label>
                        <Input
                          type="text"
                          name="descValidator"
                          placeholder="Masukan Keterangan Validator"
                          value={descriptionValidator}
                          onChange={(e) => {
                            setDescriptionValidator(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlSelect3"
                        >
                          TS Type
                        </Label>
                        <Input
                          name="tsType"
                          type="select"
                          value={tsType}
                          onChange={(e) => {
                            setTsType(e.target.value);
                          }}
                        >
                          <option value="">Pilih Payment Method</option>
                          <option value={1}>Konvensional</option>
                          <option value={2}>Indent</option>
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlSelect3"
                        >
                          Clear
                        </Label>
                        <Row>
                          <Col>
                            <div style={{ display: "flex" }}>
                              <div className="custom-control custom-radio mb-3">
                                <Input
                                  className="custom-control-input"
                                  id="customRadio5"
                                  name="custom-radio-2"
                                  type="radio"
                                  value={1}
                                  checked={clear === 1}
                                  onChange={() => setClear(1)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio5"
                                >
                                  Disetujui
                                </Label>
                              </div>
                              <div
                                className="custom-control custom-radio mb-3"
                                style={{ marginLeft: "20px" }}
                              >
                                <Input
                                  className="custom-control-input"
                                  id="customRadio6"
                                  name="custom-radio-2"
                                  type="radio"
                                  value={2}
                                  checked={clear === 2}
                                  onChange={() => setClear(2)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio6"
                                >
                                  Ditolak
                                </Label>
                              </div>
                              <div
                                className="custom-control custom-radio mb-3"
                                style={{ marginLeft: "20px" }}
                              >
                                <Input
                                  className="custom-control-input"
                                  id="customRadio7"
                                  name="custom-radio-2"
                                  type="radio"
                                  value={3}
                                  checked={clear === 3}
                                  onChange={() => setClear(3)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio7"
                                >
                                  Dibatalkan
                                </Label>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlSelect3"
                        >
                          Status Barang
                        </Label>
                        <Row>
                          <Col>
                            <div style={{ display: "flex" }}>
                              <div className="custom-control custom-radio mb-3">
                                <Input
                                  className="custom-control-input"
                                  id="customRadio11"
                                  name="custom-radio-4"
                                  type="radio"
                                  value={1}
                                  checked={statusBarang === 1}
                                  onChange={() => setStatusBarang(1)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio11"
                                >
                                  Diterima
                                </Label>
                              </div>
                              <div
                                className="custom-control custom-radio mb-3"
                                style={{ marginLeft: "20px" }}
                              >
                                <Input
                                  className="custom-control-input"
                                  id="customRadio12"
                                  name="custom-radio-4"
                                  type="radio"
                                  value={2}
                                  checked={statusBarang === 2}
                                  onChange={() => setStatusBarang(2)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio12"
                                >
                                  Ditolak
                                </Label>
                              </div>
                              <div
                                className="custom-control custom-radio mb-3"
                                style={{ marginLeft: "20px" }}
                              >
                                <Input
                                  className="custom-control-input"
                                  id="customRadio13"
                                  name="custom-radio-4"
                                  type="radio"
                                  value={3}
                                  checked={statusBarang === 3}
                                  onChange={() => setStatusBarang(3)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio13"
                                >
                                  Dibatalkan
                                </Label>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                      {inputList.map((x, i) => {
                        return (
                          <div className="box" key={i}>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlSelect3"
                              >
                                Item
                              </Label>
                              <Input
                                name="item_id"
                                type="select"
                                value={x.item_id}
                                onChange={(e) => handleInputChange(e, i)}
                              >
                                <option value="">Pilih Item</option>
                                {items.map((item, key) => {
                                  return (
                                    <option key={key} value={item.id}>
                                      {item.item_name}
                                    </option>
                                  );
                                })}
                              </Input>
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Quantity
                              </Label>
                              <Input
                                type="number"
                                name="qty"
                                placeholder="Masukan Quantity"
                                value={x.qty}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Quantity Fisik
                              </Label>
                              <Input
                                type="number"
                                name="qty_fisik"
                                placeholder="Masukan Quantity Fisik"
                                value={x.qty_fisik}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label
                                className="form-control-label"
                                htmlFor="exampleFormControlInput1"
                              >
                                Keterangan Fisik
                              </Label>
                              <Input
                                type="text"
                                name="keterangan_fisik"
                                placeholder="Masukan Keterangna Fisik"
                                value={x.keterangan_fisik}
                                onChange={(e) => handleInputChange(e, i)}
                              />
                            </FormGroup>
                            <div className="btn-box">
                              {inputList.length !== 1 && (
                                <Button
                                  color="default"
                                  onClick={() => handleRemoveClick(i)}
                                >
                                  Remove
                                </Button>
                              )}
                              {inputList.length - 1 === i && (
                                <Button
                                  color="default"
                                  onClick={handleAddClick}
                                >
                                  Add
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </CardBody>
                    <CardFooter>
                      {!isLoading && (
                        <Button color="primary" type="submit">
                          Simpan
                        </Button>
                      )}
                      {isLoading && (
                        <Button color="primary" disabled>
                          <i className="fas fa-spinner fa-spin"></i>
                          {""}
                          loading...
                        </Button>
                      )}
                      <Link className="btn btn-info" to="/admin/transfer-stock">
                        Kembali
                      </Link>
                    </CardFooter>
                  </Form>
                </CardBody>
              </Card>
            )}
          </div>
        </Row>
      </Container>
    </>
  );
}
