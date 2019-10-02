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
  public processedData: WordColorDTO[]=[];

  constructor(private formBuilder: FormBuilder,
              private posService: PartOfSpeechService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      sentence: ['']
    });
  }

  submitValue() {
    const splittedValue = this.form.value.sentence.split(/\s+/);
    this.posService.postService([splittedValue]).subscribe(data => {
      this.returnedData = data;
      this.processData();
      this.edit = false;
    });
  }

  goToEditMode() {
    this.edit = true;
  }

  private processData() {
    this.returnedData.forEach(setn => {
      setn.wordTagPairs.forEach(pair => {
        let w = pair.word.word;
        debugger;
        w = w.substr(10);
        w=w.substr(0,w.indexOf(')'))
        let t = pair.tag.tag;
        t = t.substr(8);;
        t=t.substr(0,w.indexOf(')'));
        if (w !== 'SentenceEnd' && w !== 'SentenceStart' && t !== 'PUNCT') {
          this.processedData.push({
            word: w,
            class: t
          });
        }
      });
    });
  }
}
