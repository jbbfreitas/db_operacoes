import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DbOperacoesSharedLibsModule, DbOperacoesSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [DbOperacoesSharedLibsModule, DbOperacoesSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [DbOperacoesSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DbOperacoesSharedModule {
  static forRoot() {
    return {
      ngModule: DbOperacoesSharedModule
    };
  }
}
