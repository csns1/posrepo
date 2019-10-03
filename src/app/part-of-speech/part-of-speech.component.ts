import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {PartOfSpeechService} from '../services/part-of-speech.service';
import {POSReturnDTO} from '../interfaces/POSReturnDTO';
import {WordColorDTO} from '../interfaces/WordColorDTO';


@Component({
  selector: 'app-part-of-speech',
  templateUrl: './part-of-speech.component.html',
  styleUrls: ['./part-of-speech.component.css']
})
export class PartOfSpeechComponent implements OnInit {
  public edit = true;
  public form;
  public returnedData: POSReturnDTO[];
  public processedData: WordColorDTO[] = [];
  public postObject: string[][] = [];
  public originalData: string[][] = [];

  constructor(private formBuilder: FormBuilder,
              private posService: PartOfSpeechService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      sentence: ['']
    });
  }

  submitValue() {
    this.createPostObject();
    this.posService.postService(this.postObject).subscribe(data => {
      this.returnedData = data;
      this.processedData = [];
      this.processData();
      this.edit = false;
    });
  }

  goToEditMode() {
    this.edit = true;
  }

  private processData() {
    this.returnedData.forEach((setn, i) => {
      setn.wordTagPairs.forEach((pair, j) => {

        let w = pair.word.word;
        const t = pair.tag.tag;
        if (w !== 'SentenceEnd' && w !== 'SentenceStart') {
          if (t !== 'PUNCT') {
            w = this.postObject[i][j - 1];
          }
          this.processedData.push({
            word: w,
            class: t
          });
        }
      });
    });
  }

  private createPostObject() {
    this.postObject = [];
    const allSentences = this.form.value.sentence.replace(/(\.+|\:|\!|\?)(\"*|\'*|\)*|}*|]*)(\s|\n|\r|\r\n)/gm, '$1$2|').split('|');
    allSentences.forEach(sen => {
      const punct = this.punct(sen);
      sen = sen.substr(0, sen.length - 1).trim();
      const splittedValue = sen.split(/\s+/);
      splittedValue.push(punct);
      this.postObject.push(splittedValue);
    });
  }

  private punct(sen: string) {
    if (sen.endsWith('!')) {
      return '!';
    } else if (sen.endsWith('?')) {
      return '?';
    } else {
      return '.';
    }
  }
}
