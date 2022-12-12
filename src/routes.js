
/*!

=========================================================
* Argon Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Login from "views/pages/login/Index.js";
import Dashboard from "views/pages/dashboard/Index.js";
import Users from "views/pages/user/Index2.js";
import CreateUser from "views/pages/user/Create.js";
import EditUser from "views/pages/user/Edit2.js";
import EditPrivileges from "views/pages/user/privileges/Edit.js";

import karyawanbaru from "views/pages/karyawanbaru/Index"
import CreateKaryawanBaru from "views/pages/karyawanbaru/Create";

import Alamat from "views/pages/address/Index.js";
import CreateAlamat from "views/pages/address/Create.js";
import EditAlamat from "views/pages/address/Edit.js";

import Aplikator from "views/pages/aplikator/Index";
import CreateAplikator from "views/pages/aplikator/Create.js";

import Account from "views/pages/account/Index.js";
import CreateAccount from "views/pages/account/Create.js";
import EditAccount from "views/pages/account/Edit.js";

import Bank from "views/pages/bank/Index2";
import CreateBank from "views/pages/bank/Create";
import EditBank from "views/pages/bank/Edit";

import Asset from "views/pages/asset/Index.js";
import CreateAsset from "views/pages/asset/Create.js";
import EditAsset from "views/pages/asset/Edit.js";

import TypeAsset from "views/pages/asset/type/Index.js";
import CreateTypeAsset from "views/pages/asset/type/Create.js";
import EditTypeAsset from "views/pages/asset/type/Edit.js";

import Absen from "views/pages/absen/Index.js";

import Uom from "views/pages/satuan/Index.js";
import CreateUom from "views/pages/satuan/Create";
import EditUom from "views/pages/satuan/Edit.js";

import Customer from "views/pages/Customer/Index.js";
import CreateCustomer from "views/pages/Customer/Create.js";
import EditCustomer from "views/pages/Customer/Edit2.js";

import Coa from "views/pages/coa/Index.js";
import CreateCoa from "views/pages/coa/Create.js";
import EditCoa from "views/pages/coa/Edit.js";

// import Reason from "views/pages/reason/Index.js";
// import CreateReason from "views/pages/reason/Create.js";

// import Item from "views/pages/item/Index.js";
import CreateItem from "views/pages/item/itemMain/Create.js";
import EditItem from "views/pages/item/itemMain/Edit3";
import ItemIndex from "views/pages/item/itemMain/ItemIndex.js";
import DetailItems from "views/pages/item/itemMain/detail/Index.js";

import ItemCategory from "views/pages/item/itemCategory/Index.js";
import CreateItemCategory from "views/pages/item/itemCategory/Create.js";
import EditItemCategory from "views/pages/item/itemCategory/Edit.js";

// import Warehouse from "views/pages/warehouse/index.js";
// import warehousepusat from "views/pages/warehouse/WarehousePusat/Index.js";
import EditWarehousePusat from "views/pages/warehouse/WarehousePusat/Edit.js";

import warehousetoko from "views/pages/warehouse/WarehouseToko/Index.js";
// import CreateWarehouseToko from "views/pages/warehouse/WarehouseToko/Create.js";
import EditWarehouseToko from "views/pages/warehouse/WarehouseToko/Edit.js";

import warehousegudang from "views/pages/warehouse/WarehouseGudang/Index.js";
// import CreateWarehouseGudang from "views/pages/warehouse/WarehouseGudang/Create.js";
import EditWarehouseGudang from "views/pages/warehouse/WarehouseGudang/Edit.js";

//warehouse pusat
import WarehousePusat from "views/pages/warehousePusat/Index.js";
import CreateAll from "views/pages/warehousePusat/AllCreate"
import CreateWarehousePusat from "views/pages/warehousePusat/Create.js";
import CreateWarehouseToko from "views/pages/warehouseToko/Create.js";
import CreateWarehouseGudang from "views/pages/warehouseGudang/Create.js";
import EditWarehouseaAll from "views/pages/warehousePusat/Edit"

//warehouse All
import WarehousePagePusat from "views/pages/warehouseAll/Index1.js"
import WarehousePageToko from "views/pages/warehouseAll/Index2.js"
import WarehousePageGudang from "views/pages/warehouseAll/Index3.js"

import ItemSubCategory from "views/pages/item/itemSubCategory/Index.js";
import CreateItemSubCategory from "views/pages/item/itemSubCategory/Create.js";

import Pelunasan from "views/pages/so/PelunasanKasir/Index.js"
import PelunasanEdit from "views/pages/so/PelunasanKasir/Edit"

import ItemFunction from "views/pages/item/itemFunction/Index.js";
import CreateItemFunction from "views/pages/item/itemFunction/Create.js";

import ItemSubFunction from "views/pages/item/itemSubFunction/Index.js";
import CreateItemSubFunction from "views/pages/item/itemSubFunction/Create.js";

import ItemMerek from "views/pages/item/itemMerek/Index.js";
import CreateItemMerek from "views/pages/item/itemMerek/Create.js";

import ItemSubMerek from "views/pages/item/itemSubMerek/Index.js";
import CreateItemSubMerek from "views/pages/item/itemSubMerek/Create.js";

import ItemGrade from "views/pages/item/itemGrade/Index.js";
import CreateItemGrade from "views/pages/item/itemGrade/Create.js";

// import Karyawan from "views/pages/karyawan/Index.js";
// import CreateKaryawan from "views/pages/karyawan/Create.js";
import EditKaryawan from "views/pages/karyawanbaru/Edit.js";

// import Komisi from "views/pages/komisi/Index.js";

import Salary from "views/pages/salary/Index.js";

import Person from "views/pages/person/Index2.js";
import CreatePerson from "views/pages/person/Create.js";
import EditPerson from "views/pages/person/Edit2";

import Pajak from "views/pages/pajak/Index.js";
import CreatePajak from "views/pages/pajak/Create.js";
import EditPajak from "views/pages/pajak/Edit.js";

import Rak from "views/pages/Rak/Index2.js";
import CreateRak from "views/pages/Rak/Create";
import EditRak from "views/pages/Rak/Edit.js";

import Po from "views/pages/po/Index.js";

import ValidasiPo from "views/pages/po/ValidasiPo/Index.js";
import EditValidasiPo from "views/pages/po/ValidasiPo/Edit.js";

import AdminApprove from "views/pages/po/AdminApprove/Index.js";
import EditAdminApprove from "views/pages/po/AdminApprove/Edit.js";

import ValidatorPo from "views/pages/po/ValidatorPo/Index.js";
import EditValidatorPo from "views/pages/po/ValidatorPo/Edit.js";
import CetakPO from "views/pages/po/CetakPo/Cetak";
import DetailPO from "views/pages/po/CetakPo/Detail";

import ReceivingPO from "views/pages/po/ReceivingPo/Index.js";
import CreateReceivingPO from "views/pages/po/ReceivingPo/ReceivingPo/Create.js";
import CetakCetakReceivingPO from "views/pages/po/ReceivingPo/ReceivingPo/Cetak";
import EditReceivingPO from "views/pages/po/ReceivingPo/ReceivingPo/Edit.js";
import DetailReceivingPO from "views/pages/po/ReceivingPo/ReceivingPo/Detail.js";
import CetakReceivingPo from "views/pages/po/ReceivingPo/CetakReceivingPo/Cetak";
import DetailCetakReceivingPO from "views/pages/po/ReceivingPo/CetakReceivingPo/Detail";

import ValidasiReceivingPO from "views/pages/po/ReceivingPo/ValidasiReceivingPo/Edit.js";

import So from "views/pages/so/Index.js";

import ValidasiSo from "views/pages/so/ValidasiSo/Index.js";
import EditValidasiSo from "views/pages/so/ValidasiSo/Edit.js";

import AdminApproveSo from "views/pages/so/AdminApprove/Index.js";
import EditAdminApproveSo from "views/pages/so/AdminApprove/Edit.js";

import PimpinanSo from "views/pages/so/ValidatorSo/Index.js";
import EditPimpinanSo from "views/pages/so/ValidatorSo/Edit.js";

import CetakSo from "views/pages/so/CetakSo/Cetak";

import CreateSo from "views/pages/so/Create.js";
import EditSo from "views/pages/so/Edit.js";

// import SoKasir from "views/pages/so/soKasir/Create.js";
import SoKasir from "views/pages/so/soKasirBaru/Index8";
// import CetakSoKasir from "views/pages/so/soKasirBaru/Cetak";

import KasirSettlement from "views/pages/so/Kasir/Index.js";
import CreateKasirSettlement from "views/pages/so/Kasir/Create.js";
import DetailKasirSettlement from "views/pages/so/Kasir/Detail.js";

// import ClosingKasir from "views/pages/so/ClosingKasir/Index";
import DetailClosingKasir from "views/pages/so/ClosingKasir/Detail";

import Opname from "views/pages/opname/Index";
import CreateOpname from "views/pages/opname/Opname/Create";
import EditOpname from "views/pages/opname/Opname/Edit";
import ValidasiDirekturOpname from "views/pages/opname/ValidasiDirekturOpname/Edit";
import CetakStokOpname from "views/pages/opname/CetakOpname/Cetak";

import Adjustment from "views/pages/adjustment/Index.js";
import CreateAdjustment from "views/pages/adjustment/Adjustment/Create.js";
import EditAdjustment from "views/pages/adjustment/Adjustment/Edit1";
import ValidasiAdjustment from "views/pages/adjustment/ValidasiDirekturAdj/Edit.js";
import CetakAdjustment from "views/pages/adjustment/CetakAdjustment/Cetak";

import Promo from "views/pages/promo/Index.js";
import CreatePromo from "views/pages/promo/PromoItem/Create";
import CreatePromo1 from "views/pages/promo/PromoKategori/Create";
import CreatePromo2 from "views/pages/promo/PromoTransaksi/Create";
import EditPromo from "views/pages/promo/Edit.js";

import DetailKartuStok from "views/pages/itemStock/StockPribadi/KartuStok";
import DetailItemStok from "views/pages/itemStock/StockPribadi/SemuaStok";
import ItemStock from "views/pages/itemStock/Index.js";

import salesCanvasing from "views/pages/salesCanvasing/Index.js";
import HistorysalesCanvasing from "views/pages/salesCanvasing/History.js";
// import SalesTarcking from "views/pages/salesCanvasing/salesTrack/Index.js";

import TransferStockWarehouse from "views/pages/transferstokwarehouse/Index.js";
import CreateTransferStockWarehouse from "views/pages/transferstokwarehouse/transferstokwarehouse/Create.js";
import EditTransferStockWarehouse from "views/pages/transferstokwarehouse/transferstokwarehouse/Edit.js";
import DetailTransferStockWarehouse from "views/pages/transferstokwarehouse/CetakTranferStokWarehouse/Detail.js";
import ValidasiKepalaTokoTSW from "views/pages/transferstokwarehouse/ValidasiKepalaToko/Edit.js";
import ValidasiDirekturTSW from "views/pages/transferstokwarehouse/ValidasiDirektur/Edit";

// import Jurnal from "views/pages/jurnal/Index.js";
// import CreateJurnal from "views/pages/jurnal/Create.js";

import {
  UpdateImage,
  UploadImage,
  MainList,
  UpdateBanner,
  UploadBanner,
} from "views/pages/admin";

import MainJangka  from "views/pages/jangkaWaktu/Index";
import CreateJangkaWaktu from "views/pages/jangkaWaktu/Create";
import EditJangkaWaktu from "views/pages/jangkaWaktu/Edit";

import UpdateImageItem from "views/pages/admin/UpdateImageItem";

import PermintaanBarang from "views/pages/po/PermintaanBarang/Index.js";
import CreatePermintaanBarang from "views/pages/po/PermintaanBarang/PermintaanBarang/Create.js"
import EditPermintaanBarang from "views/pages/po/PermintaanBarang/PermintaanBarang/Edit.js";
import DetailPermintaanBarang from "views/pages/po/PermintaanBarang/PermintaanBarang/Detail.js";
import ValidasiPermintaanBarang from "views/pages/po/PermintaanBarang/ValidasiPermintaanBarang/Index.js";
import EditValidasiPermintaanBarang from "views/pages/po/PermintaanBarang/ValidasiPermintaanBarang/Edit.js";
import CetakPermintaanBarang from "views/pages/po/PermintaanBarang/CetakPermintaanBarang/Cetak";
import DetaiPermintaanCetak from "views/pages/po/PermintaanBarang/CetakPermintaanBarang/Detail";

import CreatePenawaranPo from "views/pages/po/PenawaranPo/Create.js";
import EditPenawaranPo from "views/pages/po/PenawaranPo/Edit.js";
import DetailPenawaranPo from "views/pages/po/PenawaranPo/Detail";

import MemoKurirPO from "views/pages/po/MemoKurirPo/Index.js";
import CreateMemoKurirPO from "views/pages/po/MemoKurirPo/MemoKurirPo/Create";
import DetailMemoKurirPO from "views/pages/po/MemoKurirPo/MemoKurirPo/Detail";
import ValidasiAdminPoo from "views/pages/po/MemoKurirPo/ValidasiAdminPo/Edit";
import CetakMemoPo from "views/pages/po/MemoKurirPo/CetakMemo/Cetak";
import DetailMemoCetak from "views/pages/po/MemoKurirPo/CetakMemo/Detail";

import InvoicePO from "views/pages/po/InvoicePo/Index.js";
import CreateInvoicePO from "views/pages/po/InvoicePo/InvoicePo/Create.js";
import EditInvoicePO from "views/pages/po/InvoicePo/InvoicePo/Edit.js";
import DetailInvoicePO from "views/pages/po/InvoicePo/InvoicePo/Detail";
import CetakInvoicePO from "views/pages/po/InvoicePo/CetakInvoice/Cetak";
import DetailInvoicee from "views/pages/po/InvoicePo/CetakInvoice/Detail";

import ValidasiAdminFinance from "views/pages/po/InvoicePo/ValidasiAdminFinance/Edit.js";
import ValidasiPimpinan from "views/pages/po/InvoicePo/ValidasiPimpinan/Edit.js";

import BuktiKasKeluar from "views/pages/po/BuktiKasKeluar/Index.js";
import CreateBuktiKasKeluar from "views/pages/po/BuktiKasKeluar/BuktiKasKeluar/Create.js";
import DetailBuktiKasKeluar from "views/pages/po/BuktiKasKeluar/BuktiKasKeluar/Detail.js";
import ValidasiAdminFinanceBkk from "views/pages/po/BuktiKasKeluar/ValidasiKepalaFinance/Edit.js";
import ValidasiDirekturBkk from "views/pages/po/BuktiKasKeluar/ValidasiPimpinan/Edit.js";

import BuktiKasMasuk from "views/pages/so/BuktiKasMasuk/Index.js";
import CreateBuktiKasMasuk from "views/pages/so/BuktiKasMasuk/BuktiKasMasuk/Create.js";
import DetailBuktiKasMasuk from "views/pages/so/BuktiKasMasuk/BuktiKasMasuk/Detail.js";
import ValidasiAdminFinanceBkm from "views/pages/so/BuktiKasMasuk/ValidasiAdminFinance/Edit.js";
import ValidasiDirekturBkm from "views/pages/so/BuktiKasMasuk/ValidasiDirekturBKM/Edit.js";

import PermintaanBarangSo from "views/pages/so/PermintaanBarang/Index.js";
import CreatePermintaanBarangSo from "views/pages/so/PermintaanBarang/PermintaanBarang/Create.js";
import DetailPermintaanBarangSo from "views/pages/so/PermintaanBarang/PermintaanBarang/Detail.js";

import EditPermintaanBarangSo from "views/pages/so/PermintaanBarang/PermintaanBarang/Edit.js";
import ValidasiPermintaanBarangSo from "views/pages/so/PermintaanBarang/ValidasiPermintaanBarang/Index.js";
import EditValidasiPermintaanBarangSo from "views/pages/so/PermintaanBarang/ValidasiPermintaanBarang/Edit.js";

import CreatePenawaranSo from "views/pages/so/PenawaranSo/Create.js"
import EditPenawaranSo from "views/pages/so/PenawaranSo/Edit.js";
import DetailPenawaranSo from "views/pages/so/PenawaranSo/Detail.js";

import SuratJalanSo from "views/pages/so/SuratJalanSo/Index.js";
import CreateSuratJalanSo from "views/pages/so/SuratJalanSo/SuratJalanSo/Create.js";
import EditSuratJalanSo from "views/pages/so/SuratJalanSo/SuratJalanSo/Edit.js";
import CetakCetakSuratJalanSo from "views/pages/so/SuratJalanSo/SuratJalanSo/Cetak";
import DetailSuratJalanSo from "views/pages/so/SuratJalanSo/SuratJalanSo/Detail.js";
import ValidasiSuratJalanSo from "views/pages/so/SuratJalanSo/ValidasiSuratJalanSo/Edit.js";
import CetakSuratJalan from "views/pages/so/SuratJalanSo/CetakSuratJalan/Cetak.js";

import SuratJalanKasir from "views/pages/so/SuratJalanKasir/Index.js";
import CreateSuratJalanKasir from "views/pages/so/SuratJalanKasir/SuratJalanKasir/Create.js";
import EditSuratJalanKasir from "views/pages/so/SuratJalanKasir/SuratJalanKasir/Edit.js";
import CetakCetakSuratJalanKasir from "views/pages/so/SuratJalanKasir/SuratJalanKasir/Cetak";
import DetailSuratJalanKasir from "views/pages/so/SuratJalanKasir/SuratJalanKasir/Detail.js";
import ValidasiSuratJalanKasir from "views/pages/so/SuratJalanKasir/ValidasiSuratJalanKasir/Edit.js";
import CetakSuratJalanKasir from "views/pages/so/SuratJalanKasir/CetakSuratJalanKasir/Cetak.js";

import InvoiceSo from "views/pages/so/InvoiceSo/Index.js";
import CreateInvoiceSo from "views/pages/so/InvoiceSo/InvoiceSo/Create.js"
import EditInvoiceSo from "views/pages/so/InvoiceSo/InvoiceSo/Edit.js"
import DetailInvoiceSo from "views/pages/so/InvoiceSo/InvoiceSo/Detail.js"
import Validasifinance from "views/pages/so/InvoiceSo/ValidasiInvoiceSo/Edit.js";
import ValidasiDirektur from "views/pages/so/InvoiceSo/ValidasiPemimpin/Edit.js";
import DetailInvoiceSoS from "views/pages/so/InvoiceSo/CetakInvoice/Detail"

import ReceivingTransfer from "views/pages/transferstokwarehouse/ReceivingTransfer/Index";
import CreateReceivingTransfer from "views/pages/transferstokwarehouse/ReceivingTransfer/ReceivingTransfer/Create";
import EditReceivingTransfer from "views/pages/transferstokwarehouse/ReceivingTransfer/ReceivingTransfer/Edit";
import CetakReceivingTransfers from "views/pages/transferstokwarehouse/ReceivingTransfer/ReceivingTransfer/Cetak";
import ValidasiKepalaGudangR from "views/pages/transferstokwarehouse/ReceivingTransfer/ValidasiKepalaGudang/Edit";
import CetakReceivingTransfer from "views/pages/transferstokwarehouse/ReceivingTransfer/CetakReceivingTransfer/Cetak";

import SuratJalanTransfer from "views/pages/transferstokwarehouse/SuratJalanTransfer/Index";
import CreateTransferSuratJalan from "views/pages/transferstokwarehouse/SuratJalanTransfer/SuratJalanTransfer/Create";
import EditTransferSuratJalan from "views/pages/transferstokwarehouse/SuratJalanTransfer/SuratJalanTransfer/Edit";
import ValidasiSuratJalanSuratJalanTransferStok from "views/pages/transferstokwarehouse/SuratJalanTransfer/ValidasiKepalaGudang/Edit"
import CetakSuratJalanTransfer from "views/pages/transferstokwarehouse/SuratJalanTransfer/CetakSuratJalan/Cetak";

import TransferRak from "views/pages/transferRak/Index";
import CreateTransferRak from "views/pages/transferRak/Create";

import DurasiOperasional from "views/pages/durasiOperasional/Index2";
import CreateDurasiOperasional from "views/pages/durasiOperasional/Create";
import EditDurasiOperasional from "views/pages/durasiOperasional/Edit";

import PasswordOperasional from "views/pages/durasiPassword/Index";
import EditPasswordOperasional from "views/pages/durasiPassword/Edit";

import UsersEcommerce from "views/pages/usersEcommerce/Index.js";
import CreateUsersEcommerce from "views/pages/usersEcommerce/Create";
import DetailUsersEcommerce from "views/pages/usersEcommerce/Detail";

import TransactionEcommerce from "views/pages/transaksiEcommerce/Index.js";
import EditTransactionEcommerce from "views/pages/transaksiEcommerce/transaksiEcommerce/Edit";

import BankEcommerce from "views/pages/bankEcommerce/Index.js";
// import Price from "views/pages/Price/Index"

import PoRetur from "views/pages/po/PoRetur/Index";
import CreatePoRetur from "views/pages/po/PoRetur/PoRetur/Create2";
import EditPoRetur from "views/pages/po/PoRetur/PoRetur/Edit";
import DetailPoRetur from "views/pages/po/PoRetur/PoRetur/Detail";
import ValidasiAdminTokoReturPo from "views/pages/po/PoRetur/ValidasiAdminToko/Edit2";
import ValidasiDirekturPoRetur from "views/pages/po/PoRetur/ValidasiDirekturPoRetur/Edit1";
import CetakReturPo from "views/pages/po/PoRetur/CetakPoRetur/Cetak";
import DetailPoReturCetak from "views/pages/po/PoRetur/CetakPoRetur/Detail";
import CreatePoReturBuktiKasMasuk from "views/pages/po/PoRetur/CetakPoRetur/Bkm";

// import SoReturKasir from "views/pages/so/SoRetur/SoReturKasir/Index";
// import SoReturProyek from "views/pages/so/SoRetur/SoReturProyek/Index";

import KurirEcommerce from "views/pages/Kurir/Index";
import CreateListKurir from "views/pages/Kurir/ListKurir/Create";
import KurirbyWarehouse from "views/pages/Kurir/KurirByWarehouse/Create";
import CreateDurasiKurir from "views/pages/Kurir/DurasiKurir/Create";
import CreateProdukGrup from "views/pages/Kurir/ProdukGrup/Create";

import CetakInvoiceSO from "views/pages/so/InvoiceSo/CetakInvoice/Cetak";
import CetakBuktiKasKeluar from "views/pages/po/BuktiKasKeluar/CetakKasKeluar/Cetak";
import DetailBkk from "views/pages/po/BuktiKasKeluar/CetakKasKeluar/Detail";

import CetakPenawaranBarang from "views/pages/so/PermintaanBarang/CetakPenawaranBarang/Cetak";
import CetakBuktiKasMasuk from "views/pages/so/BuktiKasMasuk/CetakBuktiKasMasuk/Cetak";
import CetakTransferStokWarehouse from "views/pages/transferstokwarehouse/CetakTranferStokWarehouse/Cetak";

import LaporanStok from "views/pages/Laporan/LaporanStok/Index";
import LaporanPo from "views/pages/Laporan/LaporanPo/Index.js"
import LaporanSo from "views/pages/Laporan/LaporanSo/Index2.js"
import LaporanSokasir from "views/pages/Laporan/LaporanKasir/Index.js"
import LaporanJurnal from "views/pages/Laporan/LaporanJurnal/Index.js"
import LaporanJurnalBukuBesar from "views/pages/Laporan/LaporanJurnal/JurnalBukuBesar/Index.js"
import LaporanJurnalLabaRugi from "views/pages/Laporan/LaporanJurnal/JurnalLabaRugi/Index.js"
import LaporanJurnalNeraca from "views/pages/Laporan/LaporanJurnal/JurnalNeraca/Index.js"
import LaporanJurnalPenyesuaian from "views/pages/Laporan/LaporanJurnal/JurnalPenyesuaian/Index.js"
import LaporanJurnalUmum from "views/pages/Laporan/LaporanJurnal/JurnalUmum/Index.js"
import LaporanReceivingPo from "views/pages/Laporan/LaporanReceivingPo/Index.js";
import LaporanInvoicePo from "views/pages/Laporan/LaporanInvoicePo/Index.js";
import LaporanInvoiceSo from "views/pages/Laporan/LaporanInvoiceSo/Index.js";
import LaporanReceivingTransfer from "views/pages/Laporan/LaporanReceivingTransfer/Index.js";
import LaporanSuratJalanProyek from "views/pages/Laporan/laporanSuratJalanProyek/Index.js";
import LaporanSuratJalanKasir from "views/pages/Laporan/LaporanSuratJalanKasir/Index.js";
import LaporanSuratJalanTransfer from "views/pages/Laporan/LaporanSuratJalanTransfer/Index.js";
import LaporanInvoiceSoKasir from "views/pages/Laporan/LaporanInvoiceKasir/Index.js";
import LaporanBuktiKasMasuk from "views/pages/Laporan/LaporanBuktiKasMasuk/Index.js";
import LaporanBuktiKasKeluar from "views/pages/Laporan/LaporanBuktiKasKeluar/Index.js";

import SoRetur from "views/pages/so/SoRetur/Index";
// import CreateSoReturProyek from "views/pages/so/SoRetur/SoReturProyek/Create";
import CreateSoReturProyek from "views/pages/so/SoRetur/SoReturProyek/Create";
import CreateSoReturKasir from "views/pages/so/SoRetur/SoReturKasir/Create";
import ValidasiReturSoKepalaToko from "views/pages/so/SoRetur/ValidasiAdminSo/Edit";
import EditSoKasurProyek from "views/pages/so/SoRetur/SoReturProyek/Edit";
import SoReturValidasiManajerOffice from "views/pages/so/SoRetur/ValidasiManajerOffice/Edit";
import ValidasiDirekturSoRetur from "views/pages/so/SoRetur/ValidasiDirektur/Edit";
import ValidasiCetakRetur from "views/pages/so/SoRetur/CetakReturSo/Bkk";

import SoReturKasir from "views/pages/so/SoReturKasir/Index";
import CreateSoReturKasirBaru from "views/pages/so/SoReturKasir/SoReturKasir/Create";
import EditSoReturKasirBaru from "views/pages/so/SoReturKasir/SoReturKasir/Edit";
import ValidasiReturSoKepalaTokoBaru from "views/pages/so/SoReturKasir/ValidasiKepalaToko/Edit";
import ValidasiOfficeManager from "views/pages/so/SoReturKasir/ValidasiOfficeManager/Edit";
import ValidasiDirekturReturKasir from "views/pages/so/SoReturKasir/ValidasiDirektur/Edit";
import CetakReturKasir from "views/pages/so/SoReturKasir/CetakReturKasir/Bkk";
import CreateBiaya from "views/pages/Biaya/Create";
import CreatePemasukan from "views/pages/Pemasukan/Create";
import BKKFINANCE from "views/pages/financeBkk/Index";
import CreateFinanceBkk from "views/pages/financeBkk/financeBkk/Create";
import BKMFINANCE from "views/pages/financeBkm/Index";
import CreateFinanceBkm from "views/pages/financeBkm/financeBkm/Create";
import ValidasiKepalaTokoBKK from "views/pages/financeBkk/ValidasiKepalaFinance/Edit";
import ValidasDirekturBkkFinance from "views/pages/financeBkk/ValidasiDirektur/Edit";

import ValidasiBkmFinance from "views/pages/financeBkm/ValidasiKepalaToko/Edit";
import ValidasiDirekturBKMFinance from "views/pages/financeBkm/ValidasiDirektur/Edit";
import KasirIndex from "views/pages/so/soKasirBaru/KasirIndex";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    layout: "/auth",
    hidden: true,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    layout: "/admin",
    hidden: true,
  },
  {
    collapse: true,
    name: "Master",
    icon: "ni ni-folder-17 text-yellow",
    state: "MasterCollapse",
    roles: [
      "ROLE_SUPERADMIN",
      "ROLE_ADMIN",
      "ROLE_KARYAWAN",
      "ROLE_USER",
      "ROLE_OWNER",
    ],
    views: [
      {
        path: "/warehouse-gudang/edit/:id",
        name: "Edit Warehouse Pusat",
        miniName: "",
        component: EditWarehouseGudang,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse-gudang/create",
        name: "Create Warehouse Pusat",
        miniName: "",
        component: CreateWarehouseGudang,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse-gudang",
        name: "Warehouse Gudang",
        miniName: "",
        component: warehousegudang,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse-toko/edit/:id",
        name: "Edit Warehouse Toko",
        miniName: "",
        component: EditWarehouseToko,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse-toko/create",
        name: "Create Warehouse Toko",
        miniName: "",
        component: CreateWarehouseToko,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse-toko",
        name: "Warehouse Toko",
        miniName: "",
        component: warehousetoko,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse-pusat/edit/:id",
        name: "Edit Warehouse Pusat",
        miniName: "",
        component: EditWarehousePusat,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse/gudang/create",
        name: "Create Warehouse Pusat",
        miniName: "",
        component: CreateWarehouseGudang,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse/toko/create",
        name: "Create Warehouse Pusat",
        miniName: "",
        component: CreateWarehouseToko,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse/pusat/create",
        name: "Create Warehouse Pusat",
        miniName: "",
        component: CreateWarehousePusat,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      // {
      //   path: "/warehouse-pusat-sat",
      //   name: "Warehouse Pusat",
      //   miniName: "",
      //   component: warehousepusat,
      //   layout: "/admin",
      //   hidden: true,
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
      // {
      //   path: "/warehousess",
      //   name: "CabaminiName: "",ng",
      //         //   component: Warehouse,
      //   hidden: true,
      //   layout: "/admin",
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
      {
        path: "/warehouse/gudang",
        name: "Warehouse Gudang",
        miniName: "",
        component: WarehousePageGudang,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse/toko",
        name: "Warehouse Toko",
        miniName: "",
        component: WarehousePageToko,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse/pusat",
        name: "Warehouse Pusat",
        miniName: "",
        component: WarehousePagePusat,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse/edit/:id",
        name: "Edit Warehouse Pusat",
        miniName: "",
        component: EditWarehouseaAll,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse/all/create",
        name: "Warehouse Pusat",
        miniName: "",
        component: CreateAll,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/warehouse",
        name: "Cabang",
        miniName: "",
        component: WarehousePusat,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      // {
      //   path: "/price",
      //   name: "PricminiName: "",e",
      //         //   component: Price,
      //   layout: "/admin",
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
      {
        path: "/rak/edit/:id",
        name: "Create Rak",
        miniName: "",
        component: EditRak,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/rak/create",
        name: "Create Rak",
        miniName: "",
        component: CreateRak,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/rak",
        name: "Lokasi Barang",
        miniName: "",
                component: Rak,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/durasi-operasional/edit/:id",
        name: "Edit Durasi Operasional",
        miniName: "",
        component: EditDurasiOperasional,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/durasi-operasional/create",
        name: "Create Durasi Operasional",
        miniName: "",
        component: CreateDurasiOperasional,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/durasi-operasional",
        name: "Batas Waktu",
        miniName: "",
        component: DurasiOperasional,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/password-operasional/edit/:id",
        name: "Edit Durasi Operasional",
        miniName: "",
        component: EditPasswordOperasional,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/password-operasional",
        name: "Otoritas",
        miniName: "",
        component: PasswordOperasional,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/user/edit/:id",
        name: "Edit User",
        miniName: "",
        component: EditUser,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/privileges/edit",
        name: "Edit Privileges",
        miniName: "",
        component: EditPrivileges,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/user/create",
        name: "Create User",
        miniName: "",
        component: CreateUser,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/user",
        name: "Akses Pengguna",
        miniName: "",
                component: Users,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/alamat/edit/:id",
        name: "Edit Alamat",
        miniName: "",
        component: EditAlamat,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/alamat/create",
        name: "Create Address",
        miniName: "",
        component: CreateAlamat,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/alamat",
        name: "Alamat",
        miniName: "",
                component: Alamat,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/person/edit/:id",
        name: "Edit Person",
        miniName: "",
        component: EditPerson,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/person/create",
        name: "Create Person",
        miniName: "",
        component: CreatePerson,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/person",
        name: "Supplier",
        miniName: "",
                component: Person,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/satuan/edit/:id",
        name: "Edit Satuan",
        miniName: "",
        component: EditUom,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/satuan/create",
        name: "Create Satuan",
        miniName: "",
        component: CreateUom,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/satuan",
        name: "Satuan",
        miniName: "",
                component: Uom,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-grade/create",
        name: "Create Item Grade",
        miniName: "",
        component: CreateItemGrade,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-grade",
        name: "Item Grade",
        miniName: "",
        component: ItemGrade,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-sub-merek/create",
        name: "Create Item Sub Merek",
        miniName: "",
                component: CreateItemSubMerek,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-sub-merek",
        name: "Item Sub Merek",
        miniName: "",
        component: ItemSubMerek,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-merek/create",
        name: "Create Item Merek",
        miniName: "",
        component: CreateItemMerek,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-merek",
        name: "Item Merek",
        miniName: "",
        component: ItemMerek,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-sub-function/create",
        name: "Create Item Sub Function",
        miniName: "",
        component: CreateItemSubFunction,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-sub-function",
        name: "Item Sub Function",
        miniName: "",
        component: ItemSubFunction,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-function/create",
        name: "Create Item Function",
        miniName: "",
        component: CreateItemFunction,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-function",
        name: "Item Function",
        miniName: "",
        component: ItemFunction,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-sub-kategori/create",
        name: "Create Sub Kategori",
        miniName: "",
        component: CreateItemSubCategory,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-sub-kategori",
        name: "Item Sub Kategori",
        miniName: "",
        component: ItemSubCategory,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-kategori/edit/:id",
        name: "Edit Item Kategori",
        miniName: "",
        component: EditItemCategory,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-kategori/create",
        name: "Create Kategori",
        miniName: "",
        component: CreateItemCategory,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item-kategori",
        name: "Item Kategori",
        miniName: "",
        component: ItemCategory,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item/edit/:id",
        name: "Edit Item",
        miniName: "",
        component: EditItem,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item/details/:id",
        name: "Detail Item",
        miniName: "",
        component: DetailItems,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item/create",
        name: "Create Item",
        miniName: "",
        component: CreateItem,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/item",
        name: "Item",
        miniName: "",
                component: ItemIndex,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/aplikator/create",
        name: "Create Item",
        miniName: "",
        component: CreateAplikator,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/aplikator",
        name: "Aplikator",
        miniName: "",
                component: Aplikator,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/promo/edit/:id",
        name: "Edit Promo",
        miniName: "",
        component: EditPromo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/promo/create-transaksi",
        name: "Create Promo",
        miniName: "",
        component: CreatePromo2,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/promo/create-kategori",
        name: "Create Promo",
        miniName: "",
        component: CreatePromo1,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/promo/create",
        name: "Create Promo",
        miniName: "",
        component: CreatePromo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/promo",
        name: "Promo Toko",
        miniName: "",
                component: Promo,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/customer/edit/:id",
        name: "Edit Customer",
        miniName: "",
        component: EditCustomer,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/customer/create",
        name: "Create Customer",
        miniName: "",
        component: CreateCustomer,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/customer",
        name: "Customer",
        miniName: "",
                component: Customer,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/pajak/edit/:id",
        name: "Edit Pajak",
        miniName: "",
        component: EditPajak,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/pajak/create",
        name: "Create Pajak",
        miniName: "",
        component: CreatePajak,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/pajak",
        name: "PPN",
        miniName: "",
                component: Pajak,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/jangka-waktu/update/:id",
        name: "Update Jangka Waktu",
        miniName: "",
        component: "",
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/jangka-waktu/edit/:id",
        name: "Edit Jangka Waktu",
        miniName: "",
        component: EditJangkaWaktu,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/jangka-waktu/create",
        name: "Create Jangka Waktu",
        miniName: "",
        component: CreateJangkaWaktu,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/jangka-waktu",
        name: "Jatuh Tempo",
        miniName: "",
        component: MainJangka,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },      
      {
        path: "/type-asset/edit/:id",
        name: "Edit Type Asset",
        miniName: "",
        component: EditTypeAsset,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/type-asset/create",
        name: "Create Type Asset",
        miniName: "",
        component: CreateTypeAsset,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/type-asset",
        name: "Type Asset",
        miniName: "",
                component: TypeAsset,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/asset/edit/:id",
        name: "Edit Asset",
        miniName: "",
        component: EditAsset,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/asset/create",
        name: "Create Asset",
        miniName: "",
        component: CreateAsset,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/asset",
        name: "Asset",
        miniName: "",
                component: Asset,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bank/edit/:id",
        name: "Edit Bank",
        miniName: "",
        component: EditBank,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bank/create",
        name: "Create Bank",
        miniName: "",
        component: CreateBank,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bank",
        name: "Bank",
        miniName: "",
                component: Bank,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/coa/edit/:id",
        name: "Edit COA",
        miniName: "",
        component: EditCoa,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/coa/create",
        name: "Create COA",
        miniName: "",
        component: CreateCoa,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/coa",
        name: "Coa",
        miniName: "",
                component: Coa,
        layout: "/admin",
        hidden: true, //hidden dulu bosku
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/account/edit/:id",
        name: "Edit Account",
        miniName: "",
        component: EditAccount,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/account/create",
        name: "Create Account",
        miniName: "",
        component: CreateAccount,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/account",
        name: "Account",
        miniName: "",
        component: Account,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      
      // {
      //   path: "/reason/create",
      //   name: "Alasan Create",
      //   miniName: "",
      //   component: CreateReason,
      //   layout: "/admin",
      //   hidden: true,
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
      // {
      //   path: "/reason",
      //   name: "Alasan",
      //   miniName: "",
      //   component: Reason,
      //   layout: "/admin",
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
    ],
  },
  {
    collapse: true,
    name: "Inventory",
    icon: "ni ni-archive-2 text-orange",
    state: "inventoryCollapse",
    roles: [
      "ROLE_SUPERADMIN",
      "ROLE_ADMIN",
      "ROLE_KARYAWAN",
      "ROLE_USER",
      "ROLE_OWNER",
    ],
    views: [
      {
        path: "/stock-item/kartu-stok/:id",
        name: "Kartu Stok",
        miniName: "",
        component: DetailKartuStok,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/stock-item/semua-cabang/:id",
        name: "Kartu Stok",
        miniName: "",
        component: DetailItemStok,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/stock-item",
        name: "Stock",
        miniName: "",
        component: ItemStock,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/stock-adjustment/cetak/:id",
        name: "validasi Adjustment",
        miniName: "",
        component: CetakAdjustment,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/stock-adjustment/validasi-direktur/:id",
        name: "validasi Adjustment",
        miniName: "",
        component: ValidasiAdjustment,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/stock-adjustment/edit/:id",
        name: "Edit Adjustment",
        miniName: "",
        component: EditAdjustment,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/stock-adjustment/create",
        name: "Create Adjustment",
        miniName: "",
        component: CreateAdjustment,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/stock-adjustment",
        name: "Adjustment",
        miniName: "",
        component: Adjustment,
        layout: "/admin",
        // hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/transfer-warehouse-stock/cetak/:id",
        name: "Create Transfer Stock Warehouse",
        miniName: "",
        component: CetakTransferStokWarehouse,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/transfer-warehouse-stock/detail/:id",
        name: "Create Transfer Stock Warehouse",
        miniName: "",
        component: DetailTransferStockWarehouse,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/transfer-warehouse-stock/validasi-direktur/validasi/:id",
        name: "Validasi Transfer Stok Warehouse Kepala Toko",
        miniName: "",
        component: ValidasiDirekturTSW,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/transfer-warehouse-stock/validasi-kepala-toko/validasi/:id",
        name: "Validasi Transfer Stok Warehouse Kepala Toko",
        miniName: "",
        component: ValidasiKepalaTokoTSW,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/transfer-warehouse-stock/edit/:id",
        name: "Create Transfer Stock Warehouse",
        miniName: "",
        component: EditTransferStockWarehouse,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/transfer-warehouse-stock/create",
        name: "Create Transfer Stock Warehouse",
        miniName: "",
        component: CreateTransferStockWarehouse,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/transfer-warehouse-stock",
        name: "Transfer Eksternal",
        miniName: "",
        component: TransferStockWarehouse,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/receiving-transfer/cetak/:id",
        name: "Create Receiving Transfer",
        miniName: "",
        component: CetakReceivingTransfer,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/receiving-transfer/validasi-kepala-gudang/validasi/:id",
        name: "Create Receiving Transfer",
        miniName: "",
        component: ValidasiKepalaGudangR,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/receiving-transfer/cetak-cetak/:id",
        name: "Create Receiving Transfer",
        miniName: "",
        component: CetakReceivingTransfers,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/receiving-transfer/edit/:id",
        name: "Create Receiving Transfer",
        miniName: "",
        component: EditReceivingTransfer,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/receiving-transfer/create",
        name: "Create Receiving Transfer",
        miniName: "",
        component: CreateReceivingTransfer,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/receiving-transfer",
        name: "Receiving TE",
        miniName: "",
        component: ReceivingTransfer,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/transfer-surat-jalan/cetak/:id",
        name: "Transfer Surat Jalan",
        miniName: "",
        component: CetakSuratJalanTransfer,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/transfer-surat-jalan/validasi-kepala-gudang/validasi/:id",
        name: "Transfer Surat Jalan",
        miniName: "",
        component: ValidasiSuratJalanSuratJalanTransferStok,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/transfer-surat-jalan/edit/:id",
        name: "Transfer Surat Jalan",
        miniName: "",
        component: EditTransferSuratJalan,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/transfer-surat-jalan/create",
        name: "Transfer Surat Jalan",
        miniName: "",
        component: CreateTransferSuratJalan,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/transfer-surat-jalan",
        name: "Surat Jalan TE",
        miniName: "",
        component: SuratJalanTransfer,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/transfer-rak/create",
        name: "Transfer Internal",
        miniName: "",
        component: CreateTransferRak,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/transfer-rak",
        name: "Transfer Internal",
        miniName: "",
        component: TransferRak,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
    ],
  },
  {
    collapse: true,
    name: "Pembelian",
    icon: "ni ni-cart text-red",
    state: "POCollapse",
    roles: [
      "ROLE_SUPERADMIN",
      "ROLE_ADMIN",
      "ROLE_KARYAWAN",
      "ROLE_USER",
      "ROLE_OWNER",
    ],
    views: [
      {
        path: "/permintaan-barang/detail-validasi/:id",
        name: "Edit Validasi Permintaan Barang",
        miniName: "",
        component: DetaiPermintaanCetak ,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/permintaan-barang/cetak/:id",
        name: "Edit Validasi Permintaan Barang",
        miniName: "",
        component: CetakPermintaanBarang,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/validasi-permintaan-barang/edit/:id",
        name: "Edit Validasi Permintaan Barang",
        miniName: "",
        component: EditValidasiPermintaanBarang,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/validasi-permintaan-barang",
        name: "Validasi Permintaan Barang",
        miniName: "",
        component: ValidasiPermintaanBarang,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/permintaan-barang/create",
        name: "Create Permintaan Barang",
        miniName: "",
        component: CreatePermintaanBarang,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/permintaan-barang/detail/:id",
        name: "Permintaan Barang Edit",
        miniName: "",
        component: DetailPermintaanBarang,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/permintaan-barang/edit/:id",
        name: "Permintaan Barang Edit",
        miniName: "",
        component: EditPermintaanBarang,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/permintaan-barang",
        name: "RFQ",
        miniName: "",
        component: PermintaanBarang,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/purchase-order/detail-po/:id",
        name: "Cetak So",
        miniName: "",
        component: DetailPO,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/purchase-order/cetak/:id",
        name: "Cetak So",
        miniName: "",
        component: CetakPO,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/purchase-order/validasi-pimpinan-po/edit/:id",
        name: "Validasi Pimpinan Edit",
        miniName: "",
        component: EditValidatorPo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/purchase-order/validasi-pimpinan-po",
        name: "Validasi Pimpinan",
        miniName: "",
        component: ValidatorPo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/purchase-order/validasi-admin-approve-po/edit/:id",
        name: "Validasi Penawaran Po",
        miniName: "",
        component: EditAdminApprove,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/purchase-order/validasi-admin-approve-po",
        name: "Admin Approve",
        miniName: "",
          component: AdminApprove,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/purchase-order/validasi-penawaran-po/edit/:id",
        name: "Validasi Penawaran Po",
        miniName: "",
            component: EditValidasiPo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/purchase-order/validasi-penawaran-po",
        name: "Validasi Penawaran Po",
        miniName: "",
          component: ValidasiPo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/purchase-order/detail/:id",
        name: "Edit Penawaran Po",
        miniName: "",
            component: DetailPenawaranPo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/purchase-order/edit/:id",
        name: "Edit Penawaran Po",
        miniName: "",
            component: EditPenawaranPo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/purchase-order/create",
        name: "Create Penawaran Po",
        miniName: "",
            component: CreatePenawaranPo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/purchase-order",
        name: "Order",
        miniName: "",
          component: Po,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/memo-kurir-po/detail-memo/:id",
        name: "Detail Penawaran Po",
        miniName: "",
            component: DetailMemoCetak,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/memo-kurir-po/cetak/:id",
        name: "Detail Penawaran Po",
        miniName: "",
            component: CetakMemoPo,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/memo-kurir-po/validasi-admin-po/:id",
        name: "Detail Penawaran Po",
            component: ValidasiAdminPoo,
            miniName: "",
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/memo-kurir-po/detail/:id",
        name: "Detail Penawaran Po",
            component: DetailMemoKurirPO,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/memo-kurir-po/create",
        name: "Create Penawaran Po",
            component: CreateMemoKurirPO,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/memo-kurir-po",
        name: "Memo Kurir",
            component: MemoKurirPO,
            miniName: "",
        layout: "/admin",
        hidden : true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/receiving-po/detail-receving/:id",
        name: "Validasi Receiving Po",
            component: DetailCetakReceivingPO,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/receiving-po/cetak/:id",
        name: "Validasi Receiving Po",
            component: CetakReceivingPo,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/receiving-po/validasi/:id",
        name: "Validasi Receiving Po",
            component: ValidasiReceivingPO,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/receiving-po/detail/:id",
        name: "Edit Receiving Po",
            component: DetailReceivingPO,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/receiving-po/edit/:id",
        name: "Edit Receiving Po",
            component: EditReceivingPO,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/receiving-po/cetak-receiving/:id",
        name: "Edit Receiving Po",
            component: CetakCetakReceivingPO,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/receiving-po/create",
        name: "Create Receiving Po",
            component: CreateReceivingPO,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/receiving-po",
        name: "Receiving",
          component: ReceivingPO,
        layout: "/admin",
        miniName: "",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/invoice-po/detail-invoice/:id",
        name: "Edit Receiving Po",
            component: DetailInvoicee,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/invoice-po/cetak/:id",
        name: "Edit Receiving Po",
            component: CetakInvoicePO,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/invoice-po/validasi-direktur/validasi/:id",
        name: "Validasi Direktur Receiving Po",
            component: ValidasiPimpinan,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/invoice-po/validasi-admin-finance/validasi/:id",
        name: "Validasi Admin Finance Receiving Po",
            component: ValidasiAdminFinance,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/invoice-po/detail/:id",
        name: "Edit Receiving Po",
            component: DetailInvoicePO,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/invoice-po/edit/:id",
        name: "Edit Receiving Po",
            component: EditInvoicePO,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/invoice-po/create",
        name: "Create Invoice Po",
            component: CreateInvoicePO,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/invoice-po",
        name: "Invoice",
        miniName: "",
          component: InvoicePO,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bukti-kas-keluar/detail-bkk/:id",
        name: "Validasi Direktur",
            component: DetailBkk,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bukti-kas-keluar/cetak/:id",
        name: "Validasi Direktur",
            component: CetakBuktiKasKeluar,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bukti-kas-keluar/validasi-direktur/validasi/:id",
        name: "Validasi Direktur",
            component: ValidasiDirekturBkk,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bukti-kas-keluar/validasi-kepala-finance/validasi/:id",
        name: "Validasi kepala finance",
            component: ValidasiAdminFinanceBkk,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bukti-kas-keluar/detail/:id",
        name: "Detail Bukti kas Keluar",
            component: DetailBuktiKasKeluar,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bukti-kas-keluar/create",
        name: "Create bukti kas keluar",
            component: CreateBuktiKasKeluar,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bukti-kas-keluar",
        name: "Bukti Kas Keluar",
        miniName: "",
        component: BuktiKasKeluar,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/po-retur/payment-bkm/:id",
        name: "Create Po Retur",
        component: CreatePoReturBuktiKasMasuk,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/po-retur/detail-po-retur/:id",
        name: "Create Po Retur",
        component: DetailPoReturCetak,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/po-retur/cetak/:id",
        name: "Create Po Retur",
        component: CetakReturPo,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/po-retur/validasi-direktur-po/:id",
        name: "Create Po Retur",
        component: ValidasiDirekturPoRetur,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/po-retur/validasi-manajer-po/:id",
        name: "Create Po Retur",
        component: ValidasiAdminTokoReturPo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/po-retur/detail/:id",
        name: "Create Po Retur",
            component: DetailPoRetur,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/po-retur/edit/:id",
        name: "Create Po Retur",
            component: EditPoRetur,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/po-retur/create",
        name: "Create Po Retur",
        component: CreatePoRetur,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/po-retur",
        name: "PO Retur",
        component: PoRetur,
        miniName: "",
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
    ],
  },
  {
    collapse: true,
    name: "Penjualan",
    icon: "ni ni-cart text-red",
    // icon: "ni ni-archive-2 text-orange",
    state: "SOCollapse",
    roles: [
      "ROLE_SUPERADMIN",
      "ROLE_ADMIN",
      "ROLE_KARYAWAN",
      "ROLE_USER",
      "ROLE_OWNER",
    ],
    views: [
      {
        path: "/kasir-sales-order/detail",
        name: "Detail Kasir Settlement",
          component: DetailKasirSettlement,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      // {
      //   path: "/kasir-sales-order/cetak",
      //   name: "Cetak",
      //     //   component: CetakSoKasir,
      //   layout: "/cetak",
      //   hidden: true,
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
      {
        path: "/kasir-sales-order/so-kasir",
        name: "Kasir",
            component: SoKasir,
        hidden: true,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/kasir-sales-order/modal",
        name: "Kasir Settlement",
          component: CreateKasirSettlement,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/kasir-sales-order/",
        name: "POS Kasir",
          // component: KasirSettlement,
          component: KasirIndex,
          miniName: "",
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/pelunasan/edit/:id",
        name: "Create Po Retur",
            component: PelunasanEdit,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/pelunasan",
        name: "Pelunasan",
          component: Pelunasan,
          miniName: "",
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/surat-jalan-kasir/cetak/:id",
        name: "Edit Penawaran So",
            component: CetakSuratJalanKasir,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/validasi-surat-jalan-kasir/edit/:id",
        name: "Edit Penawaran So",
            component: ValidasiSuratJalanKasir,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/surat-jalan-kasir/detail/:id",
        name: "Detail Penawaran So",
            component: DetailSuratJalanKasir,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/surat-jalan-kasir/cetak-sj/:id",
        name: "Edit Penawaran So",
            component: CetakCetakSuratJalanKasir,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/surat-jalan-kasir/edit/:id",
        name: "Edit Penawaran So",
            component: EditSuratJalanKasir,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/surat-jalan-kasir/create",
        name: "Create Penawaran So",
            component: CreateSuratJalanKasir,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/surat-jalan-kasir",
        name: "Surat Jalan Kasir",
          component: SuratJalanKasir,
          miniName: "",
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/closing-kasir/detail/:id",
        name: "Create Po Retur",
            component: DetailClosingKasir,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      // {
      //   path: "/closing-kasir/",
      //   name: "Closing Kasir",
      //     //   component: ClosingKasir,
      //   layout: "/admin",
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
      {
        path: "/penawaran-barang/cetak/:id",
        name: "Edit Validasi Pimpinan So",
              component: CetakPenawaranBarang,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/penawaran-barang/so-validasi-penawaran-barang/edit/:id",
        name: "Edit Validasi Pimpinan So",
              component: EditValidasiPermintaanBarangSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/penawaran-barang/so-validasi-penawaran-barang",
        name: " Validasi Pimpinan So",
              component: ValidasiPermintaanBarangSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/penawaran-barang/edit/:id",
        name: "Edit Validasi Pimpinan So",
              component: EditPermintaanBarangSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/penawaran-barang/detail/:id",
        name: "Detail Penawaran Barang",
          component: DetailPermintaanBarangSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/penawaran-barang/create",
        name: "Penawaran Barang",
          component: CreatePermintaanBarangSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/penawaran-barang",
        name: "Penawaran",
          component: PermintaanBarangSo,
        layout: "/admin",
        miniName: "",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/cetak/:id",
        name: "Cetak So",
              component: CetakSo,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/validasi-pimpinan-so/edit/:id",
        name: "Edit Validasi Pimpinan So",
              component: EditPimpinanSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/validas-pimpinan-so",
        name: "Validasi Pimpinan SO",
            component: PimpinanSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/validasi-admin-so/edit/:id",
        name: "Edit Validasi Admin So",
              component: EditAdminApproveSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/validasi-admin-so",
        name: "Validasi Admin SO",
            component: AdminApproveSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/validasi-penawaran-so/edit/:id",
        name: "Validasi Penawaran So",
            component: EditValidasiSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/validasi-penawaran-so",
        name: "Validasi Penawaran So",
            component: ValidasiSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/detail/:id",
        name: "Edit Sales Order",
            component: EditSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/edit/:id",
        name: "Edit Sales Order",
            component: EditSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/create",
        name: "Create Sales Order",
            component: CreateSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/so-penawaran/detail/:id",
        name: "Edit Penawaran So",

        component: DetailPenawaranSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/so-penawaran/edit/:id",
        name: "Edit Sales Order",

        component: EditPenawaranSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order/so-penawaran/create",
        name: "Create Penawaran So",

        component: CreatePenawaranSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/sales-order",
        name: "Sales Order",
        miniName: "",
        component: So,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/surat-jalan-so/cetak/:id",
        name: "Edit Penawaran So",

        component: CetakSuratJalan,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/validasi-surat-jalan-so/edit/:id",
        name: "Edit Penawaran So",

        component: ValidasiSuratJalanSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/surat-jalan-so/detail/:id",
        name: "Detail Penawaran So",

        component: DetailSuratJalanSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/surat-jalan-so/cetak-sj/:id",
        name: "Edit Penawaran So",

        component: CetakCetakSuratJalanSo,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/surat-jalan-so/edit/:id",
        name: "Edit Penawaran So",

        component: EditSuratJalanSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/surat-jalan-so/create",
        name: "Create Penawaran So",

        component: CreateSuratJalanSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/surat-jalan-so",
        name: "Surat Jalan",
        miniName: "",
        component: SuratJalanSo,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/invoice-so/cetak/:id",
        name: "Create Invoice So",

        component: CetakInvoiceSO,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/invoice-so/detail-invoice/:id",
        name: "Create Invoice So",

        component: DetailInvoiceSoS,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/validasi-direktur/edit/:id",
        name: "Create Invoice So",

        component: ValidasiDirektur,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/validasi-invoice-so/edit/:id",
        name: "Create Invoice So",

        component: Validasifinance,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/invoice-so/detail/:id",
        name: "Create Invoice So",

        component: DetailInvoiceSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/invoice-so/edit/:id",
        name: "Create Invoice So",

        component: EditInvoiceSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/invoice-so/create",
        name: "Create Invoice So",

        component: CreateInvoiceSo,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/invoice-so",
        name: "Invoice",
        miniName: "",
        component: InvoiceSo,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      
    {
      path: "/bukti-kas-masuk/cetak/:id",
      name: "Validasi Direktur",

      component: CetakBuktiKasMasuk,
      layout: "/cetak",
      hidden: true,
      roles: [
        "ROLE_SUPERADMIN",
        "ROLE_ADMIN",
        "ROLE_KARYAWAN",
        "ROLE_USER",
        "ROLE_OWNER",
      ],
    },
    {
      path: "/bukti-kas-masuk/validasi-direktur/validasi/:id",
      name: "Validasi Direktur",

      component: ValidasiDirekturBkm,
      layout: "/admin",
      hidden: true,
      roles: [
        "ROLE_SUPERADMIN",
        "ROLE_ADMIN",
        "ROLE_KARYAWAN",
        "ROLE_USER",
        "ROLE_OWNER",
      ],
    },
    {
      path: "/bukti-kas-masuk/validasi-kepala-finance/validasi/:id",
      name: "Validasi kepala finance",

      component: ValidasiAdminFinanceBkm,
      layout: "/admin",
      hidden: true,
      roles: [
        "ROLE_SUPERADMIN",
        "ROLE_ADMIN",
        "ROLE_KARYAWAN",
        "ROLE_USER",
        "ROLE_OWNER",
      ],
    },
    {
      path: "/bukti-kas-masuk/detail/:id",
      name: "Detail Bukti kas Masuk",

      component: DetailBuktiKasMasuk,
      layout: "/admin",
      hidden: true,
      roles: [
        "ROLE_SUPERADMIN",
        "ROLE_ADMIN",
        "ROLE_KARYAWAN",
        "ROLE_USER",
        "ROLE_OWNER",
      ],
    },
    {
      path: "/bukti-kas-masuk/create",
      name: "Create bukti kas keluar",

      component: CreateBuktiKasMasuk,
      layout: "/admin",
      hidden: true,
      roles: [
        "ROLE_SUPERADMIN",
        "ROLE_ADMIN",
        "ROLE_KARYAWAN",
        "ROLE_USER",
        "ROLE_OWNER",
      ],
    },
    {
      path: "/bukti-kas-masuk",
      name: "Bukti Kas Masuk",
      miniName: "",
      component: BuktiKasMasuk,
      layout: "/admin",
      hidden: true,
      roles: [
        "ROLE_SUPERADMIN",
        "ROLE_ADMIN",
        "ROLE_KARYAWAN",
        "ROLE_USER",
        "ROLE_OWNER",
      ],
    },
      {
        path: "/so-retur/payment/:id",
        name: "Validasi Retur Kepala Toko",
        component: ValidasiCetakRetur,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
       {
        path: "/so-retur/validasi-direktur/:id",
        name: "Validasi Retur Kepala Toko",
        component: ValidasiDirekturSoRetur,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/so-retur/validasi-manager-office/:id",
        name: "Validasi Retur Kepala Toko",
        component: SoReturValidasiManajerOffice,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/so-retur/validasi-kepala-toko/:id",
        name: "Validasi Retur Kepala Toko",
        component: ValidasiReturSoKepalaToko,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/so-retur/kasir/create",
        name: "Create Po Retur",
        component: CreateSoReturKasir,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      // {
      //   path: "/so-retur/:id",
      //   name: "Validasi Retur Kepala Toko",
      //   component: EditSoKasurProyek,
      //   layout: "/admin",
      //   hidden: true,
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
      {
        path: "/so-retur/proyek/create",
        name: "Create Po Retur",
        component: CreateSoReturProyek,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/so-retur",
        name: "Retur Proyek",
        miniName: "",
        component: SoRetur,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/kasir-retur/payment/:id",
        name: "Validasi Retur Kepala Toko",
        component: CetakReturKasir,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/kasir-retur/validasi-direktur/:id",
        name: "Validasi Retur Kepala Toko",
        component: ValidasiDirekturReturKasir,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/kasir-retur/validasi-office-manager/:id",
        name: "Validasi Retur Kepala Toko",
        component: ValidasiOfficeManager,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/kasir-retur/validasi-kepala-toko/:id",
        name: "Validasi Retur Kepala Toko",
        component: ValidasiReturSoKepalaTokoBaru,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/kasir-retur/edit/:id",
        name: "Validasi Retur Kepala Toko",
        component: EditSoReturKasirBaru,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/kasir-retur/create",
        name: "Create Po Retur",
        component: CreateSoReturKasirBaru,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/kasir-retur",
        name: "Retur Penjualan",
        miniName: "",
        component: SoReturKasir,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      // {
      //   path: "/bukti-kas-masuk",
      //   name: "Bukti Kas Masuk",
      //   miniName: "",
      //   component: BuktiKasMasuk,
      //   layout: "/admin",
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
      // {
      //   path: "/so-return",
      //   name: "SO Retur",
      
      //   component: "",
      //   layout: "/admin",
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
    ],
  },
  // {
  //   collapse: true,
  //   name: "Tracking",
  //   icon: "ni ni-square-pin text-blue",
  //   state: "TrackingCollapse",
  //   roles: [
  //     "ROLE_SUPERADMIN",
  //     "ROLE_ADMIN",
  //     "ROLE_KARYAWAN",
  //     "ROLE_USER",
  //     "ROLE_OWNER",
  //   ],
  //   views: [
  //     {
  //       path: "/history-sales-canvasing",
  //       name: "Dokument Canvaser",
  //       miniName: "",
  //       component: HistorysalesCanvasing,
  //       layout: "/admin",
  //       roles: [
  //         "ROLE_SUPERADMIN",
  //         "ROLE_ADMIN",
  //         "ROLE_KARYAWAN",
  //         "ROLE_USER",
  //         "ROLE_OWNER",
  //       ],
  //     },
  //     {
  //       path: "/sales-canvasing",
  //       name: "Canvaser",
  //       component: salesCanvasing,
  //       layout: "/admin",
  //       miniName: "",
  //       roles: [
  //         "ROLE_SUPERADMIN",
  //         "ROLE_ADMIN",
  //         "ROLE_KARYAWAN",
  //         "ROLE_USER",
  //         "ROLE_OWNER",
  //       ],
  //     },
  //     // {
  //     //   path: "/sales-tracking",
  //     //   name: "Kurir",
  //     //   component: SalesTarcking,
  //     //   layout: "/admin",
  //     //   roles: [
  //     //     "ROLE_SUPERADMIN",
  //     //     "ROLE_ADMIN",
  //     //     "ROLE_KARYAWAN",
  //     //     "ROLE_USER",
  //     //     "ROLE_OWNER",
  //     //   ],
  //     // },
  //   ],
  // },
  {
    collapse: true,
    name: "HRD",
    icon: "ni ni-circle-08 text-green",
    state: "HRDCollapse",
    roles: [
      "ROLE_SUPERADMIN",
      "ROLE_ADMIN",
      "ROLE_KARYAWAN",
      "ROLE_USER",
      "ROLE_OWNER",
    ],
    views: [
      {
        path: "/karyawan/edit/:id",
        name: "Edit Durasi Operasional",
        miniName: "",
        component: EditKaryawan,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/karyawan/create",
        name: "Create karyawan",
        miniName: "",
        component: CreateKaryawanBaru,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/karyawan",
        name: "Karyawan",
        miniName: "",
                component: karyawanbaru,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/salary",
        name: "Gaji",
       component: Salary,
       miniName: "",
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      // {
      //   path: "/karyawan/edit/:id",
      //   name: "Edit User",
      
      //   component: EditKaryawan,
      //   layout: "/admin",
      //   hidden: true,
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
      // {
      //   path: "/karyawan/create",
      //   name: "Create Karyawan",
      //   
      //   component: CreateKaryawan,
      //   layout: "/admin",
      //   hidden: true,
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
      // {
      //   path: "/karyawan",
      //   name: "Karyawan",
      //         //   component: Karyawan,
      //   layout: "/admin",
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
      {
        path: "/absen",
        name: "Absen",
        miniName: "",
                component: Absen,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
    ],
  },
  {
    collapse: true,
    name: "Finance",
    icon: "ni ni-money-coins text-yellow",
    state: "FinanceCollapse",
    roles: [
      "ROLE_SUPERADMIN",
      "ROLE_ADMIN",
      "ROLE_KARYAWAN",
      "ROLE_USER",
      "ROLE_OWNER",
    ],
    views: [
      // {
      //   path: "/komisi",
      //   name: "Komisi",
      //   
      //   component: Komisi,
      //   layout: "/admin",
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
      {
        path: "/stock-opname/cetak/:id",
        name: "Edit Stock Opname",
        miniName: "",
        component: CetakStokOpname,
        layout: "/cetak",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/stock-opname/validasi-direktur/:id",
        name: "Edit Stock Opname",
        miniName: "",
        component: ValidasiDirekturOpname,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/stock-opname/edit/:id",
        name: "Edit Stock Opname",
        
        component: EditOpname,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/stock-opname/create",
        name: "Create Promo",
        
        component: CreateOpname,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/stock-opname",
        name: "Stok Opname",
        miniName: "",
                component: Opname,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/biaya",
        name: "Biaya Lain Lain",
        miniName: "",
        component: CreateBiaya,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/pemasukan",
        name: "Pemasukan Lain Lain",
        miniName: "",
        component: CreatePemasukan,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bkk-finance/validasi-direktur/:id",
        name: "Edit Stock Opname",
        component: ValidasDirekturBkkFinance,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bkk-finance/validasi-kepala-toko/:id",
        name: "Edit Stock Opname",
        
        component: ValidasiKepalaTokoBKK,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
     
      {
        path: "/bkk-finance/create",
        name: "Create Promo",
        component: CreateFinanceBkk,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bkk-finance",
        name: "Bukti Kas Keluar",
        miniName: "",
        component: BKKFINANCE,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bkm-finance/validasi-direktur/:id",
        name: "Edit Stock Opname",
        component: ValidasiDirekturBKMFinance,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bkm-finance/validasi-kepala-finance/:id",
        name: "Edit Stock Opname",
        component: ValidasiBkmFinance,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bkm-finance/create",
        name: "Create Promo",
        component: CreateFinanceBkm,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/bkm-finance",
        name: "Bukti Kas Masuk",
        miniName: "",
        component: BKMFINANCE,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      // {
      //   path: "/jurnal/create",
      //   name: "Create Jurnal",
      //   
      //   component: CreateJurnal,
      //   layout: "/admin",
      //   hidden: true,
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
      // {
      //   path: "/jurnal",
      //   name: "Jurnal",
      //         //   component: Jurnal,
      //   layout: "/admin",
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
      // {
      //   path: "/pendapatan",
      //   name: "Pendapatan",
      //         //   component: Jurnal,
      //   layout: "/admin",
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
      // {
      //   path: "/biaya",
      //   name: "Biaya",
      //   miniName: "",
      //   component: "",
      //   layout: "/admin",
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
    ],
  },
  {
    collapse: true,
    name: "E-Commerce",
    icon: "ni ni-shop text-red",
    state: "AdminEcomCollapse",
    roles: [
      "ROLE_SUPERADMIN",
      "ROLE_ADMIN",
      "ROLE_KARYAWAN",
      "ROLE_USER",
      "ROLE_OWNER",
    ],
    views: [
      {
        path: "/image/banner/update/:id",
        name: "Udate Image",
        miniName: "",
        component: UpdateBanner,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/image/item/update/:id",
        name: "Update Item Image",
        
        component: UpdateImageItem,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/image/update/:id",
        name: "Udate Image",
        
        component: UpdateImage,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/banner/upload",
        name: "Upload Banner",
        
        component: UploadBanner,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/image/upload",
        name: "Upload Gambar",
        
        component: UploadImage,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/image/list/",
        name: "Upload Gambar",
        miniName: "",
        component: MainList,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/list-kurir/kurir-by-warehouse/create",
        name: "Kurir",
        
        component: KurirbyWarehouse,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/list-kurir/produk-grup/create",
        name: "Kurir",
        
        component: CreateProdukGrup,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/list-kurir/durasi-kurir/create",
        name: "Kurir",
        
        component: CreateDurasiKurir,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/list-kurir/create",
        name: "Kurir",
        
        component: CreateListKurir,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/list-kurir",
        name: "Kurir",
        miniName: "",
        component: KurirEcommerce,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/ecommerce-users/detail/:id",
        name: "Udate Image",
        
        component: DetailUsersEcommerce,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/ecommerce-users/create",
        name: "Create ecommerce users",
        
        component: CreateUsersEcommerce,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/ecommerce-users",
        name: "Members",
        miniName: "",
                component: UsersEcommerce,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/transaction/validate/:id",
        name: "Udate Image",
        
        component: EditTransactionEcommerce,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/transaction",
        name: "Transaksi",
        miniName: "",
                component: TransactionEcommerce,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/ecom-bank",
        name: "Transfer",
        miniName: "",
                component: BankEcommerce,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      // {
      //   path: "/tokopedia",
      //   name: "Tokopedia",
      //         //   component: "",
      //   layout: "/admin",
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
    ],
  },
  {
    collapse: true,
    name: "Report",
    icon: "ni ni-folder-17 text-red",
    state: "ReportCollapse",
    roles: [
      "ROLE_SUPERADMIN",
      "ROLE_ADMIN",
      "ROLE_KARYAWAN",
      "ROLE_USER",
      "ROLE_OWNER",
    ],
    views: [
      // {
      //   collapse: true,
      //   name: "Laporan Skuy",
      //   icon: "ni ni-folder-17 text-red",
      //   state: "ReportCollapseSkuy",
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      //   views: [
      //     {
      //       path: "/laporan-po",
      //       name: "Laporan PO",
      //       component: LaporanPo,
      //       miniName: "",
      //       layout: "/admin",
      //       roles: [
      //         "ROLE_SUPERADMIN",
      //         "ROLE_ADMIN",
      //         "ROLE_KARYAWAN",
      //         "ROLE_USER",
      //         "ROLE_OWNER",
      //       ],
      //     },
      //   ]
      // },
      // {
      //   collapse: false,
      //   name: "Laporan Master",
      //   component: LaporanPo,
      //   // icon: "ni ni-folder-17 text-red",
      //   miniName: "",
      //   // state: "ReportMasterCollapse",
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
      // {
      //   collapse: false,
      //   name: "Laporan Penjualan",
      //   component: LaporanPo,
      //   // icon: "ni ni-folder-17 text-red",
      //   miniName: "",
      //   // state: "ReportMasterCollapse",
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
      // {
      //   path: "/laporan-stok",
      //   name: "Laporan Stok",
      //   component: LaporanStok,
      //   miniName: "",
      //   layout: "/admin",
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
      {
        path: "/laporan-po",
        name: "Laporan PO",
        component: LaporanPo,
        miniName: "",
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/laporan-receiving",
        name: "Laporan Receiving PO",
        component: LaporanReceivingPo,
        miniName: "",
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/laporan-invoice-po",
        name: "Laporan Invoice PO",
        component: LaporanInvoicePo,
        miniName: "",
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/laporan-keluar-bukti-kas",
        name: "Laporan Bukti Kas Keluar",
        component: LaporanBuktiKasKeluar,
        miniName: "",
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      // {
      //   collapse: false,
      //   name: "Laporan Pembelian",
      //   component: LaporanPo,
      //   // icon: "ni ni-folder-17 text-red",
      //   miniName: "",
      //   // state: "ReportMasterCollapse",
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
      {
        path: "/laporan-so",
        name: "Laporan SO Proyek",
        component: LaporanSo,
        miniName: "",
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/laporan-kasir",
        name: "Laporan SO Kasir",
        component: LaporanSokasir,
        miniName: "",
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/laporan-proyek-surat-jalan",
        name: "Laporan Surat Jalan Proyek",
        component: LaporanSuratJalanProyek,
        miniName: "",
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/laporan-surat-jalan-kasir",
        name: "Laporan Surat Jalan Kasir",
        component: LaporanSuratJalanKasir,
        miniName: "",
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/laporan-proyek-invoice",
        name: "Laporan Invoice SO Proyek",
        component: LaporanInvoiceSo,
        miniName: "",
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/laporan-oso-kasir-invoice",
        name: "Laporan Invoice SO Kasir",
        component: LaporanInvoiceSoKasir,
        miniName: "",
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/laporan-masuk-bukti-kas",
        name: "Laporan Bukti Kas Masuk",
        component: LaporanBuktiKasMasuk,
        miniName: "",
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      // {
      //   collapse: false,
      //   name: "Laporan Gudang",
      //   component: LaporanPo,
      //   // icon: "ni ni-folder-17 text-red",
      //   miniName: "",
      //   // state: "ReportMasterCollapse",
      //   roles: [
      //     "ROLE_SUPERADMIN",
      //     "ROLE_ADMIN",
      //     "ROLE_KARYAWAN",
      //     "ROLE_USER",
      //     "ROLE_OWNER",
      //   ],
      // },
      {
        path: "/laporan-transfer-receiving",
        name: "Laporan Receiving Transfer",
        component: LaporanReceivingTransfer,
        miniName: "",
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      }, 
      {
        path: "/laporan-transfer-surat-jalan",
        name: "Laporan Surat Jalan Transfer",
        component: LaporanSuratJalanTransfer,
        miniName: "",
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/laporan-jurnal/jurnal-buku-besar",
        name: "Laporan Jurnal",
        component: LaporanJurnalBukuBesar,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/laporan-jurnal/jurnal-penyesuaian",
        name: "Laporan Jurnal",
        component: LaporanJurnalPenyesuaian,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/laporan-jurnal/jurnal-umum",
        name: "Laporan Jurnal",
        component: LaporanJurnalUmum,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/laporan-jurnal/jurnal-laba-rugi",
        name: "Laporan Jurnal",
        component: LaporanJurnalLabaRugi,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/laporan-jurnal/jurnal-neraca",
        name: "Laporan Jurnal",
        
        component: LaporanJurnalNeraca,
        layout: "/admin",
        hidden: true,
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
      {
        path: "/laporan-jurnal",
        name: "Laporan Jurnal",
        miniName: "",
        component: LaporanJurnal,
        layout: "/admin",
        roles: [
          "ROLE_SUPERADMIN",
          "ROLE_ADMIN",
          "ROLE_KARYAWAN",
          "ROLE_USER",
          "ROLE_OWNER",
        ],
      },
    ],
  },
];

export default routes;
