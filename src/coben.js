import sample from "lodash/sampleSize"
import deepClone from "lodash/cloneDeep"
import { enumerate, permutations, range } from "itertools";

function simulate(settings) {
    const currentScores = deepClone(settings.currentScores)
    let rewards = settings.rewards;
    if (!settings.systematic) {
        rewards = sample(rewards, rewards.length)
    }
    for (let [i, s] of enumerate(currentScores)) {
        s.score += rewards[i];
    }
    return currentScores.toSorted((a, b) => b.score - a.score).slice(-settings.eliminations).map(e => e.name)
}

function cobenAlgorithm(settings) {
    const { currentScores, systematic, simulations, eliminations, rewards } = settings
    let victims = []
    const rewardsIter = permutations(rewards)
    // TODO DRYfy this section
    if (systematic) {
        for (let rewardList of rewardsIter) {
            victims = victims.concat(simulate({
                currentScores, systematic, eliminations, rewards: rewardList
            }))
        }
    } else {
        for (let _ of range(simulations)) {
            victims = victims.concat(simulate({
                currentScores, systematic, eliminations, rewards
            }))
        }
    }

    return getCounts(victims)
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