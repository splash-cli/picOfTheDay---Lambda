import test from "ava";
import { scraper } from "./lib/utils";

test("Testing: Photo of the day", async (t) => {
	try {
		const { id } = await scraper(false);
		t.log(`Photo of the day: ${id}`);
		t.truthy(id);
	} catch (error) {
		t.fail(error.message);
	}
});
