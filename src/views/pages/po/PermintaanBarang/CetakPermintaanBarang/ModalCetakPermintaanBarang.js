import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import { PDFViewer, Document, Page, Text, View } from "@react-pdf/renderer";
import s from "views/components/stylePdf";
import PdfKop from "views/components/PdfKop";
import PdfInfo from "views/components/PdfInfo";
import PdfTableHeader from "views/components/PdfTableHeader";
import PdfTableRow from "views/components/PdfTableRow";
import CircularProgress from "@mui/material/CircularProgress";

const ModalCetakPermintaanBarang = ({ open, toggle, data }) => {
  const today = new Date();
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  const [isLoading, setLoading] = useState(true);
  const [savedItems, setSavedItems] = useState([]);
  const [usernamea, setUsernamea] = useState("");
  const [address, setAddress] = useState("");
  const [warehouserfq, setWarehouseRfq] = useState("");
  const [codepo, setCodePo] = useState("");
  const [payment_method, setPaymentMethod] = useState([]);
  const [keterangan, setKeterangan] = useState("");
  const [supplier, setSupplier] = useState("");
  const [jangkaWaktu, setJangkaWaktu] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [coderfq, setCodeRfq] = useState("");
  const [ongkir, setOngkir] = useState(0);
  const [lainnya, setLainnya] = useState(0);
  const [listItem, setListItem] = useState([]);
  const [waktu, setWaktu] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [validator, setValidator] = useState("");

  useEffect(() => {
    getById();
  }, []);

  const getById = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/rfq-po/cetak/${data.id}`, {
        headers,
      })
      .then((data) => {
        // const rfqpo = data.data.response.rfq-po
        // const listitem = data.data.response.list
        setListItem(data.data.response.list);
        setCodeRfq(data.data.response.rfqpo.rfq_code);
        setWarehouseRfq(data.data.response.rfqpo.warehouse);
        setSupplier(data.data.response.rfqpo.supplier);
        setPaymentMethod(data.data.response.rfqpo.payment_method);
        setJangkaWaktu(data.data.response.rfqpo.jangka_waktu);
        setWaktu(data.data.response.rfqpo.created);
        setValidator(data.data.response.rfqpo.validator);
        setTotalPrice(data.data.response.rfqpo.price_total);
        setKeterangan(data.data.response.rfqpo.keterangan);
        setOngkir(data.data.response.rfqpo.ongkir);
        setLainnya(data.data.response.rfqpo.lainnya);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const PdfDokumen = () => (
    <Document>
      <Page size="A4" style={s.body}>
        <PdfKop />
        <View>
          <Text style={[s.textCenter, s.fs16, s.my1]}>RFQ</Text>
          <View style={[s.flexBetween, s.my1]}>
            <View>
              <PdfInfo title="Kode RFQ" value={coderfq} />
              <PdfInfo title="Issuing Date" value={waktu} />
              <PdfInfo title="Warehouse" value={warehouserfq} />
              <PdfInfo title="Keterangan" value={keterangan} />
            </View>
            <View>
              <PdfInfo title="Supplier Name" value={supplier} />
              <PdfInfo title="Address" value={address} />
              <PdfInfo title="Telephone" value="-" />
              <PdfInfo title="Email" value="-" />
              <PdfInfo title="Name Sales" value={usernamea} />
              <PdfInfo title="Npwp" value="-" />
            </View>
          </View>
        </View>
        <PdfTableHeader
          data={[
            {
              title: "No",
              width: "7%",
            },
            {
              title: "Barcode",
              width: "18%",
            },
            {
              title: "Nama",
              width: "45%",
            },
            {
              title: "Qty",
              width: "15%",
            },
            {
              title: "Satuan",
              width: "15%",
            },
          ]}
        />
        {listItem.map((item, index) => {
          return (
            <PdfTableRow
              key={index}
              data={[
                { title: index + 1, width: "7%" },
                { title: item.item_code, width: "18%" },
                { title: item.item_name, width: "45%", align: "left" },
                { title: item.qty, width: "15%" },
                { title: item.satuan, width: "15%" },
              ]}
            />
          );
        })}
        <View>
          <Text style={[s.my1, s.textCenter, s.fs10]}>
            Terms of Price, delivery & shipping required
          </Text>
        </View>
        <View style={[s.flexBetween, s.my1]}>
          <View>
            <PdfInfo title="Purchasing Head" value={validator} />
            <View style={s.my1} />
            <PdfInfo title="Signature" value="--------------" />
          </View>
          <View>
            {/* <PdfInfo title="Direktur" value={direktur} />
              <View style={s.my1}/>
              <PdfInfo title="Signature" value='--------------' /> */}
          </View>
        </View>

        <Text
          style={s.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>
    </Document>
  );

  return (
    <Modal isOpen={open} toggle={toggle} style={{ minWidth: "70%" }}>
      <ModalHeader toggle={toggle} align="center" className="w-100">
        <div className="w-100 d-flex justify-content-between">
          <span>Cetak Dokumen</span>
        </div>
      </ModalHeader>
      <ModalBody className="p-0">
        {isLoading ? (
          <View style={s.textCenter}>
            <CircularProgress color="inherit" size={20} />
          </View>
        ) : (
          <PDFViewer
            className="w-100"
            style={{ minHeight: "500px" }}
            // showToolbar={false}
          >
            <PdfDokumen />
          </PDFViewer>
        )}
      </ModalBody>
    </Modal>
  );
};

export default ModalCetakPermintaanBarang;
