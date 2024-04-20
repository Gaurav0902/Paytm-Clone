"use client";
import Button from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import Select from "@repo/ui/select";
import { TextInput } from "@repo/ui/textinput";
import React, { useState } from "react";
import { createOnRampTransaction } from "../app/lib/actions/createOnRampTransaction";

const SUPPORTED_BANKS = [
	{
		name: "HDFC Bank",
		redirectUrl: "https://netbanking.hdfcbank.com",
	},
	{
		name: "Axis Bank",
		redirectUrl: "https://www.axisbank.com/",
	},
];

const AddMoneyCard = () => {
	const [redirectUrl, setRedirectUrl] = useState(
		SUPPORTED_BANKS[0]?.redirectUrl
	);
	const [amount, setAmount] = useState(0);
	const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name);

	return (
		<Card title={"Add Money"}>
			<div className="w-full flex flex-col gap-6 mb-5">
				<TextInput
					label={"Amount"}
					placeholder={"Amount"}
					onChange={(value) => {
						setAmount(Number(value));
					}}
				/>
				<Select
					options={SUPPORTED_BANKS.map((bank) => {
						return {
							key: bank.name,
							value: bank.name,
						};
					})}
					onSelect={(value) => {
						setRedirectUrl(
							SUPPORTED_BANKS.find((x) => x.name === value)
								?.redirectUrl || ""
						);
						setProvider(
							SUPPORTED_BANKS.find((x) => x.name === value)
								?.name || ""
						);
					}}
				/>
			</div>
			<Center>
				<Button
					onClick={async () => {
						await createOnRampTransaction(
							amount * 100,
							provider ?? ""
						);
						window.location.href = redirectUrl || "";
					}}
				>
					Add Money
				</Button>
			</Center>
		</Card>
	);
};

export default AddMoneyCard;
