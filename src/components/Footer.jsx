import GlowButton from "./GLowButton";

const Footer = () => {

	const scrollToSection = (id) => {
		const element = document.getElementById(id);
		console.log("first", element)
		if (element) {
			element.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	return (
		<footer id="footer" className="mt-24 border-t-2 border-white/20 ">
			<div className="2xl:max-w-[65%] max-w-[90%] mx-auto px-4 py-12">
				<div className="flex flex-col md:flex-row md:items-start md:justify-around gap-10">
					{/* Brand */}
					<div className="flex items-center gap-3">

						<span className="text-xl tracking-[0.08em] text-cyan-200 cursor-pointer">Rodexco</span>
					</div>

					{/* Links */}
					<div className="flex text-sm">
						<ul className="flex flex-col text-slate-300/90">
							<GlowButton
								onClick={() => scrollToSection('about')}
								className="cursor-pointer hover:text-cyan-300 transition-colors duration-200 px-0 py-0"
								simple={true}
							>
								About
							</GlowButton>
							<GlowButton
								onClick={() => scrollToSection('process')}
								className="cursor-pointer hover:text-cyan-300 transition-colors duration-200"
								simple={true}
							>
								Our Process
							</GlowButton>
							<GlowButton
								onClick={() => scrollToSection('clients')}
								className="cursor-pointer hover:text-cyan-300 transition-colors duration-200"
								simple={true}
							>
								Our Clients
							</GlowButton>
							<GlowButton
								onClick={() => scrollToSection('faqs')}
								className="cursor-pointer hover:text-cyan-300 transition-colors duration-200"
								simple={true}
							>
								FAQ
							</GlowButton>
							<GlowButton
								onClick={() => scrollToSection('hero')}
								className="cursor-pointer hover:text-cyan-300 transition-colors duration-200"
								simple={true}
							>
								Get Started
							</GlowButton>
						</ul>
						<ul className="flex flex-col gap-y-6 mt-3 text-slate-300/90">
							<li className="text-slate-200">Instagram</li>
							<li>LinkedIn</li>
							<li>info@rodexco.com</li>
						</ul>
					</div>
				</div>

				<hr className="my-10 border-white/10" />

				<div className="text-center text-xs text-slate-400">
					<span>© 2025 Rodexco. All rights reserved.</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;


