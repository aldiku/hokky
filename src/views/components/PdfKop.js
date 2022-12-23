import { Text, Image, View } from "@react-pdf/renderer";
import logo from "../../assets/img/brand/Hokky1.png";
import s from "./stylePdf";

const KopPdf = () => {
  return (
    <View style={[s.flexBetween, s.itemsCenter, s.borderBottom]}>
      <View>
        <Image src={logo} style={{ height: 60, width: 130 }} />
      </View>
      <View>
        <Text style={s.fs14}>
          <b>Hokky Bangunan</b>
        </Text>
        <Text style={s.fs08}>Jl Menganti Karangan No.562</Text>
        <Text style={s.fs08}>Surabaya - Jawa Timur</Text>
        <Text style={s.fs08}>Phone : 081 217 85 3300</Text>
        <Text style={s.fs08}>Email : hokkybangunan.sby@gmail.com</Text>
      </View>
    </View>
  );
};

export default KopPdf;
