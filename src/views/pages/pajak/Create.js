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
  Modal, ModalHeader, ModalBody
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function CreatePajak() {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [persentase, setPersentase] = useState("");
  const [persentaseError, setPersentaseError] = useState(null);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(null);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const validateForm = () => {
    let error = false;
    if (persentase === "") {
      setPersentaseError("invalid");
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
      keterangan: description,
      persentase: parseFloat(persentase),
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/pajak/save`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        history.push("/admin/pajak");
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
      <SimpleHeader name="Daftar Pajak" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <CardHeader>
                    <h3>Daftar Pajak</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Persentase
                        <span className="text-danger">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="persentase"
                        placeholder="Masukan Persentase"
                        value={persentase}
                        invalid={persentaseError === "invalid"}
                        onChange={(e) => {
                          setPersentase(e.target.value);
                          if (e.target.value !== "") {
                            setPersentaseError("");
                          }
                        }}
                      />
                      <FormFeedback>Persentase tidak boleh kosong</FormFeedback>
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
