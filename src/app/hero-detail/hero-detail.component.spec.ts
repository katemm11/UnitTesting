import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('HeroDetailComponent', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute;
  let mockHeroService;
  let mockLocation;

  beforeEach(() => {
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          }
        }
      }
    };

    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      imports: [FormsModule],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(
      of({ id: 2, name: 'Susan', strength: 4 })
    );
  });

  it('should render the hero name in an h2 tag', () => {
    //act
    fixture.detectChanges();

    //assert
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain(
      'SUSAN'
    );
  });

  it('should call updateHero when save is called', done => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    //act
    fixture.componentInstance.save();

    setTimeout(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
      done();
    }, 300);
  });
});
