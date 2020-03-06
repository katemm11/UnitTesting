import { HeroesComponent } from './heroes.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroService } from '../hero.service';
import { Input, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { Hero } from '../hero';
import { By } from '@angular/platform-browser';
import { HeroComponent } from '../hero/hero.component';

describe('HeroesComponent (deep tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 88 },
      { id: 3, name: 'SuperDude', strength: 55 }
    ];

    mockHeroService = jasmine.createSpyObj([
      'getHeroes',
      'addHero',
      'deletehero'
    ]);

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });
  it('should render each hero as a HeroComponent', () => {
    //arrange
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    //act (run ngOnInit)
    fixture.detectChanges();
    const heroComponentDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );

    //assert
    expect(heroComponentDEs.length).toBe(3);
    for (let i = 0; i < heroComponentDEs.length; i++) {
      expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });

  //triggering events on elements
  it(`should call heroService.deleteHero when the Hero Component's delete button
   is clicked`, () => {
    spyOn(fixture.componentInstance, 'delete');

    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    // (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);
    heroComponents[0].triggerEventHandler('delete', null);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it('should add a new hero to the hero list when the add button is clicked', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const name = 'Ms. Ice';
    mockHeroService.addHero.and.returnValue(
      of({ id: 5, name: name, strength: 40 })
    );
    const inputElement = fixture.debugElement.query(By.css('input'))
      .nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

    inputElement.value = name;
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement
      .textContent;
    expect(heroText).toContain(name);
  });
});
