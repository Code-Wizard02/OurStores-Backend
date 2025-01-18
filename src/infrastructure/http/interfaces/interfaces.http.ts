export interface HttpRequest {
    cookies?: { [key: string]: string };
}

export interface HttpResponse {
    clearCookie(name: string, options: any): void;
}
