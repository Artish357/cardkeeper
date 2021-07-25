import { inject } from "vue";
async function getClient(){
    const OpenAPIClientAxios = (await import(/* webpackChunkName: "openapi" */ 'openapi-client-axios')).default
    const api = new OpenAPIClientAxios({ definition: 'http://localhost:3000/api/openapi.json' });
    api.init();
    return api.getClient();
}

function setupUpdate(model, synced, method){
    const client = inject('client')
    setInterval(async ()=>{
      if ( ! synced.value ){
        const readyClient = await client
        await readyClient[method](model.id, model)
        synced.value = true
      }
    }, 3000)
    return { client }
}

const plugin = {
    install(app) {
        app.provide('client', getClient())
    }
}



export {plugin as default, setupUpdate }