package org.example.functions;

import com.microsoft.azure.functions.annotation.*;
import com.microsoft.azure.functions.*;

/**
 * Azure Functions with Service Bus Trigger.
 */
public class ServiceBusQueueTriggerJava {
    /**
     * This function will be invoked when a new message is received at the Service Bus Queue.
     */
    @FunctionName("ServiceBusQueueTriggerJava")
    public void run(
            @ServiceBusQueueTrigger(name = "msg",
                    queueName = "document-queue",
                    connection = "AzureServiceBusConnectionString") String mySbMsg,
            @CosmosDBInput(name = "database",
                    databaseName = "DataBase1",
                    containerName = "User",
                    sqlQuery = "SELECT * FROM c WHERE c.id = {uuid}",
                    connection = "CosmosDBConnectionString") User[] userData,
            final ExecutionContext context
    ) {
        context.getLogger().info("Java Service Bus Queue trigger function executed.");
        context.getLogger().info(mySbMsg);
        context.getLogger().info("Java - UserData retrieve from CosmosDB");
        context.getLogger().info(userData.toString());
    }
}
