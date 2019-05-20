import {Pokemon} from '../models/pokemon';
import {Attack} from "../models/attack";

describe('Names', () => {
    it('name assertion should be equal to Evoli', () => {
        let evoli = new Pokemon('Evoli');
        expect(evoli.name).toBe('Evoli');
    });
    it('name assertion should be equal to Groudon', () => {
        let evoli = new Pokemon('Groudon');
        expect(evoli.name).toBe('Groudon');
    });
});

describe('Speed', () => {
    it('should be faster than Groudon', () => {
        let evoli = new Pokemon('Evoli', 30);
        let groudon = new Pokemon('Groudon', 10);
        console.log(evoli.speed, groudon.speed);
        expect(evoli.isFasterThan(groudon)).toBe(true);
    });
    it('should not be faster than Evoli', () => {
        let evoli = new Pokemon('Evoli', 30);
        let groudon = new Pokemon('Groudon', 10);
        expect(groudon.isFasterThan(evoli)).toBe(false);
    });
    it('should not be faster than Evoli', () => {
        let evoli = new Pokemon('Evoli', 30);
        let groudon = new Pokemon('Groudon', 30);
        expect(groudon.isFasterThan(evoli)).toBe(false);
    });
});

describe('Attacks', () => {
    it('should not have attacks', () => {
        let evoli = new Pokemon('Evoli', 30);
        expect(evoli.attacks.length).toBe(0);
    });
    it('should not have a last attack used', () => {
        let evoli = new Pokemon('Evoli', 30);
        expect(evoli.lastAttackUsed).toBe(undefined);
    });
    it('should add one attack', () => {
        let evoli = new Pokemon('Evoli', 30);
        expect(evoli.attacks.length).toBe(0);
        let attack = new Attack('Tails', 100);
        evoli.addAttack(attack);
        expect(evoli.attacks.length).toBe(1);
    });
    it('should add three attack', () => {
        let evoli = new Pokemon('Evoli', 30);
        expect(evoli.attacks.length).toBe(0);
        let attack1 = new Attack('Tails', 100);
        let attack2 = new Attack('Shadow Ball', 80);
        let attack3 = new Attack('Sharp Attack', 85);
        evoli.addAttacks([attack1, attack2, attack3]);
        expect(evoli.attacks.length).toBe(3);
    });
    it('last attack used should be Shadow Ball', () => {
        let evoli = new Pokemon('Evoli', 30);
        let groudon = new Pokemon('Groudon', 10);
        let attack = new Attack('Shadow Ball', 80);
        evoli.attack(groudon, attack, 'TEST');
        expect(evoli.lastAttackUsed.name).toBe(attack.name);
    });
    it('should have Shadow Ball attack in list', () => {
        let evoli = new Pokemon('Evoli', 30);
        evoli.addAttacks([
            new Attack('Tails', 100),
            new Attack('Shadow Ball', 80),
            new Attack('Sharp Attack', 85)
        ]);
        expect(evoli.haveAttack('Shadow Ball')).toBe(true);
    });
    it('should not have Shadow Ball attack in list', () => {
        let evoli = new Pokemon('Evoli', 30);
        evoli.addAttacks([
            new Attack('Tails', 100),
            new Attack('Sharp Attack', 85)
        ]);
        expect(evoli.haveAttack('Shadow Ball')).toBe(false);
    });
    it('should get an attack in pokemon\'s attack list', () => {
        let evoli = new Pokemon('Evoli', 30);
        let attack1 = new Attack('Tails', 100);
        let attack2 = new Attack('Shadow Ball', 80);
        let attack3 = new Attack('Sharp Attack', 85);
        evoli.addAttacks([attack1, attack2, attack3]);
        let randomAttack = evoli.randomAttack;
        expect(evoli.attacks.indexOf(randomAttack) > -1).toBe(true);
    });
});

describe('Life', () => {
    it('should have 500pv by default', () => {
        let evoli = new Pokemon('Evoli');
        expect(evoli.life).toBe(500);
    });
    it('should have 200pv', () => {
        let evoli = new Pokemon('Evoli');
        evoli.life = 200;
        expect(evoli.life).toBe(200);
    });
    it('should be alive', () => {
        let evoli = new Pokemon('Evoli');
        expect(evoli.isAlive).toBe(true);
    });
    it('should be dead', () => {
        let evoli = new Pokemon('Evoli');
        evoli.life = 0;
        expect(evoli.isAlive).toBe(false);
    });
});
