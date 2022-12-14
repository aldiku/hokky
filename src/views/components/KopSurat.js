import { Table } from "reactstrap";
const KopSurat = ({ warehouseName }) => {
  return (
    <Table borderless cellPadding={1} cellSpacing="1" width={100}>
      <tbody>
        <tr>
          <td>
            <img
              style={{ width: "20%" }}
              src={require("assets/img/theme/Hokky1.png").default}
            />
          </td>
          <td style={{ fontSize: ".8em" }}>
            Head Office : {warehouseName}
            <br></br>
            Jl Menganti Karangan No.562 <br></br>
            Surabaya - Jawa Timur<br></br>
            Phone : 081 217 85 3300<br></br>
            Email : hokkybangunan.sby@gmail.com
          </td>
        </tr>
      </tbody>
    </Table>
  );
};
export default KopSurat;
