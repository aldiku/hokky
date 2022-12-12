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
  Form, FormFeedback
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import SimpleHeader from "components/Headers/SimpleHeader.js";
import moment from "moment";

export default function EditAsset(props) {
  const token = localStorage.token;
  const warehouse = parseInt(localStorage.warehouse);
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const [codeAsset, setCodeAsset] = useState("");
  const [nameAsset, setNameAsset] = useState("");
  const [nameAssetError, setNameAssetError] = useState(null);
  const [typeAsset, setTypeAsset] = useState("");
  const [typeAssetError, setTypeAssetError] = useState(null);
  const [total, setTotal] = useState("");
  const [umurasset, setUmurAsset] = useState("");
  const [depresiasi, setDepresiasi] = useState("")
  const [note, setNote] = useState("");
  const [valueAsset, setValueAsset] = useState("");
  const [buyingDate, setBuyingDate] = useState("");
  const [types, setTypes] = useState([]);
  const [coa, setCoa] = useState("");
  const [allCoa, setAllCoa] = useState([]);



  const validateForm = () => {
    let error = false;
    if (nameAsset === "") {
      setNameAssetError("invalid");
      error = true;
    }
    return error;
  };

  useEffect(() => {
    getAssetById();
  }, []);

  const getAssetById = () => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/asset/${props.match.params.id}`, { headers
    })
    .then(data => {
      console.log(data);
        setNameAsset(data.data.response.asset_name);
        setCodeAsset(data.data.response.asset_code);
        setTotal(data.data.response.qty);
        setUmurAsset(data.data.response.umur_asset);
        setValueAsset(data.data.response.harga);
        setNote(data.data.response.keterangan);
        // setCoa(data.data.response.tipe_penyusutan);
        setBuyingDate(moment(data.data.response.buying_date, "DD/MM/YYYY").format("YYYY-MM-DD"));
        getCoa(data.data.response.akun_penyusutan);
        getType(data.data.response.tipe_penyusutan);
    })
      .catch(function (error) {
        console.log(error)
      })
  }
  

  const getType = (id) => {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/asset-type/list`, { headers
    })
    .then(data => {
      // console.log(data);
        setTypes(data.data.response)
        setTypeAsset(id)
    })
      .catch(function (error) {
        console.log(error)
      })
  }

  const getCoa = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/account/list/${warehouse}`, { headers })
      .then((data) => {
        setAllCoa(data.data.response);
        setCoa(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function EditData() {
    setLoading(true);
    let data = {
      asset_code: codeAsset,
      asset_name: nameAsset,
      qty: parseInt(total),
      tipe_penyusutan: typeAsset,
      umur_asset : parseInt(umurasset),
      depresiasi_asset : parseInt(depresiasi),
      harga: parseInt(valueAsset),
      buying_date: moment(buyingDate).format("DD-MM-YYYY"),
      warehouse_id: parseInt(warehouse),
      akun_penyusutan: parseInt(coa),
      // active_flag: 1,
      keterangan: note,
    }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/asset/update/${props.match.params.id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(function (response) {
        history.push("/admin/asset");
      })
      .then(json => {
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
        EditData();
    }
  }
  return (
    <>
      <SimpleHeader name="Edit Asset" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit} >
                  <CardHeader>
                    <h3>Edit Asset</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nama Asset
                        
                      </Label>
                      <Input
                        autoComplete="off"
                        type="text"
                        name="nama"
                        placeholder="Masukan Nama Asset"
                        value={nameAsset}
                        invalid={nameAssetError === "invalid"}
                        onChange={(e) => {
                          setNameAsset(e.target.value);
                        }}
                      />
                      <FormFeedback>Nama Asset tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="exampleFormControlSelect3">
                        Tanggal Pembelian
                      </Label>
                      <Input
                        autoComplete="off"
                        id="example-date-input"
                        type="date"
                        value={buyingDate}
                        onChange={(e) => {
                          setBuyingDate(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Umur Asset
                      </Label>
                      <Input
                      autoComplete="off"
                        type="number"
                        name="nilaiAsset"
                        pattern='[0-9]{0,5}'
                        // maxLength="12"
                        placeholder="Masukan Umur Asset"
                        value={umurasset}
                        onChange={(e) => {
                          setUmurAsset(e.target.value);
                        }}
                      />
                    </FormGroup>
                    {/* <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Kode Asset
                      </Label>
                      <Input
                      autoComplete="off"
                        type="text"
                        name="nama"
                        placeholder="Masukan Kode Asset"
                        value={codeAsset}
                        onChange={(e) => {
                          setCodeAsset(e.target.value);
                        }}
                      />
                    </FormGroup> */}
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Jumlah
                      </Label>
                      <Input
                        autoComplete="off"
                        type="text"
                        name="total"
                        placeholder="Masukan Jumlah"
                        value={total}
                        onChange={(e) => {
                          setTotal(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Nilai Asset
                      </Label>
                      <Input
                        autoComplete="off"
                        type="text"
                        name="nilaiAsset"
                        placeholder="Masukan Nilai Asset"
                        value={valueAsset}
                        onChange={(e) => {
                          setValueAsset(e.target.value);
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
                        autoComplete="off"
                        type="textarea"
                        rows ="4"
                        name="note"
                        placeholder="Masukan Keterangan"
                        value={note}
                        onChange={(e) => {
                          setNote(e.target.value);
                        }}
                      />
                    </FormGroup>
                   
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Tipe Penyusutan
                        
                      </Label>
                      <Input
                      autoComplete="off"
                        name="type"
                        type="select"
                        value={typeAsset}
                        invalid={typeAssetError === "invalid"}
                        onChange={(e) => {
                          setTypeAsset(e.target.value);
                        }}
                      >
                        <option value="">Pilih Tipe Penyusutan</option>
                        {types.map((type, key) => {
                          return (
                            <option key={key} value={type.id}>
                              {type.name}
                            </option>
                          );
                        })}
                      </Input>
                      <FormFeedback>Type Asset tidak boleh kosong</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlSelect3"
                      >
                        Akun Penyusutan
                        
                      </Label>
                      <Input
                      autoComplete="off"
                        name="coa"
                        type="select"
                        value={coa}
                        onChange={(e) => {
                          setCoa(e.target.value);
                        }}
                      >
                        <option value="" disabled selected hidden>Pilih Akun Penyusutan</option>
                        {allCoa.map((coa, key) => {
                          return (
                            <option key={key} value={coa.id}>
                              {coa.account_code} {coa.account_name}
                            </option>
                          );
                        })}
                      </Input>
                    </FormGroup>
                  </CardBody>
                  <CardFooter>
                    {!isLoading && (<Button color="primary" type="submit">
                      Simpan
                    </Button>)}
                    {isLoading && (<Button color="primary" disabled>
                      <i className="fas fa-spinner fa-spin"></i>{""}
                      loading...
                    </Button>)}
                    <Link className="btn btn-info" to="/admin/asset">
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
