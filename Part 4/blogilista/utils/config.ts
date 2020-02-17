export const PORT = process.env.PORT ?? 3003;

export const DB_PASS = process.env.DB_PASS;
export const MONGO_URL = `mongodb+srv://fullstack:${DB_PASS}@cluster0-x5cql.mongodb.net/test?retryWrites=true&w=majority`;