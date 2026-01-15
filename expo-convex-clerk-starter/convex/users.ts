import { internalMutation, mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const createUser = internalMutation({
    args: {
        email: v.string(),
        clerkId: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await ctx.db.insert("user", {
            email: args.email,
            clerkId: args.clerkId,
        })
        return userId
    },
})

export const getUserByClerkId = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("user")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
            .unique()
    },
})

export const getAllUsers = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("user").collect()
    },
})

export const getCurrentUser = query({
    args: {},
    handler: async (ctx) => {
        console.log("server identity", await ctx.auth.getUserIdentity())
        const identity = await ctx.auth.getUserIdentity()
        if (identity === null) {
            throw new Error("Not authenticated")
        }
        return await ctx.db
            .query("user")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .unique()
    },
})

export const deleteUser = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity()
        if (identity === null) {
            throw new Error("Not authenticated")
        }

        const clerkId = identity.subject

        const user = await ctx.db
            .query("user")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
            .unique()

        if (user) {
            await ctx.db.delete(user._id)
        }

        return { success: true }
    },
})
