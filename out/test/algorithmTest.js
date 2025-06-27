"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const algorithm_1 = require("../src/algorithm");
const flashcards5_1 = require("./utils/flashcards5");
/*
 * Testing strategy for toBucketSets():
 *
 * TODO: Describe your testing strategy for toBucketSets() here.
 */
describe("toBucketSets()", () => {
    it("Simple bucket", () => {
        const flashcardsArray = (0, flashcards5_1.flashcards5)();
        if (flashcardsArray.length !== 5 || flashcardsArray.some(f => f === undefined)) {
            throw new Error("flashcards5() returned an unexpected value.");
        }
        const [flashcard1, flashcard2, flashcard3, flashcard4, flashcard5] = flashcardsArray;
        const buckets = [
            new Set([flashcard1, flashcard2]),
            new Set([flashcard3]),
            new Set([flashcard4, flashcard5])
        ];
        const bucketMap1 = new Map([
            [0, new Set([flashcard1, flashcard2])],
            [1, new Set([flashcard3])],
            [2, new Set([flashcard4, flashcard5])],
        ]);
        assert_1.default.deepStrictEqual((0, algorithm_1.toBucketSets)(bucketMap1), buckets);
    });
    it("Different bucket structure", () => {
        const flashcardsArray = (0, flashcards5_1.flashcards5)();
        if (flashcardsArray.length !== 5 || flashcardsArray.some(f => f === undefined)) {
            throw new Error("flashcards5() returned an unexpected value.");
        }
        const [flashcard1, flashcard2, flashcard3, flashcard4, flashcard5] = flashcardsArray;
        const buckets = [
            new Set([flashcard3]),
            new Set([flashcard1, flashcard5]),
            new Set([flashcard2]),
            new Set([flashcard4])
        ];
        const bucketMap2 = new Map([
            [0, new Set([flashcard3])],
            [1, new Set([flashcard1, flashcard5])],
            [2, new Set([flashcard2])],
            [3, new Set([flashcard4])],
        ]);
        assert_1.default.deepStrictEqual((0, algorithm_1.toBucketSets)(bucketMap2), buckets);
    });
    it("all flashcards in one bucket", () => {
        const flashcardsArray = (0, flashcards5_1.flashcards5)();
        if (flashcardsArray.length !== 5 || flashcardsArray.some(f => f === undefined)) {
            throw new Error("flashcards5() returned an unexpected value.");
        }
        const [flashcard1, flashcard2, flashcard3, flashcard4, flashcard5] = flashcardsArray;
        const buckets = [
            new Set([flashcard1, flashcard2, flashcard3, flashcard4, flashcard5])
        ];
        const bucketMap3 = new Map([
            [0, new Set([flashcard1, flashcard2, flashcard3, flashcard4, flashcard5])],
        ]);
        assert_1.default.deepStrictEqual((0, algorithm_1.toBucketSets)(bucketMap3), buckets);
    });
    it("Empty bucket among filled buckets", () => {
        const flashcardsArray = (0, flashcards5_1.flashcards5)();
        if (flashcardsArray.length !== 5 || flashcardsArray.some(f => f === undefined)) {
            throw new Error("flashcards5() returned an unexpected value.");
        }
        const [flashcard1, flashcard2, flashcard3, flashcard4, flashcard5] = flashcardsArray;
        const buckets = [
            new Set([]),
            new Set([flashcard1, flashcard4]),
            new Set([flashcard2]),
            new Set([flashcard3, flashcard5])
        ];
        const bucketMap4 = new Map([
            [0, new Set([])],
            [1, new Set([flashcard1, flashcard4])],
            [2, new Set([flashcard2])],
            [3, new Set([flashcard3, flashcard5])],
        ]);
        assert_1.default.deepStrictEqual((0, algorithm_1.toBucketSets)(bucketMap4), buckets);
    });
});
/*
 * Testing strategy for getBucketRange():
 *
 * TODO: Describe your testing strategy for getBucketRange() here.
 */
