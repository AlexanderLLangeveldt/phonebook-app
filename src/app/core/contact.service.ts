import { Injectable } from '@angular/core';
import { Contact } from './models/contact.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private contacts: Contact[] = [];
  private contactsSubject = new BehaviorSubject<Contact[]>([]);
  private tempIdCounter = -1;

  constructor() {
    this.contactsSubject.next(this.contacts);
  }

  private generateTempId(): number {
    return this.tempIdCounter--;
  }

  getContacts(): Observable<Contact[]> {
    return this.contactsSubject.asObservable();
  }

  addContact(contact: Contact): void {
    // If contact has an id, treat it as update
    if (contact.id != null) {
      this.updateContact(contact);
      return;
    }

    if (this.contacts.some(c => c.phone === contact.phone)) {
      throw new Error('Phone number must be unique');
    }

    const newContact: Contact = {
      ...contact,
      id: this.generateTempId(),
    };

    this.contacts.push(newContact);
    this.contactsSubject.next([...this.contacts]);
  }

  updateContact(updated: Contact): void {
    const index = this.contacts.findIndex(c => c.id === updated.id);

    if (index === -1) return;

    const existing = this.contacts[index];
    const phoneChanged = existing.phone !== updated.phone;
    const phoneIsTaken = this.contacts.some(c => c.phone === updated.phone && c.id !== updated.id);

    if (phoneChanged && phoneIsTaken) {
      throw new Error('Phone number must be unique');
    }

    this.contacts[index] = { ...existing, ...updated };
    this.contactsSubject.next([...this.contacts]);
  }

  deleteContact(id: number): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contacts = this.contacts.filter(c => c.id !== id);
      this.contactsSubject.next([...this.contacts]);
    }
  }

  searchContacts(term: string): Contact[] {
    const lower = term.toLowerCase();
    return this.contacts.filter(c =>
      c.name.toLowerCase().includes(lower) || c.phone.includes(term)
    );
  }

  getContactById(id: number): Contact | undefined {
    return this.contacts.find(c => c.id === id);
  }
}
