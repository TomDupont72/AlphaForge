import { Component, inject } from "@angular/core";
import { ZardAvatarComponent } from '@/shared/components/avatar';
import { ZardBreadcrumbImports } from '@/shared/components/breadcrumb/breadcrumb.imports';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardDividerComponent } from '@/shared/components/divider';
import { LayoutImports } from '@/shared/components/layout/layout.imports';
import { ZardMenuImports } from '@/shared/components/menu/menu.imports';
import { ZardTooltipImports } from '@/shared/components/tooltip';
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
import { SidebarFacade } from "@/shared/hooks/sidebar.facade";

interface MenuItem {
  icon: IconName;
  label: string;
  route?: string;
}

@Component({
    selector: 'sidebar',
    standalone: true,
    imports: [
        LayoutImports,
        ZardButtonComponent,
        ZardBreadcrumbImports,
        ZardMenuImports,
        ZardTooltipImports,
        ZardDividerComponent,
        ZardAvatarComponent,
        NgIcon,
],
    templateUrl: './sidebar.html',
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
        })
    ]
})
export class Sidebar {
    readonly sidebar = inject(SidebarFacade);

    mainMenuItems: MenuItem[] = [
        { icon: 'lucideLayoutDashboard', label: 'Tableau de bord', route: '/dashboard' },
        { icon: 'lucideWallet', label: 'Portefeuille' },
        { icon: 'lucideCpu', label: 'Stratégies' },
        { icon: 'lucideChartLine', label: 'Détail des stratégies' },
        { icon: 'lucideChartCandlestick', label: 'Ordres' },
        { icon: 'lucideCable', label: 'Connexion au broker', route: '/broker' }
    ];
}
