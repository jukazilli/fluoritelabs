import { z } from "zod";

// ============================================================================
// Media Configuration & Constraints (docs/06, docs/07, docs/10)
// ============================================================================

export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/svg+xml",
] as const;

export type AllowedMimeType = (typeof ALLOWED_MIME_TYPES)[number];

export const MAX_MEDIA_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export const mediaValidationSchema = z.object({
  mimeType: z.enum(ALLOWED_MIME_TYPES, {
    error: `Invalid file type. Allowed types: ${ALLOWED_MIME_TYPES.join(", ")}`,
  }),
  sizeBytes: z
    .number()
    .positive("File size must be greater than 0")
    .max(
      MAX_MEDIA_SIZE_BYTES,
      `File size exceeds limit of ${MAX_MEDIA_SIZE_BYTES / (1024 * 1024)}MB`,
    ),
  filename: z.string().optional(),
});

export type MediaValidationInput = z.infer<typeof mediaValidationSchema>;

export class MediaValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MediaValidationError";
  }
}

/**
 * Validates file MIME type and size against editorial storage constraints.
 */
export function validateMediaFile(input: MediaValidationInput): {
  mimeType: AllowedMimeType;
  extension: string;
} {
  const result = mediaValidationSchema.safeParse(input);

  if (!result.success) {
    const message = result.error.issues.map((i) => i.message).join("; ");
    throw new MediaValidationError(message);
  }

  const mimeToExt: Record<AllowedMimeType, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/avif": "avif",
    "image/svg+xml": "svg",
  };

  return {
    mimeType: result.data.mimeType,
    extension: mimeToExt[result.data.mimeType],
  };
}

/**
 * Generates an immutable, collision-safe storage path for editorial media.
 * Format: [prefix]/[YYYY]/[MM]/[UUID].[ext]
 */
export function generateMediaKey(options: {
  prefix?: string;
  extension: string;
  id?: string;
}): string {
  const prefix = options.prefix || "journal";
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const id = options.id || crypto.randomUUID();
  const cleanExt = options.extension.replace(/^\./, "");

  return `${prefix}/${year}/${month}/${id}.${cleanExt}`;
}

export interface UploadMediaOptions {
  key: string;
  data: ArrayBuffer | Uint8Array | ReadableStream;
  contentType: string;
  customMetadata?: Record<string, string>;
}

export interface StoredMediaResult {
  key: string;
  size: number;
  etag: string;
  contentType: string;
  publicUrl: string;
}

/**
 * Resolves the canonical public URL for an R2 object key.
 */
export function getMediaPublicUrl(key: string, publicDomain?: string): string {
  const base = (
    publicDomain ||
    (typeof process !== "undefined" && process.env?.MEDIA_PUBLIC_URL) ||
    "https://media.fluoritelabs.com"
  ).replace(/\/+$/, "");

  const cleanKey = key.replace(/^\/+/, "");
  return `${base}/${cleanKey}`;
}

/**
 * Uploads an object to Cloudflare R2 bucket with typed metadata.
 */
export async function uploadMedia(
  bucket: R2Bucket,
  options: UploadMediaOptions,
  publicDomain?: string,
): Promise<StoredMediaResult> {
  const object = await bucket.put(options.key, options.data, {
    httpMetadata: {
      contentType: options.contentType,
    },
    customMetadata: options.customMetadata,
  });

  if (!object) {
    throw new Error(`Failed to upload media object with key: ${options.key}`);
  }

  return {
    key: object.key,
    size: object.size,
    etag: object.etag,
    contentType: object.httpMetadata?.contentType || options.contentType,
    publicUrl: getMediaPublicUrl(object.key, publicDomain),
  };
}

/**
 * Retrieves a stored object from Cloudflare R2.
 */
export async function getMedia(bucket: R2Bucket, key: string): Promise<R2ObjectBody | null> {
  return bucket.get(key);
}

/**
 * Controlled deletion of a stored object from Cloudflare R2.
 */
