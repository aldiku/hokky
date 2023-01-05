import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import { PDFViewer, Document, Page, Text, View } from "@react-pdf/renderer";
import s from "views/components/stylePdf";
import PdfKop from "views/components/PdfKop";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";
import PdfTableHeader from "views/components/PdfTableHeader";

const ModalCetakStokWarehouse = ({ open, toggle, data }) => {
  const token = localStorage.token;
  // const today = new Date();
  // const nama = localStorage.name;
  // const username = localStorage.username;
  const [warehouse, setWarehouse] = useState("");
  const [tw, setTw] = useState("");
  const [code, setCode] = useState("");
  const [cabang, setCabang] = useState("");
  const [waktu, setWaktu] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [manajer, setManajer] = useState("");
  const [direktur, setDirektur] = useState("");
  const [listItem, setListItem] = useState("");

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
        `${process.env.REACT_APP_API_BASE_URL}/transfer-warehouse/cetak/${data.id}`,
        { headers }
      )
      .then((data) => {
        setTw(data.data.response.tw.tw_code);
        setCode(data.data.response.tw.kode_cabang_penerima);
        setCabang(data.data.response.tw.nama_cabang_penerima);
        setWaktu(data.data.response.tw.created);
        setWarehouse(data.data.response.tw.warehouse);
        setKeterangan(data.data.response.tw.keterangan);
        setManajer(data.data.response.tw.manajer);
        setDirektur(data.data.response.tw.direktur);
        setListItem(data.data.response.list);
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
          <Text style={[s.textCenter, s.fs18, s.my1]}>
            TRANSFER ITEM ANTAR CABANG
          </Text>
          <View style={[s.flexBetween, s.my1]}>
            <View>
              <PdfInfo title="Kode TW" value={tw} />
              <PdfInfo title="Issuing Date" value={waktu} />
              <PdfInfo title="Keterangan" value={keterangan} />
            </View>
            <View>
              <PdfInfo title="Kode Cabang" value={code} />
              <PdfInfo title="Nama Cabang" value={cabang} />
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
            <PdfInfo title="Manajer" value={manajer} />
            <View style={s.my1} />
            <PdfInfo title="Signature" value="--------------" />
          </View>
          <View>
            <PdfInfo title="Direktur" value={direktur} />
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
      <ModalHeader toggle={toggle} align="center">
        <span>Cetak</span>
      </ModalHeader>
      <ModalBody>
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

export default ModalCetakStokWarehouse;
