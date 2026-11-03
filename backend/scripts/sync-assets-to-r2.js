const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT || `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

const BUCKET = process.env.R2_BUCKET_NAME || 'cuacuon';
const ASSETS_DIR = path.resolve(__dirname, '../../frontend/public/assets');

const MIME_MAP = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

async function main() {
  console.log('Reading files from:', ASSETS_DIR);
  if (!fs.existsSync(ASSETS_DIR)) {
    throw new Error('Assets directory not found: ' + ASSETS_DIR);
  }
  const files = fs.readdirSync(ASSETS_DIR);
  console.log(`Found ${files.length} asset files to upload to R2 bucket: ${BUCKET}`);

  let uploadedCount = 0;
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const contentType = MIME_MAP[ext] || 'application/octet-stream';
    const filePath = path.join(ASSETS_DIR, file);
    const body = fs.readFileSync(filePath);
    const key = `assets/${file}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: body,
        ContentType: contentType,
        Metadata: {
          originalName: file,
          uploadedBy: 'system-migration',
          sizeBytes: String(body.length),
        },
      })
    );
    uploadedCount++;
    console.log(`[${uploadedCount}/${files.length}] Uploaded: ${key} (${body.length} bytes, ${contentType})`);
  }

  // Verify list from R2
  const listRes = await s3Client.send(
    new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: 'assets/',
      MaxKeys: 10,
    })
  );
  console.log('Verification list from R2 (first 10):');
  listRes.Contents?.forEach((c) => console.log(' -', c.Key, c.Size, 'bytes'));

  console.log('✅ ALL ASSETS SUCCESSFULLY STORED IN CLOUDFLARE R2!');
}

main().catch(console.error);
