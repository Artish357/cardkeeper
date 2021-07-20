async function getClient(){
    const OpenAPIClientAxios = (await import(/* webpackChunkName: "openapi" */ 'openapi-client-axios')).default
    const api = new OpenAPIClientAxios({ definition: 'http://localhost:3000/api/openapi.json' });
    api.init();
    return api.getClient();
}

export default {
    install(app) {
        app.config.globalProperties.$client = getClient()
    }
}