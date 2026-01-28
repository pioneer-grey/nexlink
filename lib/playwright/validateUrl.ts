import { URL } from "url";
import net from "net";
import dns from "dns/promises";


const isPrivateIP = (ip: string) => {
  const ipVersion = net.isIP(ip);
   if (!ipVersion) return false;
 
   if (ipVersion === 4) {
     return (
       ip.startsWith("10.") ||
       ip.startsWith("192.168.") ||
       /^172\.(1[6-9]|2\d|3[01])\./.test(ip) ||
       ip.startsWith("169.254.") ||
       ip.startsWith("127.") ||  
       ip === "0.0.0.0"
     );
   }
 
   const normalized = ip.toLowerCase();
   return (
     normalized === "::1" ||
     normalized.startsWith("fc") ||  
     normalized.startsWith("fd") ||  
     normalized.startsWith("fe80") ||  
     normalized.startsWith("::ffff:127.") ||  
     normalized.startsWith("::ffff:10.") ||
     normalized.startsWith("::ffff:192.168.") ||
     /^::ffff:172\.(1[6-9]|2\d|3[01])\./.test(normalized)
   );
};

export const validateUrl = async (url: string): Promise<string> => {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error("Invalid URL");
  }

  if (!["http:", "https:"].includes(parsed.protocol))
    throw new Error("Invalid URL protocol");

  if (
    parsed.hostname === "localhost" ||
    parsed.hostname.endsWith(".local")
  )
    throw new Error("Localhost URLs are not allowed");
    
  if (isPrivateIP(parsed.hostname))
    throw new Error("Private IPs are not allowed");

  if (!net.isIP(parsed.hostname)) {
    try {
      const addresses = await dns.resolve4(parsed.hostname);

      for (const ip of addresses) {
        if (isPrivateIP(ip)) {
          throw new Error("URL resolves to a private IP");
        }
      }
    } catch (err: any) {
      if (err.code === "ENOTFOUND") {
        throw new Error("Unable to resolve hostname");
      }
      throw err;
    }
  }

  return parsed.toString();
};


