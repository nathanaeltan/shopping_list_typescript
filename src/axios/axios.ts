import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    // console.info(`[request] [${JSON.stringify(config)}]`);
    return config;
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    // console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
    // console.info(`[response] [${JSON.stringify(response)}]`);
    console.log(response, "STATUS HER")
    return response;
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    // console.error(`[response error] [${JSON.stringify(error)}]`);
    console.log(error.response?.status, "ERROR HERE")
    return Promise.reject(error);
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    // axiosInstance.interceptors.response.use(response=>, onResponseError);
    return axiosInstance;
}