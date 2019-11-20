import {Component, OnInit} from '@angular/core';
import {Link} from '../../common/entities';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  public links: Array<Link>;

  ngOnInit() {
    this.links = [
      new Link('', 'home'),
      new Link('rent-bike', 'rent bike'),
      new Link('about', 'about company'),
    ];
  }
}
