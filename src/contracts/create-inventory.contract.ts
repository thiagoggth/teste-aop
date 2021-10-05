import { Validator } from '../infra/validator';
import { Notifiable } from './../infra/notifiable';
import { Inventory } from './../models/inventory';

interface CreateInventoryDto extends Inventory {
  files: any[];
}

export class CreateInventoryContract extends Notifiable {
  private _dto: CreateInventoryDto;
  private _validator: Validator;

  constructor(dto: CreateInventoryDto) {
    super();
    this._dto = dto;
    this._validator = new Validator();
  }

  validate(): boolean {
    this.validateIdentification();
    this.validateLocation();
    this.validateActiveType();
    this.validateAttachment();
    this.validateActiveSubType();

    this.addReports(this._validator.reports);
    return this.isValid();
  }

  private validateIdentification = () => {
    const { tag, patrimonyNumber, serialNumber, description } = this._dto;

    const allIsNull = !(tag || patrimonyNumber || serialNumber || description);

    if (allIsNull) {
      this.addReport({
        name: 'identification',
        message: 'Informar um dos itens: Etiqueta, Número patrimônio, Número de série ou Descrição'
      });
    }
  };

  private validateLocation() {
    const { location } = this._dto;
    this._validator.isRequired(location, 'location', 'Informe uma localização');
    this._validator.isValidNumber(location?.id, 'location', 'Informe uma localização válida');
  }

  private validateActiveType() {
    const { activeType } = this._dto;
    this._validator.isRequired(activeType, 'activeType', 'Informe um ativo');
  }

  private validateActiveSubType() {
    const { activeSubType } = this._dto;
    this._validator.isRequired(activeSubType, 'activeSubType', 'Informe um Subtipo');
  }

  private validateAttachment() {
    const { files } = this._dto;

    if (!files || files.length === 0 ) {
      this.addReport({
        name: 'attachment',
        message: 'Inventário deve possuir pelo menos uma imagem'
      });
    }

    if (files) {
      for (const file of files) {
        const fileType = file.type.split('/')[1];
        if (fileType !== 'jpeg' && fileType !== 'jpg' && fileType !== 'png') {
          this.addReport({
            message: 'As imagem deve estar no formato jpg ou png',
            name: 'attachment'
          });
        }
      }
    }
  }
}
