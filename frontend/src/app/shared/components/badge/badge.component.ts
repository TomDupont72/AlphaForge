import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import type { ClassValue } from 'clsx';

import { mergeClasses } from '@/shared/utils/merge-classes';

import { badgeVariants, type ZardBadgeShapeVariants, type ZardBadgeTypeVariants } from './badge.variants';

@Component({
  selector: 'z-badge',
  template: `
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
  },
  exportAs: 'zBadge',
})
export class ZardBadgeComponent {
  readonly zType = input<ZardBadgeTypeVariants>('default');
  readonly zShape = input<ZardBadgeShapeVariants>('default');

  readonly class = input<ClassValue>('');

  readonly zStatus = input<string | null>(null);

  protected readonly classes = computed(() =>
    mergeClasses(badgeVariants({ zType: this.zType(), zShape: this.zShape() }), this.zStatus() ? this.statusClasses[this.zStatus()!] : '' , this.class()),
  );

  private readonly statusClasses: Record<string, ClassValue> = {
    Achat: 'rounded-full text-green-300 bg-green-800/10',
    Vente: 'rounded-full text-red-300 bg-red-800/10',
    Dépôt: 'rounded-full text-blue-300 bg-blue-800/10',
    Retrait: 'rounded-full text-yellow-300 bg-yellow-800/10',
    Negative: 'text-red-300 bg-red-800/10',
    Positive: 'text-green-300 bg-green-800/10'
  };
}
