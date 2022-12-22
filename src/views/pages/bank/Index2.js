/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Label,
  FormGroup,
  Row,
  Input,
  CardHeader,
  Col,
  Button,
  Table,
  Container,
  Form,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";

export default function Userss() {
  const token = localStorage.token;
  const warehouseId = localStorage.warehouse;
  const username = localStorage.username;
  let history = useHistory();

  // const [usernameusers, setUsernameUsers] = useState("");
  const [kodeuser, setKodeUser] = useState("");
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [address, setAddress] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [pricetype, setPriceType] = useState("");
  const [itemId, setItemId] = useState(1);
  const [itemTotal, setItemTotal] = useState(null);
  const [email, setEmail] = useState("");
  const [allItem, setAllItem] = useState([]);
  const [query, setQuery] = useState(null);
  const [isSearchShow, setIsSearchShow] = useState(false);
  const headers = { Authorization: `Bearer ${token}` };
  const redirectPrefix = `/admin/bank/edit/`;
  const [accountname, setAccountName] = useState("");
  const [accountnumber, setAccountNumber] = useState("");
  const [bankname, setBankName] = useState("");

  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPages, setCurrentPages] = useState(0);
  useEffect(() => {
    console.log("page changed");
    getUser();
  }, [page]);

  const getById = (id) => {
    setItemId(id);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/bank/get/${itemId}`, {
        headers,
      })
      .then((data) => {
        setAccountName(data.data.response.account_name);
        setAccountNumber(data.data.response.account_number);
        setBankName(data.data.response.bank_name);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getUser = async () => {
    let filter = {
      page: page,
      per_page: perPage,
      warehouse_id: parseInt(warehouseId),
    };
    const data = filter;

    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/bank`,
      data,
      { headers }
    );
    if (res.data.status == 200) {
      setItemTotal(res.data.total_item);
      getById(res.data.response[0].id);
      setCurrentPages(res.data.current_page + 1);
      setTotalPages(res.data.total_page);
    }
  };

  const search = async () => {
    if (Number(query) > 0) {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/bank`,
        { account_name: query },
        { headers }
      );
      if (res.data.status !== 404) setAllItem(res.data);
      else {
        const res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/bank`,
          { account_name: query },
          { headers }
        );
        if (res.data.status !== 404) setAllItem(res.data);
        else setAllItem(null);
      }
    } else {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/bank`,
        { account_name: query },
        { headers }
      );
      if (res.data.status !== 404) setAllItem(res.data);
      else setAllItem(null);
    }
    setIsSearchShow(true);
  };

  const searchShow = (item) => {
    setItemId(item.id);
    setIsSearchShow(false);
  };

  return (
    <>
      <div>
        <SimpleHeader name="Bank" parentName="Master" />
        <Container className="mt--6" fluid>
          <Row>
            <div className="col">
              <Form>
                {/* <CardBody> */}
                {/* Button card */}
                <Card
                  className="position-sticky"
                  style={{ top: 0, zIndex: "5" }}
                >
                  <CardBody className="ml-3 pb-0">
                    <Row md="12">
                      <Col md="5">
                        <Button
                          onClick={() => setPage(1)}
                          color="danger"
                          type="button"
                        >
                          First
                        </Button>
                        <Button
                          onClick={() => setPage((page) => page - 1)}
                          disabled={page === 1}
                          color="success"
                          type="button"
                        >
                          <i className="ni ni-bold-left" /> Prev
                        </Button>
                        <Button
                          onClick={() => setPage((page) => page + 1)}
                          disabled={page >= totalPages}
                          color="success"
                          type="button"
                        >
                          Next <i className="ni ni-bold-right" />
                        </Button>
                        <Button
                          onClick={() => setPage(totalPages)}
                          disabled={page == totalPages}
                          color="warning"
                          type="button"
                        >
                          End
                        </Button>
                        <span className="mx-2 text-muted">
                          {currentPages}/{totalPages}
                        </span>
                      </Col>
                      <Col md="4">
                        <FormGroup row>
                          <Col sm={7}>
                            <Input
                              className="form-control-alternative"
                              placeholder="Search Pemilik rekening"
                              type="search"
                              onChange={(e) => setQuery(e.target.value)}
                              onKeyDown={search}
                            />
                          </Col>
                          <Col sm={2}></Col>
                        </FormGroup>
                      </Col>
                      <Col md="3">
                        <div style={{ textAlign: "right" }}>
                          {/* <Button
														color="info"
														onClick={() => EditData()}
													>
														Edit
													</Button> */}
                          <Link
                            className="btn btn-info"
                            to={redirectPrefix + itemId}
                          >
                            <i className="fas fa-user-edit" /> Edit
                          </Link>
                          <Link
                            className="btn btn-danger"
                            to="/admin/bank/create"
                          >
                            Tambah
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>

                {/* Search card */}
                {isSearchShow && query && (
                  <Card
                    className="boxShadow"
                    style={{
                      maxHeight: "15.5rem",
                      overflowY: "auto",
                      paddingTop: "1rem",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "2.5px",
                        right: "1rem",
                        cursor: "pointer",
                        fontSize: "2rem",
                      }}
                    >
                      <i
                        className="fas fa-window-close text-danger"
                        onClick={() => setIsSearchShow(false)}
                      ></i>
                    </div>
                    <span className="text-center mb-3">
                      <b>Pencarian berdasarkan:</b> {query}
                    </span>
                    {allItem?.response ? (
                      allItem.response.map((item) => (
                        <CardBody
                          key={item.id}
                          style={{ minHeight: "6rem", padding: "1rem" }}
                          className="bgSearch"
                          onClick={() => searchShow(item)}
                        >
                          <div>
                            <b>Nama :</b> {item.account_name}
                          </div>
                          <div>
                            <b>Bank:</b>{" "}
                            {item.bank_name
                              ? item.bank_name
                              : "(Not available)"}
                          </div>
                          <hr style={{ margin: "0.75rem -1rem 0 -1rem" }} />
                        </CardBody>
                      ))
                    ) : (
                      <div className="text-center mb-3 text-danger">
                        Nama "{query}" tidak ada bosku!
                      </div>
                    )}
                  </Card>
                )}
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <h3>Bank</h3>
                  </CardHeader>
                  <CardBody>
                    <Row md="12">
                      <Col md="6">
                        <FormGroup row>
                          <Label for="exampleEmail" sm={4}>
                            Nama Pemilik
                          </Label>
                          <Col sm={7}>
                            <Input
                              disabled
                              autoComplete="off"
                              type="text"
                              name="desc"
                              placeholder="Masukan Nama Akun"
                              value={accountname}
                              onChange={(e) => {
                                setAccountName(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="exampleEmail" sm={4}>
                            Nomor Rekening
                          </Label>
                          <Col sm={7}>
                            <Input
                              disabled
                              autoComplete="off"
                              type="text"
                              name="desc"
                              placeholder="Masukan Nomer Akun"
                              value={accountnumber}
                              onChange={(e) => {
                                setAccountNumber(e.target.value);
                              }}
                            />
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup row>
                          <Label for="exampleEmail" sm={3}>
                            Bank
                          </Label>
                          <Col sm={6}>
                            <Input
                              disabled
                              autoComplete="off"
                              type="text"
                              name="desc"
                              placeholder="Masukan Bank"
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
                </Card>
              </Form>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}
