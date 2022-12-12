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
  Form,
  FormFeedback,
  Col,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function EditBkm(props) {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [allPoCode, setAllPoCode] = useState([]);
  const [poCode, setPoCode] = useState("");
  const [poCodeError, setPoCodeError] = useState(null);
  const [kasBank, setKasBank] = useState("");
  const [nominal, setNominal] = useState("");
  const [description, setDescription] = useState("");
  const [soStatus, setSoStatus] = useState(0);
  const [status, setStatus] = useState(0);

  const validateForm = () => {
    let error = false;
    if (poCode === "") {
      setPoCodeError("invalid");
      error = true;
    }
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
        `${process.env.REACT_APP_API_BASE_URL}/bkm/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        getPoList(data.data.response.so_code);
        setKasBank(data.data.response.kas_bank);
        setNominal(data.data.response.nominal);
        setDescription(data.data.response.keterangan);
        setStatus(data.data.response.status_transaksi);
        setSoStatus(data.data.response.so_status);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getPoList = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/sales-order/list`, {
        headers,
      })
      .then((data) => {
        setAllPoCode(data.data.response_data);
        setPoCode(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function EditData() {
    setLoading(true);
    let data = {
      warehouse_id: parseInt(warehouse),
      so_code: parseInt(poCode),
      so_status: parseInt(soStatus),
      kas_bank: kasBank,
      nominal: parseFloat(nominal),
      keterangan: description,
      status_transaksi: parseInt(status),
    };
    axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/bkm/update/${props.match.params.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        history.push("/admin/bkm");
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
      <SimpleHeader name="Edit Bukti Kas Masuk" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <CardHeader>
                    <h3>Edit Bukti Kas Masuk</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Kode SO
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="type"
                        type="select"
                        value={poCode}
                        invalid={poCodeError === "invalid"}
                        onChange={(e) => {
                          setPoCode(e.target.value);
                          if (e.target.value !== "") {
                            setPoCodeError("");
                          }
                        }}
                      >
                        <option value="">Pilih Kode PO</option>
                        {allPoCode.map((po, key) => {
                          return (
                            <option key={key} value={po.id}>
                              {po.order_code}
                            </option>
                          );
                        })}
                      </Input>
                      <FormFeedback>Kode PO tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Kas Bank
                      </Label>
                      <Input
                        type="text"
                        name="bank"
                        placeholder="Masukan Kas Bank"
                        value={kasBank}
                        onChange={(e) => {
                          setKasBank(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nominal
                      </Label>
                      <Input
                        type="text"
                        name="nominal"
                        placeholder="Masukan Nominal"
                        value={nominal}
                        onChange={(e) => {
                          setNominal(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Keterangan
                      </Label>
                      <Input
                        type="text"
                        name="keterangan"
                        placeholder="Masukan Keterangan"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        SO Status
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        name="type"
                        type="select"
                        value={soStatus}
                        onChange={(e) => {
                          setSoStatus(e.target.value);
                        }}
                      >
                        <option value="">Pilih SO Status</option>
                        <option value={1}>Penjualan Kasir</option>
                        <option value={2}>Penjualan</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Status Transaksi
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
                                value={0}
                                checked={status === 0}
                                onChange={() => setStatus(0)}
                              />
                              <Label
                                className="custom-control-label"
                                htmlFor="customRadio5"
                                check
                              >
                                Proses
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
                                value={1}
                                checked={status === 1}
                                onChange={() => setStatus(1)}
                              />
                              <Label
                                className="custom-control-label"
                                htmlFor="customRadio6"
                                check
                              >
                                Selesai
                              </Label>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
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
                    <Link className="btn btn-info" to="/admin/bkm">
                      Kembali
                    </Link>
                  </CardFooter>
                </Form>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}
