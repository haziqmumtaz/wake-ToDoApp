/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { HttpClient, httpClient } from './http';

vi.mock('axios');
const mockedAxios = vi.mocked(axios);

describe('HttpClient', () => {
  let client: HttpClient;
  let mockAxiosInstance: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();

    mockAxiosInstance = {
      get: vi.fn().mockResolvedValue({ data: {} }),
      post: vi.fn().mockResolvedValue({ data: {} }),
      put: vi.fn().mockResolvedValue({ data: {} }),
      delete: vi.fn().mockResolvedValue({ data: {} }),
      patch: vi.fn().mockResolvedValue({ data: {} }),
    };

    mockedAxios.create = vi.fn().mockReturnValue(mockAxiosInstance as any);
  });

  describe('constructor', () => {
    it('creates axios instance with correct configuration', () => {
      client = new HttpClient();
      expect(axios.create).toHaveBeenCalledWith({
        baseURL: 'http://localhost:3001',
        timeout: 5000,
      });
    });
  });

  describe('get', () => {
    beforeEach(() => {
      client = new HttpClient();
    });

    it('calls axios.get and returns data', async () => {
      const mockData = { id: 1, name: 'Test' };
      mockAxiosInstance.get.mockResolvedValue({ data: mockData });

      const result = await client.get('/test');

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test', undefined);
      expect(result).toEqual(mockData);
    });

    it('passes config to axios.get', async () => {
      const mockData = { id: 1 };
      const config = { params: { page: 1 } };
      mockAxiosInstance.get.mockResolvedValue({ data: mockData });

      const result = await client.get('/test', config);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/test', config);
      expect(result).toEqual(mockData);
    });
  });

  describe('post', () => {
    beforeEach(() => {
      client = new HttpClient();
    });

    it('calls axios.post and returns data', async () => {
      const mockData = { id: 1 };
      const payload = { name: 'Test' };
      mockAxiosInstance.post.mockResolvedValue({ data: mockData });

      const result = await client.post('/test', payload);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/test', payload, undefined);
      expect(result).toEqual(mockData);
    });

    it('passes config to axios.post', async () => {
      const mockData = { id: 1 };
      const payload = { name: 'Test' };
      const config = { headers: { 'Content-Type': 'application/json' } };
      mockAxiosInstance.post.mockResolvedValue({ data: mockData });

      const result = await client.post('/test', payload, config);

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/test', payload, config);
      expect(result).toEqual(mockData);
    });
  });

  describe('put', () => {
    beforeEach(() => {
      client = new HttpClient();
    });

    it('calls axios.put and returns data', async () => {
      const mockData = { id: 1, name: 'Updated' };
      const payload = { name: 'Updated' };
      mockAxiosInstance.put.mockResolvedValue({ data: mockData });

      const result = await client.put('/test/1', payload);

      expect(mockAxiosInstance.put).toHaveBeenCalledWith('/test/1', payload, undefined);
      expect(result).toEqual(mockData);
    });

    it('passes config to axios.put', async () => {
      const mockData = { id: 1 };
      const payload = { name: 'Updated' };
      const config = { headers: { 'Content-Type': 'application/json' } };
      mockAxiosInstance.put.mockResolvedValue({ data: mockData });

      const result = await client.put('/test/1', payload, config);

      expect(mockAxiosInstance.put).toHaveBeenCalledWith('/test/1', payload, config);
      expect(result).toEqual(mockData);
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      client = new HttpClient();
    });

    it('calls axios.delete and returns data', async () => {
      const mockData = {};
      mockAxiosInstance.delete.mockResolvedValue({ data: mockData });

      const result = await client.delete('/test/1');

      expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/test/1', undefined);
      expect(result).toEqual(mockData);
    });

    it('passes config to axios.delete', async () => {
      const mockData = {};
      const config = { params: { force: true } };
      mockAxiosInstance.delete.mockResolvedValue({ data: mockData });

      const result = await client.delete('/test/1', config);

      expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/test/1', config);
      expect(result).toEqual(mockData);
    });
  });

  describe('patch', () => {
    beforeEach(() => {
      client = new HttpClient();
    });

    it('calls axios.patch and returns data', async () => {
      const mockData = { id: 1, name: 'Patched' };
      const payload = { name: 'Patched' };
      mockAxiosInstance.patch.mockResolvedValue({ data: mockData });

      const result = await client.patch('/test/1', payload);

      expect(mockAxiosInstance.patch).toHaveBeenCalledWith('/test/1', payload, undefined);
      expect(result).toEqual(mockData);
    });

    it('passes config to axios.patch', async () => {
      const mockData = { id: 1 };
      const payload = { name: 'Patched' };
      const config = { headers: { 'Content-Type': 'application/json' } };
      mockAxiosInstance.patch.mockResolvedValue({ data: mockData });

      const result = await client.patch('/test/1', payload, config);

      expect(mockAxiosInstance.patch).toHaveBeenCalledWith('/test/1', payload, config);
      expect(result).toEqual(mockData);
    });
  });

  describe('httpClient singleton', () => {
    it('exports a singleton instance', () => {
      const newClient = new HttpClient();
      expect(newClient).toBeInstanceOf(HttpClient);
      expect(httpClient).toBeInstanceOf(HttpClient);
    });
  });
});
