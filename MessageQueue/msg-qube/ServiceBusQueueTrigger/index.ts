import { AzureFunction, Context } from "@azure/functions";
import { Document, Paragraph, TextRun, Packer } from 'docx';

const serviceBusQueueTrigger: AzureFunction = async function (context: Context, mySbMsg: any, users: any): Promise<void> {
    context.log('ServiceBus queue triggered', mySbMsg);
    context.log('UserData retrieve from CosmosDB', JSON.stringify(users));

    if (!users) {
        // Not found.
        return;
    }

    // create docx
    context.log(`Create ${mySbMsg.uuid}.docx....`);
    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `Hello ${users[0].name}`,
                                bold: true,
                            }),
                            new TextRun(`email: ${users[0].email}`),
                            new TextRun(`user: ${users[0].username}`),
                            new TextRun({
                                text: "\tThis document is powered by DocxJS",
                                bold: true,
                            }),
                        ],
                    }),
                ],
            },
        ],
    });

    const buffer = await Packer.toBuffer(doc);
    context.bindings.myOutputBlob = buffer;
};

export default serviceBusQueueTrigger;
