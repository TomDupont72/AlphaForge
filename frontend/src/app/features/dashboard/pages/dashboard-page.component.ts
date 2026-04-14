import { Component, signal, LOCALE_ID } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { NgIcon, provideIcons, type IconName } from '@ng-icons/core';
import {
  lucideCable,
  lucideChartCandlestick,
  lucideChartLine,
  lucideChevronDown,
  lucideChevronsUpDown,
  lucideChevronUp,
  lucideCpu,
  lucideLayoutDashboard,
  lucideLogOut,
  lucideSettings,
  lucideUser,
  lucideWallet
} from '@ng-icons/lucide';
 
import { ZardAvatarComponent } from '@/shared/components/avatar';
import { ZardBreadcrumbImports } from '@/shared/components/breadcrumb/breadcrumb.imports';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardDividerComponent } from '@/shared/components/divider';
import { LayoutImports } from '@/shared/components/layout/layout.imports';
import { ZardMenuImports } from '@/shared/components/menu/menu.imports';
import { ZardTooltipImports } from '@/shared/components/tooltip';
import { ZardCardComponent } from '@/shared/components/card';
import { LineChartComponent } from '@/shared/components/line-chart';
import { ZardTableBodyComponent, ZardTableCellComponent, ZardTableComponent, ZardTableHeadComponent, ZardTableHeaderComponent, ZardTableRowComponent } from '@/shared/components/table';
import { ZardBadgeComponent } from '@/shared/components/badge';
 
interface MenuItem {
  icon: IconName;
  label: string;
  submenu?: { label: string }[];
}

@Component({
    selector: 'dashboard',
    standalone: true,
    imports: [
        LayoutImports,
        ZardButtonComponent,
        ZardBreadcrumbImports,
        ZardMenuImports,
        ZardTooltipImports,
        ZardDividerComponent,
        ZardAvatarComponent,
        ZardCardComponent,
        ZardTableComponent,
        ZardTableHeaderComponent,
        ZardTableRowComponent,
        ZardTableHeadComponent,
        ZardTableBodyComponent,
        ZardTableCellComponent,
        ZardBadgeComponent,
        LineChartComponent,
        NgIcon,
        DecimalPipe,
        CurrencyPipe,
        PercentPipe,
        DatePipe
    ],
    templateUrl: './dashboard-page.components.html',
    viewProviders: [
        provideIcons({
        lucideChevronsUpDown,
        lucideUser,
        lucideSettings,
        lucideLogOut,
        lucideLayoutDashboard,
        lucideWallet,
        lucideCpu,
        lucideChartLine,
        lucideChartCandlestick,
        lucideCable,
        lucideChevronUp,
        lucideChevronDown
        }),
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }]
})
export class Dashboard {
  readonly sidebarCollapsed = signal(true);
 
