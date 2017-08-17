import WhatsAroundUrl from '../constants/WhatsAroundUrl'
import axios from 'axios';

class ApiHelper {
    static headers() {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'dataType': 'json',
        }
    }

    static async get(route) {
        return await this.xhr(route, null, 'GET');
    }

    static async put(route, params) {
        return await this.xhr(route, params, 'PUT')
    }

    static async post(route, params) {
        return await this.xhr(route, params, 'POST')
    }

    static async delete(route, params) {
        return await this.xhr(route, params, 'DELETE')
    }

    static async xhr(route, params, verb) {
        const host = WhatsAroundUrl.url;
        const url  = `${host}${route}`;

        try {
            let response  = await axios({
                url : url,
                method: verb,
                headers : ApiHelper.headers(),
                data : params
            });

            return response.data;
        } catch(error) {
            console.log(error.response);
            return null;
        }

    }
}

export default ApiHelper