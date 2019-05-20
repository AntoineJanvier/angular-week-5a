import {Pokemon} from "./models/pokemon";
import {Attack} from "./models/attack";

function fight(pokemon1: Pokemon, pokemon2: Pokemon) {
    console.log('Begin fight');
    let i = pokemon1.isFasterThan(pokemon2) ? 0 : 1;
    while (pokemon1.isAlive && pokemon2.isAlive) {
        if (i % 2 === 0) {
            pokemon1.attack(pokemon2);
        } else {
            pokemon2.attack(pokemon1);
        }
        i++;
    }

    console.log('Fight end');
}

// Pokemons
let evoli = new Pokemon('Evoli', 150);
let groudon = new Pokemon('Groudon', 80);

// Attacks
evoli.addAttacks([
    new Attack('Shadow Ball', 100),
    new Attack('Tails', 70),
    new Attack('Wonder Tails', 85)
]);
groudon.addAttacks([
    new Attack('Lava', 120),
    new Attack('Earthquake', 110)
]);


fight(evoli, groudon);