  mainMenuItems: MenuItem[] = [
    { icon: 'lucideLayoutDashboard', label: 'Tableau de bord' },
    { icon: 'lucideWallet', label: 'Portefeuille' },
    { icon: 'lucideCpu', label: 'Stratégies' },
    { icon: 'lucideChartLine', label: 'Détail des stratégies' },
    { icon: 'lucideChartCandlestick', label: 'Ordres' },
    { icon: 'lucideCable', label: 'Connexion au broker' }
  ];

positions = [
    {
        "id": 1,
        "actif": "AAPL",
        "quantite": 10,
        "prix_moyen": 150,
        "prix_actuel": 175.5,
        "valeur": 1755,
        "pnl": 255,
        "performance": 0.17
    },
    {
        "id": 2,
        "actif": "TSLA",
        "quantite": 5,
        "prix_moyen": 220,
        "prix_actuel": 210,
        "valeur": 1050,
        "pnl": -50,
        "performance": -0.0455
    },
    {
        "id": 3,
        "actif": "BTC",
        "quantite": 0.25,
        "prix_moyen": 30000,
        "prix_actuel": 34000,
        "valeur": 8500,
        "pnl": 1000,
        "performance": 0.1333
    },
    {
        "id": 4,
        "actif": "ETH",
        "quantite": 2,
        "prix_moyen": 1800,
        "prix_actuel": 1700,
        "valeur": 3400,
        "pnl": -200,
        "performance": -0.0556
    },
    {
        "id": 5,
        "actif": "MSFT",
        "quantite": 8,
        "prix_moyen": 280,
        "prix_actuel": 305,
        "valeur": 2440,
        "pnl": 200,
        "performance": 0.0893
    },
    {
        "id": 6,
        "actif": "GOOGL",
        "quantite": 3,
        "prix_moyen": 2600,
        "prix_actuel": 2550,
        "valeur": 7650,
        "pnl": -150,
        "performance": -0.0192
    },
    {
        "id": 7,
        "actif": "AMZN",
        "quantite": 4,
        "prix_moyen": 120,
        "prix_actuel": 135,
        "valeur": 540,
        "pnl": 60,
        "performance": 0.0125
    },
    {
        "id": 8,
        "actif": "NVDA",
        "quantite": 6,
        "prix_moyen": 400,
        "prix_actuel": 480,
        "valeur": 2880,
        "pnl": 480,
        "performance": 0.2
    },
    {
        "id": 9,
        "actif": "SP500 ETF",
        "quantite": 12,
        "prix_moyen": 410,
        "prix_actuel": 420,
        "valeur": 5040,
        "pnl": 120,
        "performance": 0.0244
    },
    {
        "id": 10,
        "actif": "BNP",
        "quantite": 20,
        "prix_moyen": 55,
        "prix_actuel": 58,
        "valeur": 1160,
        "pnl": 60,
        "performance": 0.0545
    }
]

activites = [
    {
        "id": 1,
        "type": "Achat",
        "actif": "AAPL",
        "quantite": 10,
        "prix": 150,
        "date": "2026-04-14 10:32"
    },
    {
        "id": 2,
        "type": "Vente",
        "actif": "TSLA",
        "quantite": 2,
        "prix": 215,
        "date": "2026-04-14 09:10"
    },
    {
        "id": 3,
        "type": "Achat",
        "actif": "BTC",
        "quantite": 0.1,
        "prix": 32000,
        "date": "2026-04-13 18:45"
    },
    {
        "id": 4,
        "type": "Dépôt",
        "actif": "EUR",
        "quantite": 5000,
        "prix": 1,
        "date": "2026-04-13 14:20"
    },
    {
        "id": 5,
        "type": "Vente",
        "actif": "ETH",
        "quantite": 1,
        "prix": 1750,
        "date": "2026-04-12 16:05"
    },
    {
        "id": 6,
        "type": "Achat",
        "actif": "NVDA",
        "quantite": 3,
        "prix": 460,
        "date": "2026-04-12 11:30"
    },
    {
        "id": 7,
        "type": "Retrait",
        "actif": "EUR",
        "quantite": 1000,
        "prix": 1,
        "date": "2026-04-11 19:00"
    },
    {
        "id": 8,
        "type": "Achat",
        "actif": "MSFT",
        "quantite": 5,
        "prix": 295,
        "date": "2026-04-11 15:42"
    },
    {
        "id": 9,
        "type": "Vente",
        "actif": "GOOGL",
        "quantite": 1,
        "prix": 2580,
        "date": "2026-04-10 13:15"
    },
    {
        "id": 10,
        "type": "Achat",
        "actif": "SP500 ETF",
        "quantite": 10,
        "prix": 415,
        "date": "2026-04-10 09:50"
    }
]

  toggleSidebar() {
    this.sidebarCollapsed.update(collapsed => !collapsed);
  }
 
  onCollapsedChange(collapsed: boolean) {
    this.sidebarCollapsed.set(collapsed);
  }
}