import {Attack} from "./attack";
import {Stage} from "./stage";

export class Pokemon {

    currentSpeed: number;
    criticalHitRate: number;
    attacks: Attack[];
    attackUsed: Attack[];
    life: number;
    currentStatStage: Stage;
    paralyzed: boolean;

    constructor(public name: string, public initialSpeed: number = 0, life: number = 500) {
        this.currentSpeed = initialSpeed;
        this.criticalHitRate = Math.floor(Math.round(this.currentSpeed / 2));
        this.attacks = [];
        this.attackUsed = [];
        this.life = life;
        this.paralyzed = false;
    }

    addAttack(attack: Attack): void {
        this.attacks.push(attack);
    }

    addAttacks(attacks: Attack[]): void {
        attacks.map(attack => this.addAttack(attack));
    }

    isFasterThan(pokemon: Pokemon): boolean {
        return this.speed > pokemon.speed;
    }

    attack(pokemon: Pokemon, attack: Attack = this.randomAttack): void {
        this.attackUsed.push(attack);
        pokemon.life -= attack.damages;
        console.log(`${this.name} attack ${pokemon.name} with ${attack.name} for ${attack.damages} !`);
        if (!pokemon.isAlive) console.log(`${pokemon.name} died.`);
    }

    haveAttack(name: string): boolean {
        for (let attack of this.attacks) {
            if (attack.name === name) {
                return true;
            }
        }
        return false;
    }

    get randomAttack() {
        return this.attacks[Math.floor(Math.random() * this.attacks.length)];
    }

    get lastAttackUsed(): Attack {
        return this.attackUsed.length > 0 ? this.attackUsed[this.attackUsed.length - 1] : undefined;
    }

    get isAlive(): boolean {
        return this.life > 0;
    }

    get speed(): number {
        let speed = this.initialSpeed;
        if (this.paralyzed && !this.haveAttack('Quick Feet')) {
            speed /= 2;
        }
        if (this.currentStatStage < 0 && this.haveAttack('Quick Feet')) {
            speed *= 1.5;
        }
        return speed;
    }
}
