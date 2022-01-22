import axios from 'axios';
import { store } from '../store/ConfigureStore';
import * as constants from './constants';
import NetInfo from "@react-native-community/netinfo";
import { get } from 'lodash';


export default class ajax {
    static canShowMessage = true;
    constructor(params = {}) {
        this.data = params.data || {};
        this.method = params.method || 'GET';
        this.timeout = params.timeout;
        this.url = params.url;
        this.event = params.event || '';
        this.config = params.config || {};
        this.token = params.token || '';

        this.success = (res) => {
            if (this.loading === true) {
                window.ajaxInstanceRun--;
            }
            if (params.runOnSuccess) params.runOnSuccess(res);
            if (params.success) {
                if (typeof params.success === 'function') {
                    params.success(res);
                }
            }
        };
        this.error = (error) => { };
    }
    send() {
        const token = `Bearer ${store.getState().authReducer.accessToken}`;
        const baseUrl = constants.BASE_API_URL;
        const computeHeaderOption = {
            url: baseUrl,
            method: this.method,
            data: this.data,
            config: this.config,
            timeout: this.timeout || 10000,
            headers: {
                Authorization: token || null,
            },
        };
        const noToken = {
            url: baseUrl + this.url,
            method: this.method,
            data: this.data,
            config: this.config,
            timeout: this.timeout || 10000,
        };
        const hasToken = {
            url: baseUrl + this.url,
            method: this.method,
            data: this.data,
            config: this.config,
            timeout: this.timeout || 10000,
            headers: {
                Authorization: token || null,
            },
        };
        const options =
            this.event === 'compute'
                ? computeHeaderOption
                : this.event === 'noToken'
                    ? noToken
                    : hasToken;
        if (window.ajaxInstanceRun == undefined) window.ajaxInstanceRun = 0;
        window.ajaxInstanceRun++;
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                this.customzieAxiosRequest(options, this.success, this.error);
            }
        });
    }

    // created for handle timeout axios
    // cause https://github.com/axios/axios/issues/647
    customzieAxiosRequest(options, success, error) {
        const abort = axios.CancelToken.source()
        const id = setTimeout(
            () => {
                abort.cancel();
                setTimeout(() => {
                    ajax.canShowMessage = true;
                }, 30000);
            },
            options.timeout
        )

        axios(options)
            .then(res => { clearTimeout(id); success(res) })
            .catch(err => { clearTimeout(id); error(err) });
    }

    setTimeout(timeout) {
        this.timeout = timeout;
        return this;
    }

    setMethod(method) {
        this.method = method;
        return this;
    }

    setToken(token) {
        this.token = token;
        return this;
    }

    setUrl(url) {
        this.url = url;
        return this;
    }

    setEvent(event) {
        this.event = event;
        return this;
    }

    setData(data) {
        this.data = data;
        return this;
    }

    setConfigs(config) {
        this.config = config;
        return this;
    }

    setConfig(key, value) {
        this.config[key] = value;
        return this;
    }
}
