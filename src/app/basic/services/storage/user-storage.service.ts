import { Injectable } from '@angular/core';

const TOKEN= 's_token';
const USER= 's_user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public saveToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.setItem(TOKEN, token);
    }
  }

  static getToken(): string | null {
    return typeof window !== 'undefined' && window.localStorage 
      ? window.localStorage.getItem(TOKEN) 
      : null;
  }

  public saveUser(user): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(USER);
      window.localStorage.setItem(USER, JSON.stringify(user));
    }
  }
  

  static getUser(): any {
    return typeof window !== 'undefined' && window.localStorage 
      ? JSON.parse(window.localStorage.getItem(USER)) 
      : null;
  }

  static getUserId(): string {
    const user = typeof window !== 'undefined' && window.localStorage ? this.getUser() : null;
    return user ? user.userId : '';
  }

  static getUserRole(): string {
    const user = typeof window !== 'undefined' && window.localStorage ? this.getUser() : null;
    return user ? user.role : '';
  }

  static isClientLoggedIn(): boolean {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    const token = this.getToken();
    const role = this.getUserRole();
    return token !== null && role === 'CLIENT';
  }
  

  static isCompanyLoggedIn(): boolean {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    const token = this.getToken();
    const role = this.getUserRole();
    return token !== null && role === 'COMPANY';
  }
  

  static signOut(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.removeItem(USER);
    }
  }
}
