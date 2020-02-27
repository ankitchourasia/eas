import { Injectable, Inject } from '@angular/core';
import { ReplaySubject, Observable, forkJoin } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({providedIn: 'root'})
export class LazyLoadingScriptService {
    _loadedLibraries: { [url: string]: ReplaySubject<any> } = {};

    constructor(@Inject(DOCUMENT) private readonly document: any) { }

    loadScript(url: string): Observable<any> {
        if (this._loadedLibraries[url]) {
            return this._loadedLibraries[url].asObservable();
        }

        this._loadedLibraries[url] = new ReplaySubject();

        const script = this.document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onload = () => {
            this._loadedLibraries[url].next();
            this._loadedLibraries[url].complete();
        };

        this.document.body.appendChild(script);

        return this._loadedLibraries[url].asObservable();
    }

    loadStyle(url: string): Observable<any> {
        if (this._loadedLibraries[url]) {
          return this._loadedLibraries[url].asObservable();
        }
    
        this._loadedLibraries[url] = new ReplaySubject();
    
        const style = this.document.createElement('link');
        style.type = 'text/css';
        style.href = url;
        style.rel = 'stylesheet';
        style.onload = () => {
          this._loadedLibraries[url].next();
          this._loadedLibraries[url].complete();
        };


        const head = document.getElementsByTagName('head')[0];
        head.appendChild(style);

        return this._loadedLibraries[url].asObservable();
    }
}
