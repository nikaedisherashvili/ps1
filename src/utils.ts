// This file is for utility functions that might be helpful
// for both implementation and testing code.
// Place any reusable helper functions here.

import { Flashcard } from "./flashcards";

// Example utility function (you can remove this):
/**
 * Adds two numbers together.
 * @param a first number
 * @param b second number
 * @returns sum of a and b
 */
export function add(a: number, b: number): number {
  return a + b;
}
/**
 * 
 * @param x how many flashcards 
 * @param helper 
 * @returns 
 */
export function simpleflashcardgenerator(x:number , helper :number ):Set<Flashcard>{
  let anarray :Set<Flashcard> = new Set<Flashcard> ();
  for(let i = 0 ; i<x ; i++){
      
      let front: string = "FTEST"+i+""+helper;
      let back: string = "BTEST"+i+""+helper;
      let hint: string = "HTEST"+i+""+helper;
      let tags: ReadonlyArray<string> = [front , back , hint ];
      let y  = new Flashcard( front ,back , hint , tags);
      
      anarray.add(y)
  }
  return anarray;
}

/**
 * Creates a collection of test flashcards for testing purposes.
 * 
 * @param quantity Number of flashcards to generate
 * @param identifier Unique identifier to differentiate test sets
 * @returns A Set containing the generated Flashcard instances
 */
export function createTestFlashcardSet(quantity: number, identifier: number): Set<Flashcard> {
  const flashcardCollection: Set<Flashcard> = new Set<Flashcard>();
  
  for (let index = 0; index < quantity; index++) {
    const questionText: string = "TEST_QUESTION_" + index + "_" + identifier;
    const answerText: string = "TEST_ANSWER_" + index + "_" + identifier;
    const hintText: string = "TEST_HINT_" + index + "_" + identifier;
    const tagArray: ReadonlyArray<string> = [questionText, answerText, hintText];
    const newCard = new Flashcard(questionText, answerText, hintText, tagArray);
    
    flashcardCollection.add(newCard);
  }
  
  return flashcardCollection;
}

