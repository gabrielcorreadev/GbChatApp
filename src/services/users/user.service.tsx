import axios from 'axios';
import { HttpUtil } from '../../util/http.util';
import api from '../axios.config'; // importing axios from customAxios

class UserService {

    list() {
        return api.get(`/users`);
    }

    getById(id: any) {
        return api.get(`/users/${id}`);
    }

    followers(id: string) {
        return api.get(`/users/${id}/followers`);
    }

    follow(id: string) {
        return api.post(`/users/${id}/follow`);
    }

    unfollow(id: string) {
        return api.post(`/users/${id}/unfollow`);
    }

    nearbyLocation(params:any) {
        const query = HttpUtil.getQueryStringFromObject(params);
        return api.get(`/users/nearby-location${query}`);
    }

    logout_all() {
        return api.post(`/devices/logout-all`);
    }

    searchSuggest(params:any) {
        const query = HttpUtil.getQueryStringFromObject(params);
        const urlBase = 'http://suggestqueries.google.com/complete/search';
        const url = `${urlBase}${query}`;
        return axios.get(url);
    }
}

const userService = new UserService();
export {userService};