CREATE TABLE "site" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"site" text NOT NULL,
	"site_url" text NOT NULL,
	"site_fonts" text[] NOT NULL,
	"site_colors" text[] NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "site" ADD CONSTRAINT "site_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "site_userId_idx" ON "site" USING btree ("user_id");