export async function deleteMedia(bucket: R2Bucket, key: string): Promise<void> {
  await bucket.delete(key);
}

/**
 * In-memory Mock R2Bucket implementation for testing and isolated offline runs.
 */
export function createMockR2Bucket(): R2Bucket {
  const storage = new Map<
    string,
    {
      data: Uint8Array;
      httpMetadata?: R2HTTPMetadata | Headers;
      customMetadata?: Record<string, string>;
      size: number;
      etag: string;
    }
  >();

  return {
    async put(
      key: string,
      value: Uint8Array | ArrayBuffer | string | unknown,
      options?: R2PutOptions,
    ): Promise<R2Object> {
      let bytes: Uint8Array;
      if (value instanceof Uint8Array) {
        bytes = value;
      } else if (value instanceof ArrayBuffer) {
        bytes = new Uint8Array(value);
      } else if (typeof value === "string") {
        bytes = new TextEncoder().encode(value);
      } else {
        bytes = new Uint8Array(0);
      }

      const etag = `mock-etag-${Date.now()}`;
      const entry = {
        data: bytes,
        httpMetadata: options?.httpMetadata,
        customMetadata: options?.customMetadata,
        size: bytes.byteLength,
        etag,
      };

      storage.set(key, entry);

      return {
        key,
        version: "1",
        size: bytes.byteLength,
        etag,
        httpEtag: `"${etag}"`,
        uploaded: new Date(),
        httpMetadata: options?.httpMetadata,
        customMetadata: options?.customMetadata,
        writeHttpMetadata: () => {},
      } as unknown as R2Object;
    },

    async get(key: string): Promise<R2ObjectBody | null> {
      const entry = storage.get(key);
      if (!entry) return null;

      return {
        key,
        version: "1",
        size: entry.size,
        etag: entry.etag,
        httpEtag: `"${entry.etag}"`,
        uploaded: new Date(),
        httpMetadata: entry.httpMetadata,
        customMetadata: entry.customMetadata,
        writeHttpMetadata: () => {},
        body: new ReadableStream({
          start(controller) {
            controller.enqueue(entry.data);
            controller.close();
          },
        }),
        bodyUsed: false,
        arrayBuffer: async () => entry.data.buffer.slice(0),
        text: async () => new TextDecoder().decode(entry.data),
        json: async () => JSON.parse(new TextDecoder().decode(entry.data)),
        blob: async () => new Blob([entry.data as unknown as BlobPart]),
      } as unknown as R2ObjectBody;
    },

    async delete(keys: string | string[]): Promise<void> {
      const keyList = Array.isArray(keys) ? keys : [keys];
      for (const k of keyList) {
        storage.delete(k);
      }
    },

    async head(key: string): Promise<R2Object | null> {
      const entry = storage.get(key);
      if (!entry) return null;
      return {
        key,
        version: "1",
        size: entry.size,
        etag: entry.etag,
        httpEtag: `"${entry.etag}"`,
        uploaded: new Date(),
        httpMetadata: entry.httpMetadata,
        customMetadata: entry.customMetadata,
        writeHttpMetadata: () => {},
      } as unknown as R2Object;
    },

    async list(): Promise<R2Objects> {
      const objects: R2Object[] = [];
      for (const [key, entry] of storage.entries()) {
        objects.push({
          key,
          version: "1",
          size: entry.size,
          etag: entry.etag,
          httpEtag: `"${entry.etag}"`,
          uploaded: new Date(),
          httpMetadata: entry.httpMetadata,
          customMetadata: entry.customMetadata,
          writeHttpMetadata: () => {},
        } as unknown as R2Object);
      }
      return {
        objects,
        truncated: false,
        delimitedPrefixes: [],
      } as unknown as R2Objects;
    },

    createMultipartUpload: async () => {
      throw new Error("Multipart upload not implemented in mock");
    },
    resumeMultipartUpload: () => {
      throw new Error("Multipart upload not implemented in mock");
    },
  };
}
