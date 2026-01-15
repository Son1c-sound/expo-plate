import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
   user: defineTable({
     email: v.string(),
     clerkId: v.string(),
   }).index("by_clerkId", ["clerkId"]),
})