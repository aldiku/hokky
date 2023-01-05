import { Text, View } from "@react-pdf/renderer";
import s from "./stylePdf";

const PdfInfo = ({ title, value }) => {
  return (
    <View style={s.flexRow}>
      <Text style={[s.fs10, { width: "35%" }]}>{title}</Text>
      <Text style={[s.fs10]}>: {value}</Text>
    </View>
  );
};

export default PdfInfo;
