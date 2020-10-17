import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FashionCategoryPage } from './fashion-category.page';

describe('FashionCategoryPage', () => {
  let component: FashionCategoryPage;
  let fixture: ComponentFixture<FashionCategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FashionCategoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FashionCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
