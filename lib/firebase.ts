import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export const db = admin.firestore();

/** Convierte un documento Firestore a un objeto plano con `id` y fechas como ISO string */
export function docToData<T>(doc: admin.firestore.DocumentSnapshot): T {
  const data = doc.data()!;
  const result: Record<string, unknown> = { id: doc.id };
  for (const [key, value] of Object.entries(data)) {
    if (value && typeof (value as admin.firestore.Timestamp).toDate === "function") {
      result[key] = (value as admin.firestore.Timestamp).toDate().toISOString();
    } else {
      result[key] = value;
    }
  }
  return result as T;
}
