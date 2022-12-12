import React, { useEffect, useState } from 'react';

import { Page, Text, Document, StyleSheet, Image, View } from "@react-pdf/renderer";
import logo from '../../../../assets/img/brand/Hokky1.png'
import {Table, TableBody, TableCell, TableHeader,DataTableCell } from '@david.kucsai/react-pdf-table';
import axios from 'axios';


const s = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: "justify",
      fontFamily: "Times-Roman",
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
    flex: {
        flex: 1
    }, 
    flexRow: {
        flexDirection: 'row'
    },
    flexColumn: {
        flexDirection: 'column'
    },
    itemsCenter: {
        alignItems: 'center',
    },
    flexAround:{
        flexDirection:'row',
        justifyContent: 'space-around'
    }, 
    flexBetween:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
    },
    fs08:{
        fontSize: 8
    },
    fs10:{
        fontSize: 10
    },
    fs11:{
        fontSize: 11
    },
    fs16:{
        fontSize: 16
    },
    fs18:{
        fontSize: 18
    },
    fs22:{
        fontSize: 22
    },
    textMuted:{
        color:'#7E6767'
    },
    textCenter:{
        alignContent:'center',
        alignItems: 'center',
        textAlign:'center'
    },
    borderBottom:{
        borderBottomWidth: 1,
        borderColor: '#000'
    },
    my1:{
        marginTop: 10,
        marginBottom:10
    },
    px02:{
        paddingHorizontal: 2,
    },
    ml02:{
        marginLeft: 2,
    },
  });


const PdfReportSuratJalanTransfer = ({data}) => {
    const [allPenawaranSo, setAllPenawaranSo] = useState([]);
    const today = new Date();
    const nama = localStorage.name
    const warehouse = parseInt(localStorage.warehouse);
    const token = localStorage.token;
    useEffect(() => {
        getPenawaranSo(data.startdate='' ,data.enddate='');
        return () => {
            setAllPenawaranSo([]); 
        };
    }, []);

    async function getPenawaranSo( startdate = startdate, enddate = enddate) {
        let filter = { 
          per_page: 1000,
        //   status:2,
          warehouse_id : parseInt(warehouse),
        //   start_date : start,
        //   end_date : end,
        };
        if (startdate !== null) {
          filter = Object.assign(filter, { start_date: startdate })
        }
        if (enddate !== null) {
          filter = Object.assign(filter, { end_date: enddate })
        }
        const data = filter;
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        axios
          .post(`${process.env.REACT_APP_API_BASE_URL}/transfer-surat-jalan/page`, data, {
            headers,
          })
          .then((data) => {
            setAllPenawaranSo(data.data.response);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
    return (
    <Document>
        <Page style={s.body}>
        <View style={[s.flexBetween, s.itemsCenter]}>
            <View>
                <Image src={logo} style={{height: 80, width: 150}}/>
            </View>
            <View>
                <Text style={s.fs14}><b>Hokky Bangunan</b></Text>
                <Text style={s.fs08}>Jl Menganti Karangan No.562</Text>
                <Text style={s.fs08}>Surabaya - Jawa Timur</Text>
                <Text style={s.fs08}>Phone : 081 217 85 3300</Text>
                <Text style={s.fs08}>Email : hokkybangunan.sby@gmail.com</Text>
                {/* <Text style={s.fs11}>Telp: 085725361818</Text> */}
            </View>
        </View>
        <Text style={[s.textCenter,s.fs18,s.borderBottom, s.my1]}>Laporan Surat Jalan Transfer</Text>
        <View style={[s.flexBetween, s.my1]}>
            <View>
                <Text style={s.fs10}>Start Date : {(data.startdate != '') ? data.startdate : '' }</Text>
                <Text style={s.fs10}>End Date : {(data.enddate != '') ? data.enddate : '' }</Text>
            </View>
            <View>
                <Text style={s.fs10}>Nama : {nama}</Text>
                <Text style={s.fs10}>Tanggal Cetak : {today.toDateString()}</Text>
            </View>
        </View>
        <Table data={allPenawaranSo} style={s.my1}>
                <TableHeader textAlign={"center"}>
                    <TableCell style={s.fs08}>Tanggal</TableCell>
                    <TableCell style={s.fs08}>username</TableCell>
                    <TableCell style={s.fs08}>Kode Receiving</TableCell>
                    <TableCell style={s.fs08}>Kode Transfer</TableCell>
                    <TableCell weighting={0.3} style={s.fs08}>QTY</TableCell>
                    <TableCell style={s.fs08}>Keterangan</TableCell>
                </TableHeader>
                <TableBody  textAlign={"center"} >
                    <DataTableCell getContent={(r) => r.created_at}  style={s.fs08}/>
                    <DataTableCell getContent={(r) => r.username}  style={s.fs08}/>
                    <DataTableCell getContent={(r) => r.tr_code}  style={s.fs08}/>
                    <DataTableCell getContent={(r) => r.code_tw}  style={s.fs08}/>
                    <DataTableCell weighting={0.3} getContent={(r) => r.qty_total} style={[s.fs08,s.textCenter]}/>
                    <DataTableCell getContent={(r) => r.Keterangan}  style={s.fs08}/>
                </TableBody>
            </Table>
        <View style={[s.flex,s.flexBetween, s.my1]}>
            <View>
                <Text style={s.fs10}>Di Download Oleh : {nama}</Text>
            </View>
            <View>
                <Text style={s.fs10}>Tanggal Download : {today.toDateString()}</Text>
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
}

export default PdfReportSuratJalanTransfer;