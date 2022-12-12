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
  CardImg,
  Col,
  Button,
  Table,
  Container,
  Form,
  CardGroup,
} from "reactstrap";
import { Link , useHistory } from "react-router-dom";
import axios from "axios";
import SimpleHeader from "components/Headers/SimpleHeader.js";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
// import Barcode from "react-barcode";
import QRCode from "qrcode.react";

export default function EditItem() {
  const token = localStorage.token;
  const warehouseId = localStorage.warehouse;
  const username = localStorage.username;
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [rowIndex, setRowIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [totalItem, setTotalItem] = useState(0);
  const [currentSort, setCurrentSort] = useState("");
  const [supplier, setSupplier] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [itemCode,setItemCode] = useState("")
  const [nameItem, setNameItem] = useState("");
  const [description, setDescription] = useState("");
  const [numberPart, setNumberPart] = useState("");
  const [allSatuan, setAllSatuan] = useState([]);
  const [satuan, setSatuan] = useState("");
  const [allGrade, setAllGrade] = useState([]);
  const [grade, setGrade] = useState([]);
  const [allAccount, setAllAccount] = useState([]);
  const [account, setAccount] = useState([]);
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [nameFunction, setNameFunction] = useState([]);
  const [nameFunctions, setNameFunctions] = useState([]);
  const [nameSubFunction, setNameSubFunction] = useState([]);
  const [nameSubFunctions, setNameSubFunctions] = useState([]);
  const [allMerek, setAllMerek] = useState([]);
  const [merek, setMerek] = useState([]);
  const [submerek,setSubMerek] = useState([]);
  const [panjang, setPanjang] = useState("");
  const [allSubMerek,setAllSubMerek] = useState([]);
  const [lebar, setLebar] = useState("");
  const [tinggi, setTinggi] = useState("");
  const [stock, setStock] = useState("");
  const [nameType, setNameType] = useState(1);
  const [hargaBeli, setHargaBeli] = useState([]);
  const [pajakBeli, setPajakBeli] = useState([]);
  const [pajakBeliNominal, setPajakBeliNominal] = useState([]);
  const [pajakjuals, setPajakJual] = useState([]);
  const [pajakjualnominal, setPajakJualNominal] = useState([]);
  const [diskonsuplierpersen, setDiskonSuplierPersen] = useState([]);
  const [diskonnominal, setDiskonNominal] = useState([]);
  const [barcode, setBarcode] = useState([]);
  const [diskonpersen, setDiskonPersen] = useState([]);
  const [diskonsupliernominal, setDiskonSuplierNominal] = useState([]);
  const [status,setStatus] = useState([]);
  const [hargajualminimal, setHargaJualMinimal] = useState([]);
  const [hargajual,setHargaJual] = useState([]);
  const [minimumstock, setMinimumStock] = useState([]);
  const [hargabelitotal,setHargaBeliTotal] = useState([]);
  const [marginglobalpersen, setMarginGlobalPersen] = useState([]);
  const [marginglobalnominal, setMarginGlobalNominal] = useState([]);
  const [allpajakbeli,setAllPajakBeli] = useState([]);
  const [allpajakJual,setAllPajakJual] = useState([]);
  const [level1,setLevel1] = useState([]);
  const [level2,setLevel2] = useState([]);
  const [level3,setLevel3] = useState([]);
  const [level4,setLevel4] = useState([]);
  const [level5,setLevel5] = useState([]);
  const [level6,setLevel6] = useState([]);
  const [margin1,setMargin1] = useState([]);
  const [margin2,setMargin2] = useState([]);
  const [margin3,setMargin3] = useState([]);
  const [margin4,setMargin4] = useState([]);
  const [margin5,setMargin5] = useState([]);
  const [margin6,setMargin6] = useState([]);
  const [persentase1,setPersentase1] = useState([]);
  const [persentase2,setPersentase2] = useState([]);
  const [persentase3,setPersentase3] = useState([]);
  const [persentase4,setPersentase4] = useState([]);
  const [persentase5,setPersentase5] = useState([]);
  const [persentase6,setPersentase6] = useState([]);
  const [qty1,setQty1] = useState([]);
  const [qty2,setQty2] = useState([]);
  const [qty3,setQty3] = useState([]);
  const [qty4,setQty4] = useState([]);
  const [qty5,setQty5] = useState([]);
  const [qty6,setQty6] = useState([]);
  const [price1,setPrice1] = useState([]);
  const [price2,setPrice2] = useState([]);
  const [price3,setPrice3] = useState([]);
  const [price4,setPrice4] = useState([]); 
  const [price5,setPrice5] = useState([]);
  const [price6,setPrice6] = useState([]);
  const [itemgrup, setItemGrup] = useState("");
  const [itemgrups, setItemGrups] = useState([]);
  const [berat, setBerat] = useState([]);
  const [image1, setImage1] = useState("")
  const [image2, setImage2] = useState("")
  const [image3, setImage3] = useState("")
  const [logPrice, setLogPrice] = useState([]);
  const [input1, setInput1] = useState([]);
  const [input2, setInput2] = useState([]);
  const [input3, setInput3] = useState([]);
  const [active1, setActive1] = useState(0);
  const [filtered1, setFiltered1] = useState([]);
  const [isShow1, setIsShow1] = useState(false);

     const [itemId, setItemId] = useState(1);
    const [itemData, setItemData] = useState([]);

	useEffect(() => {
		getItemData();
	}, [itemId]);

	const getItemData = async () => {
		const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/items/${itemId}`);
		setItemData(res.data.response.items);
        // items: response.data.response.items,
                getSatuan(res.data.response.items.uom_id);
                getGrade(res.data.response.items.grade_id);
                getPajakBeli(res.data.response.items.pajak_beli);
                getPajakJual(res.data.response.items.pajak_jual);
                getAccount(res.data.response.items.account_id);
                getCategory(res.data.response.items.kategori_id);
                getSubCategory(res.data.response.items.subkategori_id);
                getFunction( res.data.response.items.function_id);
                getSubFunction(res.data.response.items.subfunction_id);
                getMerek(res.data.response.items.merek_id);
                getSubMerek(res.data.response.items.submerek_id);
                getItemGrup(res.data.response.items.ig_id);
                setBerat(res.data.response.items.berat);
                setStatus(res.data.response.items.active_flag);
                setSatuan(res.data.response.items.uom_code);
                setMerek(res.data.response.items.merek_name);
                setNameItem(res.data.response.items.item_name);
                setDescription(res.data.response.items.item_description);
                setNumberPart(res.data.response.items.part_number);
                setPanjang(res.data.response.items.panjang);
                setLebar(res.data.response.items.lebar);
                setImage1(res.data.response.items.image_1);
                setImage2(res.data.response.items.image_2);
                setImage3(res.data.response.items.image_3);
                setTinggi(res.data.response.items.tinggi);
                setStock(res.data.response.items.stock);
                setMinimumStock(res.data.response.items.minimum_stok);
                setItemCode(res.data.response.items.item_code);
                setHargaBeli(res.data.response.items.harga_beli);
                setHargaBeliTotal(res.data.response.items.harga_beli_total);
                setHargaJualMinimal(res.data.response.items.harga_jual_minimal);
                setDiskonNominal(res.data.response.items.diskon_nominal);
                setDiskonPersen(res.data.response.items.diskon_persen);
                setDiskonSuplierNominal(res.data.response.items.diskon_nominal_suplier);
                setDiskonSuplierPersen(res.data.response.items.diskon_persen_suplier);
                setLevel1(res.data.response.items.Level_1);
                setLevel2(res.data.response.items.Level_2);
                setLevel3(res.data.response.items.Level_3);
                setLevel4(res.data.response.items.Level_4);
                setLevel5(res.data.response.items.Level_5);
                setLevel6(res.data.response.items.Level_6);
                setPersentase1(res.data.response.items.persentase_1);
                setPersentase2(res.data.response.items.persentase_2);
                setPersentase3(res.data.response.items.persentase_3);
                setPersentase4(res.data.response.items.persentase_4);
                setPersentase5(res.data.response.items.persentase_5);
                setPersentase6(res.data.response.items.persentase_6);
                setMargin1(res.data.response.items.nominal_1);
                setMargin2(res.data.response.items.nominal_2);
                setMargin3(res.data.response.items.nominal_3);
                setMargin4(res.data.response.items.nominal_4);
                setMargin5(res.data.response.items.nominal_5);
                setMargin6(res.data.response.items.nominal_6);
                setQty1(res.data.response.items.min_qty_1);
                setQty2(res.data.response.items.min_qty_2);
                setQty3(res.data.response.items.min_qty_3);
                setQty4(res.data.response.items.min_qty_4);
                setQty5(res.data.response.items.min_qty_5);
                setPrice1(res.data.response.items.price_1);
                setPrice2(res.data.response.items.price_2);
                setPrice3(res.data.response.items.price_3);
                setPrice4(res.data.response.items.price_4);
                setPrice5(res.data.response.items.price_5);
                setPrice6(res.data.response.items.price_6)
	};

   useEffect(() => {
        // getById();
        getPerson();
        getSatuan();
        getCategory();
        getSubCategory();
        getFunction();
        getSubFunction();
        getMerek();
        getSubMerek();
        getGrade();
        getAccount();
        getItemGrup();
   }, []);


   const onChange1 = (e) => {
    const input1 = e.currentTarget.value;
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/items`, {

        page: 1,
        per_page: 10,
        item_name: input1,
        warehouse_id : parseInt(warehouseId),
    }).then(async response => {
        let suggests = [];

        await Promise.all(response.data.response.map((data) =>
            suggests = [...suggests, data.item_name]
        ));

        setActive1(0);
        setFiltered1(suggests);
        setIsShow1(true);

    });

    setInput1(e.currentTarget.value);
};

const onClick1 = e => {
    setActive1(0);
    setFiltered1([]);
    setIsShow1(false);
    setInput1(e.currentTarget.innerText);
};

const onKeyDown1 = e => {
    if (e.keyCode === 13) { // enter key
        setActive1(0);
        setIsShow1(false);
        setInput1(filtered1[active1])
    }
    else if (e.keyCode === 38) { // up arrow
        return (active1 === 0) ? null : setActive1(active1 - 1);
    }
    else if (e.keyCode === 40) { // down arrow
        return (active1 - 1 === filtered1.length) ? null : setActive1(active1 + 1);
    }
};

const AutoCompleTes1 = () => {
    if (isShow1 && input1) {
        if (filtered1.length) {
            return (
                <ul className="autocomplete">
                    {filtered1.map((suggestion1, index1) => {
                        let className;
                        if (index1 === active1) {
                            className = "active";
                        }
                        return (
                            <li key={index1} className={className} onClick={onClick1}>
                                {suggestion1}
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            return (
                <div className="no-autocomplete">
                    <em>Not found</em>
                </div>
            );
        }
    }
    return <></>;
}

//menampilkan search getbyid
const saveItem1 = () => {

    axios.post(`${process.env.REACT_APP_API_BASE_URL}/items`, {
        page: 1,
        per_page: 1,
        item_name: input1,
        warehouse_id : parseInt(warehouseId),
    }).then(res => {
        const length = res.data.response.length;
        if (length === 0)
            return;
            const idItem = res.data.response[0].id;
            axios.get(`${process.env.REACT_APP_API_BASE_URL}/items/${idItem}`)
            .then(async response => {
                return {
                    items: response.data.response.items,
                };
              }).then((data) => {
                getSatuan(data.items.uom_id);
                getGrade(data.items.grade_id);
                getPajakBeli(data.items.pajak_beli);
                getPajakJual(data.items.pajak_jual);
                getAccount(data.items.account_id);
                getCategory(data.items.kategori_id);
                getSubCategory(data.items.subkategori_id);
                getFunction( data.items.function_id);
                getSubFunction(data.items.subfunction_id);
                getMerek(data.items.merek_id);
                getSubMerek(data.items.submerek_id);
                getItemGrup(data.items.ig_id);
                setBerat(data.items.berat);
                setStatus(data.items.active_flag);
                setSatuan(data.items.uom_code);
                setMerek(data.items.merek_name);
                setNameItem(data.items.item_name);
                setDescription(data.items.item_description);
                setNumberPart(data.items.part_number);
                setPanjang(data.items.panjang);
                setLebar(data.items.lebar);
                setImage1(data.items.image_1);
                setImage2(data.items.image_2);
                setImage3(data.items.image_3);
                setTinggi(data.items.tinggi);
                setStock(data.items.stock);
                setMinimumStock(data.items.minimum_stok);
                setItemCode(data.items.item_code);
                setHargaBeli(data.items.harga_beli);
                setHargaBeliTotal(data.items.harga_beli_total);
                setHargaJualMinimal(data.items.harga_jual_minimal);
                setDiskonNominal(data.items.diskon_nominal);
                setDiskonPersen(data.items.diskon_persen);
                setDiskonSuplierNominal(data.items.diskon_nominal_suplier);
                setDiskonSuplierPersen(data.items.diskon_persen_suplier);
                setLevel1(data.items.Level_1);
                setLevel2(data.items.Level_2);
                setLevel3(data.items.Level_3);
                setLevel4(data.items.Level_4);
                setLevel5(data.items.Level_5);
                setLevel6(data.items.Level_6);
                setPersentase1(data.items.persentase_1);
                setPersentase2(data.items.persentase_2);
                setPersentase3(data.items.persentase_3);
                setPersentase4(data.items.persentase_4);
                setPersentase5(data.items.persentase_5);
                setPersentase6(data.items.persentase_6);
                setMargin1(data.items.nominal_1);
                setMargin2(data.items.nominal_2);
                setMargin3(data.items.nominal_3);
                setMargin4(data.items.nominal_4);
                setMargin5(data.items.nominal_5);
                setMargin6(data.items.nominal_6);
                setQty1(data.items.min_qty_1);
                setQty2(data.items.min_qty_2);
                setQty3(data.items.min_qty_3);
                setQty4(data.items.min_qty_4);
                setQty5(data.items.min_qty_5);
                setPrice1(data.items.price_1);
                setPrice2(data.items.price_2);
                setPrice3(data.items.price_3);
                setPrice4(data.items.price_4);
                setPrice5(data.items.price_5);
                setPrice6(data.items.price_6);
              })
              .catch(function (error) {
                console.log(error);
              });
    });
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
      updateDataTable(page, perPage, currentSort);
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

  const updateDataTable = (page, perPage, sort) => {
    setPage(page);
    setPerpage(perPage);
    setRowIndex((page - 1) * perPage);
    setCurrentSort(sort);
  };

  const handleTableChange = (type, { sortField, sortOrder }) => {
    if (type === "sort") {
      let sort = `${sortField} ${sortOrder}`;
      updateDataTable(page, perPage, sort);
    }
  };

  const getPerson = () => {
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
        setSuppliers(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getItemGrup = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/item-group/list`,
        { headers }
      )
      .then((data) => {
        setItemGrups(data.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getPajakJual =(id) =>{
    const headers = {
      "Content-Type" : "application/json",
      Authorization: `bearer ${token}`,
    }
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/pajak/list`, {headers})
      .then((data)=>{
        setAllPajakJual(data.data.response);
        setPajakJual(id);
      })
      .catch(function(error){
        console.log(error);
      })
  };

  const getPajakBeli =(id) =>{
    const headers = {
      "Content-Type" : "application/json",
      Authorization: `bearer ${token}`,
    }
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/pajak/list`, {headers})
      .then((data)=>{
        setAllPajakBeli(data.data.response);
        setPajakBeli(id);
      })
      .catch(function(error){
        console.log(error);
      })
  };

  const getAccount = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/account/list`, { headers })
      .then((data) => {
        setAllAccount(data.data.response);
        setAccount(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getGrade = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/item-grade/list`, { headers })
      .then((data) => {
        setAllGrade(data.data.response);
        setGrade(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getSatuan = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/uom/list`, { headers })
      .then((data) => {
        setAllSatuan(data.data.response);
        setSatuan(id);
      })  
      .catch(function (error) {
        console.log(error);
      });
  };

  const getCategory = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/item-kategori/list`, {
        headers,
      })
      .then((data) => {
        setCategories(data.data.response);
        setCategory(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getSubCategory = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/sub-kategori/list`,
        { headers }
      )
      .then((data) => {
        setSubCategories(data.data.response);
        setSubCategory(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getFunction = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/item-function/list`,
        { headers }
      )
      .then((data) => {
        setNameFunctions(data.data.response);
        setNameFunction(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getSubFunction = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/sub-function/list`,
        { headers }
      )
      .then((data) => {
        setNameSubFunctions(data.data.response);
        setNameSubFunction(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getMerek = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/merek/list`,
        { headers }
      )
      .then((data) => {
        setAllMerek(data.data.response);
        setMerek(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getSubMerek = (id) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/sub-merek/list`,
        { headers }
      )
      .then((data) => {
        setAllSubMerek(data.data.response);
        setSubMerek(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  const EditData = () => {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };
    const myjson = JSON.stringify ({
      warehouse_id: parseInt(warehouseId),
      username: username,
      item_description: description,
      part_number: numberPart,
      person_id : parseInt(supplier),
      uom_id: parseInt(satuan),
      kategori_id: parseInt(category),
      subkategori_id: parseInt(subCategory),
      grade_id: parseInt(grade),
      account_id: parseInt(account),
      function_id: parseInt(nameFunction),
      subfunction_id: parseInt(nameSubFunction),
      merek_id: parseInt(merek),
      submerek_id : parseInt(submerek),
      active_flag: parseInt(status),
      ig_id: parseInt(itemgrup),
      berat : parseInt(berat),
      item_name: nameItem,
      minimum_stok : minimumstock,
      panjang,
      lebar,
      tinggi,
      stock: 0,
      type: nameType,
  });     
  let data = new FormData();
    data.append("body",myjson)
    data.append("image1",image1)
    data.append("image2",image2)
    data.append("image3",image3)
    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/items/update/${itemId}`, data, {headers})
      .then(function (response) 
      {
        history.push("/admin/item");
      })
      .then((json) => {
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function EditPrice () {
    setLoading(true);
    let data = {
        username: username,
        uom_id: parseInt(satuan),
        harga_beli: parseInt(hargaBeli),
        diskon_persen_suplier: parseFloat(diskonsuplierpersen),
        diskon_nominal_suplier: parseFloat(diskonsupliernominal),
        pajak_beli: parseFloat(pajakBeli),
        pajak_jual: parseFloat(pajakjuals),
        diskon_persen:  parseFloat(diskonpersen),
        diskon_nominal:  parseFloat(diskonnominal),
        nominal_1: parseFloat(margin1),
        persentase_1: parseFloat(persentase1),
        min_qty_1: parseFloat(qty1),
        nominal_2: parseFloat(margin2),
        persentase_2: parseFloat(persentase2),
        min_qty_2: parseFloat(qty2),
        nominal_3: parseFloat(margin3),
        persentase_3: parseFloat(persentase3),
        min_qty_3: parseFloat(qty3),
        nominal_4: parseFloat(margin4),
        persentase_4: parseFloat(persentase4),
        min_qty_4: parseFloat(qty4),
        nominal_5: parseFloat(margin5),
        persentase_5: parseFloat(persentase5),
        min_qty_5: parseFloat(qty5),
        nominal_6: parseFloat(margin6),
        persentase_6: parseFloat(persentase6),
        active_flag: 1
    }
    axios
      .post(
      `${process.env.REACT_APP_API_BASE_URL}/price-detail/update/${itemId}`, 
      data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,      
        },
      })
      .then(function (response) {
        history.push("/admin/item");
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
      
    EditPrice();
    EditData();

    }
  };

  return (
    <>
      <div>
      <SimpleHeader name="Item" parentName="Master" />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
              <Form onSubmit={handleSubmit}>
                <CardBody>
                    <Card>
                        <CardBody>
                            <Row md="12">
                                <Col md="5">
                                    <Button
                                        onClick={() => setItemId(1)}
                                        color="secondary"
                                        type="button"
                                    >
                                        First
                                    </Button>
                                    <Button
                                        onClick={() => setItemId((prev) => prev - 1)}
                                        color="success"
                                        type="button"
                                        
                                    >
                                        <i className="ni ni-bold-left" /> Prev
                                    </Button>
                                    <Button
                                        onClick={() => setItemId((prev) => prev + 1)}
                                        color="success"
                                        type="button"
                                    >
                                        Next  <i className="ni ni-bold-right" /> 
                                    </Button>
                                    <Button
                                       onClick={() => setItemId(2000)}
                                        color="warning"
                                        type="button"
                                    >
                                        End
                                    </Button>
                                </Col>
                                <Col md="4">
                                    <FormGroup row>
                                        <Col sm={7}>
                                            <Input
                                                className="form-control-alternative"
                                                placeholder="Search Item"
                                                type="search"
                                                onChange={onChange1}
                                                onKeyDown={onKeyDown1}
                                                value={input1}
                                            />
                                            <AutoCompleTes1 />
                                        </Col>
                                        <Col sm={2}>    
                                        <Button color="primary" className="mb-3" onClick={() => saveItem1()}><i className="fa fa-search"></i></Button>                       
                                        </Col> 
                                    </FormGroup>
                                </Col>
                                <Col md="3">
                                    <div style={{ textAlign: "right" }}>
                                    <Button
                                        color="info"
                                        type="submit"
                                    >
                                        Simpan
                                    </Button>
                                        <Link className="btn btn-danger" to="/admin/item/create">
                                            Create
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </CardBody>
                <CardBody>
                        <Row md="12">
                            <Col md="7">
                                <Card className="bg-secondary shadow">
                                    <CardHeader className="bg-white border-0">
                                    <h3>ITEM</h3>
                                    </CardHeader>
                                    <CardBody>
                                    <FormGroup row>
                                        <Label
                                            for="exampleEmail"
                                            sm={4}
                                        >
                                            Kode Item
                                        </Label>
                                        <Col sm={7}>
                                            <Input
                                                disabled
                                                className="form-control-alternative"
                                                type="text"
                                                name="itemCode"
                                                placeholder="Masukan Kode Item"
                                                value={itemCode}
                                                onChange={(e) => {
                                                setItemCode(e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label
                                        for="exampleEmail"
                                        sm={4}
                                        >
                                        Barcode
                                        </Label>
                                        <Col sm={7}>
                                        <Input
                                            className="form-control-alternative"
                                            type="text"
                                            name="barcode"
                                            placeholder="Masukan Barcode"
                                            value={barcode}
                                            onChange={(e) => {
                                            setBarcode(e.target.value);
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
                                            className="form-control-alternative"
                                            name="Supplier"
                                            type="select"
                                            value={supplier}
                                            onChange={(e) => {
                                                setSupplier(e.target.value);
                                            }}
                                            >
                                            <option value="">Pilih Supplier</option>
                                            {suppliers.map((suppliers, key) => {
                                                return (
                                                <option key={key} value={suppliers.id}>
                                                    {suppliers.person_name}
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
                                        Nama Item
                                        </Label>
                                        <Col sm={7}>
                                        <Input
                                         className="form-control-alternative"
                                            type="text"
                                            
                                            placeholder="Masukan Nama Item"
                                            value={nameItem}
                                            onChange={(e) => {
                                            setNameItem(e.target.value);
                                            }}
                                        />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label
                                            for="exampleEmail"
                                            sm={4}
                                        >
                                            Nomor Part
                                        </Label>
                                        <Col sm={7}>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                name="nomorPart"
                                                placeholder="Masukan Nomor Part"
                                                value={numberPart}
                                                onChange={(e) => {
                                                setNumberPart(e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label
                                            for="exampleEmail"
                                            sm={4}
                                        >
                                             Item Grup
                                        </Label>
                                        <Col sm={7}>
                                            <Input
                                                className="form-control-alternative"
                                                name="kategory"
                                                type="select"
                                                value={itemgrup}
                                                onChange={(e) => {
                                                setItemGrup(e.target.value);
                                                }}
                                            >
                                                <option value="">Pilih Item Group</option>
                                                {itemgrups.map((categorysss, key) => {
                                                return (
                                                    <option key={key} value={categorysss.id}>
                                                    {categorysss.name}
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
                                        Satuan
                                        </Label>
                                        <Col sm={7}>
                                            <Input
                                                className="form-control-alternative"
                                                name="satuan"
                                                type="select"
                                                value={satuan}
                                                onChange={(e) => {
                                                setSatuan(e.target.value);
                                                }}
                                            >
                                                {allSatuan.map((satuan, key) => {
                                                return (
                                                    <option key={key} value={satuan.id}>
                                                    {satuan.description}
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
                                            Dimensi
                                        </Label>
                                        <Col sm={2}>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                name="panjang"
                                                placeholder="Panjang"
                                                value={panjang}
                                                onChange={(e) => {
                                                setPanjang(e.target.value);
                                                }}
                                            />
                                        </Col>
                                        <Col sm={3}>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                name="lebar"
                                                placeholder="Lebar"
                                                value={lebar}
                                                onChange={(e) => {
                                                setLebar(e.target.value);
                                                }}
                                            />
                                        </Col>
                                        <Col sm={2}>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                name="tinggi"
                                                placeholder="Tinggi"
                                                value={tinggi}
                                                onChange={(e) => {
                                                setTinggi(e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                    <Label
                                        for="exampleEmail"
                                        sm={4}
                                    >
                                        Berat
                                    </Label>
                                    <Col sm={4}>
                                        <Input
                                            className="form-control-alternative"
                                            type="text"
                                            name="Berat"
                                            placeholder="Masukan Berat"
                                            value={berat}
                                            onChange={(e) => {
                                            setBerat(e.target.value);
                                            }}
                                        />
                                    </Col>
                                    <Label
                                        for="exampleEmail"
                                        sm={4}
                                    >
                                        <b>Gram</b>
                                    </Label>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label
                                            for="exampleEmail"
                                            sm={4}
                                        >
                                        Stock
                                        </Label>
                                        <Col sm={7}>
                                            <Input
                                                disabled
                                                className="form-control-alternative"
                                                type="number"
                                                name="stock"
                                                placeholder="Masukan Stock"
                                                value={stock}
                                                onChange={(e) => {
                                                setStock(e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label
                                            for="exampleEmail"
                                            sm={4}
                                        >
                                        Minimum Stock
                                        </Label>
                                        <Col sm={7}>
                                            <Input
                                                className="form-control-alternative"
                                                type="number"
                                                name="stock"
                                                placeholder="Masukan Stock"
                                                value={minimumstock}
                                                onChange={(e) => {
                                                    setMinimumStock(e.target.value);
                                                    }}
                                            />
                                        </Col>
                                    </FormGroup>
                                    </CardBody>
                              </Card>
                            </Col>
                            <Col md="5">
                                <Card className="bg-secondary shadow">
                                    <CardHeader className="bg-white border-0">
                                    <h3 >Gambar</h3>
                                    </CardHeader>
                                    <CardBody>
                                        <FormGroup>
                                            <CardGroup center>
                                                <Row>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                    <Col md="10">
                                                        <Card>
                                                            <CardImg
                                                            alt="Card image cap"
                                                            src={image1}
                                                            top
                                                            width="100%"
                                                            />
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </CardGroup>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label>
                                                Deskripsi
                                            </Label>
                                                <Input
                                                    className="form-control-alternative"
                                                    rows = "14"
                                                    type="textarea"
                                                    name="deskripsi Item"
                                                    placeholder="Masukan Deskripsi Item"
                                                    value={description}
                                                    onChange={(e) => {
                                                        setDescription(e.target.value);
                                                    }}
                                                />
                                        </FormGroup>
                                        <FormGroup row>
                                            <CardGroup >
                                                &nbsp;
                                                &nbsp;
                                                &nbsp;
                                                &nbsp;
                                                &nbsp;
                                                &nbsp;
                                                &nbsp;
                                                
                                                <Row md="10" >
                                                    <Col md="5">
                                                        <QRCode size={100} value={itemCode} renderAs="canvas" />
                                                    </Col>
                                                    {/* <Col md="5">
                                                        <Barcode value={itemCode} />
                                                    </Col> */}
                                                </Row>
                                            </CardGroup>
                                        </FormGroup>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <h3 >KATEGORI</h3>
                            </CardHeader>
                            <CardBody>
                                <Row md="12">
                                    <Col md="6">
                                        <FormGroup row>
                                            <Label
                                            for="exampleEmail"
                                            sm={4}
                                            >
                                            Tipe Item
                                            </Label>
                                            <Col sm={5}>
                                            <Input
                                                className="form-control-alternative"
                                                type="select"
                                                
                                                placeholder="Masukan Tipe Item"
                                                value={nameType}
                                                onChange={(e) => {
                                                setNameType(e.target.value);
                                                }}
                                            >
                                                <option value={1}>Material</option>
                                                <option value={2}>Rakitan</option>
                                            </Input>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label
                                            for="exampleEmail"
                                            sm={4}
                                            >
                                            Kategori
                                            </Label>
                                            <Col sm={5}>
                                            <Input
                                            className="form-control-alternative"
                                                name="kategory"
                                                type="select"
                                                value={category}
                                                onChange={(e) => {
                                                setCategory(e.target.value);
                                                }}
                                            >
                                                <option value="">Pilih Kategori</option>
                                                {categories.map((category, key) => {
                                                return (
                                                    <option key={key} value={category.id}>
                                                    {category.name}
                                                    </option>
                                                );
                                                })}
                                                </Input>
                                            </Col>
                                            <Col sm={3}>
                                            <Button
                                                onClick={() =>
                                                history.push({
                                                    pathname: `/admin/item-kategori/create`,
                                                })
                                                }
                                                color="secondary"
                                                type="button"
                                            >
                                                <i className="ni ni-fat-add" />
                                            </Button>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label
                                            for="exampleEmail"
                                            sm={4}
                                            >
                                            Sub Kategori
                                            </Label>
                                            <Col sm={5}>
                                                <Input
                                                    className="form-control-alternative"
                                                    name="subKategory"
                                                    type="select"
                                                    value={subCategory}
                                                    onChange={(e) => {
                                                    setSubCategory(e.target.value);
                                                    }}
                                                >
                                                    <option value="">Pilih Sub Kategori</option>
                                                    {subCategories.map((category, key) => {
                                                    return (
                                                        <option key={key} value={category.id}>
                                                        {category.name}
                                                        </option>
                                                    );
                                                    })}
                                            </Input>
                                            </Col>
                                            <Col sm={3}>
                                            <Button
                                                onClick={() =>
                                                history.push({
                                                    pathname: `/admin/item-sub-kategori/create`,
                                                })
                                                }
                                                color="secondary"
                                                type="button"
                                            >
                                                <i className="ni ni-fat-add" />
                                            </Button>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label
                                            for="exampleEmail"
                                            sm={4}
                                            >
                                            Function
                                            </Label>
                                            <Col sm={5}>
                                            <Input
                                                className="form-control-alternative"
                                                name="function"
                                                type="select"
                                                value={nameFunction}
                                                onChange={(e) => {
                                                setNameFunction(e.target.value);
                                                }}
                                            >
                                                <option value="">Pilih Function</option>
                                                {nameFunctions.map((nameFunction, key) => {
                                                return (
                                                    <option key={key} value={nameFunction.id}>
                                                    {nameFunction.name}
                                                    </option>
                                                );
                                                })}
                                            </Input>
                                            </Col>
                                            <Col sm={3}>
                                            <Button
                                                onClick={() =>
                                                history.push({
                                                    pathname: `/admin/item-function/create`,
                                                })
                                                }
                                                color="secondary"
                                                type="button"
                                            >
                                                <i className="ni ni-fat-add" />
                                            </Button>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label
                                            for="exampleEmail"
                                            sm={4}
                                            >
                                            Sub Function
                                            </Label>
                                            <Col sm={5}>
                                            <Input
                                                className="form-control-alternative"
                                                name="subFunction"
                                                type="select"
                                                value={nameSubFunction}
                                                onChange={(e) => {
                                                setNameSubFunction(e.target.value);
                                                }}
                                            >
                                                <option value="">Pilih Sub Function</option>
                                                {nameSubFunctions.map((nameFunction, key) => {
                                                return (
                                                    <option key={key} value={nameFunction.id}>
                                                    {nameFunction.name}
                                                    </option>
                                                );
                                                })}
                                            </Input>
                                            </Col>
                                            <Col sm={3}>
                                            <Button
                                                onClick={() =>
                                                history.push({
                                                    pathname: `/admin/item-sub-function/create`,
                                                })
                                                }
                                                color="secondary"
                                                type="button"
                                            >
                                                <i className="ni ni-fat-add" />
                                            </Button>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                    <FormGroup row>
                                            <Label
                                            for="exampleEmail"
                                            sm={4}
                                            >
                                            Merek
                                            </Label>
                                            <Col sm={5}>
                                            <Input
                                            className="form-control-alternative"
                                                name="merek"
                                                type="select"
                                                value={merek}
                                                onChange={(e) => {
                                                setMerek(e.target.value);
                                                }}
                                            >
                                                <option value="">Pilih Merek</option>
                                                {allMerek.map((m, key) => {
                                                return (
                                                    <option key={key} value={m.id}>
                                                    {m.name}
                                                    </option>
                                                );
                                                })}
                                            </Input>
                                            </Col>
                                            <Col sm={3}>
                                            <Button
                                                onClick={() =>
                                                history.push({
                                                    pathname: `/admin/item-merek/create`,
                                                })
                                                }
                                                color="secondary"
                                                type="button"
                                            >
                                                <i className="ni ni-fat-add" />
                                            </Button>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label
                                            for="exampleEmail"
                                            sm={4}
                                            >
                                            Sub Merek
                                            </Label>
                                            <Col sm={5}>
                                            <Input
                                                className="form-control-alternative"
                                                name="merek"
                                                type="select"
                                                value={submerek}
                                                onChange={(e) => {
                                                setSubMerek(e.target.value);
                                                }}
                                            >
                                                <option value="">Pilih Sub Merek</option>
                                                {allSubMerek.map((submerek, key) => {
                                                return (
                                                    <option key={key} value={submerek.id}>
                                                    {submerek.name}
                                                    </option>
                                                );
                                                })}
                                            </Input>
                                            </Col>
                                            <Col sm={3}>
                                            <Button
                                                onClick={() =>
                                                history.push({
                                                    pathname: `/admin/item-sub-merek/create`,
                                                })
                                                }
                                                color="secondary"
                                                type="button"
                                            >
                                                <i className="ni ni-fat-add" />
                                            </Button>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label
                                            for="exampleEmail"
                                            sm={4}
                                            >
                                            Grade
                                            </Label>
                                            <Col sm={5}>
                                                <Input
                                                    className="form-control-alternative"
                                                    name="grade"
                                                    type="select"
                                                    value={grade}
                                                    onChange={(e) => {
                                                    setGrade(e.target.value);
                                                    }}
                                                >
                                                    <option value="">Pilih Grade</option>
                                                    {allGrade.map((a, key) => {
                                                    return (
                                                        <option key={key} value={a.id}>
                                                        {a.nilai}
                                                        </option>
                                                    );
                                                    })}
                                                </Input>
                                            </Col>
                                            <Col sm={3}>
                                                <Button
                                                    onClick={() =>
                                                    history.push({
                                                        pathname: `/admin/item-grade/create`,
                                                    })
                                                    }
                                                    color="secondary"
                                                    type="button"
                                                >
                                                    <i className="ni ni-fat-add" />
                                                </Button>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label
                                            for="exampleEmail"
                                            sm={4}
                                            >
                                            Account
                                            </Label>
                                            <Col sm={5}>
                                            <Input
                                                className="form-control-alternative"
                                                name="account"
                                                type="select"
                                                value={account}
                                                onChange={(e) => {
                                                setAccount(e.target.value);
                                                }}
                                            >
                                                <option value="">Pilih Account</option>
                                                {allAccount.map((a, key) => {
                                                return (
                                                    <option key={key} value={a.id}>
                                                    {a.account_name}
                                                    </option>
                                                );
                                                })}
                                                </Input>
                                            </Col>
                                            <Col sm={3}>
                                                <Button
                                                    onClick={() =>
                                                    history.push({
                                                        pathname: `/admin/account/create`,
                                                    })
                                                    }
                                                    color="secondary"
                                                    type="button"
                                                >
                                                    <i className="ni ni-fat-add" />
                                                </Button>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                                <Label
                                                for="exampleEmail"
                                                sm={4}
                                                >
                                                Status
                                                </Label>
                                                <Col sm={7}>
                                                    <div style={{ display: "flex" }}>
                                                    <div className="custom-control custom-radio mb-3">
                                                        <Input
                                                        className="custom-control-input"
                                                        id="customRadio11"
                                                        name="custom-radio-4"
                                                        type="checkbox"
                                                        value={1}
                                                        checked={status === 1}
                                                        onChange={() => setStatus(1)}
                                                        />
                                                        <Label
                                                        className="custom-control-label"
                                                        htmlFor="customRadio11"
                                                        >
                                                        Aktif
                                                        </Label>
                                                    </div>
                                                    <div
                                                        className="custom-control custom-radio mb-3"
                                                        style={{ marginLeft: "20px" }}
                                                    >
                                                        <Input
                                                        className="custom-control-input"
                                                        id="customRadio12"
                                                        name="custom-radio-4"
                                                        type="radio"
                                                        value={2}
                                                        checked={status === 2}
                                                        onChange={() => setStatus(2)}
                                                        />
                                                        <Label
                                                        className="custom-control-label"
                                                        htmlFor="customRadio12"
                                                        >
                                                        Tidak Aktif
                                                        </Label>
                                                    </div>
                                                    </div>
                                                </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <h3 >HARGA</h3>
                            </CardHeader>
                            <CardBody>
                                <Row md="12">
                                    <Col md="6">
                                        <FormGroup row>
                                            <Label
                                            for="exampleEmail"
                                            sm={4}
                                            >
                                            Harga Beli
                                            </Label>
                                            <Col sm={7}>
                                            <Input
                                            className="form-control-alternative"
                                                type="text"
                                                name="hargabeli"
                                                placeholder="Harga Beli"
                                                value={hargaBeli}
                                                onChange={(e) => {
                                                setHargaBeli(e.target.value);
                                                }}
                                            />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                                <Label
                                                for="exampleEmail"
                                                sm={4}
                                                >
                                                Diskon
                                                </Label>
                                                <Col sm={3}>
                                                <Input
                                                className="form-control-alternative"
                                                    type="text"
                                                    name="lebar"
                                                    placeholder="Diskon (%)"
                                                    value={diskonsuplierpersen}
                                                    onChange={(e) => {
                                                        setDiskonSuplierPersen(e.target.value);
                                                    }}
                                                />
                                                </Col>
                                                <Col sm={4}>
                                                <Input
                                                    className="form-control-alternative"
                                                    type="text"
                                                    name="diskonsupliernominal"
                                                    placeholder="Diskon (N)"
                                                    value={diskonsupliernominal}
                                                    onChange={(e) => {
                                                        setDiskonSuplierNominal(e.target.value);
                                                    }}
                                                />
                                                </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                                <Label
                                                for="exampleEmail"
                                                sm={4}
                                                >
                                                PPN
                                                </Label>
                                                <Col sm={3}>
                                                <Input
                                                    className="form-control-alternative"
                                                    type="text"
                                                    name="lebar"
                                                    placeholder="Pajak (%)"
                                                    value={pajakBeli}
                                                    onChange={(e) => {
                                                        setPajakBeli(e.target.value);
                                                    }}
                                                />
                                                </Col>
                                                <Col sm={4}>
                                                <Input
                                                    className="form-control-alternative"
                                                    type="text"
                                                    name="diskonsupliernominal"
                                                    placeholder="pajak (N)"
                                                    value={pajakBeliNominal}
                                                    onChange={(e) => {
                                                        setPajakBeliNominal(e.target.value);
                                                    }}
                                                />
                                                </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label
                                            for="exampleEmail"
                                            sm={4}
                                            >
                                            Harga Beli Total
                                            </Label>
                                            <Col sm={7}>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                name="harggabelitotal"
                                                placeholder="Harga Beli Total"
                                                value={hargabelitotal}
                                                onChange={(e) => {
                                                setHargaBeliTotal(e.target.value);
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
                                            HPP
                                            </Label>
                                            <Col sm={7}>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                name="hargajualminimal"
                                                placeholder="Harga Jual Minimal"
                                                value={hargajualminimal}
                                                onChange={(e) => {
                                                setHargaJualMinimal(e.target.value);
                                                }}
                                            />
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                                <Label
                                                for="exampleEmail"
                                                sm={4}
                                                >
                                                Margin
                                                </Label>
                                                <Col sm={3}>
                                                <Input
                                                    className="form-control-alternative"
                                                    type="text"
                                                    name="lebar"
                                                    placeholder="Margin (%)"
                                                    value={marginglobalpersen}
                                                    onChange={(e) => {
                                                        setMarginGlobalPersen(e.target.value);
                                                    }}
                                                />
                                                </Col>
                                                <Col sm={4}>
                                                <Input
                                                    className="form-control-alternative"
                                                    type="text"
                                                    name="diskonsupliernominal"
                                                    placeholder="Margin (N)"
                                                    value={marginglobalnominal}
                                                    onChange={(e) => {
                                                        setMarginGlobalNominal(e.target.value);
                                                    }}
                                                />
                                                </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                                <Label
                                                for="exampleEmail"
                                                sm={4}
                                                >
                                                Diskon
                                                </Label>
                                                <Col sm={3}>
                                                <Input
                                                    className="form-control-alternative"
                                                    type="text"
                                                    name="lebar"
                                                    placeholder="Diskon (%)"
                                                    value={diskonpersen}
                                                    onChange={(e) => {
                                                        setDiskonPersen(e.target.value);
                                                    }}
                                                />
                                                </Col>
                                                <Col sm={4}>
                                                <Input
                                                    className="form-control-alternative"
                                                    type="text"
                                                    name="diskonsupliernominal"
                                                    placeholder="Diskon (N)"
                                                    value={diskonnominal}
                                                    onChange={(e) => {
                                                        setDiskonNominal(e.target.value);
                                                    }}
                                                />
                                                </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                                <Label
                                                for="exampleEmail"
                                                sm={4}
                                                >
                                                PPN
                                                </Label>
                                                <Col sm={3}>
                                                <Input
                                                    className="form-control-alternative"
                                                    type="text"
                                                    name="lebar"
                                                    placeholder="Pajak (%)"
                                                    value={pajakjuals}
                                                    onChange={(e) => {
                                                        setPajakJual(e.target.value);
                                                    }}
                                                />
                                                </Col>
                                                <Col sm={4}>
                                                <Input
                                                    className="form-control-alternative"
                                                    type="text"
                                                    name="diskonsupliernominal"
                                                    placeholder="pajak (N)"
                                                    value={pajakjualnominal}
                                                    onChange={(e) => {
                                                        setPajakJualNominal(e.target.value);
                                                    }}
                                                />
                                                </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label
                                            for="exampleEmail"
                                            sm={4}
                                            >
                                            Harga Jual
                                            </Label>
                                            <Col sm={7}>
                                            <Input
                                                className="form-control-alternative"
                                                type="text"
                                                name="hargajualminimal"
                                                placeholder="Harga Jual"
                                                value={hargajual}
                                                onChange={(e) => {
                                                setHargaJual(e.target.value);
                                                }}
                                            />
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Label
                                                    for="exampleEmail"
                                                    sm={4}
                                                    >
                                                    Level
                                                </Label>
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    type="text"
                                                    name="Level1"
                                                    placeholder="Level 1"
                                                    value={level1}
                                                    onChange={(e) => {
                                                    setLevel1(e.target.value);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    type="text"
                                                    name="Level2"
                                                    placeholder="Level 2"
                                                    value={level2}
                                                    onChange={(e) => {
                                                    setLevel2(e.target.value);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    type="text"
                                                    name="Level3"
                                                    placeholder="Level 3"
                                                    value={level3}
                                                    onChange={(e) => {
                                                    setLevel3(e.target.value);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    type="text"
                                                    name="Level4"
                                                    placeholder="Level 4"
                                                    value={level4}
                                                    onChange={(e) => {
                                                    setLevel4(e.target.value);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    type="text"
                                                    name="Level5"
                                                    placeholder="Level 5"
                                                    value={level5}
                                                    onChange={(e) => {
                                                    setLevel5(e.target.value);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    type="text"
                                                    name="Level5"
                                                    placeholder="Level 6"
                                                    value={level6}
                                                    onChange={(e) => {
                                                    setLevel6(e.target.value);
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Label
                                                    for="exampleEmail"
                                                    sm={4}
                                                >
                                                    Min Qty
                                                </Label>
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    name="qty1"
                                                    placeholder="Qty 1"
                                                    value={qty1}
                                                    onChange={(e) => {
                                                        setQty1(e.target.value);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    name="qty2"
                                                    placeholder="Qty 2"
                                                    value={qty2}
                                                    onChange={(e) => {
                                                        setQty2(e.target.value);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    name="qty3"
                                                    placeholder="Qty 3"
                                                    value={qty3}
                                                    onChange={(e) => {
                                                        setQty3(e.target.value);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    name="qty4"
                                                    placeholder="Qty 4"
                                                    value={qty4}
                                                    onChange={(e) => {
                                                        setQty4(e.target.value);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    name="qty5"
                                                    placeholder="Qty 5"
                                                    value={qty5}
                                                    onChange={(e) => {
                                                        setQty5(e.target.value);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    name="qty5"
                                                    placeholder="Qty 6"
                                                    value={qty6}
                                                    onChange={(e) => {
                                                        setQty6(e.target.value);
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                            <Label
                                                for="exampleEmail"
                                                sm={4}
                                            >
                                            Price
                                            </Label>
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    type="text"
                                                    name="price1"
                                                    placeholder="Price 1"
                                                    value={price1}
                                                    onChange={(e) => {
                                                        setPrice1(e.target.value);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    type="text"
                                                    name="price2"
                                                    placeholder="Price 2"
                                                    value={price2}
                                                    onChange={(e) => {
                                                        setPrice2(e.target.value);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    type="text"
                                                    name="price3"
                                                    placeholder="Price 3"
                                                    value={price3}
                                                    onChange={(e) => {
                                                        setPrice3(e.target.value);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    type="text"
                                                    name="price4"
                                                    placeholder="Price 4"
                                                    value={price4}
                                                    onChange={(e) => {
                                                        setPrice4(e.target.value);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    type="text"
                                                    name="price5"
                                                    placeholder="Price 5"
                                                    value={price5}
                                                    onChange={(e) => {
                                                        setPrice5(e.target.value);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    type="text"
                                                    name="price5"
                                                    placeholder="Price 6"
                                                    value={price6}
                                                    onChange={(e) => {
                                                        setPrice6(e.target.value);
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Label
                                                    for="exampleEmail"
                                                    sm={4}
                                                >
                                                    Margin (N)
                                                </Label>
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    name="margin1"
                                                    placeholder="Margin 1"
                                                    value={margin1}
                                                    onChange={(e) => {
                                                    setMargin1(e.target.value);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    name="margin2"
                                                    placeholder="Margin 2"
                                                    value={margin2}
                                                    onChange={(e) => {
                                                    setMargin2(e.target.value);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    name="margin3"
                                                    placeholder="Margin 3"
                                                    value={margin3}
                                                    onChange={(e) => {
                                                    setMargin3(e.target.value);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    name="margin4"
                                                    placeholder="Margin 4"
                                                    value={margin4}
                                                    onChange={(e) => {
                                                    setMargin4(e.target.value);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    name="margin5"
                                                    placeholder="Margin 5"
                                                    value={margin5}
                                                    onChange={(e) => {
                                                    setMargin5(e.target.value);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    name="margin5"
                                                    placeholder="Margin 6"
                                                    value={margin6}
                                                    onChange={(e) => {
                                                    setMargin6(e.target.value);
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Label
                                                    for="exampleEmail"
                                                    sm={4}
                                                >
                                                Margin %
                                                </Label>
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    name="Persentase1"
                                                    placeholder="Persentase 1"
                                                    value={persentase1}
                                                    onChange={(e) => {
                                                        setPersentase1(e.target.value);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    name="persentase2"
                                                    placeholder="Persentase 2"
                                                    value={persentase2}
                                                    onChange={(e) => {
                                                        setPersentase2(e.target.value);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    name="Persentase3"
                                                    placeholder="Persentase 3"
                                                    value={persentase3}
                                                    onChange={(e) => {
                                                        setPersentase3(e.target.value);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    name="Persentase4"
                                                    placeholder="Persentase 4"
                                                    value={persentase4}
                                                    onChange={(e) => {
                                                        setPersentase4(e.target.value);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    name="Persentase5"
                                                    placeholder="Persentase 5"
                                                    value={persentase5}
                                                    onChange={(e) => {
                                                        setPersentase5(e.target.value);
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Input
                                                    className="form-control-alternative"
                                                    name="Persentase5"
                                                    placeholder="Persentase 6"
                                                    value={persentase6}
                                                    onChange={(e) => {
                                                        setPersentase6(e.target.value);
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>
                                <div
                                style={{ display: "flex", justifyContent: "space-between" }}
                                >
                                <h3>Log Harga</h3>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <ToolkitProvider
                                    rowNumber={rowIndex}
                                    data={logPrice}
                                    keyField="id"
                                    columns={[
                                        {
                                        dataField: "no",
                                        text: "#",
                                        sort: true,
                                        page: 1,
                                        formatter: (cell, row, index) => {
                                            let currentRow = ++index;
                                            return currentRow + rowIndex;
                                        },
                                        },
                                        {
                                        dataField: "username",
                                        text: "Username",
                                        sort: true,
                                        },
                                        {
                                        dataField: "nominal_1",
                                        text: "Nominal 1",
                                        sort: true,
                                        formatter: (cell, row) => {
                                            return formatRupiah(row.nominal_1)
                                        }
                                        },
                                        {
                                        dataField: "nominal_2",
                                        text: "Nominal 2",
                                        sort: true,
                                        formatter: (cell, row) => {
                                            return formatRupiah(row.nominal_2)
                                        }
                                        },
                                        {
                                        dataField: "min_qty_1",
                                        text: "Minimal Qty 1",
                                        sort: true,
                                        },
                                        {
                                        dataField: "min_qty_2",
                                        text: "Minimal Qty 2",
                                        sort: true,
                                        },
                                        {
                                        dataField: "harga_beli",
                                        text: "Harga Beli",
                                        sort: true,
                                        formatter: (cell, row) => {
                                            return formatRupiah(row.harga_beli)
                                        }
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
                </CardBody>
              </Form>
          </div>
        </Row>
      </Container>
      </div>
    </>
  );
}