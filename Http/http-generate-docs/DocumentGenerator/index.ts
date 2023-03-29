import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    setTimeout(() => {
        context.log('AZ Function - Wait...');
    }, 10000);

    const uuid = (req.query.uuid || (req.body && req.body.uuid));
    const responseMessage = uuid
        ? `Generate ${uuid}.docx`
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.log(responseMessage);
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

};

export default httpTrigger;