import React from "react";

const Footer = () => {
	return (
		<footer className="mt-24 border-t-2 border-white/20 ">
			<div className="2xl:max-w-[65%] max-w-[90%] mx-auto px-4 py-12">
				<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
					{/* Brand */}
					<div className="flex items-center gap-3">
						
						<span className="text-xl tracking-[0.08em] text-cyan-200">Rodexco</span>
					</div>

					{/* Links */}
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
						<ul className="space-y-3 text-slate-300/90">
							<li className="text-slate-200">About</li>
							<li>Our Process</li>
							<li>Our Clients</li>
							<li>FAQ</li>
							<li>Get Started</li>
						</ul>
						<ul className="space-y-3 text-slate-300/90">
							<li className="text-slate-200">Instagram</li>
							<li>LinkedIn</li>
							<li>info@rodexco.com</li>
						</ul>
					</div>
				</div>

				<hr className="my-10 border-white/10" />

				<div className="flex items-center justify-between text-xs text-slate-400">
					<span>© 2025 Rodexco. All rights reserved.</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;


