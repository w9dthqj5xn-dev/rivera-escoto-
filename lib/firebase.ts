import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import type { DocumentSnapshot, QuerySnapshot, Timestamp } from "firebase-admin/firestore";

if (!getApps().length) {
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;
  if (FIREBASE_PROJECT_ID && FIREBASE_CLIENT_EMAIL && FIREBASE_PRIVATE_KEY) {
    initializeApp({
      credential: cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db = getApps().length ? getFirestore() : null as any;

/** Convierte un documento Firestore a un objeto plano con `id` y fechas como ISO string */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function docToData<T>(doc: DocumentSnapshot | any): T {
  const data = doc.data() as Record<string, unknown>;
  const result: Record<string, unknown> = { id: doc.id };
  for (const [key, value] of Object.entries(data)) {
    if (value && typeof (value as Timestamp).toDate === "function") {
      result[key] = (value as Timestamp).toDate().toISOString();
    } else {
      result[key] = value;
    }
  }
  return result as T;
}

/** Convierte todos los documentos de un QuerySnapshot a objetos planos */
export function docsToData<T>(snap: QuerySnapshot): T[] {
  return snap.docs.map((doc) => docToData<T>(doc));
}
