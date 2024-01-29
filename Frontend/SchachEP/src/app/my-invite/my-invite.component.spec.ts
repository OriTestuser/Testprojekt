import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInviteComponent } from './my-invite.component';

describe('MyInviteComponent', () => {
  let component: MyInviteComponent;
  let fixture: ComponentFixture<MyInviteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyInviteComponent]
    });
    fixture = TestBed.createComponent(MyInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
