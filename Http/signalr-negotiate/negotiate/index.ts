import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest, signalRConnectionInfo: any): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    context.log('signalRConnectionInfo:', signalRConnectionInfo);
    context.res = {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Request-Headers': 'X-Custom-Header'
        },
        body: signalRConnectionInfo
    };
};

export default httpTrigger;