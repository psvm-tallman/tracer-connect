export async function register() {
    if (typeof window === "undefined") {
      const { connectDB } = await import("@/lib/db/connectDB");
      console.log("Connecting to DB...");
      await connectDB();
      console.log("Connected successfully to MongoDB");
    }
  }
  