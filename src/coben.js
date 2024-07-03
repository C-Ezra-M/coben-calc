import sample from "@stdlib/random/sample";
import { enumerate, permutations, range } from "itertools";

function simulate(settings) {
    const currentScores = structuredClone(settings.currentScores)
    let rewards = settings.rewards;
    if (!settings.systematic) {
        rewards = sample(rewards, rewards.length)
    }
    for (let [i, s] of enumerate(currentScores)) {
        s.score += rewards[i];
    }
    return currentScores.toSorted((a, b) => b.score - a.score).slice(-2).map(e => e.name)
}

function cobenAlgorithm(settings) {
    const { currentScores, systematic, simulations, eliminations, rewards } = settings
    const victims = []
    const rewardsIter = permutations(rewards)

    if (systematic) {
        for (let rewardList of rewardsIter) {
            victims.concat(simulate({
                currentScores, systematic, eliminations, rewardList
            }))
        }
    } else {
        for (let _ of range(simulations)) {
            victims.concat(simulate({
                currentScores, systematic, eliminations, rewards
            }))
        }
    }

    return getCounts(victims)
}

function getCounts(array) {
    const counts = new Map();

    for (let i of array) {
        if (counts.has(i)) {
            counts.set(i, counts.get(i) + 1)
        } else {
            counts.set(i, 1)
        }
    }

    return counts
}

export { simulate, cobenAlgorithm }