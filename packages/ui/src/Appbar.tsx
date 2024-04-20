import { signIn, signOut } from "next-auth/react";
import Button from "./Button";

interface AppbarProps {
	user?: {
		name?: string | null;
	};
	onSignIn: typeof signIn;
	onSignOut: () => void;
}

const Appbar = ({ user, onSignIn, onSignOut }: AppbarProps) => {
	return (
		<div className="flex justify-between items-center border-b px-4">
			<div className="text-lg ">PayTM</div>
			<div className=" flex justify-between items-center gap-4">
				{user?.name && <div>Welcome, {user?.name}!</div>}
				<div className="pt-2">
					<Button onClick={user ? onSignOut : onSignIn}>
						{user ? "Logout" : "Login"}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Appbar;
