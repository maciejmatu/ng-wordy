import {Component, OnInit} from '@angular/core';
import {Router } from "@angular/router";

@Component({
  selector: 'app-user-application',
  templateUrl: 'user-application.component.html',
  styleUrls: ['user-application.component.scss']
})


export class UserApplicationComponent implements OnInit{

  active: boolean = false;
  constructor(private router: Router) {
    this.router.navigate(['learn']);
  }

  ngOnInit() {

  }

  menuToggle(){
    this.active = !this.active;
  }
}
