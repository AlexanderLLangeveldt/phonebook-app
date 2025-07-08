import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../core/contact.service';
import { Contact } from '../../core/models/contact.model';
import { ContactForm } from '../contact-form/contact-form';

declare var $: any;

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, ContactForm],
  templateUrl: './contact-list.html',
  styleUrls: ['./contact-list.scss']
})
export class ContactList implements OnInit, AfterViewInit {
  contacts: Contact[] = [];
  showModal = false;
  selectedContact: Contact | null = null;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(data => {
      this.contacts = data;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      $('#contacts-table').DataTable();
    }, 0);
  }

  openAddModal() {
    this.selectedContact = null;
    this.showModal = true;
  }

  editContact(contact: Contact) {
    this.selectedContact = contact;
    this.showModal = true;
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id);
  }

  onFormSubmit(contact: Contact) {
    if (contact.id) {
      this.contactService.updateContact(contact);
    } else {
      this.contactService.addContact(contact);
    }
    this.showModal = false;
  }

  onCancel() {
    this.showModal = false;
  }
}
