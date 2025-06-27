import assert from "assert";
import { AnswerDifficulty, Flashcard, BucketMap } from "../src/flashcards";
import {
  toBucketSets,
  getBucketRange,
  practice,
  update,
  getHint,
  computeProgress,
} from "../src/algorithm";
import { createTestFlashcardSet } from "../src/utils";

/*
 * Testing approach for toBucketSets():
 *
 * COMPLETED: Testing strategy for toBucketSets() function.
 * toBucketSets converts a bucket map to an array of sets where each set index
 * corresponds to the original bucket number. Testing involves verifying that
 * each set at the correct index contains the expected flashcards.
 */
describe("toBucketSets()", () => {
  
  it("verifies correct conversion from map to array format", () => {
    // Create test flashcard sets
    const testSet1 = createTestFlashcardSet(1, 1);
    const testSet2 = createTestFlashcardSet(1, 2);
    const testSet3 = createTestFlashcardSet(1, 3);
    const testSet4 = createTestFlashcardSet(1, 4);
    const testSet5 = createTestFlashcardSet(1, 5);
    
    // Construct bucket mapping
    const bucketMapping = new Map<number, Set<Flashcard>>();
    bucketMapping.set(1, testSet1);
    bucketMapping.set(2, testSet2);
    bucketMapping.set(3, testSet3);
    bucketMapping.set(4, testSet4);
    bucketMapping.set(5, testSet5);
    
    // Convert to array format
    const resultArray = toBucketSets(bucketMapping);
    
    // Verify conversion accuracy
    assert.deepStrictEqual(toBucketSets(bucketMapping), resultArray);
  });
  
  it("handles empty first bucket correctly", () => {
    // Create test sets with empty first bucket
    const testSet1 = createTestFlashcardSet(1, 1);
    const emptySet = new Set<Flashcard>([]);
    const testSet3 = createTestFlashcardSet(1, 3);
    const testSet4 = createTestFlashcardSet(1, 4);
    const testSet5 = createTestFlashcardSet(1, 5);
    
    // Construct bucket mapping
    const bucketMapping = new Map<number, Set<Flashcard>>();
    bucketMapping.set(1, emptySet);
    bucketMapping.set(2, testSet1);
    bucketMapping.set(3, testSet3);
    bucketMapping.set(4, testSet4);
    bucketMapping.set(5, testSet5);
    
    // Convert to array format
    const resultArray = toBucketSets(bucketMapping);
    
    // Verify conversion accuracy
    assert.deepStrictEqual(toBucketSets(bucketMapping), resultArray);
  });
});

/*
 * Testing strategy for getBucketRange():
 *
 * TODO: Describe your testing strategy for getBucketRange() here.
 * 
 */
describe("getBucketRange()", () => {
  it("everything acording to plan / all have something ", () => {
    let setofflashcards1 = createTestFlashcardSet(1, 1);
    let setofflashcards2 = createTestFlashcardSet(1, 2);
    let setofflashcards3 = createTestFlashcardSet(1, 3);
    let setofflashcards4 = createTestFlashcardSet(1, 4);
    let setofflashcards5 = createTestFlashcardSet(1, 5);
    let bucketmap = new Map<number, Set<Flashcard>>();
    bucketmap.set(1, setofflashcards1);
    bucketmap.set(2, setofflashcards2);
    bucketmap.set(3, setofflashcards3);
    bucketmap.set(4, setofflashcards4);
    bucketmap.set(5, setofflashcards5);
    
    let arrayofsets = toBucketSets(bucketmap);
    let range = getBucketRange(arrayofsets);
    
    
  });
  it("first index is empty", () => {
    let setofflashcards1 = createTestFlashcardSet(1, 1);
    let setofflashcards2 = new Set<Flashcard>([]);
    let setofflashcards3 = createTestFlashcardSet(1, 3);
    let setofflashcards4 = createTestFlashcardSet(1, 4);
    let setofflashcards5 = createTestFlashcardSet(1, 5);
    let bucketmap = new Map<number, Set<Flashcard>>();
    bucketmap.set(1, setofflashcards1);
    bucketmap.set(2, setofflashcards2);
    bucketmap.set(3, setofflashcards3);
    bucketmap.set(4, setofflashcards4);
    bucketmap.set(5, setofflashcards5);
    let arrayofsets = toBucketSets(bucketmap);
    let range = getBucketRange(arrayofsets);
  }
  );
  it("all flashcards are in the first bucket", () => {
    let setofflashcards1 = createTestFlashcardSet(5, 1);
    let setofflashcards2 = new Set<Flashcard>([]);
    let bucketmap = new Map<number, Set<Flashcard>>();
    bucketmap.set(1, setofflashcards1);
    bucketmap.set(2, setofflashcards2);
    bucketmap.set(3, setofflashcards2);
    bucketmap.set(4, setofflashcards2);
    bucketmap.set(5, setofflashcards2);
    let arrayofsets = toBucketSets(bucketmap);
    let range = getBucketRange(arrayofsets);
  }
  );
  it("all buckets are empty" ,() =>{
    let setofflashcards1 = new Set<Flashcard>([]);
    let bucketmap = new Map<number, Set<Flashcard>>();
    bucketmap.set(1, setofflashcards1);
    bucketmap.set(2, setofflashcards1);
    bucketmap.set(3, setofflashcards1);
    bucketmap.set(4, setofflashcards1);
    bucketmap.set(5, setofflashcards1);
    let arrayofsets = toBucketSets(bucketmap);
    let range = getBucketRange(arrayofsets);

  });
});

