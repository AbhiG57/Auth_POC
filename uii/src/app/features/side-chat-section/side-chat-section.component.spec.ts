import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideChatSectionComponent } from './side-chat-section.component';

describe('SideChatSectionComponent', () => {
  let component: SideChatSectionComponent;
  let fixture: ComponentFixture<SideChatSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideChatSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideChatSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
