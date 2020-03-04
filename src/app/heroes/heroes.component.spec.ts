import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs";

describe("HeroesComponent", () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: "SpiderDude", strength: 8 },
      { id: 2, name: "WonderfulWoman", strength: 24 },
      { id: 3, name: "SuperDude", strength: 55 }
    ];

    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero"
    ]);

    component = new HeroesComponent(mockHeroService);
  });

  describe("delete", () => {
    it("should decrease number of heroes by one", () => {
      mockHeroService.deleteHero.and.returnValue(of(true));

      component.heroes = HEROES;
      component.delete(HEROES[2]);

      expect(component.heroes.length).toBe(2);
    });

    it("should remove the correct hero from the list", () => {
      //arrange
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;
      let remainingHeroes = HEROES.slice(0, 2);

      //act
      component.delete(HEROES[2]);

      //assert
      expect(component.heroes).toEqual(remainingHeroes);
    });

    it("should call deleteHero with the correct hero", () => {
      //arrange
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      //act
      component.delete(HEROES[2]);

      //assert
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    });
  });
});
