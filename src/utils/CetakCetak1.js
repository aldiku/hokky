import React from "react";

export const ViewCetakSoKasir = React.forwardRef((props, ref) => {
    
    const formatRupiah = (money) => {
		return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(money);
	};

        const showdate= new Date();
        // const displaytoday=showdate.getDate()+'/'+(showdate.getMonth()+1)+'/'+showdate.getFullYear();
        const dt=showdate.toDateString();
        const displaytime=showdate.getHours()+':'+showdate.getMinutes()+':'+showdate.getSeconds();
        const a = "------------------------------------------------------------------------------"

    return (
                <center>
                <div style={{width:'500px', height:'auto', margin:'70px'}} ref={ref}>
                    <table border="0" style={{width:'80%'}}>
                        <tbody>
                                <tr>
                                    <td style={{width:'400%'}}><img alt="" src={process.env.PUBLIC_URL + '/Hokky1.png'} style={{height:'auto', width:'480px'}} /></td>
                                </tr>
                        </tbody>
                    </table>
                    <br></br>
                    {/* <p style={{fontSize:'20px', fontFamily:'Tahoma' , width:'80%'}}>Jl. Raya Menganti Karangan No.38, Babatan, Kec. Wiyung, Kota SBY, Jawa Timur 60227</p> */}
                    <table border="0" style={{width:'100%'}}>
                        <tbody>
                                <tr>
                                    <td style={{fontSize:'20px', fontFamily:'Tahoma' , width:'80%' , textAlign:'center'}}>Jl. Raya Menganti Karangan No.562, Babatan, Kec. Wiyung, Kota SBY, Jawa Timur 60227</td>
                                </tr>
                        </tbody>
                    </table>
                    {/*<hr/>*/}
                    {a}
                    <table border="0" style={{width:'90%'}}>
                        <tbody>
                            <tr>
                                <td style={{width:'1px', fontSize:'17px', fontFamily:'Tahoma', textAlign:'left'}}><strong>{dt}-{displaytime}</strong></td>
                                <td style={{width:'1px', fontSize:'17px', fontFamily:'Tahoma',textAlign:'left'}}></td>
                                <td style={{width:'1px', fontSize:'17px', fontFamily:'Tahoma',textAlign:'right'}}></td>
                                <td style={{width:'1px', fontSize:'17px', fontFamily:'Tahoma',textAlign:'right'}}><b>Kasir :</b> {props.kasir}</td>
                            </tr>
                        </tbody>
                    </table>
                    {/*<hr/>*/}
                    {a}
                    <table border="0" style={{width:'90%'}}>
                        <tbody>
                            <tr>
                                <td style={{width:'20px', fontSize:'20px', fontFamily:'Tahoma'}}><strong>Customer</strong></td>
                                <td style={{width:'5px', fontSize:'20px', fontFamily:'Tahoma'}}>:</td>
                                <td style={{width:'20px', fontSize:'20px', fontFamily:'Tahoma'}}>{props.namacustomer}</td>
                                <td style={{width:'20px', fontSize:'20px', fontFamily:'Tahoma'}}></td>
                            </tr>
                            <tr>
                                <td style={{fontSize:'20px', fontFamily:'Tahoma'}}><strong>Alamat</strong></td>
                                <td style={{fontSize:'20px', fontFamily:'Tahoma'}}>:</td>
                                <td style={{fontSize:'20px', fontFamily:'Tahoma'}}>{props.alamatcustomer}</td>
                                <td style={{fontSize:'20px', fontFamily:'Tahoma'}}></td>
                            </tr>
                            <tr>
                                <td style={{fontSize:'20px', fontFamily:'Tahoma'}}><strong>Pengiriman</strong></td>
                                <td style={{fontSize:'20px', fontFamily:'Tahoma'}}>:</td>
                                <td style={{fontSize:'20px', fontFamily:'Tahoma'}}>{props.alamatlain}</td>
                                <td style={{fontSize:'20px', fontFamily:'Tahoma'}}></td>
                            </tr>
                        </tbody>
                    </table>			
                    {/* <hr/> */}
                    {a}
                    <table cellpadding="7" border="0" style={{width:'90%'}} >
                        <tbody>
                            <tr>
                                <td style={{fontSize:'20px', fontFamily:'Tahoma', textAlign:'left'}}>Item</td>
                                <td style={{fontSize:'20px', fontFamily:'Tahoma', textAlign:'right'}}>Qty</td>
                                <td style={{fontSize:'20px', fontFamily:'Tahoma' , textAlign:'right'}}>Harga</td>
                            </tr>
                            {props.detailpembelian.map((itempembelian, key) => {return(
                                <tr key={key}>
                                    <td style={{fontSize:'20px', fontFamily:'Tahoma',  textAlign:'left'}}>{itempembelian.item_name}</td>
                                    <td style={{fontSize:'20px', fontFamily:'Tahoma', textAlign:'center'}}>{itempembelian.qty}</td>
                                    <td style={{fontSize:'20px', fontFamily:'Tahoma', textAlign:'right'}}>{formatRupiah(itempembelian.harga)}</td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                    {/*<hr/>*/}
                    {a}
                    <table border="0" style={{width:'90%'}}>
                        <tbody>
                            <tr>
                                <td style={{textAlign:'right', fontSize:'20px', fontFamily:'Tahoma'}}><strong>Total</strong></td>
                                <td style={{textAlign:'right', fontSize:'20px', fontFamily:'Tahoma'}}>:</td>
                                <td style={{textAlign:'right', fontSize:'20px', fontFamily:'Tahoma'}}>{props.total}</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'right',fontSize:'20px', fontFamily:'Tahoma'}}><strong>Diskon</strong></td>
                                <td style={{textAlign:'right',fontSize:'20px', fontFamily:'Tahoma'}}>:</td>
                                <td style={{textAlign:'right',fontSize:'20px', fontFamily:'Tahoma'}}>{props.diskon}</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'right',fontSize:'20px', fontFamily:'Tahoma'}}><strong>PPN</strong></td>
                                <td style={{textAlign:'right',fontSize:'20px', fontFamily:'Tahoma'}}>:</td>
                                <td style={{textAlign:'right',fontSize:'20px', fontFamily:'Tahoma'}}>{props.ppn}</td>
                            </tr>
                            <br/><tr>
                                <td style={{textAlign:'right',fontSize:'20px', fontFamily:'Tahoma'}}><strong>GRAND TOTAL</strong></td>
                                <td style={{textAlign:'right',fontSize:'20px', fontFamily:'Tahoma'}}>:</td>
                                <td style={{textAlign:'right',fontSize:'20px', fontFamily:'Tahoma'}}><strong>{props.grandtotal}</strong></td>
                            </tr><br/>
                            <tr>
                                <td style={{textAlign:'right',fontSize:'20px', fontFamily:'Tahoma'}}><strong>{props.namapaymentmethod}</strong></td>
                                <td style={{textAlign:'right',fontSize:'20px', fontFamily:'Tahoma'}}>:</td>
                                <td style={{textAlign:'right',fontSize:'20px', fontFamily:'Tahoma'}}>{props.dibayar}</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'right',fontSize:'20px', fontFamily:'Tahoma'}}><strong>Kembali</strong></td>
                                <td style={{textAlign:'right',fontSize:'20px', fontFamily:'Tahoma'}}>:</td>
                                <td style={{textAlign:'right',fontSize:'20px', fontFamily:'Tahoma'}}>{props.kembali}</td>
                            </tr>
                        </tbody>
                    </table>
                    {/*<hr/>*/}
                    {a}
                    <table border="0" style={{width:'90%'}}>
                        <tbody>
                            <tr>
                                <td style={{textAlign:'center', fontSize:'20px', fontFamily:'Tahoma'}}>Terima Kasih atas Kunjungan Anda</td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'center',fontSize:'20px', fontFamily:'Tahoma'}}>PT. HOKKY SUMBER MAKMUR  </td>
                            </tr>
                            <tr>
                                <td style={{textAlign:'center',fontSize:'20px', fontFamily:'Tahoma'}}>96.260.943.4-618.000</td>
                            </tr>
                            <br/>
                            <tr>
                                <td style={{textAlign:'center',fontSize:'20px', fontFamily:'Tahoma'}}><strong>MENYEDIAKAN JASA APLIKATOR LEBIH HEMAT DAN BERGARANSI</strong></td>
                            </tr>
                            <br/>
                        </tbody>
                    </table>
                </div>
                </center>
            )
        })

export const ViewCetakBuktiMasuk = React.forwardRef((props, ref) => {
    return (<></>)
});

export const ViewCetakDll = React.forwardRef((props, ref) => {
    return (<></>)
});