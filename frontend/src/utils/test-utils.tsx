/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';
import { RenderOptions, RenderResult, render } from '@testing-library/react';
import {
  RenderHookResult,
  act as actHook,
  addCleanup as addCleanupHook,
  cleanup as cleanupHook,
  removeCleanup as removeCleanupHook,
  renderHook,
  suppressErrorOutput as suppressErrorOutputHook,
} from '@testing-library/react-hooks';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as ReduxProvider } from 'react-redux';
import Store from '@store/index';
import BaseLayout from '@components/templates/baseLayout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const AllTheProviders: any = ({ children }: any) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={Store}>
        <BaseLayout>{children}</BaseLayout>
      </ReduxProvider>
    </QueryClientProvider>
  );
};

export interface RenderResultType extends RenderResult {
  rc: () => DocumentFragment;
}

const customRender = (ui: React.ReactElement, options?: RenderOptions): RenderResultType => {
  const renderResult = render(ui, { wrapper: AllTheProviders, ...options });
  return {
    ...renderResult,
    rc: renderResult.asFragment,
  };
};

interface HookRenderedResult<T> extends RenderHookResult<any, any> {
  rh: T;
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const customRenderHook = <T extends unknown>(
  hook: (...args: any[]) => any,
  options?: RenderOptions
): HookRenderedResult<T> => {
  const renderResult = renderHook(() => hook(), { wrapper: AllTheProviders, ...options });
  return {
    ...renderResult,
    rh: renderResult.result.current,
  };
};

export {
  customRender as render,
  customRenderHook as renderHook,
  actHook,
  addCleanupHook,
  cleanupHook,
  removeCleanupHook,
  suppressErrorOutputHook,
};
export * from '@testing-library/react';
export * from '@testing-library/user-event';
