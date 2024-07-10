import { simulate, cobenAlgorithm } from "./coben.js";
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import { chain, zip, repeat, take, sum } from "itertools";
import factorial from "factorial";

function calculate(data) {
    // COMPAT Firefox and Safari don't yet support Iterator helpers, so I have to use eager itertools
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator#browser_compatibility
    console.group("COBEN simulation run info");
    const currentScores = zip(data.contestants, data.scores).map(e => ({name: e[0], score: Number.parseInt(e[1])}))
    const rewards = take(currentScores.length, chain(data.rewards.map(e => Number.parseInt(e)), repeat(0, currentScores.length)))
    const systematic = data.systematic.valueOf(); // using valueOf because Mavo properties are proxies
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
    const counts = cobenAlgorithm({
        currentScores,
        rewards,
        systematic,
        simulations,
        eliminations,
    })
    console.timeEnd("Algorithm run time");
    const countsKeys = data.contestants;
    const totalSimulations = sum(Object.values(counts))
    const result = []
    for (let i of countsKeys) {
        if (!Object.hasOwn(counts, i)) {
            result.push({
                name: i,
                coben: 0,
                immune: true,
            })
        } else {
            result.push({
                name: i,
                coben: counts[i] / totalSimulations * 100 * eliminations,
                immune: false,
            })
        }
    }
    console.groupEnd("COBEN simulation run info");
    return result;
}

export { calculate }