import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {PartOfSpeechService} from '../services/part-of-speech.service';

@Component({
  selector: 'app-part-of-speech',
  templateUrl: './part-of-speech.component.html',
  styleUrls: ['./part-of-speech.component.css']
})
export class PartOfSpeechComponent implements OnInit {
  public edit = true;
  public form;
  public processedData = {};
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
    this.posService.postService(splittedValue).subscribe(data => {
      this.processedData = data;
      this.edit = false;
    });
  }

  goToEditMode() {
    this.edit = true;
  }
}
