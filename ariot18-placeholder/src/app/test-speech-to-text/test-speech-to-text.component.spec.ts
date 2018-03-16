import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSpeechToTextComponent } from './test-speech-to-text.component';

describe('TestSpeechToTextComponent', () => {
  let component: TestSpeechToTextComponent;
  let fixture: ComponentFixture<TestSpeechToTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSpeechToTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSpeechToTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
