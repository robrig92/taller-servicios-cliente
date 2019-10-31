import axios from "axios";

const singleton = Symbol();
const singletonEnforcer = Symbol();

// function readCookie(name) {
//     const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
//     return (match ? decodeURIComponent(match[3]) : null);
// }

class ApiService {
    constructor(enforcer) {
        let location = {
            protocol: 'http',
            host: '127.0.0.1:8000'
        };
        
        if (enforcer !== singletonEnforcer) {
            throw new Error('Cannot construct singleton');
        }

        this.session = axios.create({
            baseURL: `${location.protocol}://${location.host}/api`,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
        });
    }

    static get instance() {
        // Try to get an efficient singleton
        if (!this[singleton]) {
            this[singleton] = new ApiService(singletonEnforcer);
        }

        return this[singleton];
    }

    get = (...params) => this.session.get(...params);
    post = (...params) => this.session.post(...params);
    put = (...params) => this.session.put(...params);
    patch = (...params) => this.session.patch(...params);
    delete = (...params) => this.session.delete(...params);
}

export default ApiService.instance;