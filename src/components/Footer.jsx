import React from "react";

const Footer = () => {
	return (
		<footer className="mt-24 border-t border-white/10/5">
			<div className="lg:max-w-[65%] md:max-w-[90%] mx-auto px-4 py-12">
				<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
					{/* Brand */}
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-md bg-cyan-400/20 border border-cyan-300/30 flex items-center justify-center">
							<div className="w-4 h-4 border-l-2 border-t-2 border-cyan-300 rotate-45"></div>
						</div>
						<span className="text-xl tracking-[0.08em] text-cyan-200">influinτ</span>
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
							<li>info@influint.co</li>
						</ul>
					</div>
				</div>

				<hr className="my-10 border-white/10" />

				<div className="flex items-center justify-between text-xs text-slate-400">
					<span>© 2025 Influinτ. All rights reserved.</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;


