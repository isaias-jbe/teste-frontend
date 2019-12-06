import { Component, OnInit } from '@angular/core';
import { NgxViacepService, Endereco, ErroCep } from '@brunoc/ngx-viacep';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';
import { ModalComponent } from 'src/app/modal/modal.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  address: Endereco[];
  addressForm: FormGroup;
  isLoading = false;
  constructor(
    private formBuilder: FormBuilder,
    private viacepSrv: NgxViacepService,
    public matDialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.addressForm = this.formBuilder.group({
      logradouro: ['', [Validators.required, Validators.minLength(5)]],
      localidade: ['Fortaleza', [Validators.required]],
      uf: ['CE', [Validators.required]],
      cep: '',
      bairro: '',
      complemento: '',
      ibge: ''
    });
  }

  getAddress(): void {
    this.isLoading = true;
    this.viacepSrv
      .buscarPorEndereco(
        this.uf.value,
        this.localidade.value,
        this.logradouro.value
      )
      .then((enderecos: Endereco[]) => {
        this.isLoading = false;
        if (enderecos.length === 1) {
          enderecos.map(data => {
            this.cep.setValue(data.cep);
            this.ibge.setValue(data.ibge);
            this.bairro.setValue(data.bairro);
            this.logradouro.setValue(data.logradouro);
            this.complemento.setValue(data.complemento);
          });
        } else if (enderecos.length > 1) {
          this.openDialog(enderecos);
        } else {
          this.snackBar.open('Nenhum endereço encontrado!', 'OK', {
            duration: 5000,
            verticalPosition: 'top'
          });
          this.logradouro.setValue('');
        }
        console.log(enderecos.length);
      })
      .catch((error: ErroCep) => {
        this.isLoading = false;
        this.snackBar.open(error.message, 'OK', {
          duration: 5000,
          verticalPosition: 'top'
        });
        console.log(error.message);
      });
  }

  openDialog(enderecos: Endereco[]) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Endereços encontrados',
      enderecos: [] = enderecos
    };

    this.matDialog.open(ModalComponent, dialogConfig);

    const dialogRef = this.matDialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      this.cep.setValue(data.endereco.cep);
      this.ibge.setValue(data.endereco.ibge);
      this.bairro.setValue(data.endereco.bairro);
      this.logradouro.setValue(data.endereco.logradouro);
      this.complemento.setValue(data.endereco.complemento);
    });
  }

  get uf(): FormControl {
    return this.addressForm.get('uf') as FormControl;
  }

  get cep(): FormControl {
    return this.addressForm.get('cep') as FormControl;
  }

  get ibge(): FormControl {
    return this.addressForm.get('ibge') as FormControl;
  }

  get bairro(): FormControl {
    return this.addressForm.get('bairro') as FormControl;
  }

  get localidade(): FormControl {
    return this.addressForm.get('localidade') as FormControl;
  }

  get logradouro(): FormControl {
    return this.addressForm.get('logradouro') as FormControl;
  }

  get complemento(): FormControl {
    return this.addressForm.get('complemento') as FormControl;
  }
}
