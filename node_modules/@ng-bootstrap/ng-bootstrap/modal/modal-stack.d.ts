import { ApplicationRef, Injector, ComponentFactoryResolver } from '@angular/core';
import { NgbModalRef } from './modal-ref';
export declare class NgbModalStack {
    private _applicationRef;
    private _injector;
    private _componentFactoryResolver;
    private _document;
    private _windowAttributes;
    constructor(_applicationRef: ApplicationRef, _injector: Injector, _componentFactoryResolver: ComponentFactoryResolver, document: any);
    open(moduleCFR: ComponentFactoryResolver, contentInjector: Injector, content: any, options: any): NgbModalRef;
    private _attachBackdrop(containerEl);
    private _attachWindowComponent(containerEl, contentRef);
    private _applyWindowOptions(windowInstance, options);
    private _getContentRef(moduleCFR, contentInjector, content, context);
    private _createFromTemplateRef(content, context);
    private _createFromString(content);
    private _createFromComponent(moduleCFR, contentInjector, content, context);
}
