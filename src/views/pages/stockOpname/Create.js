/*eslint-disable*/
import React, { useState } from "react";
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
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function CreateStockOpname() {
  const token = localStorage.token;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [itemCode, setItemCode] = useState("");
  const [itemCodeError, setItemCodeError] = useState(null);
  const [stockFisik, setStockFisik] = useState("");
  const [stockFisikError, setStockFisikError] = useState(null);

  const validateForm = () => {
    let error = false;
    if (itemCode === "") {
      setItemCodeError("invalid");
      error = true;
    }
    if (stockFisik === "") {
      setStockFisikError("invalid");
      error = true;
    }
    return error;
  };

  function CreateData() {
    setLoading(true);
    let data = {
      item_code: itemCode,
      stok_fisik: parseInt(stockFisik),
      active_flag: 1,
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/opname/save`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        history.push("/admin/stock-opname");
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
      <SimpleHeader name="Daftar Stock Opname" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <CardHeader>
                    <h3>Daftar Stock Opname</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Kode Item
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="kodeIten"
                        placeholder="Masukan Kode Item"
                        value={itemCode}
                        invalid={itemCodeError === "invalid"}
                        onChange={(e) => {
                          setItemCode(e.target.value);
                          if (e.target.value !== "") {
                            setItemCodeError("");
                          }
                        }}
                      />
                      <FormFeedback>Kode Item tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Stock Fisik
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="stockFisik"
                        placeholder="Masukan Stock Fisik"
                        value={stockFisik}
                        invalid={stockFisikError === "invalid"}
                        onChange={(e) => {
                          setStockFisik(e.target.value);
                          if (e.target.value !== "") {
                            setStockFisikError("");
                          }
                        }}
                      />
                      <FormFeedback>
                        Stock Fisik tidak boleh kosong
                      </FormFeedback>
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
                    <Link className="btn btn-info" to="/admin/stock-opname">
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
