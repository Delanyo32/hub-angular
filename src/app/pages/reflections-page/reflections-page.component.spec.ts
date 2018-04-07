import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReflectionsPageComponent } from './reflections-page.component';

describe('ReflectionsPageComponent', () => {
  let component: ReflectionsPageComponent;
  let fixture: ComponentFixture<ReflectionsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReflectionsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReflectionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
