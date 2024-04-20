import React from "react";
import P2PRecords from "../../../components/P2PRecords";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

const Transactions = async () => {
	const getP2PTransactions = async () => {
		const session = await getServerSession(authOptions);
		const user = session?.user?.id;
		const transactions = await prisma.p2pTransfer.findMany({
			where: {
				OR: [{ fromUserId: Number(user) }, { toUserId: Number(user) }],
			},
		});

		return transactions.map((tx) => ({
			type: tx.fromUserId == Number(user) ? "Sent" : "Recieved",
			time: tx.timestamp,
			amount: Number(tx.amount),
		}));
	};
	const transactions = await getP2PTransactions();
	return (
		<div className="w-full">
			<P2PRecords transactions={transactions}></P2PRecords>
		</div>
	);
};

export default Transactions;
