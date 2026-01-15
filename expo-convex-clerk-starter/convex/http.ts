import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { Webhook } from "svix";

const http = httpRouter();

export const clerkUsersWebhook = httpAction(async (ctx, req) => {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("Missing CLERK_WEBHOOK_SECRET environment variable");
    return new Response("Server configuration error", { status: 500 });
  }

  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.text();

  const wh = new Webhook(webhookSecret);
  let evt: { type: string; data: any };

  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as { type: string; data: any };
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response("Invalid signature", { status: 401 });
  }

  const { type, data } = evt;

  switch (type) { 
    case "user.created":
       await ctx.runMutation(internal.users.createUser, {
        email: data.email_addresses[0].email_address,
        clerkId: data.id,
       })
      break;
    case "user.updated":
      console.log("user updated", data);
      break;
    case "user.deleted":
      console.log("user deleted", data);
      break;
    default:
      console.log("Unknown event type:", type);
  }
  
  return new Response("Webhook processed", { status: 200 });
});



http.route({
   path: "/clerk-users-webhook",
   method: "POST",
   handler: clerkUsersWebhook,
})

export default http

