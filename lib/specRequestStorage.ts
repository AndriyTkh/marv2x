import { promises as fs } from 'fs';
import path from 'path';

/**
 * Storage utility for spec request submissions
 *
 * Stores form submissions as JSON files in the data/spec-requests directory.
 * Each submission is stored with a unique filename based on timestamp and email.
 *
 * Requirements: 9.2
 */

export interface SpecRequest {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  country: string;
  phone: string;
  productId: string;
  timestamp: string;
}

const DATA_DIR = path.join(process.cwd(), 'data', 'spec-requests');

/**
 * Ensure the data directory exists
 */
async function ensureDataDir(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
    throw new Error('Failed to initialize storage');
  }
}

/**
 * Generate a safe filename from email and timestamp
 */
function generateFilename(email: string, timestamp: string): string {
  const safeEmail = email.replace(/[^a-zA-Z0-9]/g, '_');
  const safeTimestamp = timestamp.replace(/[^0-9]/g, '');
  return `${safeTimestamp}_${safeEmail}.json`;
}

/**
 * Store a spec request submission
 *
 * @param request - The spec request data to store
 * @returns Promise that resolves when storage is complete
 * @throws Error if storage fails
 */
export async function storeSpecRequest(request: SpecRequest): Promise<void> {
  await ensureDataDir();

  const filename = generateFilename(request.email, request.timestamp);
  const filepath = path.join(DATA_DIR, filename);

  try {
    await fs.writeFile(filepath, JSON.stringify(request, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing spec request to file:', error);
    throw new Error('Failed to store spec request');
  }
}

/**
 * Retrieve all spec requests (optional utility for future use)
 *
 * @returns Promise that resolves to array of all stored spec requests
 */
export async function getAllSpecRequests(): Promise<SpecRequest[]> {
  try {
    await ensureDataDir();
    const files = await fs.readdir(DATA_DIR);
    const jsonFiles = files.filter((file) => file.endsWith('.json'));

    const requests = await Promise.all(
      jsonFiles.map(async (file) => {
        const filepath = path.join(DATA_DIR, file);
        const content = await fs.readFile(filepath, 'utf-8');
        return JSON.parse(content) as SpecRequest;
      }),
    );

    return requests;
  } catch (error) {
    console.error('Error reading spec requests:', error);
    return [];
  }
}
