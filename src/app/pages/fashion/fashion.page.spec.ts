import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FashionPage } from './fashion.page';

describe('FashionPage', () => {
  let component: FashionPage;
  let fixture: ComponentFixture<FashionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FashionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FashionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
