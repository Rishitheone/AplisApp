import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorEditComponent } from './editor-edit.component';

describe('EditorEditComponent', () => {
  let component: EditorEditComponent;
  let fixture: ComponentFixture<EditorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
