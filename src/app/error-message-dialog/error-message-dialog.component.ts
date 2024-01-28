import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-message-dialog',
  templateUrl: './error-message-dialog.component.html',
  styleUrl: './error-message-dialog.component.scss'
})
export class ErrorMessageDialogComponent {
constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
