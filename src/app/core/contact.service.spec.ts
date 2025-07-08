// import { TestBed } from '@angular/core/testing';
// import { ContactService } from './contact.service';
// import { Contact } from './models/contact.model';

// describe('ContactService', () => {
//   let service: ContactService;

//   function createContact(name: string, phone: string, email?: string): Contact {
//     return { name, phone, email };
//   }

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(ContactService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   it('should add a new contact', (done) => {
//     const contact = createContact('Alice', '1234567890');

//     service.addContact(contact);

//     const sub = service.getContacts().subscribe(contacts => {
//       expect(contacts.length).toBe(1);
//       expect(contacts[0].name).toBe('Alice');
//       expect(contacts[0].id).toBeDefined();
//       sub.unsubscribe();
//       done();
//     });
//   });

//   it('should update an existing contact', (done) => {
//     const contact = createContact('Bob', '1112223333');

//     service.addContact(contact);

//     const sub1 = service.getContacts().subscribe(initialContacts => {
//       const updated: Contact = {
//         ...initialContacts[0],
//         name: 'Bobby',
//       };

//       service.updateContact(updated);

//       const sub2 = service.getContacts().subscribe(updatedContacts => {
//         expect(updatedContacts[0].name).toBe('Bobby');
//         sub1.unsubscribe();
//         sub2.unsubscribe();
//         done();
//       });
//     });
//   });

//   it('should delete a contact', (done) => {
//     const contact = createContact('Charlie', '9998887777');

//     spyOn(window, 'confirm').and.returnValue(true);
//     service.addContact(contact);

//     const sub1 = service.getContacts().subscribe(contacts => {
//       const toDelete = contacts[0];
//       service.deleteContact(toDelete.id!);

//       const sub2 = service.getContacts().subscribe(finalContacts => {
//         expect(finalContacts.length).toBe(0);
//         sub1.unsubscribe();
//         sub2.unsubscribe();
//         done();
//       });
//     });
//   });

//   it('should throw error on duplicate phone number when adding', () => {
//     const contact1 = createContact('Alice', '5555');
//     const contact2 = createContact('Bob', '5555');

//     service.addContact(contact1);
//     expect(() => service.addContact(contact2)).toThrowError('Phone number must be unique');
//   });

//   it('should throw error on duplicate phone number when updating', (done) => {
//     const contact1 = createContact('Alice', '5555');
//     const contact2 = createContact('Bob', '6666');

//     service.addContact(contact1);
//     service.addContact(contact2);

//     const sub = service.getContacts().subscribe(contacts => {
//       const toUpdate = { ...contacts[1], phone: '5555' }; // duplicate
//       expect(() => service.updateContact(toUpdate)).toThrowError('Phone number must be unique');
//       sub.unsubscribe();
//       done();
//     });
//   });
// });
