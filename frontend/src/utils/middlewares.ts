/* eslint-disable @typescript-eslint/no-unused-vars */
import jwtDecode from 'jwt-decode';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export declare type PayloadType = {
  sub: number;
  iat: number;
  exp: number;
  jti: string;
};

export const getTokenFromRequest = (req: NextRequest) => {
  return req.cookies.__app__acs_tkn;
};

export const decodeToken = (token: string): PayloadType | undefined => {
  if (token) {
    try {
      return jwtDecode(token);
    } catch (error) {
      return undefined;
    }
  }
  return undefined;
};

export const isValidPayload = (payload: PayloadType | undefined) => {
  if (payload && payload.exp) {
    const currentDate = new Date();
    if (payload.exp * 1000 > currentDate.getTime()) {
      return false;
    }
  }
  return true;
};

export const loggedInMiddleware = (req: NextRequest, ev: NextFetchEvent) => {
  const token = getTokenFromRequest(req);
  const payload = decodeToken(token);

  if (isValidPayload(payload)) {
    return NextResponse.redirect('/403');
  }

  return undefined;
};

export const guestMiddleware = (req: NextRequest, ev: NextFetchEvent) => {
  const token = getTokenFromRequest(req);
  const payload = decodeToken(token);

  if (!isValidPayload(payload)) {
    return NextResponse.redirect('/404');
  }

  return undefined;
};
