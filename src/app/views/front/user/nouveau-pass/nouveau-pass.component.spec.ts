import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauPassComponent } from './nouveau-pass.component';

describe('NouveauPassComponent', () => {
  let component: NouveauPassComponent;
  let fixture: ComponentFixture<NouveauPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouveauPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouveauPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
