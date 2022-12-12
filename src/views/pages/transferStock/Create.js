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

export default function CreateTransferStock() {
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
  const [approve, setApprove] = useState(0);

  const [errKeterangan, setErrKeteranganTs] = useState("");
  const [errKetValidator, setErrKetValidator] = useState("");
  const [errKetGudang, setErrKeGudang] = useState("");
  const [errTsType, setErrTsType] = useState("");
  const [errClear, setErrClear] = useState("");
  const [errStatusBarang, setErrStatusBarang] = useState("");

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
    if (descriptionTs === "") {
      setErrKeteranganTs("invalid");
      error = true;
    }
    if (descriptionValidator === "") {
      setErrKetValidator("invalid");
      error = true;
    }
    if (descriptionGudang === "") {
      setErrKeGudang("invalid");
      error = true;
    }
    if (tsType === "") {
      setErrTsType("invalid");
      error = true;
    }

    if (clear === 0) {
      setErrClear("invalid");
      error = true;
    }

    if (statusBarang === 0) {
      setErrStatusBarang("invalid");
      error = true;
    }
    return error;
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

  function CreateData() {
    setLoading(true);
    let data = {
      warehouse_id: parseInt(warehouse),
      username_ts: usernameTs,
      username_manager: "",
      manager_approval: "",
      keterangan_manager: "",
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

    console.log(inputList.slice(1, inputList.length));
    fetch(`${process.env.REACT_APP_API_BASE_URL}/transfer-stok/save`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
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
      CreateData();
    }
  };
  return (
    <>
      <SimpleHeader name="Daftar Transfer Stock" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            {role === "ROLE_KARYAWAN" && namaDepartment === "Gudang" ? (
              <Card>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <CardHeader>
                      <h3>Daftar Transfer Stock</h3>
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
                          invalid={errKeterangan === "invalid"}
                          onChange={(e) => {
                            setDescriptionTs(e.target.value);
                            setErrKeteranganTs("");
                          }}
                        />
                        <FormFeedback>
                          Keterangan TS Tidak boleh kosong
                        </FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlSelect3"
                        >
                          TS Type
                        </Label>
                        <Input
                          name="paymentMethod"
                          type="select"
                          value={tsType}
                          onChange={(e) => {
                            setTsType(e.target.value);
                            setErrTsType("");
                          }}
                          invalid={errTsType === "invalid"}
                        >
                          <option value="">Pilih Payment Method</option>
                          <option value={1}>Konvensional</option>
                          <option value={2}>Indent</option>
                        </Input>
                        <FormFeedback>TS Type tidak boleh kosong</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlSelect3"
                        >
                          Approve
                        </Label>
                        <Row>
                          <Col>
                            <div style={{ display: "flex" }}>
                              <div className="custom-control custom-radio mb-3">
                                <Input
                                  className="custom-control-input"
                                  id="customRadio8"
                                  name="custom-radio-3"
                                  type="radio"
                                  value={1}
                                  checked={approve === 1}
                                  onChange={() => setApprove(1)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio8"
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
                                  id="customRadio9"
                                  name="custom-radio-3"
                                  type="radio"
                                  value={2}
                                  checked={approve === 2}
                                  onChange={() => setApprove(2)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio9"
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
                                  id="customRadio10"
                                  name="custom-radio-3"
                                  type="radio"
                                  value={3}
                                  checked={approve === 3}
                                  onChange={() => setApprove(3)}
                                />
                                <Label
                                  className="custom-control-label"
                                  htmlFor="customRadio10"
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
            ) : (
              <Card>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <CardHeader>
                      <h3>Daftar Transfer Stock</h3>
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
                          invalid={errKeterangan === "invalid"}
                          onChange={(e) => {
                            setDescriptionTs(e.target.value);
                            setErrKeteranganTs("");
                          }}
                        />
                        <FormFeedback>
                          Keterangan TS Tidak boleh kosong
                        </FormFeedback>
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
                          invalid={errKetValidator === "invalid"}
                          onChange={(e) => {
                            setDescriptionValidator(e.target.value);
                            setErrKetValidator("");
                          }}
                        />
                        <FormFeedback>
                          Keterangan Validator Tidak Boleh Kosong
                        </FormFeedback>
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
                          invalid={errKetGudang === "invalid"}
                          onChange={(e) => {
                            setDescriptionGudang(e.target.value);
                            setErrKeGudang("");
                          }}
                        />
                        <FormFeedback>
                          Keterangan Gudang tidak Boleh Kosong
                        </FormFeedback>
                      </FormGroup>

                      <FormGroup>
                        <Label
                          className="form-control-label"
                          htmlFor="exampleFormControlSelect3"
                        >
                          TS Type
                        </Label>
                        <Input
                          name="paymentMethod"
                          type="select"
                          value={tsType}
                          onChange={(e) => {
                            setTsType(e.target.value);
                            setErrTsType("");
                          }}
                          invalid={errTsType === "invalid"}
                        >
                          <option value="">Pilih Payment Method</option>
                          <option value={1}>Konvensional</option>
                          <option value={2}>Indent</option>
                        </Input>
                        <FormFeedback>TS Type tidak boleh kosong</FormFeedback>
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
                                  onChange={() => {
                                    setClear(1);
                                    setErrClear("");
                                  }}
                                  invalid={errClear === "invalid"}
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
                                  onChange={() => {
                                    setClear(2);
                                    setErrClear("");
                                  }}
                                  invalid={errClear === "invalid"}
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
                                  onChange={() => {
                                    setClear(3);
                                    setErrClear("");
                                  }}
                                  invalid={errClear === "invalid"}
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
                                  invalid={errStatusBarang === "invalid"}
                                  onChange={() => {
                                    setStatusBarang(1);
                                    setErrStatusBarang("");
                                  }}
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
                                  invalid={errStatusBarang === "invalid"}
                                  onChange={() => {
                                    setStatusBarang(2);
                                    setErrStatusBarang("");
                                  }}
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
                                  invalid={errStatusBarang === "invalid"}
                                  onChange={() => {
                                    setStatusBarang(3);
                                    setErrStatusBarang("");
                                  }}
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
