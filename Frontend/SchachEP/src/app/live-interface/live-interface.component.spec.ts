import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveInterfaceComponent } from './live-interface.component';

describe('LiveInterfaceComponent', () => {
  let component: LiveInterfaceComponent;
  let fixture: ComponentFixture<LiveInterfaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiveInterfaceComponent]
    });
    fixture = TestBed.createComponent(LiveInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
