import React from "react";
import GlowButton from "./GLowButton";

const Avatar = ({ src, alt, className = "" }) => (
	<img
		src={src}
		alt={alt}
		className={`w-9 h-9 rounded-full ring-2 ring-white/10 object-cover ${className}`}
	/>
);

const RoadmapCTA = () => {
	return (
		<section className=" relative py-24 md:py-32 overflow-hidden">
			{/* Soft vignette background */}
			<div className="pointer-events-none absolute inset-0 z-0">
				
				{/* Side glows - left and right */}
				<div
					className="absolute top-1/2 -translate-y-2/4"
					style={{
						left: "20vw",
						width: "30vw",
						height: "30vw",
						background:
							"radial-gradient(120% 90% at 8% 40%, rgba(116,206,200,0.18) 0%, rgba(116,206,200,0.10) 38%, transparent 78%), radial-gradient(110% 85% at 0% 65%, rgba(116,206,200,0.10) 0%, rgba(116,206,200,0.06) 40%, transparent 85%), radial-gradient(85% 65% at 20% 50%, rgba(116,206,200,0.08) 0%, transparent 70%)",
						filter: "blur(80px)",
						opacity: 0.95,
					}}
				/>
				<div
					className="absolute top-1/2 -translate-y-1/3"
					style={{
						right: "20vw",
						width: "30vw",
						height: "30vw",
						background:
							"radial-gradient(120% 90% at 92% 45%, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0.10) 38%, transparent 78%), radial-gradient(110% 85% at 100% 65%, rgba(59,130,246,0.10) 0%, rgba(59,130,246,0.06) 40%, transparent 85%), radial-gradient(85% 65% at 80% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)",
						filter: "blur(80px)",
						opacity: 0.95,
					}}
				/>
			</div>

			<div className="relative z-10 flex flex-col items-center text-center gap-4">
				<h2 className="text-white font-extrabold leading-[1.05] tracking-tight text-[clamp(2rem,5vw,3.75rem)]">
					Get the roadmap + support
					<br className="hidden md:block" />
					you need to grow
				</h2>

				{/* Avatars + copy */}
				<div className="mt-2 flex flex-col items-center gap-4">
					<div className="flex -space-x-3">
						{[
							"https://randomuser.me/api/portraits/women/11.jpg",
							"https://randomuser.me/api/portraits/men/12.jpg",
							"https://randomuser.me/api/portraits/women/13.jpg",
							"https://randomuser.me/api/portraits/men/14.jpg",
							"https://randomuser.me/api/portraits/women/15.jpg",
						].map((src, i) => (
							<Avatar key={i} src={src} alt="creator" />
						))}
					</div>
					<p className="text-slate-300/90 text-sm">100+ Creators trust Rodexco</p>
				</div>

				<div className="mt-4">
					<GlowButton className='cursor-pointer' onClick={() => navigate('/contact')}>Get in Touch</GlowButton>
				</div>

				{/* Dotted square centered below the button */}
				<div className="mt-12 w-full flex justify-center">
					<div className="w-96 h-96 sm:w-[28rem] sm:h-[28rem] rounded-xl opacity-60 bg-[radial-gradient(ellipse_at_center,_rgba(116,206,200,0)_0%,_rgba(116,206,200,0)_35%,_transparent_70%),radial-gradient(circle,_rgba(255,255,255,0.45)_2px,_transparent_2px)] bg-[size:100%_100%,44px_44px]" />
				</div>
			</div>
		</section>
	);
};

export default RoadmapCTA;


