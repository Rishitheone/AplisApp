import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  languages = [
    { value: 0, viewValue: 'English' },
    { value: 1, viewValue: 'Hindi' },
    { value: 2, viewValue: 'Marathi' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
