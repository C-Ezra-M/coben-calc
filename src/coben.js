import shuffle from "lodash/shuffle";
import { enumerate, permutations, range } from "itertools";

function simulate(settings) {
    const { currentScores, rewards } = settings;
    for (let [i, s] of enumerate(currentScores)) {
        s.addedScore = rewards[i];
    }
    const sortedScores = currentScores.toSorted((a, b) => a.score() - b.score())
    for (let i of range(settings.eliminations)) {
        sortedScores[i].eliminations += 1;
    }
}

function cobenAlgorithm(settings) {
    const { currentScores, systematic, simulations, eliminations, rewards } = settings
    const rewardsIter = (
        systematic
        ? permutations(rewards)
        : shuffleIter(rewards, simulations)
    );
    let simCount = 0;
    const simulationsFivePercent = Math.floor(simulations / 20);
    for (let rewardList of rewardsIter) {
        simulate({
            currentScores, eliminations, rewards: rewardList
        })
        simCount += 1;
        if (simCount === simulations || simCount % simulationsFivePercent === 0) {
            console.log(`simulation: ${simCount}`)
        }
    }
}

/**
 * Iterator that yields shuffled arrays.
 * 
 * @param {IterableIterator} iter The iterable to shuffle.
 * @param {number} count The number of shuffled arrays to yield.
 * @yields {T[]} The shuffled array.
 */
function* shuffleIter(iter, count) {
    let array = [...iter]
    for (let _ of range(count)) {
        yield shuffle(array)
    }
}

export { simulate, cobenAlgorithm }