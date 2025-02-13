//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v14.2.0.0 (NJsonSchema v11.1.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export interface IApiClient {
    /**
     * @param body (optional) 
     * @return OK
     */
    productPOST(body: Product | undefined): Observable<Product>;
    /**
     * @return OK
     */
    productAll(): Observable<Product[]>;
    /**
     * @param id (optional) 
     * @return OK
     */
    productDELETE(id: number | undefined): Observable<void>;
    /**
     * @param id (optional) 
     * @param body (optional) 
     * @return OK
     */
    productPUT(id: number | undefined, body: Product | undefined): Observable<void>;
}

@Injectable({
    providedIn: 'root'
})
export class ApiClient implements IApiClient {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ?? "";
    }

    /**
     * @param body (optional) 
     * @return OK
     */
    productPOST(body: Product | undefined): Observable<Product> {
        let url_ = this.baseUrl + "/api/Product";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "text/plain"
            })
        };

        return this.http.request("post", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processProductPOST(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processProductPOST(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<Product>;
                }
            } else
                return _observableThrow(response_) as any as Observable<Product>;
        }));
    }

    protected processProductPOST(response: HttpResponseBase): Observable<Product> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = Product.fromJS(resultData200);
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @return OK
     */
    productAll(): Observable<Product[]> {
        let url_ = this.baseUrl + "/api/Product";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Accept": "text/plain"
            })
        };

        return this.http.request("get", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processProductAll(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processProductAll(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<Product[]>;
                }
            } else
                return _observableThrow(response_) as any as Observable<Product[]>;
        }));
    }

    protected processProductAll(response: HttpResponseBase): Observable<Product[]> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(Product.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return _observableOf(result200);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional) 
     * @return OK
     */
    productDELETE(id: number | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/Product?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_ : any = {
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
            })
        };

        return this.http.request("delete", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processProductDELETE(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processProductDELETE(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else
                return _observableThrow(response_) as any as Observable<void>;
        }));
    }

    protected processProductDELETE(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }

    /**
     * @param id (optional) 
     * @param body (optional) 
     * @return OK
     */
    productPUT(id: number | undefined, body: Product | undefined): Observable<void> {
        let url_ = this.baseUrl + "/api/Product?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
            })
        };

        return this.http.request("put", url_, options_).pipe(_observableMergeMap((response_ : any) => {
            return this.processProductPUT(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processProductPUT(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<void>;
                }
            } else
                return _observableThrow(response_) as any as Observable<void>;
        }));
    }

    protected processProductPUT(response: HttpResponseBase): Observable<void> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return _observableOf(null as any);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf(null as any);
    }
}

export class Product implements IProduct {
    id?: number;
    category?: string | null;
    brand?: string | null;
    name?: string | null;
    productPrice?: number;
    basePrice?: string | null;
    productSpecification?: string | null;
    numberOfRating?: number;
    imgSrc?: string | null;
    rating?: number;

    constructor(data?: IProduct) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"] !== undefined ? _data["id"] : <any>null;
            this.category = _data["category"] !== undefined ? _data["category"] : <any>null;
            this.brand = _data["brand"] !== undefined ? _data["brand"] : <any>null;
            this.name = _data["name"] !== undefined ? _data["name"] : <any>null;
            this.productPrice = _data["productPrice"] !== undefined ? _data["productPrice"] : <any>null;
            this.basePrice = _data["basePrice"] !== undefined ? _data["basePrice"] : <any>null;
            this.productSpecification = _data["productSpecification"] !== undefined ? _data["productSpecification"] : <any>null;
            this.numberOfRating = _data["numberOfRating"] !== undefined ? _data["numberOfRating"] : <any>null;
            this.imgSrc = _data["imgSrc"] !== undefined ? _data["imgSrc"] : <any>null;
            this.rating = _data["rating"] !== undefined ? _data["rating"] : <any>null;
        }
    }

    static fromJS(data: any): Product {
        data = typeof data === 'object' ? data : {};
        let result = new Product();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id !== undefined ? this.id : <any>null;
        data["category"] = this.category !== undefined ? this.category : <any>null;
        data["brand"] = this.brand !== undefined ? this.brand : <any>null;
        data["name"] = this.name !== undefined ? this.name : <any>null;
        data["productPrice"] = this.productPrice !== undefined ? this.productPrice : <any>null;
        data["basePrice"] = this.basePrice !== undefined ? this.basePrice : <any>null;
        data["productSpecification"] = this.productSpecification !== undefined ? this.productSpecification : <any>null;
        data["numberOfRating"] = this.numberOfRating !== undefined ? this.numberOfRating : <any>null;
        data["imgSrc"] = this.imgSrc !== undefined ? this.imgSrc : <any>null;
        data["rating"] = this.rating !== undefined ? this.rating : <any>null;
        return data;
    }
}

export interface IProduct {
    id?: number;
    category?: string | null;
    brand?: string | null;
    name?: string | null;
    productPrice?: number;
    basePrice?: string | null;
    productSpecification?: string | null;
    numberOfRating?: number;
    imgSrc?: string | null;
    rating?: number;
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((event.target as any).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}