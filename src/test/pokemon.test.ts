import {Pokemon} from '../models/pokemon';
import {Attack} from "../models/attack";
import {Stage} from "../models/stage";

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
        let evoli = new Pokemon('Evoli');
        expect(evoli.attacks.length).toBe(0);
    });
    it('should not have a last attack used', () => {
        let evoli = new Pokemon('Evoli');
        expect(evoli.lastAttackUsed).toBe(undefined);
    });
    it('should add one attack', () => {
        let evoli = new Pokemon('Evoli');
        expect(evoli.attacks.length).toBe(0);
        let attack = new Attack('Tails');
        evoli.addAttack(attack);
        expect(evoli.attacks.length).toBe(1);
    });
    it('should add three attack', () => {
        let evoli = new Pokemon('Evoli');
        expect(evoli.attacks.length).toBe(0);
        let attack1 = new Attack('Tails');
        let attack2 = new Attack('Shadow Ball');
        let attack3 = new Attack('Sharp Attack');
        evoli.addAttacks([attack1, attack2, attack3]);
        expect(evoli.attacks.length).toBe(3);
    });
    it('last attack used should be Shadow Ball', () => {
        let evoli = new Pokemon('Evoli');
        let groudon = new Pokemon('Groudon');
        let attack = new Attack('Shadow Ball');
        evoli.attack(groudon, attack);
        expect(evoli.lastAttackUsed.name).toBe(attack.name);
    });
    it('should have Shadow Ball attack in list', () => {
        let evoli = new Pokemon('Evoli');
        evoli.addAttacks([
            new Attack('Tails'),
            new Attack('Shadow Ball'),
            new Attack('Sharp Attack')
        ]);
        expect(evoli.haveAttack('Shadow Ball')).toBe(true);
    });
    it('should not have Shadow Ball attack in list', () => {
        let evoli = new Pokemon('Evoli');
        evoli.addAttacks([
            new Attack('Tails'),
            new Attack('Sharp Attack')
        ]);
        expect(evoli.haveAttack('Shadow Ball')).toBe(false);
    });
    it('should get an attack in pokemon\'s attack list', () => {
        let evoli = new Pokemon('Evoli');
        let attack1 = new Attack('Tails');
        let attack2 = new Attack('Shadow Ball');
        let attack3 = new Attack('Sharp Attack');
        evoli.addAttacks([attack1, attack2, attack3]);
        let randomAttack = evoli.randomAttack;
        expect(evoli.attacks.indexOf(randomAttack) > -1).toBe(true);
    });
    it('Evoli should inflict 80 damages to Groudon', () => {
        let evoli = new Pokemon('Evoli');
        let groudon = new Pokemon('Groudon', 30, 100);
        evoli.addAttack(new Attack('Shadow Ball', 80, 80));
        evoli.attack(groudon);
        expect(groudon.life).toBe(20);
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
    it('Evoli should kill Groudon', () => {
        let evoli = new Pokemon('Evoli', 30);
        let groudon = new Pokemon('Groudon', 30, 100);
        evoli.addAttack(new Attack('Shadow Ball', 80, 800));
        evoli.attack(groudon);
        expect(groudon.isAlive).toBe(false);
    });
    it('Evoli should not kill Groudon', () => {
        let evoli = new Pokemon('Evoli', 30);
        let groudon = new Pokemon('Groudon', 30, 100);
        evoli.addAttack(new Attack('Shadow Ball', 80, 80));
        evoli.attack(groudon);
        expect(groudon.isAlive).toBe(true);
    });
});

describe('Speed', () => {
    it('should have speed 30', () => {
        let evoli = new Pokemon('Evoli', 30);
        expect(evoli.speed).toBe(30);
    });
    it('should have speed 15 if paralyzed', () => {
        let evoli = new Pokemon('Evoli', 30);
        evoli.paralyzed = true;
        expect(evoli.speed).toBe(15);
    });
    it('should have speed 30 if paralyzed but have Quick Feet ability', () => {
        let evoli = new Pokemon('Evoli', 30);
        evoli.paralyzed = true;
        evoli.addAttack(new Attack('Quick Feet'));
        expect(evoli.speed).toBe(30);
    });
    it('should have speed 45 if have a major status ailment and have Quick Feet ability', () => {
        let evoli = new Pokemon('Evoli', 30);
        evoli.currentStatStage = Stage.GreatlyFell;
        evoli.addAttack(new Attack('Quick Feet'));
        expect(evoli.speed).toBe(45);
    });
});
