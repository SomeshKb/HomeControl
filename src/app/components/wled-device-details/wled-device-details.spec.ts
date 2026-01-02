import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WledDeviceDetails } from './wled-device-details';

describe('WledDeviceDetails', () => {
  let component: WledDeviceDetails;
  let fixture: ComponentFixture<WledDeviceDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WledDeviceDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WledDeviceDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
