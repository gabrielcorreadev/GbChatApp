import api from '../../axios.config'; // importing axios from customAxios

class DeviceService {

    list() {
        return api.get(`/devices`);
    }

    getById(id: string) {
        return api.get(`/devices/${id}`);
    }

    logout(id: string) {
        return api.post(`/devices/${id}/logout`);
    }

    logout_all() {
        return api.post(`/devices/logout-all`);
    }
}

const deviceService = new DeviceService();
export {deviceService};