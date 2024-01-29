import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupchatComponent } from './create-groupchat.component';

describe('CreateGroupchatComponent', () => {
  let component: CreateGroupchatComponent;
  let fixture: ComponentFixture<CreateGroupchatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateGroupchatComponent]
    });
    fixture = TestBed.createComponent(CreateGroupchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
