import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import api, { request_headers } from '../axios.config'; // importing axios from customAxios
import { environment } from '../../environments/environment.prod';
import { Credentials } from '../../types/system/credentials';
import { SessionData } from '../../types/system/session-data';

class AuthenticationService {

    basUrl = `${environment.URL}/auth`;

    
    login(credenciais: Credentials) {
        return axios.post(`${this.basUrl}/login`, credenciais, {headers: request_headers});
    }

    signup(data: any) {
        return axios.post(`${this.basUrl}/signup`, data, {headers: request_headers});
    }

    logout() {
        return api.post(`/auth/logout`);
    }

    async getSessionStorageData(): Promise<SessionData> {
        return AsyncStorage.getItem(environment.storageKeys.dataSession)
        .then((json: any) => {
            return JSON.parse(json) as SessionData;
        });
    }

    async saveSessionData(item: SessionData): Promise<void> {
        return AsyncStorage.setItem(environment.storageKeys.dataSession, JSON.stringify(item));
    }

    async removeSession(): Promise<void> {
        AsyncStorage.removeItem(environment.storageKeys.dataSession);
    }
}

const authenticationService = new AuthenticationService();
export {authenticationService};