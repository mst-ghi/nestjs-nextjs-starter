import { NextFetchEvent, NextRequest } from 'next/server';
import { loggedInMiddleware } from '@utils/middlewares';

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  return loggedInMiddleware(req, ev);
}
