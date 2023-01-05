import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import { PDFViewer, Document, Page, Text, View } from "@react-pdf/renderer";
import s from "views/components/stylePdf";
import PdfKop from "views/components/PdfKop";
import PdfInfo from "views/components/PdfInfo";
import PdfTableHeader from "views/components/PdfTableHeader";
import PdfTableRow from "views/components/PdfTableRow";

const ModalCetakInvoicePo = ({ open, toggle, data }) => {
  const today = new Date();
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  const [isLoading, setLoading] = useState(false);
  const [harga, setHarga] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");
  const [pengiriman, setPengiriman] = useState([]);
  const [keterangan, setKeterangan] = useState("");
  const [qty, setQty] = useState(0);
  const [rowIndex, setRowIndex] = useState(0);
  const [codeinvoice, setCodeInvoice] = useState("");
  const [supplier, setSupplier] = useState("");
  const [validator, setValidator] = useState("");
  const [validator1, setValidator1] = useState("");
  const [waktu, setWaktu] = useState("");
  const [listItem, setListItem] = useState([]);
  const [cabang, setCabang] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentmethod, setPaymentMethod] = useState("");
  useEffect(() => {
    getById();
  }, []);

  const getById = () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}/invoice-po/cetak/${data.id}`,
        { headers }
      )
      .then((data) => {
        setCodeInvoice(data.data.response.invoicepo.invoice_code);
        setSupplier(data.data.response.invoicepo.supplier);
        setListItem(data.data.response.list);
        setCabang(data.data.response.invoicepo.warehouse);
        setPaymentMethod(data.data.response.invoicepo.payment_method);
        // setJangkaWaktu(data.data.response.invoicepo.jangka_waktu);
        setWaktu(data.data.response.invoicepo.created);
        // setWarehouseRfq(data.data.response.invoicepo.warehouse);
        setTotalPrice(data.data.response.invoicepo.price_total);
        setKeterangan(data.data.response.invoicepo.keterangan);
        // setOngkir(data.data.response.invoicepo.ongkir);
        // setLainnya(data.data.response.invoicepo.lainnya);
        setValidator(data.data.response.invoicepo.validator1);
        setValidator1(data.data.response.invoicepo.validator2);
        setListItem(data.data.response.list);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const formatRupiah = (money) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(money);
  };

  const PdfDokumen = () => (
    <Document>
      <Page size="A4" style={s.body}>
        <PdfKop />
        <View>
          <Text style={[s.textCenter, s.fs16, s.my1]}>INVOICE PO</Text>
          <View style={[s.flexBetween, s.my1]}>
            <View>
              <PdfInfo title="No Invoice" value={codeinvoice} />
              <PdfInfo title="Tanggal" value={waktu} />
              <PdfInfo title="Alamat Kirim" value="---------------" />
              <PdfInfo title="Keterangan" value={keterangan} />
            </View>
            <View>
              <PdfInfo title="Supplier" value={supplier} />
              <PdfInfo title="Alamat" value="---------------" />
              <PdfInfo title="Telephone" value="---------------" />
              <PdfInfo title="Npwp" value="---------------" />
            </View>
          </View>
        </View>
        <PdfTableHeader
          data={[
            {
              title: "No",
              width: "5%",
            },
            {
              title: "Barcode",
              width: "10%",
            },
            {
              title: "Nama",
              width: "35%",
            },
            {
              title: "Harga",
              width: "10%",
            },
            {
              title: "Qty",
              width: "5%",
            },
            {
              title: "Satuan",
              width: "10%",
            },
            {
              title: "Diskon (%)",
              width: "8%",
            },
            {
              title: "Diskon (N)",
              width: "8%",
            },
            {
              title: "Sub Total",
              width: "10%",
            },
          ]}
        />
        {listItem.map((item, index) => {
          return (
            <PdfTableRow
              key={index}
              data={[
                { title: index + 1, width: "5%" },
                { title: item.item_code, width: "10%" },
                { title: item.item_name, width: "35%", align: "left" },
                { title: formatRupiah(item.harga), width: "10%" },
                { title: item.qty, width: "5%" },
                { title: item.satuan, width: "10%" },
                { title: item.diskon_persen, width: "8%" },
                { title: item.diskon_nominal, width: "8%" },
                { title: formatRupiah(item.sub_total), width: "10%" },
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
            <PdfInfo title="Finance" value={validator} />
            <View style={s.my1} />
            <PdfInfo title="Signature" value="--------------" />
          </View>
          <View>
            <PdfInfo title="Direktur" value={validator1} />
            <View style={s.my1} />
            <PdfInfo title="Signature" value="--------------" />
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
        <PDFViewer
          className="w-100"
          style={{ minHeight: "400px" }}
          // showToolbar={false}
        >
          <PdfDokumen />
        </PDFViewer>
      </ModalBody>
    </Modal>
  );
};

export default ModalCetakInvoicePo;
