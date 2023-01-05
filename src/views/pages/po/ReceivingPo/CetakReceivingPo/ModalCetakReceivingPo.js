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

const ModalCetakReceivingPo = ({ open, toggle, data }) => {
  const today = new Date();
  const token = localStorage.token;
  const username = localStorage.username;
  const warehouse = localStorage.warehouse;
  const [isLoading, setLoading] = useState(true);
  const [harga, setHarga] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState("");
  const [pengiriman, setPengiriman] = useState([]);
  const [qty, setQty] = useState(0);
  const [savedItems, setSavedItems] = useState([]);
  const [codeso, setCodeSo] = useState("");
  const [usernamea, setUsernamea] = useState("");
  const [logo, setLogo] = useState();
  const [warehousename, setWarehouseName] = useState();
  const [creator, setCreator] = useState();
  const [codereceiving, setCodeReceiving] = useState();
  const [codepo, setCodePO] = useState();
  const [supplier, setSupplier] = useState();
  const [ongkir, setOngkir] = useState();
  const [lainnya, setLainnya] = useState();
  const [keterangan, setKeterangan] = useState();
  const [validator, setValidator] = useState();
  const [created, setCreated] = useState();
  const [countdown, setCountdown] = useState();
  const [rowIndex, setRowIndex] = useState(0);
  const [listItem, setListItem] = useState([]);
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
        `${process.env.REACT_APP_API_BASE_URL}/receiving-po/cetak/${data.id}`,
        { headers }
      )
      .then((data) => {
        setWarehouseName(data.data.response.receivingpo.warehouse);
        setLogo(data.data.response.receivingpo.logo);
        setCreator(data.data.response.receivingpo.creator);
        setCodeReceiving(data.data.response.receivingpo.receiving_code);
        setCodePO(data.data.response.receivingpo.code_po);
        setSupplier(data.data.response.receivingpo.supplier);
        setOngkir(data.data.response.receivingpo.ongkir);
        setLainnya(data.data.response.receivingpo.lainnya);
        setKeterangan(data.data.response.receivingpo.keterangan);
        setValidator(data.data.response.receivingpo.validator);
        setCreated(data.data.response.receivingpo.created);
        setCountdown(data.data.response.receivingpo.countdown);
        setListItem(data.data.response.list);
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
          <Text style={[s.textCenter, s.fs16, s.my1]}>RECEIVING PO</Text>
          <View style={[s.flexBetween, s.my1]}>
            <View>
              <PdfInfo title="Kode PO" value={codepo} />
              <PdfInfo title="Issuing Date" value={created} />
              <PdfInfo title="Kode Receiving" value={codereceiving} />
              <PdfInfo title="Keterangan" value={keterangan} />
            </View>
            <View>
              <PdfInfo title="Supplier Name" value={supplier} />
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
            <PdfInfo title="Kepala Gudang" value={validator} />
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

export default ModalCetakReceivingPo;
