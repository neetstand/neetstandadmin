import { db } from "@drizzle/index";
import { diagnosticTestRefresh } from "@drizzle/schema/index";
import { desc } from "drizzle-orm";
import { RefreshTicketsClient } from "./RefreshTicketsClient";

export default async function RefreshTicketsPage() {
    const tickets = await db.select().from(diagnosticTestRefresh).orderBy(desc(diagnosticTestRefresh.createdAt));

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Diagnostic Refresh Tickets</h1>
            </div>

            <RefreshTicketsClient initialTickets={tickets} />
        </div>
    );
}
