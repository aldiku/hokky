import { Text, View } from "@react-pdf/renderer";
import s from "./stylePdf";

const PdfTableRow = ({ data }) => {
  const rows = data.map((item, idx) => (
    <Text
      key={idx}
      style={[
        s.p02,
        item.align == "right"
          ? s.textRight
          : item.align == "left"
          ? ""
          : s.textCenter,
        s.fs09,
        s.fwBold,
        idx == 0 ? "" : s.borderL,
        { width: `${item.width}` },
      ]}
    >
      {item.title}
    </Text>
  ));
  return <View style={[s.flexRow, s.borderX, s.borderBottom]}>{rows}</View>;
};

export default PdfTableRow;
