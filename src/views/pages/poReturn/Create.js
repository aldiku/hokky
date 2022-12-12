/*eslint-disable*/
import React, { useEffect, useState } from 'react';
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
} from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import SimpleHeader from 'components/Headers/SimpleHeader.js';
import Swal from 'sweetalert2';

export default function Create() {
  const token = localStorage.token;
  const warehouse = localStorage.warehouse;
  let poItems;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [kodePo, setKodePo] = useState('');
  const [dataPo, setDataPo] = useState('');
  const [dataPoItems, setDataPoItems] = useState('');
  const initialReturItems = {
    item_id: '',
    qty: '',
    keterangan: '',
  };
  const [dataReturItems, setDataReturItems] = useState([initialReturItems]);

  const validateForm = () => {
    let error = false;
    return error;
  };

  useEffect(() => {}, []);

  // handle input change item
  const onInputChangeItem = (e, index) => {
    const { name, value } = e.target;
    const list = [...dataReturItems];
    list[index][name] = value;
    setDataReturItems(list);
  };

  // handle input change
  const onInputChange = (type, val) => {
    setDataPo((prevState) => ({
      ...prevState,
      [type]: val,
    }));
  };

  const postReturPo = async () => {
    setLoading(true);
    const payload = {
      warehouse_id: dataPo.warehouse_id,
      username_po: dataPo.username_po,
      item_or_money: parseInt(dataPo.item_or_money),
      payment_method: dataPo.payment_method,
      keterangan_payment: dataPo.keterangan_payment,
      is_cicil: dataPo.is_cicil,
      username_gudang: dataPo.username_gudang,
      status_barang: dataPo.status_barang,
      keterangan_gudang: dataPo.keterangan_gudang,
      username_kurir: dataPo.username_kurir,
      person: dataPo.person,
      username_validator: dataPo.username_validator,
      username_manajer: '',
      manajer_approval: 0,
      keterangan_manajer: '',
      clear: dataPo.clear,
      keterangan_validator: dataPo.keterangan_validator,
      active_flag: dataPo.active_flag,
      po_type: dataPo.po_type,
      keterangan_po: dataPo.keterangan_po,
      items: dataPo.item_or_money === 2 ? dataPo.items : dataReturItems,
      retur_code: dataPo.order_code,
    };
    await axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/retur-po/save`, payload, {
        headers,
      })
      .then(function (response) {
        history.push('/admin/po-return');
      })
      .then((json) => {
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSearchPO = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/purchase-order/get?order_code=${kodePo}`,
        {
          headers,
        }
      )
      .then(async (data) => {
        await getPoItems(data.data.response_data.id);
        const mergeItems = {
          ...data.data.response_data,
          items: poItems,
        };
        setDataPo(mergeItems);
        if (!data.data.status) {
          Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Maaf, Data PO tidak ditemukan',
          });
        }
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Maaf, Data PO tidak ditemukan',
        });
      });
  };

  const getPoItems = async (po_id) => {
    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/purchase-order/po-items`,
        { po_id: po_id },
        {
          headers,
        }
      )
      .then((data) => {
        setDataPoItems(data.data.response_data);
        const constructItems = [];
        data.data.response_data.map((key) => {
          constructItems.push({
            item_id: key.item_id,
            qty: key.qty,
            keterangan: '',
          });
        });
        poItems = constructItems;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      postReturPo();
    }
  };

  const onAddItem = () => {
    setDataReturItems([...dataReturItems, initialReturItems]);
  };

  const onRemoveItem = (index) => {
    const list = [...dataReturItems];
    list.splice(index, 1);
    setDataReturItems(list);
  };

  return (
    <>
      <SimpleHeader name="Daftar Purchase Order Return" parentName="Admin" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <CardHeader>
                    <h3>Daftar Purchase Order Return</h3>
                  </CardHeader>
                  <CardBody>
                    <FormGroup>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                      >
                        Kode Purchase Order
                      </Label>
                      <Input
                        type="text"
                        name="codePo"
                        placeholder="Masukan Kode Purchase Order"
                        value={kodePo}
                        onChange={(e) => {
                          setKodePo(e.target.value);
                        }}
                      />
                      <FormFeedback>
                        Kode Purchase Order tidak boleh kosong
                      </FormFeedback>
                    </FormGroup>
                    <Button
                      color="primary"
                      style={{ marginBottom: 12 }}
                      onClick={handleSearchPO}
                    >
                      Cari
                    </Button>
                    {dataPo && (
                      <div>
                        <FormGroup>
                          <Label className="form-control-label">
                            Username PO
                          </Label>
                          <Input
                            disabled
                            type="text"
                            value={dataPo?.username_po}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">
                            Keterangan PO
                          </Label>
                          <Input
                            disabled
                            type="text"
                            value={dataPo?.keterangan_po}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">
                            Username Validator
                          </Label>
                          <Input
                            disabled
                            type="text"
                            value={dataPo?.username_validator}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">
                            Keterangan Validator
                          </Label>
                          <Input
                            disabled
                            type="text"
                            value={dataPo?.keterangan_validator}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">
                            Username Gudang
                          </Label>
                          <Input
                            disabled
                            type="text"
                            value={dataPo?.username_gudang}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">
                            Keterangan Payment
                          </Label>
                          <Input
                            disabled
                            type="text"
                            value={dataPo?.keterangan_payment}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">
                            Payment Method
                          </Label>
                          <Input
                            disabled
                            type="text"
                            value={
                              dataPo?.payment_method === 1
                                ? 'Tunai'
                                : 'Tempo / Termin / Utang'
                            }
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">Is Cicil</Label>
                          <Input
                            disabled
                            type="text"
                            value={
                              dataPo?.is_cicil === 0
                                ? 'Pilih Cicilan'
                                : dataPo?.is_cicil === 1
                                ? 'Cicilan (Lunas)'
                                : 'Cicilan (Belum Lunas)'
                            }
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label"> PO Type</Label>
                          <Input
                            disabled
                            type="text"
                            value={
                              dataPo?.is_cicil === 1
                                ? 'Konvensional'
                                : 'Cicilan (Belum Lunas)'
                            }
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">Clear</Label>
                          <Input
                            disabled
                            type="text"
                            value={
                              dataPo?.clear === 1
                                ? 'Disetujui'
                                : dataPo?.clear === 2
                                ? 'Ditolak'
                                : 'Dibatalkan'
                            }
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">Approve</Label>
                          <Input
                            disabled
                            type="text"
                            value={
                              dataPo?.approve === 1
                                ? 'Disetujui'
                                : dataPo?.approve === 2
                                ? 'Ditolak'
                                : 'Dibatalkan'
                            }
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">
                            Status Barang
                          </Label>
                          <Input
                            disabled
                            type="text"
                            value={
                              dataPo?.status_barang === 1
                                ? 'Disetujui'
                                : dataPo?.status_barang === 2
                                ? 'Ditolak'
                                : 'Dibatalkan'
                            }
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">Qty</Label>
                          <Input
                            disabled
                            type="text"
                            value={dataPo?.total_qty}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">Harga</Label>
                          <Input
                            disabled
                            type="text"
                            value={dataPo?.total_price}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">
                            Total Qty Fisik
                          </Label>
                          <Input
                            disabled
                            type="text"
                            value={dataPo?.total_qty_fisik}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-control-label">
                            Total Harga Fisik
                          </Label>
                          <Input
                            disabled
                            type="text"
                            value={dataPo?.total_price_fisik}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label
                            className="form-control-label"
                            htmlFor="exampleFormControlSelect3"
                          >
                            Item or Money
                          </Label>
                          <Input
                            name="item_or_money"
                            type="select"
                            onChange={(e) =>
                              onInputChange('item_or_money', e.target.value)
                            }
                          >
                            <option value="0">Pilih</option>
                            <option value={1}>Item</option>
                            <option value={2}>Money</option>
                          </Input>
                        </FormGroup>
                        {parseInt(dataPo.item_or_money) === 1 &&
                          dataReturItems.map((x, i) => {
                            return (
                              <div key={i}>
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
                                    onChange={(e) => {
                                      onInputChangeItem(e, i);
                                    }}
                                  >
                                    <option value="0">Pilih Item</option>
                                    {dataPoItems.map((item, key) => {
                                      return (
                                        <option key={key} value={item.item_id}>
                                          {item.item_name}
                                        </option>
                                      );
                                    })}
                                  </Input>
                                </FormGroup>
                                <FormGroup>
                                  <Label className="form-control-label">
                                    Quantity
                                  </Label>
                                  <Input
                                    type="text"
                                    name="qty"
                                    placeholder="Masukan Qty yang Akan di Retur"
                                    value={dataReturItems.qty}
                                    onChange={(e) => onInputChangeItem(e, i)}
                                  />
                                </FormGroup>
                                <div className="btn-box">
                                  {dataReturItems.length !== 1 && (
                                    <Button
                                      color="default"
                                      onClick={() => onRemoveItem(i)}
                                    >
                                      Remove
                                    </Button>
                                  )}
                                  {dataReturItems.length - 1 === i && (
                                    <Button color="default" onClick={onAddItem}>
                                      Add
                                    </Button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
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
                        {''}
                        loading...
                      </Button>
                    )}
                    <Link className="btn btn-info" to="/admin/po-return">
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
