import shuffle from "lodash/shuffle";
import cloneModule from "rfdc"
import deepClone from "lodash/cloneDeep"
import { enumerate, permutations, range } from "itertools";

const clone = cloneModule({
    proto: true,
    constructorHandlers: [
        [String, (s) => s.valueOf()],
    ]
})

function simulate(settings) {
    const currentScores = clone(settings.currentScores)
    //console.log(currentScores);
    const { rewards } = settings;
    for (let [i, s] of enumerate(currentScores)) {
        s.score += rewards[i];
    }
    currentScores.sort((a, b) => a.score - b.score)
    return currentScores.slice(0, settings.eliminations).map(e => e.name)
}

function cobenAlgorithm(settings) {
    const { currentScores, systematic, simulations, eliminations, rewards } = settings
    const victims = []
    const rewardsIter = (
        systematic
        ? permutations(rewards)
        : shuffleIter(rewards, simulations)
    );

    for (let rewardList of rewardsIter) {
        victims.splice(0, 0, ...simulate({
            currentScores, eliminations, rewards: rewardList
        }))
        console.count("simulation")
    }
    console.countReset("simulation")

    return getCounts(victims)
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

// I wanted to use Map, but String object equality is not implemented in JS, only primitive string equality is
// String objects get coerced into primitves when used as object keys
function getCounts(array) {
    const counts = {};

    for (let i of array) {
        if (Object.hasOwn(counts, i)) {
            counts[i] += 1;
        } else {
            counts[i] = 1;
        }
    }

    return counts
}

export { simulate, cobenAlgorithm }