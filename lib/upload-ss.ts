import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";


const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY!
  }
});

export async function uploadScreenshot(buffer: Buffer) {
  const timestamp = Date.now(); 
  const key = `screenshots/screenshot_${timestamp}.png`;

  try{
     await r2.send(
    new PutObjectCommand({
      Bucket: "screenshots",
      Key: key,
      Body: buffer,
      ContentType: "image/png"
    })
  );
    return `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.dev/${key}`;

  }
  catch(err){
    console.log(err)
  }

}