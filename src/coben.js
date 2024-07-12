import shuffle from "lodash/shuffle";
import { enumerate, permutations, range } from "itertools";

function simulate(settings) {
    const { currentScores, rewards } = settings;
    for (let [i, s] of enumerate(currentScores)) {
        s.addedScore = rewards[i];
    }
    currentScores.sort((a, b) => a.score() - b.score())
    for (let i of range(settings.eliminations)) {
        currentScores[i].eliminations += 1;
    }
}

function cobenAlgorithm(settings) {
    const { currentScores, systematic, simulations, eliminations, rewards } = settings
    const rewardsIter = (
        systematic
        ? permutations(rewards)
        : shuffleIter(rewards, simulations)
    );

    for (let rewardList of rewardsIter) {
        simulate({
            currentScores, eliminations, rewards: rewardList
        })
        console.count("simulation")
    }
    console.countReset("simulation")
}

/**
 * Iterator that yields shuffled arrays.
 * 
 * @param {T[]} array The array to shuffle.
 * @param {number} count The number of shuffled arrays to yield.
 * @yields {T[]} The shuffled array.
 */
function* shuffleIter(array, count) {
    for (let _ of range(count)) {
        yield shuffle(array)
    }
}

export { simulate, cobenAlgorithm }