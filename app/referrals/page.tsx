"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const TIERS = [
  { min: 0, name: "Getting Started", referrals: 0, reward: null },
  { min: 50, name: "Rising Star", referrals: 5, reward: "1 month free" },
  { min: 120, name: "Ambassador", referrals: 12, reward: "3 months free" },
  { min: 250, name: "VIP", referrals: 25, reward: "6 months free" },
  { min: 500, name: "Lumii OG", referrals: 50, reward: "Lifetime access" },
] as const;

function getTierIndex(points: number) {
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (points >= TIERS[i].min) return i;
  }
  return 0;
}

type ReferrerData = {
  name: string;
  referral_code: string;
  points: number;
  referral_count: number;
  tier: string;
};

export default function ReferralsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<ReferrerData | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      // First try to get existing referrer
      const getRes = await fetch(`/api/referral?email=${encodeURIComponent(email)}`);
      if (getRes.ok) {
        const existing = await getRes.json();
        setData(existing);
        setLoading(false);
        return;
      }

      // If not found, register
      const postRes = await fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      if (!postRes.ok) {
        setError("Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      const result = await postRes.json();
      setData({
        name,
        referral_code: result.referral_code,
        points: 0,
        referral_count: 0,
        tier: "Getting Started",
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    if (!data) return;
    navigator.clipboard.writeText(`https://lumiiapp.com?ref=${data.referral_code}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tierIndex = data ? getTierIndex(data.points) : 0;
  const nextTier = data && tierIndex < TIERS.length - 1 ? TIERS[tierIndex + 1] : null;
  const progressToNext = data && nextTier
    ? ((data.points - TIERS[tierIndex].min) / (nextTier.min - TIERS[tierIndex].min)) * 100
    : 100;

  return (
    <main className="min-h-screen bg-[#060308]">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-20 max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/30 mb-4">Referral Program</p>
          <h1 className="text-[52px] md:text-[72px] font-light text-white leading-[0.95] tracking-[-0.02em] mb-6">
            Invite &amp; earn.<br />
            <span className="italic" style={{ color: "#F9A8C9" }}>Get free access.</span>
          </h1>
          <p className="text-[15px] text-white/40 font-light max-w-[480px] leading-[1.7] mb-5">
            Share Lumii with friends. Earn points for every signup. Unlock free access when we launch.
          </p>
          <div
            className="inline-flex items-center gap-2.5 rounded-full px-5 py-2.5"
            style={{ background: "rgba(249,168,201,0.08)", border: "1px solid rgba(249,168,201,0.2)" }}
          >
            <span className="text-[13px] font-medium" style={{ color: "#F9A8C9" }}>Earn 10 points for every friend who joins</span>
          </div>
        </motion.div>
      </section>

      {/* Tier visual */}
      <section className="px-6 md:px-20 max-w-[1100px] mx-auto pb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="flex flex-col gap-3"
        >
          <p className="text-[11px] font-medium tracking-[0.05em] text-center" style={{ color: "rgba(249,168,201,0.7)" }}>
            10 pts per referral
          </p>
          <div
          className="grid grid-cols-2 md:grid-cols-5 gap-3"
        >
          {TIERS.map((tier, i) => (
            <div
              key={tier.name}
              className="rounded-[20px] p-5 text-center"
              style={{
                background: data && tierIndex === i
                  ? "rgba(249,168,201,0.08)"
                  : "rgba(255,255,255,0.025)",
                border: data && tierIndex === i
                  ? "1px solid rgba(249,168,201,0.25)"
                  : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <p className="text-[22px] font-light mb-1" style={{ color: data && tierIndex >= i ? "#F9A8C9" : "rgba(255,255,255,0.2)" }}>
                {tier.min === 0 ? "✦" : `${tier.min}`}
              </p>
              <p className="text-[10px] font-medium tracking-[0.1em] uppercase mb-1" style={{ color: data && tierIndex >= i ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)" }}>
                {tier.name}
              </p>
              <p className="text-[9px] font-light mb-0.5" style={{ color: data && tierIndex >= i ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.2)" }}>
                {tier.referrals === 0 ? "0 referrals" : `${tier.referrals} referrals`}
              </p>
              {tier.reward && (
                <p className="text-[9px] font-light" style={{ color: "rgba(249,168,201,0.6)" }}>
                  {tier.reward}
                </p>
              )}
            </div>
          ))}
          </div>
        </motion.div>
      </section>

      {/* Sign up / Dashboard */}
      <section className="px-6 md:px-20 max-w-[1100px] mx-auto pb-16">
        <AnimatePresence mode="wait">
          {!data ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.6, ease }}
              className="max-w-[480px] mx-auto"
            >
              <div
                className="rounded-[28px] overflow-hidden"
                style={{
                  background: "#0c0710",
                  border: "1px solid rgba(249,168,201,0.15)",
                  boxShadow: "0 60px 160px rgba(0,0,0,0.6)",
                }}
              >
                <div style={{ height: 3, background: "linear-gradient(90deg, #fda4af, #F9A8C9, #f472b6, #c084fc)" }} />
                <div className="px-8 pt-7 pb-8">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-medium tracking-[0.2em] text-white/40 uppercase">Referral program</span>
                  </div>
                  <h2 className="text-[28px] font-light text-white leading-[1.1] tracking-[-0.02em] mb-2">Get your referral link.</h2>
                  <p className="text-[13px] text-white/35 font-light leading-[1.7] mb-7">
                    Sign up to start earning points for every friend who joins the Lumii waitlist.
                  </p>
                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your first name"
                      className="w-full rounded-xl px-4 py-3.5 text-[13px] text-white placeholder:text-white/20 outline-none transition-all duration-200"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(249,168,201,0.4)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
                      placeholder="Your email address"
                      className="w-full rounded-xl px-4 py-3.5 text-[13px] text-white placeholder:text-white/20 outline-none transition-all duration-200"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(249,168,201,0.4)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                    {error && <p className="text-[11px] text-red-400 pl-1">{error}</p>}
                    <motion.button
                      onClick={handleSubmit}
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.01 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      className="w-full py-3.5 rounded-xl text-[13px] font-semibold text-slate-900 disabled:opacity-50"
                      style={{ background: "white" }}
                    >
                      {loading ? "Setting up…" : "Get my referral link →"}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="max-w-[680px] mx-auto"
            >
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6, ease }}
                  className="rounded-[24px] p-6 text-center"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <motion.p
                    className="text-[40px] md:text-[52px] font-extralight tracking-[-2px] mb-1"
                    style={{ color: "#F9A8C9" }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8, ease }}
                  >
                    {data.points}
                  </motion.p>
                  <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/30">Points</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.6, ease }}
                  className="rounded-[24px] p-6 text-center"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <motion.p
                    className="text-[40px] md:text-[52px] font-extralight tracking-[-2px] mb-1 text-white"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35, duration: 0.8, ease }}
                  >
                    {data.referral_count}
                  </motion.p>
                  <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/30">Referrals</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6, ease }}
                  className="rounded-[24px] p-6 text-center"
                  style={{ background: "rgba(249,168,201,0.06)", border: "1px solid rgba(249,168,201,0.15)" }}
                >
                  <p className="text-[16px] md:text-[20px] font-light mb-1" style={{ color: "#F9A8C9" }}>
                    {data.tier}
                  </p>
                  <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/30">Current Tier</p>
                </motion.div>
              </div>

              {/* Progress bar */}
              {nextTier && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="rounded-[20px] p-6 mb-6"
                  style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[11px] text-white/50 font-light">Progress to <span className="text-white/70 font-medium">{nextTier.name}</span></p>
                    <p className="text-[11px] font-medium" style={{ color: "#F9A8C9" }}>{data.points} / {nextTier.min} pts</p>
                  </div>
                  <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 10, overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(progressToNext, 100)}%` }}
                      transition={{ delay: 0.5, duration: 1.2, ease }}
                      style={{ height: "100%", borderRadius: 10, background: "linear-gradient(90deg, #F9A8C9, #f472b6)" }}
                    />
                  </div>
                  <p className="text-[10px] text-white/25 font-light mt-2">
                    {nextTier.min - data.points} more points to unlock {nextTier.reward}
                  </p>
                </motion.div>
              )}

              {/* Referral link */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6, ease }}
                className="rounded-[24px] p-6 mb-6"
                style={{ background: "rgba(249,168,201,0.05)", border: "1px solid rgba(249,168,201,0.15)" }}
              >
                <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/30 mb-3">Your referral link</p>
                <div className="flex items-center gap-3">
                  <div
                    className="flex-1 rounded-xl px-4 py-3 text-[13px] font-light overflow-hidden text-ellipsis whitespace-nowrap"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
                  >
                    lumiiapp.com?ref={data.referral_code}
                  </div>
                  <motion.button
                    onClick={copyLink}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="shrink-0 px-5 py-3 rounded-xl text-[12px] font-semibold"
                    style={{ background: copied ? "rgba(52,211,153,0.15)" : "#fff", color: copied ? "#34d399" : "#0d0612" }}
                  >
                    {copied ? "Copied!" : "Copy link"}
                  </motion.button>
                </div>
              </motion.div>

              {/* Reward tiers */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6, ease }}
              >
                <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/30 mb-4">Rewards</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {TIERS.filter(t => t.reward).map((tier, i) => {
                    const unlocked = data.points >= tier.min;
                    return (
                      <motion.div
                        key={tier.name}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.07, duration: 0.5, ease }}
                        className="rounded-[20px] p-5"
                        style={{
                          background: unlocked ? "rgba(249,168,201,0.08)" : "rgba(255,255,255,0.025)",
                          border: unlocked ? "1px solid rgba(249,168,201,0.25)" : "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        <p className="text-[20px] font-light mb-1" style={{ color: unlocked ? "#F9A8C9" : "rgba(255,255,255,0.2)" }}>
                          {tier.min}
                        </p>
                        <p className="text-[9px] font-medium tracking-[0.1em] uppercase mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>
                          {tier.referrals} referrals
                        </p>
                        <p className="text-[12px] font-light" style={{ color: unlocked ? "#F9A8C9" : "rgba(255,255,255,0.5)" }}>
                          {tier.reward}
                        </p>
                        {unlocked && (
                          <div className="flex items-center gap-1.5 mt-2">
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4L3.5 6.5L9 1" stroke="#34d399" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-[9px] font-medium" style={{ color: "#34d399" }}>Unlocked</span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* How it works */}
      <section className="px-6 md:px-20 max-w-[1100px] mx-auto pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/30 mb-6">How it works</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Sign up", desc: "Enter your name and email to get your unique referral link." },
              { step: "02", title: "Share", desc: "Send your link to friends, post it on socials, or share it anywhere." },
              { step: "03", title: "Earn", desc: "Get 10 points for every friend who joins the Lumii waitlist." },
              { step: "04", title: "Redeem", desc: "Unlock free Lumii access at launch based on your tier." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease }}
                className="rounded-[24px] p-6"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <span className="text-[9px] font-bold tracking-[0.2em]" style={{ color: "rgba(249,168,201,0.5)" }}>{item.step}</span>
                <h3 className="text-[18px] font-light text-white mt-2 mb-2 tracking-[-0.01em]">{item.title}</h3>
                <p className="text-[12px] text-white/35 font-light leading-[1.7]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
