import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import { PDFViewer } from "@react-pdf/renderer";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import s from "views/components/stylePdf";
import PdfKop from "views/components/PdfKop";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

const ModalCetakStokWarehouse = ({ open, toggle, data }) => {
  const token = localStorage.token;
  const today = new Date();
  const nama = localStorage.name;
  const username = localStorage.username;
  const [tw, setTw] = useState("");
  const [code, setCode] = useState("");
  const [cabang, setCabang] = useState("");
  const [waktu, setWaktu] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [manajer, setManajer] = useState("");
  const [direktur, setDirektur] = useState("");
  const [listitem, setListItem] = useState("");

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
              <Text style={s.fs10}>Kode TW : {tw}</Text>
              <Text style={s.fs10}>Issuing Date : {waktu}</Text>
              <Text style={s.fs10}>Keterangan : {keterangan}</Text>
            </View>
            <View>
              <Text style={s.fs10}>Kode Cabang : {code}</Text>
              <Text style={s.fs10}>Nama Cabang : {cabang}</Text>
            </View>
          </View>
        </View>
        <Table data={listitem} style={s.my1}>
          <TableHeader textAlign={"center"}>
            <TableCell style={s.fs08}>#</TableCell>
            <TableCell style={s.fs08}>Nama Item</TableCell>
            <TableCell style={s.fs08}>Barcode</TableCell>
            <TableCell style={s.fs08}>Qty</TableCell>
            <TableCell style={s.fs08}>Satuan</TableCell>
          </TableHeader>
          <TableBody textAlign={"center"}>
            <DataTableCell getContent={(r) => r.no} style={s.fs08} />
            <DataTableCell getContent={(r) => r.item_name} style={s.fs08} />
            <DataTableCell
              getContent={(r) => r.barcode}
              style={[s.fs08, s.textCenter]}
            />
            <DataTableCell
              getContent={(r) => r.qty}
              style={[s.fs08, s.textCenter]}
            />
            <DataTableCell
              getContent={(r) => r.satuan}
              style={[s.fs08, s.textCenter]}
            />
          </TableBody>
        </Table>
        <View style={[s.flex, s.flexBetween, s.my1]}>
          <View>
            <Text style={s.fs10}>Manajer : {manajer}</Text>
            <Text style={s.fs10}>Signature : ---------------------------</Text>
          </View>
          <View>
            <Text style={s.fs10}>Direktur : {direktur}</Text>
            <Text style={s.fs10}>Signature : ---------------------------</Text>
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
        <PDFViewer className="w-100" style={{ minHeight: "400px" }}>
          <PdfDokumen />
        </PDFViewer>
      </ModalBody>
    </Modal>
  );
};

export default ModalCetakStokWarehouse;