describe("getBucketRange()", () => {
    it("Simple Bucket", () => {
        const flashcardsArray = (0, flashcards5_1.flashcards5)();
        if (flashcardsArray.length !== 5 || flashcardsArray.some(f => f === undefined)) {
            throw new Error("flashcards5() returned an unexpected value.");
        }
        const [flashcard1, flashcard2, flashcard3, flashcard4, flashcard5] = flashcardsArray;
        const bucketMap1 = new Map([
            [0, new Set([flashcard1, flashcard2])],
            [1, new Set([flashcard3])],
            [2, new Set([flashcard4, flashcard5])],
        ]);
        assert_1.default.deepStrictEqual({ minBucket: 1, maxBucket: 2 }, (0, algorithm_1.getBucketRange)((0, algorithm_1.toBucketSets)(bucketMap1)));
    });
    it("different bucket structure", () => {
        const flashcardsArray = (0, flashcards5_1.flashcards5)();
        if (flashcardsArray.length !== 5 || flashcardsArray.some(f => f === undefined)) {
            throw new Error("flashcards5() returned an unexpected value.");
        }
        const [flashcard1, flashcard2, flashcard3, flashcard4, flashcard5] = flashcardsArray;
        const bucketMap2 = new Map([
            [0, new Set([flashcard3])],
            [1, new Set([flashcard1, flashcard5])],
            [2, new Set([flashcard2])],
            [3, new Set([flashcard4])],
        ]);
        assert_1.default.deepStrictEqual({ minBucket: 3, maxBucket: 1 }, (0, algorithm_1.getBucketRange)((0, algorithm_1.toBucketSets)(bucketMap2)));
    });
    it("all flashcards in one bucket", () => {
        const flashcardsArray = (0, flashcards5_1.flashcards5)();
        if (flashcardsArray.length !== 5 || flashcardsArray.some(f => f === undefined)) {
            throw new Error("flashcards5() returned an unexpected value.");
        }
        const [flashcard1, flashcard2, flashcard3, flashcard4, flashcard5] = flashcardsArray;
        const bucketMap3 = new Map([
            [0, new Set([flashcard1, flashcard2, flashcard3, flashcard4, flashcard5])],
        ]);
        assert_1.default.deepStrictEqual({ minBucket: 0, maxBucket: 0 }, (0, algorithm_1.getBucketRange)((0, algorithm_1.toBucketSets)(bucketMap3)));
    });
    it("empty bucket among filled ones", () => {
        const flashcardsArray = (0, flashcards5_1.flashcards5)();
        if (flashcardsArray.length !== 5 || flashcardsArray.some(f => f === undefined)) {
            throw new Error("flashcards5() returned an unexpected value.");
        }
        const [flashcard1, flashcard2, flashcard3, flashcard4, flashcard5] = flashcardsArray;
        const bucketMap4 = new Map([
            [0, new Set([])],
            [1, new Set([flashcard1, flashcard4])],
            [2, new Set([flashcard2])],
            [3, new Set([flashcard3, flashcard5])],
        ]);
        assert_1.default.deepStrictEqual({ minBucket: 0, maxBucket: 3 }, (0, algorithm_1.getBucketRange)((0, algorithm_1.toBucketSets)(bucketMap4)));
    });
});
/*
 * Testing strategy for practice():
 *
 * TODO: Describe your testing strategy for practice() here.
 */
describe("practice()", () => {
    // it("Example test case - replace with your own tests", () => {
    //   assert.fail(
    //     "Replace this test case with your own tests based on your testing strategy"
    //   );
    // });
});
/*
 * Testing strategy for update():
 *
 * TODO: Describe your testing strategy for update() here.
 */
describe("update()", () => {
    // it("Example test case - replace with your own tests", () => {
    //   assert.fail(
    //     "Replace this test case with your own tests based on your testing strategy"
    //   );
    // });
});
/*
 * Testing strategy for getHint():
 *
 * TODO: Describe your testing strategy for getHint() here.
 */
describe("getHint()", () => {
    // it("Example test case - replace with your own tests", () => {
    //   assert.fail(
    //     "Replace this test case with your own tests based on your testing strategy"
    //   );
    // });
});
/*
 * Testing strategy for computeProgress():
 *
 * TODO: Describe your testing strategy for computeProgress() here.
 */
describe("computeProgress()", () => {
    // it("Example test case - replace with your own tests", () => {
    //   assert.fail(
    //     "Replace this test case with your own tests based on your testing strategy"
    //   );
    // });
});
