import { AzureFunction, Context } from "@azure/functions"

const blobTrigger: AzureFunction = async function (context: Context, myBlob: any): Promise<void> {
    context.log("Blob trigger function processed blob \n Name:", context.bindingData.uuid, "\n Blob Size:", myBlob.length, "Bytes");

    context.bindings.signalRMessages = [{
        target: 'generatedDocument',
        arguments: [context.bindingData.uuid],
    }];
};

export default blobTrigger;
