/* eslint-disable @typescript-eslint/no-explicit-any */
import { STATUS_CODE } from "@/types/constant/api.constant";
import { IResponse } from "@/types/interaface/api.interface";
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";
import { getSession } from "next-auth/react";

export const ApiServerURL = process.env.NEXT_PUBLIC_API_URL;

const headers: AxiosRequestConfig["headers"] = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

class Axios {
    private instance: AxiosInstance;
    private interceptor: number | null = null;

    constructor() {
        const instance = axios.create({ baseURL: ApiServerURL, headers });
        instance.interceptors.request.use(
            async (config: any) => {
                const session = await getSession();

                // Attempt to extract accessToken from session (may be in session or session.user)
                const accessToken =
                    (session as any)?.accessToken ?? (session as any)?.user?.accessToken;

                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error: any) => Promise.reject(error)
        );

        // Config response interceptor
        const interceptor = instance.interceptors.response.use(
            (response: AxiosResponse) => {
                const isValidResponse =
                    (response.status === STATUS_CODE.OK ||
                        response.status === STATUS_CODE.CREATED) &&
                    response.data;

                if (isValidResponse) {
                    return response.data;
                }

                return Promise.reject({
                    status: response?.status,
                    message: response?.data?.message,
                    data: response?.data,
                });
            },
            (error: AxiosError<IResponse<any>>) => {
                if (error.response) {
                    const { status, data } = error.response;
                    const errorMessage =
                        data.message || "An error occurred while processing the request.";

                    return Promise.reject({
                        status,
                        message: errorMessage,
                        data,
                    });
                }

                return Promise.reject(error);
            }
        );

        this.interceptor = interceptor;
        this.instance = instance;
    }

    setAccessToken(token?: string) {
        if (token) {
            this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
        } else {
            delete this.instance.defaults.headers.common.Authorization;
        }
    }

    public get Instance(): AxiosInstance {
        return this.instance;
    }

    private useInterceptor() {
        if (this.interceptor === null) {
            const interceptor = this.instance.interceptors.response.use(
                (response: AxiosResponse) => response.data,
                (error: AxiosError) => Promise.reject(error)
            );
            this.interceptor = interceptor;
        }
    }

    public get<Type = any, Resposnse = Type>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<Resposnse> {
        this.useInterceptor();
        return this.Instance.get<Type, Resposnse>(url, config);
    }

    public post<Type = any, Resposnse = Type>(
        url: string,
        data?: Type,
        config?: AxiosRequestConfig
    ): Promise<Resposnse> {
        this.useInterceptor();
        return this.Instance.post<Type, Resposnse>(url, data, config);
    }

    // Post method for uploading files (multipart/form-data)
    public postFile<Resposnse = any>(
        url: string,
        formData: FormData,
        config?: AxiosRequestConfig
    ): Promise<Resposnse> {
        this.useInterceptor();
        const fileConfig: AxiosRequestConfig = {
            ...config,
            headers: {
                ...(config?.headers || {}),
                "Content-Type": "multipart/form-data",
            },
        };
        return this.Instance.post<FormData, Resposnse>(url, formData, fileConfig);
    }

    public put<Type = any, Resposnse = Type>(
        url: string,
        data?: Type,
        config?: AxiosRequestConfig
    ): Promise<Resposnse> {
        this.useInterceptor();
        return this.Instance.put<Type, Resposnse>(url, data, config);
    }

    public patch<Type = any, Resposnse = Type>(
        url: string,
        data?: Type,
        config?: AxiosRequestConfig
    ): Promise<Resposnse> {
        this.useInterceptor();
        return this.Instance.patch<Type, Resposnse>(url, data, config);
    }

    public delete<Type = any, Resposnse = Type>(
        url: string,
        config?: AxiosRequestConfig
    ): Promise<Resposnse> {
        this.useInterceptor();
        return this.Instance.delete<Type, Resposnse>(url, config);
    }
}

const HttpClient = new Axios();
export default HttpClient;