import { Component, signal } from '@angular/core';
 
import { NgIcon, provideIcons, type IconName } from '@ng-icons/core';
import {
  lucideCalendar,
  lucideChevronRight,
  lucideChevronsUpDown,
  lucideFolder,
  lucideHouse,
  lucideInbox,
  lucideLogOut,
  lucidePanelLeft,
  lucideSearch,
  lucideSettings,
  lucideUser,
} from '@ng-icons/lucide';
 
import { ZardAvatarComponent } from '@/shared/components/avatar';
import { ZardBreadcrumbImports } from '@/shared/components/breadcrumb/breadcrumb.imports';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardDividerComponent } from '@/shared/components/divider';
import { LayoutImports } from '@/shared/components/layout/layout.imports';
import { ZardMenuImports } from '@/shared/components/menu/menu.imports';
import { ZardSkeletonComponent } from '@/shared/components/skeleton';
import { ZardTooltipImports } from '@/shared/components/tooltip';
 
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
        ZardSkeletonComponent,
        ZardTooltipImports,
        ZardDividerComponent,
        ZardAvatarComponent,
        NgIcon,
    ],
    templateUrl: './dashboard-page.components.html',
    viewProviders: [
        provideIcons({
        lucideHouse,
        lucideInbox,
        lucideFolder,
        lucideChevronRight,
        lucideChevronsUpDown,
        lucideUser,
        lucideSettings,
        lucideLogOut,
        lucidePanelLeft,
        lucideCalendar,
        lucideSearch,
        }),
    ],
})
export class Dashboard {
  readonly sidebarCollapsed = signal(false);
 
  mainMenuItems: MenuItem[] = [
    { icon: 'lucideHouse', label: 'Home' },
    { icon: 'lucideInbox', label: 'Inbox' },
  ];
 
  workspaceMenuItems: MenuItem[] = [
    {
      icon: 'lucideFolder',
      label: 'Projects',
      submenu: [{ label: 'Design System' }, { label: 'Mobile App' }, { label: 'Website' }],
    },
    { icon: 'lucideCalendar', label: 'Calendar' },
    { icon: 'lucideSearch', label: 'Search' },
  ];
 
  toggleSidebar() {
    this.sidebarCollapsed.update(collapsed => !collapsed);
  }
 
  onCollapsedChange(collapsed: boolean) {
    this.sidebarCollapsed.set(collapsed);
  }
}