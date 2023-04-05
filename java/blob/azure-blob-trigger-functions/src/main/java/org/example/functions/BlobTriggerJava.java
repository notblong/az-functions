package org.example.functions;

import com.microsoft.azure.functions.annotation.*;
import com.microsoft.azure.functions.*;
import com.microsoft.azure.functions.signalr.SignalRMessage;
import com.microsoft.azure.functions.signalr.annotation.SignalROutput;

/**
 * Azure Functions with Azure Blob trigger.
 */
public class BlobTriggerJava {
    /**
     * This function will be invoked when a new or updated blob is detected at the specified path. The blob contents are provided as input to this function.
     */
    @FunctionName("BlobTriggerJava")
    @StorageAccount("AzureWebJobsStorage")
    @SignalROutput(
            name = "$return",
            connectionStringSetting = "AzureSignalRConnectionString",
            hubName = "app1signalr")
    public SignalRMessage run(
        @BlobTrigger(name = "content", path = "document/{uuid}", dataType = "binary") byte[] content,
        @BindingName("uuid") String uuid,
        final ExecutionContext context
    ) {
        context.getLogger().info("Java Blob trigger function processed a blob. Name: " + uuid + "\n  Size: " + content.length + " Bytes");

        SignalRMessage message = new SignalRMessage();
        message.target = "generatedDocument";
        message.arguments.add(uuid);
        return message;
    }
}
