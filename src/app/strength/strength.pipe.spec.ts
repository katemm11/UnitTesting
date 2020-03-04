import { StrengthPipe } from "./strength.pipe";

describe("strength pipe", () => {
  it("should display weak if strength is 5", () => {
    //arrange
    let pipe = new StrengthPipe();

    let val = pipe.transform(5);

    expect(val).toEqual("5 (weak)");
  });

  it("should display strong if strength is 10", () => {
    let pipe = new StrengthPipe();

    let val = pipe.transform(10);

    expect(val).toEqual("10 (strong)");
  });
});
