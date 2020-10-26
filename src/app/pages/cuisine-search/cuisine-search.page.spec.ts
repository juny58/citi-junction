import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CuisineSearchPage } from './cuisine-search.page';

describe('CuisineSearchPage', () => {
  let component: CuisineSearchPage;
  let fixture: ComponentFixture<CuisineSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuisineSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CuisineSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
