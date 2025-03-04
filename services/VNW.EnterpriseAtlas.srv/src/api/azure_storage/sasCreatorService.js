
import { BlobServiceClient, generateBlobSASQueryParameters, BlobSASPermissions } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';

const AZURE_CONNECTION_STRING = process.env.AZURE_CONNECTION_STRING;

const getBlobSasUrl = async (containerName, blobName) => {
    const storageClient = BlobServiceClient.fromConnectionString(AZURE_CONNECTION_STRING);

    const containerClient = storageClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    // Cấu hình SAS Token
    const sasOptions = {
        containerName,
        blobName,
        permissions: BlobSASPermissions.parse("r"), // Quyền đọc (read)
        expiresOn: new Date(new Date().valueOf() + 3600 * 1000), // Hết hạn sau 1 giờ
    };

    const accountName = "<storage-account-name>"; // Tên tài khoản Azure Storage
    const accountKey = "<storage-account-key>";  // Khóa tài khoản (Account Key)

    const sasToken = generateBlobSASQueryParameters(sasOptions, { accountName, accountKey }).toString();
    const sasUrl = `${blobClient.url}?${sasToken}`;

    console.log("Link truy cập blob với SAS Token:", sasUrl);
};

getBlobSasUrl().catch((err) => {
    console.error("Lỗi khi tạo SAS Token:", err.message);
});