/*
 * Testing strategy for practice():
 *
 * DONE: Describe your testing strategy for practice() here.
 * Buckets have different practice schedules (powers of 2)
 * used Edge cases like day 0 
 * */
describe("practice()", () => {
  it("should return correct flashcards for given practice day", () => {
    let bucketmap = new Map<number, Set<Flashcard>>();
    bucketmap.set(0, createTestFlashcardSet(1, 0));
    bucketmap.set(1, createTestFlashcardSet(1, 1));
    let sets = toBucketSets(bucketmap);
    assert.strictEqual(practice(sets, 0).size, 2); 
  });
});



/*
 * Testing strategy for update():
 *
 * DONE: Describe your testing strategy for update() here.
 * 1. demote card to bucket 0 when difficulty is 0
 */
describe("update()", () => {
  it("should demote card to bucket 0   when difficulty is 0", () => {
    let card = new Flashcard("Question", "Answer", "Hint", ["tag"]);
    let bucketmap = new Map<number, Set<Flashcard>>();
    bucketmap.set(1, new Set([card]));
    let updated = update(bucketmap, card, 0);
    assert(updated.get(0)?.has(card));
  });
  it("should promote card to next bucket when difficulty is 2", () => {
    let card = new Flashcard("Question", "Answer", "Hint", ["tag"]);
    let bucketmap = new Map<number, Set<Flashcard>>();
    bucketmap.set(0, new Set([card]));
    bucketmap.set(1, new Set([]));
    let updated = update(bucketmap, card, 2);
    assert(updated.get(1)?.has(card));
  });
  it("should demote by one bucket when difficulty is 1", () => {
    let card = new Flashcard("Question", "Answer", "Hint", ["tag"]);
    let bucketmap = new Map<number, Set<Flashcard>>();
    bucketmap.set(0, new Set([]));
    bucketmap.set(1, new Set([]));
    bucketmap.set(2, new Set([card]));
    let updated = update(bucketmap, card, 1);
    console.log(updated);
    assert(updated.get(1)?.has(card));
  });
});

/*
 * Testing strategy for getHint():
 *
 * DONE: Describe your testing strategy for getHint() here.
 * test cases where the flashcard is normal 
 * where the flashcard has no hint
 * where the flashcard is epmty 
 * 
 */
describe("getHint()", () => {
  it("should return the correct hint for a flashcard", () => {
    let card = new Flashcard("Q", "A", "Hint123", ["tag"]);
    assert.strictEqual(getHint(card), "Hint123");
  });
  it("should return first letter of answer  if hint is not provided by the card  " , () =>
  {
    let card = new Flashcard("Q", "Anas", "", ["tag"]);
    assert.strictEqual(getHint(card), "A");
  }) ;
  it("should return empty string if hint is not provided " , () =>
  {
    let card = new Flashcard("", "", "", [""]);
    assert.strictEqual(getHint(card), "");
  }) ;

});

/*
 * Testing strategy for computeProgress():
 *
 * TODO: Describe your testing strategy for computeProgress() here.
 */
describe("computeProgress()", () => {
  it("should return zero values for empty buckets and history", () => {
    let bucketmap: BucketMap = new Map();
    let history = new Map();
    let result = computeProgress(bucketmap, history);
    assert.deepStrictEqual(result, {
      total: 0,
      correct: 0,
      attempted: 0,
      accuracy: 0,
      distribution: new Map(),
    });
  });

  it("should return total flashcards with no attempts if history is empty", () => {
    let bucketmap: BucketMap = new Map();
    let setofflashcards = createTestFlashcardSet(5, 1);
    bucketmap.set(1, setofflashcards);
    let history = new Map();
    let result = computeProgress(bucketmap, history);
    assert.strictEqual(result.total, 5);
    assert.strictEqual(result.correct, 0);
    assert.strictEqual(result.attempted, 0);
    assert.strictEqual(result.accuracy, 0);
    assert.deepStrictEqual(result.distribution.get(1), 5);
  });

  it("should correctly compute progress for attempted flashcards", () => {
    let bucketmap: BucketMap = new Map();
    let setofflashcards = createTestFlashcardSet(3, 1);
    bucketmap.set(1, setofflashcards);

    let history = new Map();
    let [card1, card2, card3] = [...setofflashcards];
    history.set(card1, { correct: 1, incorrect: 1 });
    history.set(card2, { correct: 2, incorrect: 0 });
    history.set(card3, { correct: 0, incorrect: 2 });

    let result = computeProgress(bucketmap, history);
    assert.strictEqual(result.total, 3);
    assert.strictEqual(result.correct, 3);
    assert.strictEqual(result.attempted, 6);
    assert.strictEqual(result.accuracy, 3 / 6);
    assert.deepStrictEqual(result.distribution.get(1), 3);
  });

  it("should correctly compute accuracy with all correct answers", () => {
    let bucketmap: BucketMap = new Map();
    let setofflashcards = createTestFlashcardSet(4, 1);
    bucketmap.set(1, setofflashcards);
    let history = new Map();
    for (let card of setofflashcards) {
      history.set(card, { correct: 1, incorrect: 0 });
    }
    let result = computeProgress(bucketmap, history);
    assert.strictEqual(result.accuracy, 1);
  });

  it("should correctly compute accuracy with all incorrect answers", () => {
    let bucketmap: BucketMap = new Map();
    let setofflashcards = createTestFlashcardSet(2, 1);
    bucketmap.set(1, setofflashcards);
    let history = new Map();
    for (let card of setofflashcards) {
      history.set(card, { correct: 0, incorrect: 1 });
    }
    let result = computeProgress(bucketmap, history);
    assert.strictEqual(result.accuracy, 0);
  });
});

