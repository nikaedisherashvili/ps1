"use strict";
/**
 * Problem Set 1: Flashcards - Algorithm Functions
 *
 * This file contains the implementations for the flashcard algorithm functions
 * as described in the problem set handout.
 *
 * Please DO NOT modify the signatures of the exported functions in this file,
 * or you risk failing the autograder.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBucketSets = toBucketSets;
exports.getBucketRange = getBucketRange;
exports.practice = practice;
exports.update = update;
exports.getHint = getHint;
exports.computeProgress = computeProgress;
const flashcards_1 = require("./flashcards");
/**
 * Converts a Map representation of learning buckets into an Array-of-Set representation.
 *
 * @param buckets Map where keys are bucket numbers and values are sets of Flashcards.
 * @returns Array of Sets, where element at index i is the set of flashcards in bucket i.
 *          Buckets with no cards will have empty sets in the array.
 * @spec.requires buckets is a valid representation of flashcard buckets.
 */
function toBucketSets(buckets) {
    let arr = [];
    buckets.forEach((value, key) => {
        arr.push(value);
    });
    return arr;
}
/**
 * Finds the range of buckets that contain flashcards, as a rough measure of progress.
 *
 * @param buckets Array-of-Set representation of buckets.
 * @returns object with minBucket and maxBucket properties representing the range,
 *          or undefined if no buckets contain cards.
 * @spec.requires buckets is a valid Array-of-Set representation of flashcard buckets.
 */
function getBucketRange(buckets) {
    let minBucket = 0;
    let maxBucket = 0;
    let min = Number.MAX_VALUE;
    let max = 0;
    for (let bucket of buckets) {
        if (bucket.size <= min) {
            min = bucket.size;
            minBucket = buckets.indexOf(bucket);
        }
    }
    for (let bucket of buckets) {
        if (bucket.size >= max) {
            max = bucket.size;
            maxBucket = buckets.indexOf(bucket);
        }
    }
    return { minBucket, maxBucket };
}
/**
 * Selects cards to practice on a particular day.
 *
 * @param buckets Array-of-Set representation of buckets.
 * @param day current day number (starting from 0).
 * @returns a Set of Flashcards that should be practiced on day `day`,
 *          according to the Modified-Leitner algorithm.
 * @spec.requires buckets is a valid Array-of-Set representation of flashcard buckets.
 */
function practice(buckets, day) {
    let practice_set = new Set();
    for (let bucket of buckets) {
        if (day % (2 ** buckets.indexOf(bucket)) == 0) {
            for (let flashcard of bucket) {
                practice_set.add(flashcard);
            }
        }
    }
    return practice_set;
}
/**
 * Updates a card's bucket number after a practice trial.
 *
 * @param buckets Map representation of learning buckets.
 * @param card flashcard that was practiced.
 * @param difficulty how well the user did on the card in this practice trial.
 * @returns updated Map of learning buckets.
 * @spec.requires buckets is a valid representation of flashcard buckets.
 */
function update(buckets, card, difficulty) {
    let temp = 0;
    if (difficulty == 0) {
        buckets.set(0, new Set([card]));
    }
    else if (difficulty == 1) {
        buckets.forEach((value, key) => {
            if (value.has(card)) {
                temp = key;
            }
        });
        buckets.set(temp + 1, new Set([card]));
    }
    else if (difficulty == 2) {
        buckets.forEach((value, key) => {
            if (value.has(card)) {
                temp = key;
            }
        });
        if (temp != 0) {
            buckets.set(temp - 1, new Set([card]));
        }
    }
    return buckets;
}
/**
 * Generates a hint for a flashcard.
 *
 * @param card flashcard to hint
 * @returns a hint for the front of the flashcard.
 * @spec.requires card is a valid Flashcard.
 */
function getHint(card) {
    return card.hint;
}
/**
 * Computes statistics about the user's learning progress.
 *
 * @param buckets representation of learning buckets.
 * @param history representation of user's answer history.
 * @returns statistics about learning progress.
 * @spec.requires [SPEC TO BE DEFINED]
 */
function computeProgress(buckets, history) {
    // Replace 'any' with appropriate types
    // TODO: Implement this function (and define the spec!)
    throw new Error("Implement me!");
}
const flashcard1 = new flashcards_1.Flashcard("Capital of France?", "Paris", "Eiffel Tower", ["geography"]);
const flashcard2 = new flashcards_1.Flashcard("2 + 2?", "4", "Basic math", ["math"]);
const flashcard3 = new flashcards_1.Flashcard("Who wrote Hamlet?", "Shakespeare", "Famous playwright", ["literature"]);
const flashcard4 = new flashcards_1.Flashcard("H2O is the chemical formula for?", "Water", "Essential for life", ["science"]);
const flashcard5 = new flashcards_1.Flashcard("Largest planet in the Solar System?", "Jupiter", "Gas giant", ["astronomy"]);
// const bucketMap1: BucketMap = new Map([
//   [0, new Set([flashcard1, flashcard2])],
//   [1, new Set([flashcard3])],
//   [2, new Set([flashcard4, flashcard5])],
// ]);
// const bucketMap2: BucketMap = new Map([
//   [0, new Set([flashcard3])],
//   [1, new Set([flashcard1, flashcard5])],
//   [2, new Set([flashcard2])],
//   [3, new Set([flashcard4])],
// ]);
// const bucketMap3: BucketMap = new Map([
//   [0, new Set([flashcard1, flashcard2, flashcard3, flashcard4, flashcard5])],
// ]);
const bucketMap4 = new Map([
    [0, new Set([])],
    [1, new Set([])],
    [2, new Set([flashcard2, flashcard1, flashcard4])],
    [3, new Set([flashcard3, flashcard5])],
]);
// console.log(toBucketSets(bucketMap1));
// console.log(toBucketSets(bucketMap2));
// console.log(toBucketSets(bucketMap3));
// console.log(toBucketSets(bucketMap4));
// console.log(getBucketRange(toBucketSets(bucketMap1)));
// console.log(getBucketRange(toBucketSets(bucketMap2)));
// console.log(getBucketRange(toBucketSets(bucketMap3)));
// console.log(getBucketRange(toBucketSets(bucketMap4)));
