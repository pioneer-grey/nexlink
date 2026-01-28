import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

const endpoint= process.env.CLOUDFLARE_R2_ENDPOINT
const accessKeyId= process.env.CLOUDFLARE_R2_ACCESS_KEY
const secretAccessKey=process.env.CLOUDFLARE_R2_SECRET_KEY
const accountId=process.env.CLOUDFLARE_ACCOUNT_ID

if(!endpoint||!accessKeyId!|| !secretAccessKey || !accountId){
  throw new Error("Cloudflare enviroment variable is not set ")
}

const r2 = new S3Client({
  region: "auto",
  endpoint: endpoint,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey:secretAccessKey
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
    return `https://${accountId}.r2.dev/${key}`;

  }
  catch(err){
   throw err
  }

}