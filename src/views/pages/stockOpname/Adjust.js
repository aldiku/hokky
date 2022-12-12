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

export default function AdjustStockOpname() {
  const token = localStorage.token;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [inputList, setInputList] = useState([
    {
      code: "",
    },
  ]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
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
        code: "",
      },
    ]);
  };

  const validateForm = () => {
    let error = false;
    // if (itemCode === "") {
    //   setItemCodeError("invalid");
    //   error = true;
    // }
    return error;
  };

  function CreateData() {
    setLoading(true);
    let data = {
      listOpname: inputList,
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/opname/adjust/all`, data, {
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
      <SimpleHeader name="Adjust Stock Opname" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <CardHeader>
                    <h3>Adjust Stock Opname</h3>
                  </CardHeader>
                  <CardBody>
                    {inputList.map((x, i) => {
                      return (
                        <div className="box">
                          <FormGroup>
                            <Label
                              className="form-control-label"
                              htmlFor="exampleFormControlInput1"
                            >
                              Code Item
                            </Label>
                            <Input
                              type="text"
                              name="code"
                              placeholder="Masukan Code Item"
                              value={x.code}
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
                              <Button color="default" onClick={handleAddClick}>
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
