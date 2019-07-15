import { NgModule } from '@angular/core';

import { DbOperacoesSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [DbOperacoesSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [DbOperacoesSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class DbOperacoesSharedCommonModule {}
