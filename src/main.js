import { cobenAlgorithm } from "./coben.js";
import { chain, zip, repeat, take, sum } from "itertools";
import factorial from "factorial";

import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
class Athlete {
    constructor(name, initialScore) {
        this.name = name
        this.initialScore = initialScore
        this.addedScore = 0
        this.eliminations = 0
    }
    score() {
        return this.initialScore + this.addedScore
    }
}

function calculate(data) {
    // COMPAT Firefox and Safari don't yet support Iterator helpers, so I have to use eager itertools
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator#browser_compatibility
    console.group("COBEN simulation run info");
    const currentScores = zip(data.contestants, data.scores).map(e => new Athlete(e[0], Number.parseInt(e[1])))
    const rewards = take(currentScores.length, chain(data.rewards.map(e => Number.parseInt(e)), repeat(0, currentScores.length)))
    // using valueOf because Mavo properties are proxies, hence they have to use objects
    // (since you can't proxy primitives)
    const systematic = data.systematic.valueOf();
    const { eliminations } = data;
    let { simulations } = data;
    console.log(`Simulations declared: ${simulations}`);

    if (systematic) {
        simulations = factorial(currentScores.length)
    } else {
        simulations = Math.min(simulations, factorial(currentScores.length))
    }
    console.log(`Simulations actually running: ${simulations}`);
    console.time("Algorithm run time");
    cobenAlgorithm({
        currentScores,
        rewards,
        systematic,
        simulations,
        eliminations,
    })
    console.timeEnd("Algorithm run time");
    const totalSimulations = sum(currentScores.map(e => e.eliminations))
    const result = []
    for (let i of currentScores) {
        const coben = i.eliminations / totalSimulations * 100 * eliminations
        result.push({
            name: i.name,
            coben,
            immune: coben === 0,
        })
    }
    console.groupEnd("COBEN simulation run info");
    return result;
}

export { calculate }