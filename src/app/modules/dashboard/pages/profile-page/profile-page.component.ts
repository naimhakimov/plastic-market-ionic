import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  active: number = 0

  constructor() {
  }

  ngOnInit() {
  }

}
