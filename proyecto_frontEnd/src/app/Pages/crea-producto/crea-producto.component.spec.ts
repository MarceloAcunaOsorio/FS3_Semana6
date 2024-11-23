import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaProductoComponent } from './crea-producto.component';

describe('CreaProductoComponent', () => {
  let component: CreaProductoComponent;
  let fixture: ComponentFixture<CreaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreaProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
