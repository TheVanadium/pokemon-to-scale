const toPokeAPIName = require("./pokename").toPokeAPIName;
const toEnglishName = require("./pokename").toEnglishName;

test("english to api, single word", () => {
    expect(toPokeAPIName("Vaporeon")).toBe("vaporeon");
    expect(toPokeAPIName("Pikachu")).toBe("pikachu");
});
test("english to api, mega", () => {
    expect(toPokeAPIName("Mega Charizard X")).toBe("charizard-mega-x");
    expect(toPokeAPIName("Mega Charizard Y")).toBe("charizard-mega-y");
    expect(toPokeAPIName("Mega Venusaur")).toBe("venusaur-mega");
});
test("english to api, gigantamax", () => {
    expect(toPokeAPIName("Gigantamax Flapple")).toBe("flapple-gmax");
    expect(toPokeAPIName("Gigantamax Appletun")).toBe("appletun-gmax");
});
test("english to api, alolan", () => {
    expect(toPokeAPIName("Alolan Raichu")).toBe("raichu-alola");
    expect(toPokeAPIName("Alolan Marowak")).toBe("marowak-alola");
});
test("english to api, hisuian", () => {
    expect(toPokeAPIName("Hisuian Zorua")).toBe("zorua-hisui");
    expect(toPokeAPIName("Hisuian Braviary")).toBe("braviary-hisui");
});
test("english to api, galarian", () => {
    expect(toPokeAPIName("Galarian Slowpoke")).toBe("slowpoke-galar");
    expect(toPokeAPIName("Galarian Meowth")).toBe("meowth-galar");
});

test("api to english, single word", () => {
    expect(toEnglishName("vaporeon")).toBe("Vaporeon");
    expect(toEnglishName("pikachu")).toBe("Pikachu");
});
test("api to english, mega", () => {
    expect(toEnglishName("charizard-mega-x")).toBe("Mega Charizard X");
    expect(toEnglishName("charizard-mega-y")).toBe("Mega Charizard Y");
    expect(toEnglishName("venusaur-mega")).toBe("Mega Venusaur");
});
test("api to english, gigantamax", () => {
    expect(toEnglishName("flapple-gmax")).toBe("Gigantamax Flapple");
    expect(toEnglishName("appletun-gmax")).toBe("Gigantamax Appletun");
});
test("api to english, alolan", () => {
    expect(toEnglishName("raichu-alola")).toBe("Alolan Raichu");
    expect(toEnglishName("marowak-alola")).toBe("Alolan Marowak");
});
test("api to english, hisuian", () => {
    expect(toEnglishName("zorua-hisui")).toBe("Hisuian Zorua");
    expect(toEnglishName("braviary-hisui")).toBe("Hisuian Braviary");
});
test("api to english, galarian", () => {
    expect(toEnglishName("slowpoke-galar")).toBe("Galarian Slowpoke");
    expect(toEnglishName("meowth-galar")).toBe("Galarian Meowth");
});
