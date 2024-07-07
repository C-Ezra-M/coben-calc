import { simulate, cobenAlgorithm } from "./coben.js";
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import { chain, zip, repeat, take, sum } from "itertools";

function calculate(data) {
    // COMPAT Firefox and Safari don't yet support Iterator helpers, so I have to use eager itertools
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator#browser_compatibility
    const currentScores = zip(data.contestants, data.scores).map(e => ({name: e[0], score: Number.parseInt(e[1])}))
    const rewards = take(currentScores.length, chain(data.rewards.map(e => Number.parseInt(e)), repeat(0, currentScores.length)))
    const { systematic, simulations, eliminations } = data;

    const counts = cobenAlgorithm({
        currentScores,
        rewards,
        systematic,
        simulations,
        eliminations,
    })
    const countsKeys = Object.keys(counts);
    const totalSimulations = sum(Object.values(counts))
    const result = []
    for (let i of countsKeys) {
        result.push({
            name: i,
            coben: counts[i] / totalSimulations * 100,
            immune: counts[i] === 0,
        })
    }
    return result;
}

export { calculate }