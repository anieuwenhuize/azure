import { app } from '@azure/functions';
import { BlobServiceClient } from '@azure/storage-blob';

app.http('upload', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

        // Connect to Azure Blob Storage
        const connectionString = "DefaultEndpointsProtocol=https;AccountName=cemtented;AccountKey=8zozpuVwCjpTu51pMnx4DLpTFnmu2tGRJ+OcHmFJNBGZ5mcF5pPzrjwR1Wvp119QLUwoUlzSkFZh+ASthwtBwQ==;EndpointSuffix=core.windows.net";
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        const containerClient = blobServiceClient.getContainerClient("abc");

        context.log(`Http function processed request for url "${request.url}"`);

        const blobs = await containerClient.listBlobsFlat();
        
        // determine number of blobbies
        const blebber = 0;
        for await (const blob of blobs)
            blebber++;

        const name = request.query.get('name') || await request.text() || 'world';

        return { body: `Hello, ${name}! There are number of ${blebber} previous requerst.` };
    }
});
