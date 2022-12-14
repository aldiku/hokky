"use strict";
import { StyleSheet } from "@react-pdf/renderer";

const stylePdf = StyleSheet.create({
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
    fontSize: 11,
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  flex: {
    flex: 1,
  },
  flexRow: {
    flexDirection: "row",
  },
  flexColumn: {
    flexDirection: "column",
  },
  itemsCenter: {
    alignItems: "center",
  },
  flexAround: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  flexBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  fs07: {
    fontSize: 7,
  },
  fs08: {
    fontSize: 8,
  },
  fs09: {
    fontSize: 9,
  },
  fs10: {
    fontSize: 10,
  },
  fs11: {
    fontSize: 11,
  },
  fs12: {
    fontSize: 12,
  },
  fs14: {
    fontSize: 14,
  },
  fs16: {
    fontSize: 16,
  },
  fs18: {
    fontSize: 18,
  },
  fs22: {
    fontSize: 22,
  },
  textMuted: {
    color: "#7E6767",
  },
  fwbold: {
    fontWeight: "bold",
  },
  textCenter: {
    alignContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  textRight: {
    alignContent: "right",
    alignItems: "right",
    textAlign: "right",
  },
  borderL: {
    borderLeftWidth: 1,
    borderColor: "#000",
  },
  borderR: {
    borderRightWidth: 1,
    borderColor: "#000",
  },
  border: {
    borderWidth: 1,
    borderColor: "#000",
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: "#000",
  },
  borderTop: {
    borderTopWidth: 1,
    borderColor: "#000",
  },
  borderX: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#000",
  },
  my1: {
    marginTop: 10,
    marginBottom: 10,
  },
  p02: {
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  px02: {
    paddingHorizontal: 2,
  },
  ml02: {
    marginLeft: 2,
  },
});

export default stylePdf;
