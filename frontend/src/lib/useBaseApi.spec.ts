/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import useBaseApi from './useBaseApi';

describe('useBaseApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with isLoading as false and error as null', () => {
    const { result } = renderHook(() => useBaseApi());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets isLoading to true during API call', async () => {
    const mockApiCall = vi
      .fn()
      .mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve({ data: 'success' }), 100))
      );

    const { result } = renderHook(() => useBaseApi());

    expect(result.current.isLoading).toBe(false);

    let promise: Promise<unknown>;
    await act(async () => {
      promise = result.current.execute(mockApiCall);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(true);
    });

    await act(async () => {
      await promise;
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('returns data on successful API call', async () => {
    const mockData = { id: 1, name: 'Test' };
    const mockApiCall = vi.fn().mockResolvedValue(mockData);

    const { result } = renderHook(() => useBaseApi());

    let response: unknown;
    await act(async () => {
      response = await result.current.execute(mockApiCall);
    });

    expect(response).toEqual(mockData);
    await waitFor(() => {
      expect(result.current.error).toBeNull();
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('sets error message on failed API call', async () => {
    const mockError = new Error('API Error');
    const mockApiCall = vi.fn().mockRejectedValue(mockError);
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useBaseApi());

    let response: unknown;
    await act(async () => {
      response = await result.current.execute(mockApiCall);
    });

    await waitFor(() => {
      expect(result.current.error).toBe('Something went wrong. Please try again later.');
    });

    expect(response).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith(mockError);

    consoleErrorSpy.mockRestore();
  });

  it('resets error on new API call', async () => {
    const mockError = new Error('First error');
    const mockApiCall1 = vi.fn().mockRejectedValue(mockError);
    const mockApiCall2 = vi.fn().mockResolvedValue({ data: 'success' });
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useBaseApi());

    await act(async () => {
      await result.current.execute(mockApiCall1);
    });

    await waitFor(() => {
      expect(result.current.error).toBe('Something went wrong. Please try again later.');
    });

    await act(async () => {
      await result.current.execute(mockApiCall2);
    });

    await waitFor(() => {
      expect(result.current.error).toBeNull();
    });

    consoleErrorSpy.mockRestore();
  });

  it('sets isLoading to false after successful API call', async () => {
    const mockApiCall = vi.fn().mockResolvedValue({ data: 'success' });

    const { result } = renderHook(() => useBaseApi());

    await act(async () => {
      await result.current.execute(mockApiCall);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('sets isLoading to false after failed API call', async () => {
    const mockError = new Error('API Error');
    const mockApiCall = vi.fn().mockRejectedValue(mockError);
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useBaseApi());

    await act(async () => {
      await result.current.execute(mockApiCall);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    consoleErrorSpy.mockRestore();
  });
});
