import api from '../axios.config'; // importing axios from customAxios

class ConversationService {

    list() {
        return api.get(`/conversations`);
    }

    getById(id: string) {
        return api.get(`/conversations/${id}`);
    }

    remove(id: string) {
        return api.delete(`/conversations/${id}`);
    }
}

const conversationService = new ConversationService();
export {conversationService};