import OpenAPIClientAxios from 'openapi-client-axios';

const api = new OpenAPIClientAxios({ definition: 'http://localhost:3000/api/openapi.json' });
api.init();

export default {
    install(app) {
        app.config.globalProperties.$getClient = api.getClient
    }
}