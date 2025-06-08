
import "next-auth";

declare module "next-auth" {
	interface User {
		role: "admin";
		email: string;
		id: string;
	}
}
