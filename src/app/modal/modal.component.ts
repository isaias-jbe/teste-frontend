import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Endereco } from '@brunoc/ngx-viacep';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() enderecos: Endereco[];
  form: FormGroup;
  title: string;
  itemSelected = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.title = data.title;
    this.enderecos = data.enderecos;
    this.snackBar.open(
      `${this.enderecos.length} Endereços encontrados!`,
      'OK',
      {
        duration: 5000,
        verticalPosition: 'top'
      }
    );
  }

  onNgModelChange(event) {
    this.itemSelected = true;
    this.form = this.fb.group({
      endereco: [event, []]
    });
  }

  save() {
    if (this.itemSelected) {
      this.dialogRef.close(this.form.value);
    } else {
      this.snackBar.open('Nenhuma endereço selecionado!', 'OK', {
        duration: 5000,
        verticalPosition: 'top'
      });
    }

    document.getElementById('btn_save').setAttribute('disabled', 'true');
  }

  close() {
    this.dialogRef.close();
  }
}
