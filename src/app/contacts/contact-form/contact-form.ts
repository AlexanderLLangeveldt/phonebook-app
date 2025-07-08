import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contact } from '../../core/models/contact.model';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.scss'],
})
export class ContactForm implements OnInit {
  @Input() contact: Contact | null = null;  // null for add, filled for edit
  @Output() formSubmit = new EventEmitter<Contact>();
  @Output() cancel = new EventEmitter<void>();

  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      id: [this.contact?.id || null],
      name: [this.contact?.name || '', Validators.required],
      phone: [this.contact?.phone || '', Validators.required],
      email: [this.contact?.email || ''],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.formSubmit.emit(this.contactForm.value);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
