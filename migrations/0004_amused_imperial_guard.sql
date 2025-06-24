ALTER TABLE "subscriptions" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "collaborators" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "collaborators" CASCADE;--> statement-breakpoint
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_price_id_prices_id_fk";
--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "workspace_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "folder_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "folders" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "folders" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "folders" ALTER COLUMN "workspace_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "created" SET DEFAULT timezone('utc'::text, now());--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "current_period_start" SET DEFAULT timezone('utc'::text, now());--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "current_period_end" SET DEFAULT timezone('utc'::text, now());--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "ended_at" SET DEFAULT timezone('utc'::text, now());--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "cancel_at" SET DEFAULT timezone('utc'::text, now());--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "canceled_at" SET DEFAULT timezone('utc'::text, now());--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "trial_start" SET DEFAULT timezone('utc'::text, now());--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "trial_end" SET DEFAULT timezone('utc'::text, now());--> statement-breakpoint
ALTER TABLE "workspaces" ALTER COLUMN "created_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "workspaces" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "logo" text;--> statement-breakpoint
ALTER TABLE "folders" ADD COLUMN "logo" text;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_price_id_fkey" FOREIGN KEY ("price_id") REFERENCES "public"."prices"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "Can only view own subs data." ON "subscriptions" AS PERMISSIVE FOR SELECT TO public USING ((( SELECT auth.uid() AS uid) = user_id));