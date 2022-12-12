/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  CardBody,
  Form,
  CardFooter,
  FormGroup,
  Label,
  Input,
  Container,
} from "reactstrap";

import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function EditWarehouseToko(props) {
  const token = localStorage.token;
  const history = useHistory();

  const [isLoading, setLoading] = useState(false);
  const [id,setId] = useState("");
  const [usercode,setUserCode] = useState("");
  const [ordercode,setOrderCode] = useState("");
  const [paymentmethod,setPaymentMethod] = useState("");
  const [paymentreceipt,setPaymentReceipt] = useState("");
  const [orderstatus,setOrderStatus] = useState("");
  const [socode,setSoCode] = useState("");
  const [totalamount,setTotalAmount] = useState([]);
  const [bankname,setBankName] = useState("");
  const [status,setStatus] = useState("");
  const [image, setImage] = useState("");

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
        `${process.env.REACT_APP_API_BASE_URL}/transaction/erp/get/${props.match.params.id}`,
        { headers }
      )
      .then((data) => {
        setId(data.data.response.id);
        setUserCode(data.data.response.user_code);
        setOrderCode(data.data.response.order_code);
        setPaymentMethod(data.data.response.payment_method);
        setPaymentReceipt(data.data.response.payment_receipt);
        setOrderStatus(data.data.response.order_status);
        setSoCode(data.data.response.so_code);
        setStatus(data.data.response)
        setTotalAmount(data.data.response.total_amount);
        setBankName(data.data.response.bank_name);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const EditTransaksiEcommerce = () => {
    setLoading(true);
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };
    
    let data = new FormData();

    data.append("status",status)
    data.append("file",paymentreceipt)
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/transaction/erp/validate/${props.match.params.id}`, data, { headers })
      .then(function (response) {
        history.push("/admin/transaction");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    {
        EditTransaksiEcommerce();
    }
  };

  return (
    <div>
      <SimpleHeader name="Validate Transaction" parentName="E-commerce" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <Form onSubmit={handleSubmit}>
                <CardBody>
                  <Row md="12">
                      <Col md="6">
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Kode User
                            <span className="text-danger">*</span>
                          </Label>
                          <Col sm={7}>
                            <Input
                            disabled
                              type="text"
                              name="Nama"
                              placeholder="Masukan Nama"
                              value={usercode}
                              onChange={(e) => {
                                setUserCode(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Kode Order
                            <span className="text-danger">*</span>
                          </Label>
                          <Col sm={7}>
                            <Input
                            disabled
                              type="text"
                              name="Alamat"
                              placeholder="Masukan Alamat"
                              value={ordercode}
                              onChange={(e) => {
                                setOrderCode(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Metode Pembayaran
                            <span className="text-danger">*</span>
                          </Label>
                          <Col sm={7}>
                            <Input
                            disabled
                              type="text"
                              name="Longitude"
                              placeholder="Masukan Longitude"
                              value={paymentmethod}
                              onChange={(e) => {
                                setPaymentMethod(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Tipe Status
                            </Label>
                            <Col sm={7}>
                            <Input
                                name="Tipe Request"
                                type="select"
                                value={status}
                                onChange={(e) => {
                                  setStatus(e.target.value);
                                }}
                              >
                                <option value="">Pilih Status</option>
                                <option value={("PAID")}>PAID</option>
                                <option value={("CANCELED")}>CANCELED</option>
                              </Input>
                            </Col>
                            </FormGroup>
                        <FormGroup row>
                            <Label
                                for="exampleEmail"
                                sm={4}
                            >
                                FOTO 
                                <span className="text-danger">*</span>
                            </Label>
                            <Col sm={7}>
                            <Input
                                id="exampleFile"
                                name="file"
                                type="file"
                                onChange={(event) => {
                                    setPaymentReceipt(event.target.files[0]);
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
                            Status Order
                            <span className="text-danger">*</span>
                          </Label>
                          <Col sm={7}>
                            <Input
                            disabled
                              type="text"
                              name="Longitude"
                              placeholder="Masukan Longitude"
                              value={orderstatus}
                              onChange={(e) => {
                                setOrderStatus(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Kode SO
                            <span className="text-danger">*</span>
                          </Label>
                          <Col sm={7}>
                            <Input
                            disabled
                              type="text"
                              name="Longitude"
                              placeholder="Masukan Longitude"
                              value={socode}
                              onChange={(e) => {
                                setSoCode(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Total Pembayaran
                            <span className="text-danger">*</span>
                          </Label>
                          <Col sm={7}>
                            <Input
                            disabled
                              type="text"
                              name="Longitude"
                              placeholder="Masukan Longitude"
                              value={totalamount}
                              onChange={(e) => {
                                setTotalAmount(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label
                            for="exampleEmail"
                            sm={4}
                          >
                            Bank
                            <span className="text-danger">*</span>
                          </Label>
                          <Col sm={7}>
                            <Input
                            disabled
                              type="text"
                              name="Longitude"
                              placeholder="Masukan Longitude"
                              value={bankname}
                              onChange={(e) => {
                                setBankName(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup>
                      </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                    {!isLoading && (<Button color="primary" type="submit">
                      Simpan
                    </Button>)}
                    {isLoading && (
                      <Button color="primary" disabled>
                        <i className="fas fa-spinner fa-spin"></i>
                        {""}
                        loading...
                      </Button>
                    )}
                    <Link className="btn btn-info" to="/admin/transaction">
                      Kembali
                    </Link>
                </CardFooter>
               </Form>      
            </Card>
          </div>
        </Row>
      </Container>
    </div>
    
  );
};