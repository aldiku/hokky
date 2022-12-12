/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import {
  Card,
  Button,
  Row,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Label,
  Table,
  CardFooter,
  Input,
  Form,
  UncontrolledTooltip,
  ButtonGroup,
} from 'reactstrap';
import { Link,useHistory } from 'react-router-dom';
import axios from 'axios';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Swal from 'sweetalert2';


const Validasi = (props) => {
  const token = localStorage.token;
  const username = localStorage.username;
  const role = localStorage.authority;
  const namaDepartment = localStorage.department;
  const warehouse = localStorage.warehouse;
  let history = useHistory();
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const redirectPrefix = `/admin/po-return/edit/`;
  const [rowIndex, setRowIndex] = useState(0);
  const [allPoReturn, setAllPoReturn] = useState([]);
  const [page, setPage] = useState(1);
  const [person,setPerson] = useState("");
  const [description,setDescription] = useState(null);
  const [poType,setPoType]= useState("");
  const [satuan,setSatuan] = useState("");
  const [perPage, setPerpage] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [currentSort, setCurrentSort] = useState('');
  const [kodePo, setKodePo] = useState('');
  const [dataPo, setDataPo] = useState('');
  const [openDetail, setOpenDetail] = useState(false);
  const [metodepembayaran,setMetodePembayaran] = useState("");
  const [selectedRowData, setSelectedRowData] = useState([]);
  const [keterangan,setKeterangan] = useState("");
  const [AllPerson,setAllPerson] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [alert, setAlert] = React.useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const [nameItem, setNameItem] = useState("");
  const [barcode, setBarcode] = useState("");
  const [barcodeError, setBarcodeError] = useState(null);
  const [stock, setStock] = useState("");
  const [stockError, setStockError] = useState(null);
  const [qty, setQty] = useState("");
  const [harga, setHarga] = useState("");
  const [idItem, setIdItem] = useState(null)
  const [isLoading, setLoading] = useState(false);
  const [usernamePo, setUsernamePo] = useState(username);
  const [descriptionGudang, setDescriptionGudang] = useState("");
  const [descriptionPo, setDescriptionPo] = useState("");
  const [isCicil, setIsCicil] = useState("");
  const [statusBarang, setStatusBarang] = useState(0);
  const [clear, setClear] = useState(0);
  const [approve, setApprove] = useState(0);
  const [jangkaWaktu, setJangkuWaktu] = useState("");
  const [usernameAdmin, setUsernameAdmin] = useState(username);
  const [descriptionAdmin, setDescriptionAdmin] = useState("");
  const [namaitem,setNamaItem] = useState([]);
  const [text,setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [inputList, setInputList] = useState([
    {
      item_id: "",
      qty: "",
      satuan: "",
      harga: "",
      qty_fisik: "",
      keterangan_fisik: "",
    },
  ]);

  const [inputListPurcahse, setInputListPurchase] = useState([
    {
      item_id: "",
      qty: "",
      satuan: "",
      harga: "",
    },
  ]);


  const validateForm = () => {

  }
  
  useEffect(() => {
    poReturn();
    getPerson();
    
  }, []);

  const poReturn = async() => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/purchase-order/page`,
    { headers }
    )
    // console.log(response.data.response_data)
    setNamaItem(response.data.response_data)
   
  }

  const getPerson = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/person/list`, { headers })
      .then((data) => {
        setAllPerson(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onSugesstHandler = (text)=>{
    setText(text);
    setSuggestions([]);

  }

  const onChangeHandler =(text)=> {
    let matches = []
    if (text.length > 0) {
      matches = namaitem.filter(ordercodes =>{
        const regex = new RegExp(`${text}`,"gi");
        return ordercodes.order_code.match(regex)
      })        
    }
    // console.log('matches', matches)
    setSuggestions(matches)
    setText(text)
  }   

  function CreateData() {
    setLoading(true);
    
    // updateItem()
    updatePrice(idItem)
  }

 

  let paginationOption = {
    page: page,
    alwaysShowAllBtns: true,
    override: true,
    showTotal: true,
    withFirstAndLast: false,
    sizePerPage: perPage,
    totalSize: totalItem,
    onPageChange: (page) => {
      updateDataTable(page, perPage, currentSort, nameItem);
    },
    sizePerPageRenderer: () => (
      <div className="dataTables_length" id="datatable-basic_length">
        <label>
          Show{" "}
          {
            <select
              name="datatable-basic_length"
              aria-controls="datatable-basic"
              className="form-control form-control-sm"
              onChange={(e) => {
                updateDataTable(page, e.target.value, currentSort);
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          }{" "}
          entries.
        </label>
      </div>
    ),
  };

  const updateDataTable = (page, perPage, sort, nameItem) => {
    getItem(page, perPage, sort, nameItem);
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
    setNameItem(nameItem);
    getPrice(page, perPage, sort);
  };

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`;
      updateDataTable(page, perPage, sort, nameItem);
    }
  };

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  // ambil data dari harga

  useEffect(() => {
    getPo(page, perPage, currentSort);
  }, []);

  // fungsi dari ambil data


  const getPo = (page, perPage, currentSort) => {
    
    let filter = {
       page: page,
       per_page: perPage, 
      
      };

    const data = filter;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/purchase-order/page`, data, {
        headers,
      })
      .then((data) => {
        setAllPoReturn(data.data.response_data);
        setPage(data.data.current_page + 1);
        setPerpage(data.data.per_page);
        setTotalItem(data.data.total_item);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const setSuccessAlert = () => {
    setAlert(
      <SweetAlert
        success
        showConfirm
        confirmBtnText="Ok"
        title="Acquirer deleted"
        onCancel={hideAlert}
        onConfirm={hideAlert}
      />
    );
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
        item_id: "",
        qty: "",
        satuan: "",
        harga: "",
        qty_fisik: "",
        keterangan_fisik: "",
      },
    ]);
  };

  function CreateData() {
    if (role === "ROLE_KARYAWAN" && namaDepartment === "Purchase") {
      let data = {
        warehouse_id: parseInt(warehouse),
        username_po: usernamePo,
        payment_method: 1,
        jangka_waktu: parseInt(jangkaWaktu),
        keterangan_payment: descriptionPayment,
        is_cicil: parseInt(isCicil),
        approve: parseInt(approve),
        // active_flag: 1,
        po_type: 1,
        keterangan_po: descriptionPo,
        person: parseInt(person),
        items: inputList,
        username_gudang: usernamePo,
        status_barang: parseInt(statusBarang),
        keterangan_gudang: descriptionGudang,
        username_kurir: "",
        username_validator: usernameValidator,
        clear: parseInt(clear),
        keterangan_validator: descriptionValidator,
        username_admin: usernameAdmin,
        keterangan_admin: descriptionAdmin,
        durasi_po: 0,
        admin_approval: 1,
      };
      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/purchase-order/save`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/po");
        })
        .then((json) => {
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      let data = {
        warehouse_id: parseInt(warehouse),
        username_po: usernamePo,
        payment_method: 1,
        jangka_waktu: 0,
        keterangan_payment: descriptionPayment,
        is_cicil: parseInt(isCicil),
        approve: parseInt(approve),
        username_gudang: usernamePo,
        status_barang: parseInt(statusBarang),
        keterangan_gudang: descriptionGudang,
        username_kurir: "", 
        username_validator: usernameValidator,
        clear: parseInt(clear),
        keterangan_validator: descriptionValidator,
        active_flag: 1,
        po_type: 1,
        keterangan_po: descriptionPo,
        person: parseInt(person),
        items: inputList,
        username_admin: usernameAdmin,
        keterangan_admin: descriptionAdmin,
        durasi_po: 0,
        admin_approval: 0,
        
      };
      axios
        .post(
          `${process.env.REACT_APP_API_BASE_URL}/purchase-order/save`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          history.push("/admin/po");
        })
        .then((json) => {
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      CreateData();
      postReturPo();
      
    }
  };
  const handleSearchPO = async () => {
    await axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/purchase-order/get?order_code=${text}`,
        {
          headers,
        }
      )
      .then((data) => {
        const mergeItems = {
          ...data.data.response_data,
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
          });
        });
        poItems = constructItems;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
    <div>
      {alert}
        <Row>
          <div className="col">
            {role === "ROLE_KARYAWAN" && namaDepartment === "Purchase" ? (
              <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <CardHeader>
                    <h3>Daftar Purchase Order</h3>
                  </CardHeader>
                  <CardBody>
                    <Row md="12">
                        <Col md="6">
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={3}
                            >
                              Kode PO
                            </Label>
                            <Col sm={7}>
                              <Input
                                type="text"
                                name="desc"
                                placeholder="Masukan Keterangan PO"
                                value={kodePo}
                                onChange={(e) => {
                                  setKodePo(e.target.value);
                                  
                                }}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={3}
                            >
                                Nama Supplier
                            </Label>
                            <Col sm={7}>
                            <Input
                                name="Supplir"
                                type="Text"
                                value={person}
                                onChange={(e) => {
                                  setPerson(e.target.value);
                                }}
                              >
                                {AllPerson.map((person, key) => {
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
                              sm={3}
                            >
                              keterangan PO
                            </Label>
                            <Col sm={7}>
                              <Input
                                type="text"
                                name="desc"
                                placeholder="Masukan Keterangan PO"
                                value={keterangan}
                                  onChange={(e) => {
                                  setKeterangan(e.target.value);
                                  
                                }}
                              />
                            </Col>
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={3}
                            >
                              Durasi Tempo
                            </Label>
                            <Col sm={7}>
                            <Input
                                type="text"
                                name="Durasi Tempo"
                                placeholder="Masukan Durasi Tempo"
                                value={durasitempo}
                                onChange={(e) => {
                                  setDurasiTempo(e.target.value);
                                  
                                }}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={3}
                            >
                              Jangka Waktu
                            </Label>
                            <Col sm={7}>
                            <Input
                                type="number"
                                name="Jangka Waktu"
                                placeholder="Masukan Jangka Waktu"
                                value={jangkawaktu}
                                onChange={(e) => {
                                  setJangkaWaktu(e.target.value);
                                }}
                              />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={3}
                            >
                              Termin
                            </Label>
                            <Col sm={7}>
                            <Input
                            name="Termin"
                            type="text"
                            value={termin}
                            onChange={(e) => {
                              setTermin(e.target.value);
                            }}
                          >
                            <option value="">Pilih Cicilan</option>
                            <option value="">Lunas</option>
                            <option value="">Belum Lunas</option>
                            
                          </Input>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={3}
                            >
                              Metode Pembayaran
                            </Label>
                            <Col sm={7}>
                                <Input
                                name="satuan"
                                type="select"
                                value={metodepembayaran}
                                onChange={(e) => {
                                  setMetodePembayaran(e.target.value);
                                }}
                              >
                                <option value="">Pilih Metode Pembayaran</option>
                                <option value={1}>Tunai</option>
                                <option value={2}>Tempo</option>
                                
                              </Input>
                            </Col>
                          </FormGroup>
                          
                        </Col>
                    </Row>
                        <Table>
                                <thead>
                                <tr>
                                    <th>
                                    Nama Item
                                    </th>
                                    <th>
                                    Kode Item
                                    </th>
                                    <th>
                                    Satuan
                                    </th>
                                    <th>
                                    Qty
                                    </th>
                                    <th>
                                    Harga
                                    </th>
                                    <th>
                                    
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                </tbody>
                        </Table>
                    {inputList.map((x, i) => {
                      return (
                        <div key={i}>
                          <Table className="Table">
                            <tbody>
                              <tr>
                                <td>
                                <Input
                                    type="text"
                                    name="desc"
                                    placeholder="Masukan Item"
                                    value={nameItem}
                                    onChange={(e) => {
                                      setNameItem(e.target.value);
                                      
                                    }}
                                  />
                                </td>
                                <td>
                                <Input
                                    type="text"
                                    name="desc"
                                    placeholder="Satuan"
                                    value={satuan}
                                    onChange={(e) => {
                                      setDescription(e.target.value);
                                    }}
                                  />
                                </td>
                                <td>
                                <Input
                                    type="text"
                                    name="desc"
                                    placeholder="Masukan Qty"
                                    value={qty}
                                    onChange={(e) => {
                                      setQty(e.target.value);
                                     
                                    }}
                                  />
                                </td>
                                <td>
                                <Input
                                    type="text"
                                    name="desc"
                                    placeholder="Masukan Harga"
                                    value={harga}
                                    onChange={(e) => {
                                      setHarga(e.target.value);
                                    }}
                                  />
                                </td>
                                <td>
                                  
                                      {inputList.length !== 1 && (
                                        <Button
                                          color="primare"
                                          onClick={() => handleRemoveClick(i)}
                                        >
                                          <i className="fa fa-trash" aria-hidden="true"></i>
                                        </Button>
                                      )}
                                      {inputList.length - 1 === i && (
                                        <Button
                                          color="primare"
                                          onClick={handleAddClick}
                                        >
                                          <i className="fa fa-plus"></i>
                                        </Button>
                                      )}
                      
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      );  
                    })}
                  </CardBody>
                  <CardFooter >
                  <Row md="12">
                        <Col md="8">
                        </Col>
                        <Col md="4">
                          
                          <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={4}
                            >
                              Harga Total
                            </Label>
                            <Col sm={6}>
                            <Input
                                type="text"
                                name="barcode"
                                placeholder="Harga Total"
                                value={harga}
                                onChange={(e) => {
                                  setHarga(e.target.value);
                                  
                                }}
                              />
                            </Col>
                          </FormGroup>
                        </Col>
                    </Row>
                  </CardFooter>
                </Form>
              </CardBody>
              </Card>
            ) : (
              <Card>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <CardHeader>
                    <FormGroup row>
                      <Label
                        className="form-control-label"
                        htmlFor="exampleFormControlInput1"
                        sm = {2}
                      >
                        Kode Purchase Order
                      </Label>
                      <Col sm={2}>
                      <Input
                        autoComplete="off"
                        type="text"
                        name="codePo"
                        placeholder="Masukan Kode Purchase Order"
                        value={text}
                        onChange={(e) => {
                          onChangeHandler(e.target.value);
                        }}
                      />
                      
                      {suggestions && suggestions.map((suggestion, i ) =>
                      <div key={i} onClick={() => onSugesstHandler(suggestion.order_code)}>{suggestion.order_code}</div>
                      )}

                      </Col>
                      <Col sm={2}>
                      <Button
                      color="primary"
                      style={{ marginBottom: 12 }}
                      onClick={handleSearchPO} 
                      sm={4}
                    >
                      Cari
                      </Button>
                      </Col>
                    </FormGroup>
                    </CardHeader>
                    <CardBody>
                      <Row md="12">
                          <Col md="6">
                            <FormGroup row>
                              <Col sm={7}>
                                <Input
                                  type="hidden"
                                  name="desc"
                                  placeholder="Masukan Keterangan PO"
                                  value={dataPo?.kodePo}
                                  onChange={(e) => {
                                    setKodePo(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={5}
                              >
                                Supplier
                              </Label>
                              <Col sm={7}>
                              <Input
                                  name="kategory"
                                  type="select"
                                  value={dataPo?.person}
                                  onChange={(e) => {
                                    setPerson(e.target.value);
                                  }}
                                >
                                  {AllPerson.map((person, key) => {
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
                                sm={5}
                              >
                                Keterangan
                              </Label>
                              <Col sm={7}>
                                <Input
                                  
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Keterangan PO"
                                  value={dataPo?.keterangan_po}
                                  onChange={(e) => {
                                    setKeterangan(e.target.value);

                                  }}
                                />
                              </Col>
                              
                            </FormGroup>
                            <FormGroup row>
                            <Label
                              for="exampleEmail"
                              sm={5}
                            >
                              Tipe PO
                            </Label>
                            <Col sm={7}>
                            <Input
                                name="tipe po"
                                type="select"
                                value={poType}
                                onChange={(e) => {
                                  setPoType(e.target.value);
                                }}
                              >
                                <option value={1}>Ready</option>
                                <option value={2}>Kirim Dari Supplier</option>
                              </Input>
                            </Col>
                          </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={5}
                              >
                                Metode Pembayaran
                              </Label>
                              <Col sm={7}>
                                  <Input
                                 
                                  name="satuan"
                                  type="select"
                                  value={metodepembayaran}
                                  onChange={(e) => {
                                    setMetodePembayaran(e.target.value);
                                  }}
                                >
                                  <option value={1}>Tunai/Transfer</option>
                                  <option value={2}>Termin/Tempo</option>
                                  <option value={3}>Deposito</option>
                                  {/* <option value={4}>Transfer</option> */}
                                </Input>
                              </Col>
                            </FormGroup>
                          </Col>
                          <Col md="6">
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={5}
                              >
                                Durasi PO
                              </Label>
                              <Col sm={7}>
                              <Input
                                  type="text"
                                  name="barcode"
                                  placeholder="Masukan Durasi Tempo"
                                  value={barcode}
                                  invalid={barcodeError === "invalid"}
                                  onChange={(e) => {
                                    setBarcode(e.target.value);
                                    if (e.target.value !== "") {
                                      setBarcodeError("");
                                    }
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={5}
                              >
                                Jangka Waktu
                              </Label>
                              <Col sm={7}>
                              <Input
                              
                                  type="number"
                                  name="stock"
                                  placeholder="Masukan Jangka Waktu"
                                  value={stock}
                                  invalid={stockError === "invalid"}
                                  onChange={(e) => {
                                    setStock(e.target.value);
                                    if (e.target.value !== "") {
                                      setStockError("");
                                    }
                                  }}
                                />
                              </Col>
                            </FormGroup>
                            
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={5}
                              >
                                Cicilan
                              </Label>
                              <Col sm={7}>
                              <Input
                              name="satuan"
                              type="select"
                              value={satuan}
                              onChange={(e) => {
                                setSatuan(e.target.value);
                              }}
                            >
                              <option value={1}>Lunas</option>
                              <option value={2}>Belum Lunas</option>
                              
                            </Input>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={5}
                              >
                                Nominal Cicilan
                              </Label>
                              <Col sm={7}>
                                <Input
                               
                                  type="text"
                                  name="desc"
                                  placeholder="Masukan Keterangan PO"
                                  value={description}
                                  onChange={(e) => {
                                    setDescription(e.target.value);
                                  }}
                                />
                              </Col>
                            </FormGroup>
                          </Col>
                      </Row>
                            <Table>
                              <thead>
                                <tr>
                                  <th>
                                    <center>Nama Item</center>
                                  </th>
                                  <th>
                                    <center>Qty</center>
                                  </th>
                                  <th>
                                    <center>Satuan</center>
                                  </th>
                                  <th>
                                    <center>Harga</center>
                                  </th>
                                  <th>
                                    <center></center>
                                  </th>
                                </tr>
                              </thead>
                            </Table>
                      {inputList.map((x, i) => {
                        return (
                          <div key={i}>
                            <Table className="Table">
                            <tbody>
                              <tr>
                                <td>
                                <Input
                                    type="text"
                                    name="desc"
                                    placeholder="Masukan Item"
                                  />
                                </td>
                                <td>
                                <Input
                                    type="text"
                                    name="desc"
                                    placeholder="Satuan"
                                  />
                                </td>
                                <td>
                                <Input
                                    type="text"
                                    name="desc"
                                    placeholder="Masukan Qty"
                                  />
                                </td>
                                <td>
                                <Input
                                    type="text"
                                    name="desc"
                                    placeholder="Masukan Harga"
                                  />
                                </td>
                                <td>
                                  
                                      {inputList.length !== 1 && (
                                        <Button
                                          color="primare"
                                          onClick={() => handleRemoveClick(i)}
                                        >
                                          <i className="fa fa-trash" aria-hidden="true"></i>
                                        </Button>
                                      )}
                                      {inputList.length - 1 === i && (
                                        <Button
                                          color="primare"
                                          onClick={handleAddClick}
                                        >
                                          <i className="fa fa-plus"></i>
                                        </Button>
                                      )}
                      
                                </td>
                              </tr>
                            </tbody>
                            </Table>
                          </div>
                        );  
                      })}
                    </CardBody>
                    <CardFooter >
                    <Row md="12">
                          <Col md="8">
                          </Col>
                          <Col md="4">
                            
                            <FormGroup row>
                              <Label
                                for="exampleEmail"
                                sm={4}
                              >
                                Harga Total
                              </Label>
                              <Col sm={6}>
                              <Input
                                  type="text"
                                  name="barcode"
                                  placeholder="Harga Total"
                                  value={harga}
                                  onChange={(e) => {
                                    setHarga(e.target.value);
                                    }}
                                />
                              </Col>
                            </FormGroup>
                          </Col>
                      </Row>
                    </CardFooter>
                  </Form>
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
                      <Link className="btn btn-info" to="/admin/po">
                        Kembali
                      </Link>
                </CardFooter>
                <CardFooter></CardFooter>
                <CardBody>
                    <h3>Data Retur PO </h3>
                    <ToolkitProvider
                  rowNumber={rowIndex}
                  data={allPoReturn}
                  keyField="id"
                  columns={[
                    {
                      dataField: 'no',
                      text: '#',
                      sort: true,
                      page: 1,
                      formatter: (cell, row, index) => {
                        let currentRow = ++index;
                        return currentRow + rowIndex;
                      },
                    },
                    {
                      dataField: 'username_po',
                      text: 'Username Purcase Order',
                      sort: true,
                    },
                    {
                      dataField: 'retur_code',
                      text: 'Kode Retur',
                      sort: true,
                    },
                    {
                      dataField: 'supplier',
                      text: 'Supplier',
                      sort: true,
                    },
                    {
                      dataField: 'item_or_money',
                      text: 'Item atau Uang',
                      sort: true,
                      formatter: (cell, row) => {
                        return row.item_or_money === 1 ? 'Item' : 'Money';
                      },
                    },
                    {
                      dataField: 'total_qty',
                      text: 'Quality',
                      sort: true,
                    },
                    {
                      dataField: 'total_price',
                      text: 'Total Harga',
                      sort: true,
                    },
                    {
                      dataField: 'status_barang',
                      text: 'Status',
                      sort: true,
                      formatter: (cell, row) => {
                        return row.status_barang === 0
                          ? 'Belum diproses'
                          : row.status_barang === 1
                          ? 'Diterima'
                          : 'Belum diterima';
                      },
                    },
                    {
                      dataField: '',
                      text: '',
                      formatter: (cell, row, index) => {
                        return (
                          <>
                            <ButtonGroup>
                              <Button>
                                <Link
                                  to={redirectPrefix + row.id}
                                  id={'tooltip_' + row.id}
                                >
                                  <i className="fas fa-user-edit" />
                                </Link>
                              </Button>
                              <UncontrolledTooltip
                                delay={0}
                                target={'tooltip_' + row.id}
                              >
                                Edit
                              </UncontrolledTooltip>
                            </ButtonGroup>
                            <Button
                              onClick={() => {
                                setOpenDetail(true);
                                setSelectedRowData(row);
                              }}
                              size="sm"
                              color="primary"
                              type="button"
                            >
                              Detail
                            </Button>
                          </>
                        );
                      },
                    },
                  ]}
                >
                  {(props) => (
                    <div className="py-4 table-responsive">
                      <BootstrapTable
                        remote
                        {...props.baseProps}
                        bootstrap4={true}
                        bordered={false}
                        hover={true}
                        pagination={paginationFactory({ ...paginationOption })}
                        onTableChange={handleTableChange}
                      />
                    </div>
                  )}
                    </ToolkitProvider>
                </CardBody>
              </Card>
            )}
          </div>
        </Row>
    </div>
    </>
  );
};

export default Validasi;