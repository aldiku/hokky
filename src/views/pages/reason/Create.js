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

export default function CreatePajak() {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const [typeError, setTypeError] = useState(null);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(null);

  const validateForm = () => {
    let error = false;
    if (type === "") {
      setTypeError("invalid");
      error = true;
    }
    if (description === "") {
      setDescriptionError("invalid");
      error = true;
    }
    return error;
  };

  function CreateData() {
    setLoading(true);
    let data = {
      active_flag: 1,
      warehouse_id: parseInt(warehouse),
      description: description,
      type: parseInt(type),
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/reason/save`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        history.push("/admin/reason");
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
      <SimpleHeader name="Alasan" parentName="Master" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <CardHeader>
                    <h3>Alasan</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Tipe Alasan
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="select"
                        name="persentase"
                        placeholder="Masukan Type"
                        value={type}
                        invalid={typeError === "invalid"}
                        onChange={(e) => {
                          setType(e.target.value);
                          if (e.target.value !== "") {
                            setTypeError("");
                          }
                        }}
                      >
                        <option value={""}>Pilih Tipe Alasan</option>
                        <option value={1}>Purchase Order</option>
                        <option value={2}>Sales Order</option>
                        <option value={3}>Transfer Warehouse</option>
                        <option value={4}>Transfer Rak</option>
                        <option value={5}>Transfer Adjusment</option>
                        <option value={6}>Transfer Opname</option>
                      </Input>
                      <FormFeedback>Type tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Keterangan
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="keterangan"
                        placeholder="Masukan Keterangan"
                        value={description}
                        invalid={descriptionError === "invalid"}
                        onChange={(e) => {
                          setDescription(e.target.value);
                          if (e.target.value !== "") {
                            setDescriptionError("");
                          }
                        }}
                      />
                      <FormFeedback>Keterangan tidak boleh kosong</FormFeedback>
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
                    <Link className="btn btn-info" to="/admin/reason">
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
