import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY!,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY!
  }
});

export const uploadImg=async(buffer: Buffer,bucket:string):Promise<string>=> {
  const key = `${bucket}_${randomUUID()}.png`;

  try{
     await r2.send(
    new PutObjectCommand({
      Bucket:bucket,
      Key: key,
      Body: buffer,
      ContentType: "image/png"
    })
  );
    return `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.dev/${key}`;

  }
  catch{
   throw new Error("Failed to upload image to R2:");
  }

}