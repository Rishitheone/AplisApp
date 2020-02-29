import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDispalyComponent } from './category-dispaly.component';

describe('CategoryDispalyComponent', () => {
  let component: CategoryDispalyComponent;
  let fixture: ComponentFixture<CategoryDispalyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryDispalyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDispalyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
