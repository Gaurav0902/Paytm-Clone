import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import React from "react";

interface RecordsProps {
	transactions: {
		time: Date;
		amount: number;
		type: string;
	}[];
}

const P2PRecords = ({ transactions }: RecordsProps) => {
	return (
		<Center>
			<Card title={`Recent Transactions`}>
				<div className="pt-2 w-screen max-w-screen-lg flex flex-col gap-4">{transactions.map((tx, index) => {
					return (
						<div className="flex justify-between" key={index}>
							<div>
								<div className="text-sm">{tx.type} INR</div>
								<div className="text-slate-600 text-xs">{tx.time.toDateString()}</div>
							</div>
							<div className="flex flex-col justify-center">
								{tx.type === "Recieved" ? "+" : "-"} Rs{" "}
								{tx.amount/100}
							</div>
						</div>
					);
				})}</div>
			</Card>
		</Center>
	);
};

export default P2PRecords;
