/**
 * Assignment 1: Spaced Repetition System - Core Implementation
 *
 * This module contains the primary functions for the spaced repetition
 * flashcard system as outlined in the assignment specifications.
 *
 * IMPORTANT: Do not alter the exported function signatures in this file,
 * as this may cause autograder failures.
 */

import { Flashcard, AnswerDifficulty, BucketMap } from "./flashcards";

/**
 * Transforms a Map-based bucket structure into an Array-of-Set format.
 *
 * @param bucketMapping Map where keys represent bucket indices and values contain Flashcard collections.
 * @returns Array of Sets, where each element at position i represents the flashcards in bucket i.
 *          Empty buckets will contain empty sets in the resulting array.
 * @spec.requires bucketMapping is a valid bucket representation.
 */
export function toBucketSets(bucketMapping: BucketMap): Array<Set<Flashcard>> {
  const resultArray: Array<Set<Flashcard>> = [];
  bucketMapping.forEach((flashcardSet, bucketIndex) => {
    resultArray.push(flashcardSet);
  });

  return resultArray;
}

/**
 * Determines the span of buckets containing flashcards, providing a progress indicator.
 *
 * @param bucketArray Array-of-Set representation of the bucket system.
 * @returns Object containing minBucket and maxBucket properties indicating the range,
 *          or undefined if no buckets contain any cards.
 * @spec.requires bucketArray is a valid Array-of-Set bucket representation.
 */
export function getBucketRange(
  bucketArray: Array<Set<Flashcard>>
): { minBucket: number; maxBucket: number } | undefined {
  let minimumBucket = 0;
  let maximumBucket = 0;

  for (let currentBucket of bucketArray) {
    if (currentBucket.size > 0) {
      minimumBucket = bucketArray.indexOf(currentBucket);
      break;
    }
  }

  for (let currentBucket of bucketArray) {
    if (bucketArray.indexOf(currentBucket) > maximumBucket && currentBucket.size > 0) {
      maximumBucket = bucketArray.indexOf(currentBucket);
    }
  }
  return { minBucket: minimumBucket, maxBucket: maximumBucket };
}

/**
 * Identifies cards scheduled for practice on a specific day.
 *
 * @param bucketArray Array-of-Set representation of buckets.
 * @param currentDay The day number for practice (0-indexed).
 * @returns A Set of Flashcards scheduled for practice on the specified day,
 *          following the Modified-Leitner scheduling algorithm.
 * @spec.requires bucketArray is a valid Array-of-Set bucket representation.
 */
export function practice(
  bucketArray: Array<Set<Flashcard>>,
  currentDay: number
): Set<Flashcard> {
  const scheduledCards = new Set<Flashcard>();
  for (let currentBucket of bucketArray) {
    if (currentDay % 2 ** bucketArray.indexOf(currentBucket) == 0) {
      for (let flashcard of currentBucket) {
        scheduledCards.add(flashcard);
      }
    }
  }
  return scheduledCards;
}

/**
 * Adjusts a card's bucket position based on practice performance.
 *
 * @param bucketMapping Map representation of the learning bucket system.
 * @param targetCard The flashcard that was practiced.
 * @param performanceLevel How well the user performed on this card during practice.
 * @returns Updated Map of learning buckets reflecting the card's new position.
 * @spec.requires bucketMapping is a valid bucket representation.
 * PERFORMANCE LEVELS: 0=Incorrect, 1=Difficult, 2=Easy
 */
export function update(
  bucketMapping: BucketMap,
  targetCard: Flashcard,
  performanceLevel: AnswerDifficulty
): BucketMap {
  const updatedBuckets = new Map(bucketMapping);
  let currentBucketIndex = -1;

  for (const [bucketNumber, cardSet] of bucketMapping.entries()) {
    const newCardSet = new Set<Flashcard>(cardSet);
    updatedBuckets.set(bucketNumber, newCardSet);

    if (cardSet.has(targetCard)) {
      currentBucketIndex = bucketNumber;
    }
  }

  // Remove the card from its current location
  if (currentBucketIndex !== -1) {
    const existingSet = updatedBuckets.get(currentBucketIndex);
    if (existingSet) {
      existingSet.delete(targetCard);
    }
  }

  if (performanceLevel == 0) {
    updatedBuckets.set(0, new Set([targetCard]));
  } else if (performanceLevel == 2) {
    updatedBuckets.set(currentBucketIndex + 1, new Set([targetCard]));
  } else if (performanceLevel == 1) {
    if (currentBucketIndex != 0) {
      updatedBuckets.set(currentBucketIndex - 1, new Set([targetCard]));
    }
  }

  return updatedBuckets;
}

/**
 * Provides assistance for a flashcard.
 *
 * @param targetCard The flashcard requiring assistance.
 * @returns A helpful hint for the flashcard's front side. If no hint is available,
 *          provides the first character of the answer.
 * @spec.requires targetCard is a valid Flashcard.
 */
export function getHint(targetCard: Flashcard): string {
  if (targetCard.hint == "") {
    if (targetCard.back == "") {
      return "";
    }
    return targetCard.back[0] + '';
  }
  return targetCard.hint;
}

/**
 * Calculates comprehensive statistics about learning progress.
 *
 * @param bucketMapping Representation of the learning bucket system.
 * @param userHistory Mapping of flashcards to their practice history (correct/incorrect counts).
 * @returns Detailed statistics about learning progress and performance.
 * @spec.requires userHistory is a valid history representation with flashcard keys
 *          and values containing correct/incorrect answer counts.
 */
export function computeProgress(
  bucketMapping: BucketMap,
  userHistory: Map<Flashcard, { correct: number; incorrect: number }>
): {
  total: number;
  correct: number;
  attempted: number;
  accuracy: number;
  distribution: Map<number, number>;
} {
  let totalCards = 0;
  let correctAnswers = 0;
  let totalAttempts = 0;
  let successRate = 0;
  let bucketDistribution = new Map<number, number>();

  for (const [bucketIndex, flashcardSet] of bucketMapping) {
    bucketDistribution.set(bucketIndex, flashcardSet.size);
    totalCards += flashcardSet.size;

    for (const flashcard of flashcardSet) {
      let historyEntry = userHistory.get(flashcard);
      if (historyEntry) {
        correctAnswers += historyEntry.correct;
        totalAttempts += historyEntry.correct + historyEntry.incorrect;
        successRate = correctAnswers / totalAttempts;
      }
    }
  }
  return { 
    total: totalCards, 
    correct: correctAnswers, 
    attempted: totalAttempts, 
    accuracy: successRate, 
    distribution: bucketDistribution 
  };
}
