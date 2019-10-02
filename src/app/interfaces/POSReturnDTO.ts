export interface WordDTO {
  word: string;
}

export class TagDTO {
  tag: string;
}

export interface POSReturnDTO {
  wordTagPairs: WordTagPairDTO[]
}

export interface WordTagPairDTO {
  word: WordDTO;
  tag: TagDTO;
}
