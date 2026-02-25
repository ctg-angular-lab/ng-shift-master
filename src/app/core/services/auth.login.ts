import { Injectable, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export type AuthUser = { username: string; email: string; };
export type AuthSession = { token: string; user: AuthUser; expiresAt: number; };

@Injectable({ providedIn: 'root' })
export class AuthLogin {
  private readonly STORAGE_KEY = 'auth_session';

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly _session = signal<AuthSession | null>(this.readSessionSafely());

  readonly session = computed(() => this._session());
  readonly isAuthenticated = computed(() => {
    const s = this._session();
    return !!s && Date.now() < s.expiresAt && !!s.token;
  });

  // -------------------- storage safe helpers --------------------
  private readSessionSafely(): AuthSession | null {
    if (!this.isBrowser) return null;         // ✅ SSR: nunca tocar sessionStorage
    const raw = sessionStorage.getItem(this.STORAGE_KEY);
    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw) as AuthSession;
      if (!parsed?.token || !parsed?.expiresAt) return null;
      if (Date.now() >= parsed.expiresAt) return null;
      return parsed;
    } catch {
      return null;
    }
  }

  private persistSessionSafely(session: AuthSession): void {
    if (!this.isBrowser) return;              // ✅ SSR safe
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(session));
  }

  private clearSessionSafely(): void {
    if (!this.isBrowser) return;
    sessionStorage.removeItem(this.STORAGE_KEY);
  }

  // -------------------- public API --------------------
  login(username: string, password: string) {
    // tu validación mock...
    const token = 'mock-token';
    const session: AuthSession = {
      token,
      user: { username, email: `${username}@bank.com` },
      expiresAt: Date.now() + 2 * 60 * 60 * 1000,
    };

    this.persistSessionSafely(session);
    this._session.set(session);

    return { success: true as const, session };
  }

  logout(): void {
    this.clearSessionSafely();
    this._session.set(null);
  }

  getToken(): string | null {
    return this._session()?.token ?? null;
  }

  validateToken(token: string | null): boolean {
    const s = this._session();
    if (!token || !s) return false;
    return token === s.token && Date.now() < s.expiresAt;
  }
}
