// These modules are referenced by prototype AI/DB code in `lib/`.
// They may not be installed yet; these declarations allow Next.js TS build
// to succeed during scaffolding. Runtime will still require real deps.

declare module "pdf-parse" {
  const pdfParse: any;
  export default pdfParse;
}

declare module "mammoth" {
  const mammoth: any;
  export default mammoth;
}

declare module "openai" {
  const OpenAI: any;
  export default OpenAI;
}

declare module "@pinecone-database/pinecone" {
  export const Pinecone: any;
}

declare module "@prisma/client" {
  export const PrismaClient: any;
}

