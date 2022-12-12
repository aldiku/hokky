import React from "react";

export const ViewCetakSoKasir = React.forwardRef((props, ref) => {
    const formatRupiah = (money) => {
		return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(money);
	};
    return (
        <div style={{width:'300px', height:'400px'}} ref={ref}>
            <table border="0" style={{width:'100%'}}>
                <tbody>
                    <tr>
                        <td style={{width:'10%'}}><img alt="" src={process.env.PUBLIC_URL + '/Hokky1.png'} style={{height:'auto', width:'70px'}} /></td>
                        <td style={{textAlign:'left', fontStyle:'bold', fontSize:'20px', fontFamily:'Arial'}}>HOKKY BANGUNAN</td>
                    </tr>
                </tbody>
            </table>
            <p style={{fontSize:'14px', fontFamily:'Arial'}}>Jl. Raya Menganti Karangan No.38, Babatan, Kec. Wiyung, Kota SBY, Jawa Timur 60227</p>
            <hr/>						
            <table border="0" style={{width:'100%'}}>
                <tbody>
                    <tr>
                        <td style={{width:'20px', fontSize:'14px', fontFamily:'Arial'}}><strong>Id Pelanggan</strong></td>
                        <td style={{width:'20px', fontSize:'14px', fontFamily:'Arial'}}>:</td>
                        <td style={{width:'20px', fontSize:'14px', fontFamily:'Arial'}}>{props.customer}</td>
                    </tr>
                    <tr>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}><strong>Alamat Pelanggan</strong></td>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}>:</td>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}>{props.alamatcustomer}</td>
                    </tr>
                    <tr>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}><strong>Alamat Pengiriman</strong></td>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}>:</td>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}>{props.alamatlain}</td>
                    </tr>
                </tbody>
            </table>
            <hr/>						
            <table border="0" style={{width:'100%'}}>
                <thead>
                    <tr>
                        <th colSpan="3" scope="col" style={{textAlign:'left', fontStyle:'bold', fontSize:'14px', fontFamily:'Arial'}}>Detail Pembelian</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}>Nama Barang</td>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}>Jml</td>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}>Harga</td>
                    </tr>
                    {props.detailpembelian.map((itempembelian, key) => {return(
                        <tr key={key}>
                            <td style={{fontSize:'14px', fontFamily:'Arial'}}>{itempembelian.item_name}</td>
                            <td style={{fontSize:'14px', fontFamily:'Arial'}}>{itempembelian.qty}</td>
                            <td style={{fontSize:'14px', fontFamily:'Arial'}}>{formatRupiah(itempembelian.harga)}</td>
                        </tr>
                    )})};
                </tbody>
            </table>
            <hr/>						
            <table border="0" style={{width:'100%'}}>
                <tbody>
                    <tr>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}><strong>Total</strong></td>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}>:</td>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}>{props.total}</td>
                    </tr>
                    <tr>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}><strong>Diskon</strong></td>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}>:</td>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}>{props.diskon}</td>
                    </tr>
                    <tr>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}><strong>PPN</strong></td>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}>:</td>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}>{props.ppn}</td>
                    </tr>
                    <br/><tr>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}><strong>GRAND TOTAL</strong></td>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}>:</td>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}><strong>{props.grandtotal}</strong></td>
                    </tr><br/>
                    <tr>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}><strong>Dibayar</strong></td>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}>:</td>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}>{props.dibayar}</td>
                    </tr>
                    <tr>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}><strong>Kembali</strong></td>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}>:</td>
                        <td style={{fontSize:'14px', fontFamily:'Arial'}}>{props.kembali}</td>
                    </tr>
                </tbody>
            </table>
            <hr/>					
            <p>&nbsp;Terima Kasih Atas Kepercayaan Anda&nbsp;</p>
        </div>
    )
});

export const ViewCetakBuktiMasuk = React.forwardRef((props, ref) => {
    return (<></>)
});

export const ViewCetakDll = React.forwardRef((props, ref) => {
    return (<></>)
});