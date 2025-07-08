import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSearch } from './contact-search';

describe('ContactSearch', () => {
  let component: ContactSearch;
  let fixture: ComponentFixture<ContactSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
