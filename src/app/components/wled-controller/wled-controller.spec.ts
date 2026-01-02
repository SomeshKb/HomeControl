import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WledController } from './wled-controller';

describe('WledController', () => {
  let component: WledController;
  let fixture: ComponentFixture<WledController>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WledController]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WledController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
