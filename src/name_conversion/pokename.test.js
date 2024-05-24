const toPokeAPIName = require("./pokename").toPokeAPIName;
const toEnglishName = require("./pokename").toEnglishName;

test("english to api, single word", () => {
    expect(toPokeAPIName("Vaporeon")).toBe("vaporeon");
    expect(toPokeAPIName("Pikachu")).toBe("pikachu");
});
test("english to api, special characters", () => {
    expect(toPokeAPIName("Farfetch'd")).toBe("farfetchd");
    expect(toPokeAPIName("Sirfetch'd")).toBe("sirfetchd");
    expect(toPokeAPIName("Nidoran Female")).toBe("nidoran-f");
    expect(toPokeAPIName("Nidoran Male")).toBe("nidoran-m");
    expect(toPokeAPIName("Flabébé")).toBe("flabebe");
    expect(toPokeAPIName("Mr. Mime")).toBe("mr-mime");
    expect(toPokeAPIName("Mime Jr.")).toBe("mime-jr");
    expect(toPokeAPIName("Mr. Rime")).toBe("mr-rime");
    expect(toPokeAPIName("Type: Null")).toBe("type-null");
});
test("english to api, normal spaced", () => {
    expect(toPokeAPIName("Tapu Koko")).toBe("tapu-koko");
    expect(toPokeAPIName("Tapu Lele")).toBe("tapu-lele");
    expect(toPokeAPIName("Scream Tail")).toBe("scream-tail");
    expect(toPokeAPIName("Flutter Mane")).toBe("flutter-mane");
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
test("api to english, special characters", () => {
    expect(toEnglishName("farfetchd")).toBe("Farfetch'd");
    expect(toEnglishName("sirfetchd")).toBe("Sirfetch'd");
    expect(toEnglishName("nidoran-f")).toBe("Nidoran Female");
    expect(toEnglishName("nidoran-m")).toBe("Nidoran Male");
    expect(toEnglishName("flabebe")).toBe("Flabébé");
    expect(toEnglishName("mr-mime")).toBe("Mr. Mime");
    expect(toEnglishName("mime-jr")).toBe("Mime Jr.");
    expect(toEnglishName("mr-rime")).toBe("Mr. Rime");
    expect(toEnglishName("type-null")).toBe("Type: Null");
});
test("api to english, hyphenated", () => {
    expect(toEnglishName("jangmo-o")).toBe("Jangmo-o");
    expect(toEnglishName("hakamo-o")).toBe("Hakamo-o");
    expect(toEnglishName("ho-oh")).toBe("Ho-Oh");
    expect(toEnglishName("porygon-z")).toBe("Porygon-Z");
});
test("api to english, normal spaced", () => {
    expect(toEnglishName("tapu-koko")).toBe("Tapu Koko");
    expect(toEnglishName("tapu-lele")).toBe("Tapu Lele");
    expect(toEnglishName("scream-tail")).toBe("Scream Tail");
    expect(toEnglishName("flutter-mane")).toBe("Flutter Mane");
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
