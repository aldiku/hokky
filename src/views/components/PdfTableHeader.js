import { Text, View } from "@react-pdf/renderer";
import s from "./stylePdf";

const PdfTableHeader = ({ data }) => {
  const rows = data.map((item, idx) => (
    <Text
      key={idx}
      style={[
        s.p02,
        s.textCenter,
        s.fs10,
        s.fwBold,
        idx == 0 ? "" : s.borderL,
        { width: `${item.width}` },
      ]}
    >
      {item.title}
    </Text>
  ));
  return (
    <View style={[s.flexRow, s.border, { backgroundColor: "#b1b1b1" }]}>
      {rows}
    </View>
  );
};

export default PdfTableHeader;
