import { simulate, cobenAlgorithm } from "./coben.js";
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import { chain, zip, repeat, take } from "itertools";

function calculate(data) {
    // COMPAT Firefox and Safari don't yet support Iterator helpers, so I have to use eager itertools
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator#browser_compatibility
    const currentScores = zip(data.contestants, data.scores).map(e => ({name: e[0], score: Number.parseInt(e[1])}))
    const rewards = take(currentScores.length, chain(data.rewards.map(e => Number.parseInt(e)), repeat(0, currentScores.length)))
    const { systematic, simulations, eliminations } = data;

    return cobenAlgorithm({
        currentScores,
        rewards,
        systematic,
        simulations,
        eliminations,
    })
}

export { calculate }