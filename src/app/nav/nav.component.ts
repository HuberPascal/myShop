import { Component } from '@angular/core';

@Component({
    selector: 'app-nav',
    imports: [],
    templateUrl: './nav.component.html',
    styleUrl: './nav.component.scss'
})
export class NavComponent {
  allNAvListItems: string[] = [
    'IT + Multimedia',
    'Haushalt',
    'Baumarkt',
    'Wohnen',
    'Sport',
    'Mode',
    'Spielzeug',
    'Baby + Eltern',
    'Beauty + Gesundheit',
    'Büro + Papeterie',
    'Bücher',
    'Supermarkt',
  ];

  allListItemstopTenCategory: string[] = [
    'Windeln',
    'Lego',
    'Reinigungsmittel',
    'Vitamine + Nahrungsergänzung',
    'Gesellschaftsspiel',
    'Reinigungsutensil',
    'Sportnahrung',
    'Zahnbürstenkopf',
    'Waschmittel + Textilpflege',
    'Trinkflasche Thermosflasche',
  ];

  alldirektToItems: string[] = [
    'Produkte verkaufen',
    'Galaxus Mobile',
    'Gutscheine',
    'Magazin',
    'Form',
  ];
}
