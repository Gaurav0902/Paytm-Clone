import React from "react";
import AddMoneyCard from "../../../components/AddMoneyCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransaction";

const Transfer = async () => {
	const getBalance = async () => {
		const session = await getServerSession(authOptions);
		const balance = await prisma.balance.findFirst({
			where: {
				userId: Number(session?.user?.id),
			},
		});
		return {
			amount: balance?.amount,
			locked: balance?.locked,
		};
	};

	const getOnRampTransactions = async () => {
		const session = await getServerSession(authOptions);
		const txns = await prisma.onRampTransaction.findMany({
			where: {
				userId: Number(session?.user?.id),
			},
		});
		return txns.map((t) => ({
			time: t.startTime,
			amount: t.amount,
			status: t.status,
			provider: t.provider,
		}));
	};

	const balance = await getBalance();
	const transactions = await getOnRampTransactions();

	return (
		<div className="w-full mx-4">
			<div className="text-4xl text-purple-500 font-sans mb-12 mt-4 font-bold">
				Transfer
			</div>
			<div className="grid grid-cols-2 gap-4">
				<div className="col-span-1">
					<AddMoneyCard />
				</div>
				<div className="col-span-1 flex flex-col gap-6">
					<BalanceCard
						amount={balance.amount ?? 0}
						locked={balance.locked ?? 0}
					/>
					<OnRampTransactions transactions={transactions} />
				</div>
			</div>
		</div>
	);
};

export default Transfer;
