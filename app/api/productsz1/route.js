import clientPromise from "../../lib/mongodb";
import { NextResponse } from "next/server";

export const revalidate = 10;

// Handle preflight (CORS)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const collection = db.collection("Product");

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // ✅ Multi-value support
    const rawSearch = searchParams.get("q");
    const rawCats = searchParams.getAll("cat");  // ✅ multiple categories
    const rawSubs = searchParams.getAll("sub");  // ✅ multiple subcategories
    const rawBrnds = searchParams.getAll("brnd"); // ✅ multiple brands
    const rawSizes = searchParams.getAll("size");

    const search = rawSearch?.trim();
    const cats = rawCats.map((c) => c.trim()).filter(Boolean);
    const subs = rawSubs.map((c) => c.trim()).filter(Boolean);
    const brnds = rawBrnds.map((c) => c.trim()).filter(Boolean);
    const sizes = rawSizes.map((s) => s.trim());

    console.log("🔎 RAW:", { rawCats, rawSubs, rawBrnds });
    console.log("✂️ TRIMMED:", { cats, subs, brnds });

    const query = {};

    // 🔍 Fuzzy search
    if (search) {
      if (search.toLowerCase() === "moto") {
        query.category = "moto";
      } else {
        const tokens = search.split(/\s+/).filter(Boolean);
        query.$and = tokens.map((token) => ({
          $or: [
            { title: { $regex: token, $options: "i" } },
            { category: { $regex: token, $options: "i" } },
            { sub: { $regex: token, $options: "i" } },
            { factory: { $regex: token, $options: "i" } },
            { "color.sizes.size": { $regex: token, $options: "i" } },
            { "color.name": { $regex: token, $options: "i" } },
          ],
        }));
      }
    }

    // ✅ MULTIPLE CATEGORY FILTER
    if (cats.length > 0) {
      if (cats.includes("yes")) query.arrival = "yes";

      const filteredCats = cats.filter((c) => c !== "yes");

      if (filteredCats.length > 0) {
        query.category = { $in: filteredCats };
      }
    }

    // ✅ MULTIPLE SUB-CATEGORY FILTER
    if (subs.length > 0) {
      query.sub = { $in: subs };
    }

    // ✅ MULTIPLE BRAND FILTER
    if (brnds.length > 0) {
      query.factory = { $in: brnds };
    }

    // ✅ MULTIPLE SIZE FILTER
    if (sizes.length > 0) {
      query["color.sizes.size"] = { $in: sizes };
    }

    console.log("📝 QUERY:", query);

    const total = await collection.countDocuments(query);

    const data = await collection
      .find(query)
      .sort({ sort: 1, _id: 1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return new NextResponse(
      JSON.stringify({
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasMore: page * limit < total,
        products: data,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("❌ MongoDB error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch data" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
