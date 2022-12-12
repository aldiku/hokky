/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  
  Card,
  Button,
  Row,
  Col,
  CardBody,
  CardHeader,
  CardFooter,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  
} from "reactstrap";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function ValidasiKepalaFinance(props)  {
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [pembayarantotal, setPembayaranTotal] = useState([]);
  const [invoicecode, setInvoiceCode] = useState("");
  const [statusaf, setStatusAf] = useState([]);

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
        `${process.env.REACT_APP_API_BASE_URL}/bkk/get/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        getPerson(data.data.response.person_id);
        setInvoiceCode(data.data.response.code_invoice);
        setPembayaranTotal(data.data.response.pembayaran_total);
        setStatusAf(data.data.response.status_af);
        setKeterangan(data.data.response.keterangan);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getPerson = (id) => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(
          `${process.env.REACT_APP_API_BASE_URL}/person/list`,
          { headers }
        )
        .then((data) => {
          setPersons(data.data.response);
          setPerson(id);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  
  function EditData() {
    setLoading(true);
    
   }

  function EditData() {
    setLoading(true);
    let data = {
        warehouse_id : parseInt(warehouse),
        admin_finance: username,
        status_af : parseInt(statusaf),
        code_invoice: invoicecode,
        status_d: 3,
        person_id: parseInt(person),
        pembayaran_total: parseFloat(pembayarantotal),
        keterangan: keterangan ,
    };
    axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/bkk/update/${props.match.params.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/bukti-kas-keluar");
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
    {
      EditData();
    }
  };

  return (
    <>
    <SimpleHeader name="Detail Bukti Kas Keluar" parentName="PO" />
    <Container className="mt--6" fluid>
        <Row>
          <div className="col">
          <Card className="bg-secondary shadow">
                <Form onSubmit={handleSubmit}>
                    <CardHeader className="bg-white border-0">
                      <h3>Detail Bukti Kas Keluar</h3>
                    </CardHeader>
                    <CardBody>
                    <Row md="12">
                          <Col md="6">
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Kode Invoice
                              </Label>
                              <Col sm={7}>
                                <Input
                                disabled
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Invoice"
                                  value={invoicecode}
                                  onChange={(e) => {
                                    setInvoiceCode(e.target.value);
                                  }}
                                />
                               </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Supplier
                              </Label>
                              <Col sm={7}>
                                <Input
                                disabled
                                  name="person"
                                  type="select"
                                  value={person}
                                  onChange={(e) => {
                                    setPerson(e.target.value);
                                  }}
                                >
                                  <option value=''>Pilih Supplier</option>
                                  {persons.map((person, key) => {
                                      return (
                                        <option key={key} value={person.id}>
                                          {person.person_name}
                                        </option>
                                      );
                                    })}
                                </Input>
                              </Col>
                            </FormGroup>
                            
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Total Pembayaran
                              </Label>
                              <Col sm={7}>
                                <Input
                                disabled
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Total Pembayaran"
                                  value={pembayarantotal}
                                  onChange={(e) => {
                                    setPembayaranTotal(e.target.value);
                                  }}
                                />
                               </Col>
                            </FormGroup>
                            
                          </Col>
                          <Col md="6">
                          <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Keterangan
                              </Label>
                              <Col sm={7}>
                                <Input
                                disabled
                                  type="textarea"
                                  name="desc"
                                  rows = "7"
                                  placeholder="Masukan Keterangan"
                                  value={keterangan}
                                  onChange={(e) => {
                                    setKeterangan(e.target.value);
                                  }}
                                />
                              </Col>                             
                            </FormGroup>
                            {/* <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Validasi Kepala Finance
                            </Label>
                              <Col sm={7}>
                                <div style={{ display: "flex" }}>
                                  <div className="custom-control custom-radio mb-3">
                                    <Input
                                    disabled
                                      className="custom-control-input"
                                      id="customRadio8"
                                      name="custom-radio-3"
                                      type="radio"
                                      value={5}
                                      checked={statusaf === 5}
                                      onChange={() => setStatusAf(5)}
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
                                    disabled
                                      className="custom-control-input"
                                      id="customRadio9"
                                      name="custom-radio-3"
                                      type="radio"
                                      value={4}
                                      checked={statusaf === 4}
                                      onChange={() => setStatusAf(4)}
                                    />
                                    <Label
                                      className="custom-control-label"
                                      htmlFor="customRadio9"
                                    >
                                      Ditolak
                                    </Label>
                                  </div>
                                </div>
                              </Col>
                            </FormGroup> */}
                          </Col>
                      </Row>  
                    </CardBody>
                <CardFooter>
                      <Link className="btn btn-info" to="/admin/bukti-kas-keluar">
                        Kembali
                      </Link>
                </CardFooter>
                </Form>
              </Card>
          </div>
        </Row>
    </Container>  
    </>
  );
}