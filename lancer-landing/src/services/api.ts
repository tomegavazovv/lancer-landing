import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const APIURL = 'http://localhost:3003';
// Use proxy route to avoid CORS issues
const PROXY_BASE_URL = '/api/proxy';

const generateRequestConfig = async ({
  headers,
  ...base
}: AxiosRequestConfig = {}) => {
  return {
    ...(base || {}),
    baseURL: PROXY_BASE_URL,
    withCredentials: true,
    headers: {
      ...(headers || {}),
    },
  };
};

export const axiosInstance = axios.create({
  baseURL: PROXY_BASE_URL,
  withCredentials: true,
});

export const fetcher = async <T>(path: string, config?: AxiosRequestConfig) => {
  const { data } = await axiosInstance.get<T>(
    path,
    await generateRequestConfig(config)
  );

  return data;
};

export const poster = async <D = any, R = any>(
  path: string,
  data?: D,
  config?: AxiosRequestConfig<D>
): Promise<AxiosResponse<R>> => {
  return await axiosInstance.post<R, AxiosResponse<R>, D>(
    path,
    data,
    await generateRequestConfig(config)
  );
};

export const patcher = async <D = any, R = any>(
  path: string,
  data?: D,
  config?: AxiosRequestConfig<D>
): Promise<AxiosResponse<R>> => {
  return await axiosInstance.patch(
    path,
    data,
    await generateRequestConfig(config)
  );
};

export const deleter = async <D = any, R = any>(
  path: string,
  config?: AxiosRequestConfig<D>
): Promise<AxiosResponse<R>> => {
  return await axiosInstance.delete(path, await generateRequestConfig(config));
};

export const streamer = async <T>(
  path: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<ReadableStream<T>> => {
  const requestConfig = await generateRequestConfig(config);

  return new ReadableStream({
    start(controller) {
      let buffer = '';

      axiosInstance.post(path, data, {
        ...requestConfig,
        responseType: 'text',
        headers: {
          ...requestConfig.headers,
          Accept: 'text/event-stream',
        },
        onDownloadProgress: (progressEvent) => {
          const chunk = progressEvent.event.target.responseText.slice(
            buffer.length
          );
          buffer = progressEvent.event.target.responseText;

          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);

              if (data === '[DONE]') {
                controller.close();
              } else {
                try {
                  const parsed = JSON.parse(data);
                  controller.enqueue(parsed);
                } catch (e) {
                  console.error('Streamer: Failed to parse SSE data:', e);
                }
              }
            }
          }
        },
      });
    },
  });
};
