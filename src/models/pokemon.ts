import {Attack} from "./attack";

export class Pokemon {

    currentSpeed: number;
    criticalHitRate: number;
    attacks: Attack[];
    attackUsed: Attack[];
    life: number;

    constructor(public name: string, public initialSpeed: number = 0, life: number = 500) {
        this.currentSpeed = initialSpeed;
        this.criticalHitRate = Math.floor(Math.round(this.currentSpeed / 2));
        this.attacks = [];
        this.attackUsed = [];
        this.life = life;
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

    attack(pokemon: Pokemon, attack: Attack = this.randomAttack, logMode: string = ''): void {
        this.attackUsed.push(attack);
        pokemon.life -= attack.damages;
        if (logMode === '') console.log(`${this.name} attack ${pokemon.name} with ${attack.name} for ${attack.damages} !`);
        if (!pokemon.isAlive) if (logMode === '') console.log(`${pokemon.name} died.`);
    }

    get randomAttack() {
        return this.attacks[Math.floor(Math.random() * this.attacks.length)];
    }

    get speed(): number {
        return this.initialSpeed * this.currentSpeed;
    }

    get lastAttackUsed(): Attack {
        return this.attackUsed.length > 0 ? this.attackUsed[this.attackUsed.length - 1] : undefined;
    }

    get isAlive(): boolean {
        return this.life > 0;
    }
}
