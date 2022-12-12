import React from 'react';
import { Modal, Button, Label, FormGroup, Input } from 'reactstrap';

export default function DetailData(props) {
  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={props.isOpen}
      toggle={props.onCloseDetail}
    >
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Detail
        </h5>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={props.onCloseDetail}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        {props.dataPoRetur && (
          <div>
            <FormGroup>
              <Label className="form-control-label">Username PO</Label>
              <Input
                disabled
                type="text"
                value={props.dataPoRetur?.username_po}
              />
            </FormGroup>
            <FormGroup>
              <Label className="form-control-label">Keterangan PO</Label>
              <Input
                disabled
                type="text"
                value={props.dataPoRetur?.keterangan_po}
              />
            </FormGroup>
            <FormGroup>
              <Label className="form-control-label">Username Validator</Label>
              <Input
                disabled
                type="text"
                value={props.dataPoRetur?.username_validator}
              />
            </FormGroup>
            <FormGroup>
              <Label className="form-control-label">Keterangan Validator</Label>
              <Input
                disabled
                type="text"
                value={props.dataPoRetur?.keterangan_validator}
              />
            </FormGroup>
            <FormGroup>
              <Label className="form-control-label">Username Gudang</Label>
              <Input
                disabled
                type="text"
                value={props.dataPoRetur?.username_gudang}
              />
            </FormGroup>
            <FormGroup>
              <Label className="form-control-label">Keterangan Payment</Label>
              <Input
                disabled
                type="text"
                value={props.dataPoRetur?.keterangan_payment}
              />
            </FormGroup>
            <FormGroup>
              <Label className="form-control-label">Payment Method</Label>
              <Input
                disabled
                type="text"
                value={
                  props.dataPoRetur?.payment_method === 1
                    ? 'Tunai'
                    : 'Tempo / Termin / Utang'
                }
              />
            </FormGroup>
            <FormGroup>
              <Label className="form-control-label">Is Cicil</Label>
              <Input
                disabled
                type="text"
                value={
                  props.dataPoRetur?.is_cicil === 0
                    ? 'Pilih Cicilan'
                    : props.dataPoRetur?.is_cicil === 1
                    ? 'Cicilan (Lunas)'
                    : 'Cicilan (Belum Lunas)'
                }
              />
            </FormGroup>
            <FormGroup>
              <Label className="form-control-label"> PO Type</Label>
              <Input
                disabled
                type="text"
                value={
                  props.dataPoRetur?.is_cicil === 1
                    ? 'Konvensional'
                    : 'Cicilan (Belum Lunas)'
                }
              />
            </FormGroup>
            <FormGroup>
              <Label className="form-control-label">Clear</Label>
              <Input
                disabled
                type="text"
                value={
                  props.dataPoRetur?.clear === 1
                    ? 'Disetujui'
                    : props.dataPoRetur?.clear === 2
                    ? 'Ditolak'
                    : 'Dibatalkan'
                }
              />
            </FormGroup>
            <FormGroup>
              <Label className="form-control-label">Approve</Label>
              <Input
                disabled
                type="text"
                value={
                  props.dataPoRetur?.approve === 1
                    ? 'Disetujui'
                    : props.dataPoRetur?.approve === 2
                    ? 'Ditolak'
                    : 'Dibatalkan'
                }
              />
            </FormGroup>
            <FormGroup>
              <Label className="form-control-label">Status Barang</Label>
              <Input
                disabled
                type="text"
                value={
                  props.dataPoRetur?.status_barang === 1
                    ? 'Disetujui'
                    : props.dataPoRetur?.status_barang === 2
                    ? 'Ditolak'
                    : 'Dibatalkan'
                }
              />
            </FormGroup>
            <FormGroup>
              <Label className="form-control-label">Qty</Label>
              <Input
                disabled
                type="text"
                value={props.dataPoRetur?.total_qty}
              />
            </FormGroup>
            <FormGroup>
              <Label className="form-control-label">Harga</Label>
              <Input
                disabled
                type="text"
                value={props.dataPoRetur?.total_price}
              />
            </FormGroup>
            <FormGroup>
              <Label className="form-control-label">Total Qty Fisik</Label>
              <Input
                disabled
                type="text"
                value={props.dataPoRetur?.total_qty_fisik}
              />
            </FormGroup>
            <FormGroup>
              <Label className="form-control-label">Total Harga Fisik</Label>
              <Input
                disabled
                type="text"
                value={props.dataPoRetur?.total_price_fisik}
              />
            </FormGroup>
            <FormGroup>
              <Label className="form-control-label">Item or Money</Label>
              <Input
                disabled
                type="text"
                value={
                  props.dataPoRetur?.item_or_money === 1 ? 'Item' : 'Money'
                }
              />
            </FormGroup>
          </div>
        )}
      </div>
      <div className="modal-footer">
        <Button
          color="info"
          data-dismiss="modal"
          type="button"
          block
          onClick={props.onCloseDetail}
        >
          Tutup
        </Button>
      </div>
    </Modal>
  );
}
