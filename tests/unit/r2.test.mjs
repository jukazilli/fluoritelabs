import assert from "node:assert/strict";
import {
  validateMediaFile,
  generateMediaKey,
  uploadMedia,
  getMedia,
  deleteMedia,
  getMediaPublicUrl,
  createMockR2Bucket,
  MediaValidationError,
  MAX_MEDIA_SIZE_BYTES,
} from "../../app/integrations/storage/r2.server.ts";

console.log("Running Cloudflare R2 Storage unit tests...\n");

// 1. Media Type & Size Validation Tests (AC-03)
{
  console.log("1. Validating MIME type and size boundaries...");

  // Valid image types
  const validWebp = validateMediaFile({
    mimeType: "image/webp",
    sizeBytes: 1024 * 500, // 500 KB
  });
  assert.equal(validWebp.extension, "webp");

  const validPng = validateMediaFile({
    mimeType: "image/png",
    sizeBytes: 1024 * 1024 * 2, // 2 MB
  });
  assert.equal(validPng.extension, "png");

  // Invalid MIME type (e.g. executable or binary)
  assert.throws(
    () =>
      validateMediaFile({
        mimeType: "application/octet-stream",
        sizeBytes: 1024,
      }),
    (err) => err instanceof MediaValidationError,
    "Should reject disallowed MIME types",
  );

  // File size exceeding limit (> 10MB)
  assert.throws(
    () =>
      validateMediaFile({
        mimeType: "image/jpeg",
        sizeBytes: MAX_MEDIA_SIZE_BYTES + 1,
      }),
    (err) => err instanceof MediaValidationError,
    "Should reject files larger than 10MB",
  );

  console.log("   ✓ MIME and file size validation constraints passed.");
}

// 2. Storage Key & Public URL Generation Tests (AC-05)
{
  console.log("2. Validating key structure and public URL resolution...");

  const key = generateMediaKey({
    prefix: "journal",
    extension: "webp",
    id: "test-uuid-1234",
  });
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");

  assert.equal(key, `journal/${year}/${month}/test-uuid-1234.webp`);

  const publicUrl = getMediaPublicUrl(key, "https://media.fluoritelabs.com");
  assert.equal(
    publicUrl,
    `https://media.fluoritelabs.com/journal/${year}/${month}/test-uuid-1234.webp`,
  );

  console.log("   ✓ Key hierarchy and public URL generation passed.");
}

// 3. Storage Lifecycle Test (Upload -> Read -> Delete) (AC-02, AC-04)
{
  console.log("3. Testing upload, retrieval, and deletion lifecycle...");

  const bucket = createMockR2Bucket();
  const testKey = generateMediaKey({ prefix: "journal", extension: "webp" });
  const testPayload = new TextEncoder().encode("MOCK_IMAGE_BINARY_DATA");

  // Upload
  const uploadResult = await uploadMedia(bucket, {
    key: testKey,
    data: testPayload,
    contentType: "image/webp",
    customMetadata: {
      author: "Juliano Zilli",
      purpose: "journal-cover",
    },
  });

  assert.equal(uploadResult.key, testKey);
  assert.equal(uploadResult.contentType, "image/webp");
  assert.ok(uploadResult.publicUrl.includes(testKey));

  // Retrieve (Read)
  const retrieved = await getMedia(bucket, testKey);
  assert.ok(retrieved !== null, "Object should be found in bucket");
  assert.equal(retrieved.key, testKey);
  const retrievedText = await retrieved.text();
  assert.equal(retrievedText, "MOCK_IMAGE_BINARY_DATA");
  assert.equal(retrieved.customMetadata?.purpose, "journal-cover");

  // Delete
  await deleteMedia(bucket, testKey);
  const afterDelete = await getMedia(bucket, testKey);
  assert.equal(afterDelete, null, "Object should be deleted from bucket");

  console.log("   ✓ Storage lifecycle (upload, read, delete) completed successfully.");
}

console.log("\n✓ All Cloudflare R2 Storage unit tests passed successfully!");
