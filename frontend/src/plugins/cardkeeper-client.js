async function getClient(){
    const OpenAPIClientAxios = await import('openapi-client-axios');
    const api = new OpenAPIClientAxios({ definition: 'http://localhost:3000/api/openapi.json' });
    api.init();
    return api.getClient();
}

export default {
    install(app) {
        app.config.globalProperties.$client = getClient()
    }
}