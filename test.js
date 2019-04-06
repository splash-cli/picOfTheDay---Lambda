import test from "ava";
import { scraper } from "./lib/utils";

test("Testing", async (t) => {
	try {
		const { user } = await scraper(false);
		t.log(`Photo of the day by ${user.username}`);
		t.pass();
	} catch (error) {
		t.fail(error.message);
	}
});
