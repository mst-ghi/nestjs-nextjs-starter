import { NextFetchEvent, NextRequest } from 'next/server';
import { guestMiddleware } from '@utils/middlewares';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  return guestMiddleware(req, ev);
}
