import { app } from '@azure/functions';
import { BlobServiceClient } from '@azure/storage-blob';

app.http('upload', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

        // parse input into varable
        const input = request.query.get('name') || await request.text() || 'world';

        // Connect to Azure Blob Storage
        const connectionString = "DefaultEndpointsProtocol=https;AccountName=cemtented;AccountKey=8zozpuVwCjpTu51pMnx4DLpTFnmu2tGRJ+OcHmFJNBGZ5mcF5pPzrjwR1Wvp119QLUwoUlzSkFZh+ASthwtBwQ==;EndpointSuffix=core.windows.net";
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        const containerClient = blobServiceClient.getContainerClient("abc");

        // context.log(`Http function processed request for url "${request.url}"`);
        const blobName = "blob" + new Date().getTime() + '.txt';
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const uploadBlobResponse = await blockBlobClient.upload(input, input.length);
        

        // create new blob first
        
        // determine number of blobbies
        let blebber = 0;
        const blobs = containerClient.listBlobsFlat();
        for await (const blob of blobs)
            blebber++;

        return { body: `Hello, ${input}! There are number of ${blebber} previous requerst.` };
    }
});
