import { Flashcard } from "../../src/flashcards";

export const sampleFlashcardCollection = (): Flashcard[] => [
    new Flashcard("What is the capital of France?", "Paris", "Famous tower landmark", ["geography"]),
    new Flashcard("What is 2 + 2?", "4", "Elementary arithmetic", ["mathematics"]),
    new Flashcard("Who authored Hamlet?", "Shakespeare", "Renowned English dramatist", ["literature"]),
    new Flashcard("What does H2O represent?", "Water", "Essential life component", ["chemistry"]),
    new Flashcard("Which is the biggest planet in our Solar System?", "Jupiter", "Massive gas planet", ["astronomy"])
];
