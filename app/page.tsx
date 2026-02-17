'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap,
    MessageSquare,
    Instagram,
    Twitter,
    Share2,
    Settings,
    Wifi,
    Battery,
    Signal,
    Maximize2,
    ChevronLeft,
    Image as ImageIcon,
    Play,
    Plus,
    Send,
    Layers,
    Sliders,
    Sparkles,
    Search,
    Home,
    User,
    Bell,
    Grid3X3
} from 'lucide-react';

// ─── Profiles ────────────────────────────────────────────────
const profiles = [
    { id: 'thale', name: 'Thale', avatar: '🌊', color: '#0ea5e9', wallpaper: 'linear-gradient(180deg, #0c0c0c 0%, #0a0a0a 50%, #111 100%)' },
    { id: 'emmy', name: 'Emmy', avatar: '✨', color: '#ec4899', wallpaper: 'linear-gradient(180deg, #0c0c0c 0%, #1a0a14 50%, #0a0a0a 100%)' },
    { id: 'new', name: 'Add New', avatar: '➕', color: '#22c55e', wallpaper: '#0a0a0a' },
];

// ─── App Definitions ─────────────────────────────────────────
const springboardApps = [
    { id: 'fanvue', name: 'Fanvue', icon: <Zap size={28} />, color: 'linear-gradient(135deg, #6366f1, #a855f7)' },
    { id: 'vault', name: 'Gallery', icon: <ImageIcon size={28} />, color: 'linear-gradient(135deg, #3b82f6, #06b6d4)' },
    { id: 'settings', name: 'Settings', icon: <Settings size={28} />, color: 'linear-gradient(135deg, #64748b, #475569)' },
];


// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function IOSDashboard() {
    const [openApp, setOpenApp] = useState<string | null>(null);
    const [activeProfile, setActiveProfile] = useState(profiles[0]);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isSwitching, setIsSwitching] = useState(false);
    const [currentTime, setCurrentTime] = useState('9:41');
    const [fanvueStatus, setFanvueStatus] = useState<'connected' | 'disconnected'>('disconnected');

    useEffect(() => {
        const checkConnection = async () => {
            try {
                const res = await fetch('/api/user/me');
                if (res.ok) setFanvueStatus('connected');
            } catch { setFanvueStatus('disconnected'); }
        };
        checkConnection();
    }, [activeProfile]);

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit', hour12: false }));
        };
        updateClock();
        const interval = setInterval(updateClock, 30000);
        return () => clearInterval(interval);
    }, []);

    const switchProfile = (profile: typeof profiles[0]) => {
        if (profile.id === activeProfile.id) { setIsProfileMenuOpen(false); return; }
        setIsSwitching(true);
        setIsProfileMenuOpen(false);
        setTimeout(() => { setActiveProfile(profile); setIsSwitching(false); }, 800);
    };

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            background: '#0a0a0a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
        }}>
            {/* ─── iPhone Frame ─── */}
            <div style={{
                width: '393px',
                height: '852px',
                background: '#000',
                borderRadius: '55px',
                border: '4px solid #2a2a2a',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 0 0 2px #1a1a1a, 0 40px 80px rgba(0,0,0,0.8), 0 0 120px rgba(99,102,241,0.08)',
                display: 'flex',
                flexDirection: 'column',
            }}>
                {/* ─── Dynamic Island ─── */}
                <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '126px',
                    height: '36px',
                    background: '#000',
                    borderRadius: '20px',
                    zIndex: 5000,
                }} />

                {/* ─── Status Bar ─── */}
                <div style={{
                    height: '54px',
                    padding: '0 32px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    paddingBottom: '2px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#fff',
                    zIndex: 4000,
                    position: 'relative',
                }}>
                    <span style={{ fontSize: '15px', fontWeight: '700', letterSpacing: '-0.3px' }}>{currentTime}</span>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <Signal size={14} />
                        <Wifi size={14} />
                        <Battery size={18} />
                    </div>
                </div>

                {/* ─── Screen Content ─── */}
                <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                    <AnimatePresence mode="wait">
                        {!openApp ? (
                            /* ═══ HOME SCREEN ═══ */
                            <motion.div
                                key="home"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                style={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    background: activeProfile.wallpaper,
                                    position: 'relative',
                                }}
                            >
                                {/* Profile Indicator (tap to switch) */}
                                <motion.div
                                    onClick={() => setIsProfileMenuOpen(true)}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        padding: '16px 24px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        background: activeProfile.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '18px',
                                        border: '2px solid rgba(255,255,255,0.15)',
                                    }}>
                                        {activeProfile.avatar}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>{activeProfile.name}</div>
                                        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', fontWeight: '500' }}>Creator Studio</div>
                                    </div>
                                </motion.div>

                                {/* Search Bar */}
                                <div style={{ padding: '0 24px', marginBottom: '24px' }}>
                                    <div style={{
                                        background: 'rgba(255,255,255,0.06)',
                                        borderRadius: '14px',
                                        padding: '10px 16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        border: '1px solid rgba(255,255,255,0.04)',
                                    }}>
                                        <Search size={16} color="rgba(255,255,255,0.25)" />
                                        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.25)', fontWeight: '400' }}>Search</span>
                                    </div>
                                </div>

                                {/* App Grid */}
                                <div style={{
                                    flex: 1,
                                    padding: '0 28px',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(4, 1fr)',
                                    gridAutoRows: '100px',
                                    gap: '8px',
                                    alignContent: 'start',
                                }}>
                                    {springboardApps.map((app) => (
                                        <AppIcon key={app.id} app={app} onClick={() => setOpenApp(app.id)} />
                                    ))}
                                </div>


                            </motion.div>
                        ) : (
                            /* ═══ APP VIEW ═══ */
                            <motion.div
                                key="app"
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                exit={{ y: '100%' }}
                                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                                style={{
                                    height: '100%',
                                    background: '#0c0c0c',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                {/* App Header */}
                                <div style={{
                                    padding: '8px 20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                    <motion.button
                                        onClick={() => setOpenApp(null)}
                                        whileTap={{ scale: 0.9 }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            color: '#6366f1',
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '8px 0',
                                        }}
                                    >
                                        <ChevronLeft size={22} />
                                        <span>Back</span>
                                    </motion.button>
                                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>
                                        {springboardApps.find(a => a.id === openApp)?.name}
                                    </span>
                                    <div style={{ width: '60px' }} />
                                </div>

                                {/* App Content */}
                                <div style={{ flex: 1, overflowY: 'auto' }}>
                                    {openApp === 'fanvue' && <FanvueStudio isConnected={fanvueStatus === 'connected'} />}
                                    {openApp === 'vault' && <VaultApp />}
                                    {openApp === 'settings' && (
                                        <SettingsMenu
                                            fanvueStatus={fanvueStatus}
                                            onConnectFanvue={() => window.location.href = '/api/auth/login'}
                                        />
                                    )}
                                    {(!['fanvue', 'vault', 'settings'].includes(openApp || '')) && <ComingSoon name={openApp} />}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ─── Home Indicator ─── */}
                <div style={{
                    height: '34px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: openApp ? '#0c0c0c' : 'transparent',
                }}>
                    <div style={{
                        width: '134px',
                        height: '5px',
                        background: '#fff',
                        borderRadius: '100px',
                        opacity: 0.25,
                    }} />
                </div>

                {/* ─── Profile Switcher Overlay ─── */}
                <AnimatePresence>
                    {isProfileMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsProfileMenuOpen(false)}
                                style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(20px)', zIndex: 6000 }}
                            />
                            <motion.div
                                initial={{ y: 40, opacity: 0, scale: 0.95 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                exit={{ y: 40, opacity: 0, scale: 0.95 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                style={{
                                    position: 'absolute',
                                    bottom: '80px',
                                    left: '16px',
                                    right: '16px',
                                    background: 'rgba(28,28,30,0.95)',
                                    backdropFilter: 'blur(40px)',
                                    borderRadius: '24px',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    padding: '24px',
                                    zIndex: 6001,
                                }}
                            >
                                <h3 style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px' }}>Switch Creator</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    {profiles.map((profile) => (
                                        <motion.div
                                            key={profile.id}
                                            onClick={() => switchProfile(profile)}
                                            whileTap={{ scale: 0.97 }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '14px',
                                                padding: '14px 16px',
                                                borderRadius: '16px',
                                                cursor: 'pointer',
                                                background: activeProfile.id === profile.id ? 'rgba(99,102,241,0.15)' : 'transparent',
                                                border: activeProfile.id === profile.id ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
                                            }}
                                        >
                                            <div style={{
                                                width: '44px',
                                                height: '44px',
                                                borderRadius: '50%',
                                                background: profile.color,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '20px',
                                            }}>
                                                {profile.avatar}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>{profile.name}</div>
                                                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
                                                    {profile.id === 'new' ? 'Create new profile' : 'Creator Account'}
                                                </div>
                                            </div>
                                            {activeProfile.id === profile.id && (
                                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1' }} />
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* ─── Switching Overlay ─── */}
                <AnimatePresence>
                    {isSwitching && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                background: '#000',
                                zIndex: 9999,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '20px',
                                borderRadius: '55px',
                            }}
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                style={{ width: '32px', height: '32px', border: '2px solid rgba(255,255,255,0.1)', borderTopColor: '#6366f1', borderRadius: '50%' }}
                            />
                            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', fontWeight: '500' }}>Loading profile...</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}


// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

function AppIcon({ app, onClick }: { app: any; onClick: () => void }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
            }}
        >
            <div style={{
                width: '62px',
                height: '62px',
                background: app.color,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {app.icon}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 50%)',
                    pointerEvents: 'none',
                }} />
            </div>
            <span style={{
                color: '#fff',
                fontSize: '11px',
                fontWeight: '400',
                textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                letterSpacing: '0.1px',
            }}>{app.name}</span>
        </motion.div>
    );
}

function DockIcon({ app, onClick }: { app: any; onClick: () => void }) {
    return (
        <motion.div
            whileTap={{ scale: 0.85 }}
            onClick={onClick}
            style={{ cursor: 'pointer' }}
        >
            <div style={{
                width: '52px',
                height: '52px',
                background: app.color,
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {app.icon}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 50%)',
                    pointerEvents: 'none',
                }} />
            </div>
        </motion.div>
    );
}


// ═══════════════════════════════════════════════════════════════
// APP VIEWS
// ═══════════════════════════════════════════════════════════════

function VaultApp() {
    const images = [
        'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&q=80',
        'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80',
        'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&q=80',
        'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=400&q=80',
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
    ];

    return (
        <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#fff' }}>Library</h2>
                <span style={{ color: '#6366f1', fontWeight: '500', fontSize: '14px' }}>Select</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', borderRadius: '12px', overflow: 'hidden' }}>
                {images.map((img, i) => (
                    <motion.div
                        key={i}
                        whileTap={{ scale: 0.95 }}
                        style={{ aspectRatio: '1/1', overflow: 'hidden' }}
                    >
                        <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function FanvueStudio({ isConnected }: { isConnected: boolean }) {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    if (!isConnected) {
        return (
            <div style={{ padding: '32px 24px', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{
                    width: '80px', height: '80px', borderRadius: '24px',
                    background: 'rgba(99,102,241,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 24px auto',
                }}>
                    <Zap size={40} color="rgba(99,102,241,0.4)" />
                </div>
                <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>Connection Required</h2>
                <p style={{ color: 'rgba(255,255,255,0.35)', marginBottom: '28px', fontSize: '14px', lineHeight: '1.5' }}>Connect your Fanvue account in Settings to unlock the Creative Studio.</p>
                <button
                    onClick={() => window.location.href = '/api/auth/login'}
                    style={{
                        padding: '14px 28px',
                        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                        borderRadius: '14px',
                        color: '#fff',
                        fontWeight: '600',
                        fontSize: '15px',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Link Account
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: '16px' }}>
            {/* Prompt Box */}
            <div style={{
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '20px',
                marginBottom: '16px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                    <Sparkles size={18} color="#6366f1" />
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>Creative Prompt</span>
                </div>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your vision..."
                    style={{
                        width: '100%',
                        minHeight: '80px',
                        background: 'rgba(0,0,0,0.3)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: '12px',
                        color: '#fff',
                        padding: '14px',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        resize: 'none',
                        outline: 'none',
                    }}
                />
            </div>

            {/* Controls */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                <StudioControl icon={<Layers size={16} />} label="Workflow" value="Z-Image V8" />
                <StudioControl icon={<Sliders size={16} />} label="LoRA Mix" value="Auto" />
            </div>

            {/* Generate */}
            <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => { setIsGenerating(true); setTimeout(() => setIsGenerating(false), 3000); }}
                style={{
                    width: '100%',
                    padding: '16px',
                    background: isGenerating
                        ? 'rgba(99,102,241,0.15)'
                        : 'linear-gradient(135deg, #6366f1, #a855f7)',
                    borderRadius: '16px',
                    color: '#fff',
                    fontWeight: '600',
                    fontSize: '15px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                }}
            >
                {isGenerating ? (
                    <>
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                            <Zap size={18} />
                        </motion.div>
                        Generating...
                    </>
                ) : (
                    <>
                        <Play size={18} fill="currentColor" />
                        Generate
                    </>
                )}
            </motion.button>

            {/* Mini Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '16px' }}>
                <MiniStat label="Queue" value="0" />
                <MiniStat label="Energy" value="84%" />
                <MiniStat label="Posts" value="12" />
            </div>
        </div>
    );
}

function StudioControl({ icon, label, value }: any) {
    return (
        <div style={{
            background: 'rgba(255,255,255,0.04)',
            padding: '14px',
            borderRadius: '14px',
            border: '1px solid rgba(255,255,255,0.06)',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <div style={{ color: 'rgba(255,255,255,0.3)' }}>{icon}</div>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', fontWeight: '600' }}>{label}</span>
            </div>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>{value}</span>
        </div>
    );
}

function MiniStat({ label, value }: { label: string; value: string }) {
    return (
        <div style={{
            background: 'rgba(255,255,255,0.03)',
            padding: '12px',
            borderRadius: '12px',
            textAlign: 'center',
        }}>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', fontWeight: '600', marginBottom: '4px' }}>{label}</div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>{value}</div>
        </div>
    );
}

function SettingsMenu({ fanvueStatus, onConnectFanvue }: any) {
    const [showFanvueSetup, setShowFanvueSetup] = useState(false);
    const [clientId, setClientId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const handleFanvueConnect = async () => {
        if (!clientId.trim() || !clientSecret.trim()) return;
        setIsSaving(true);
        try {
            // Save credentials to server, then redirect to OAuth
            await fetch('/api/auth/credentials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ clientId: clientId.trim(), clientSecret: clientSecret.trim() }),
            });
            window.location.href = '/api/auth/login';
        } catch (e) {
            alert('Failed to save credentials');
            setIsSaving(false);
        }
    };

    if (showFanvueSetup) {
        return (
            <div style={{ padding: '16px' }}>
                <motion.button
                    onClick={() => setShowFanvueSetup(false)}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '4px',
                        color: '#6366f1', fontSize: '16px', fontWeight: '500',
                        background: 'none', border: 'none', cursor: 'pointer',
                        padding: '4px 0', marginBottom: '16px',
                    }}
                >
                    <ChevronLeft size={20} />
                    Settings
                </motion.button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Zap size={22} color="#fff" />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>Fanvue</h2>
                        <span style={{ fontSize: '12px', color: fanvueStatus === 'connected' ? '#22c55e' : 'rgba(255,255,255,0.3)' }}>
                            {fanvueStatus === 'connected' ? '● Connected' : '○ Not connected'}
                        </span>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                    <div>
                        <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600', display: 'block', marginBottom: '6px', paddingLeft: '4px' }}>
                            Client ID
                        </label>
                        <input
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)}
                            placeholder="Paste your Client ID"
                            style={{
                                width: '100%',
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '12px',
                                color: '#fff',
                                padding: '14px 16px',
                                fontSize: '14px',
                                fontFamily: 'inherit',
                                outline: 'none',
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600', display: 'block', marginBottom: '6px', paddingLeft: '4px' }}>
                            Client Secret
                        </label>
                        <input
                            value={clientSecret}
                            onChange={(e) => setClientSecret(e.target.value)}
                            placeholder="Paste your Client Secret"
                            type="password"
                            style={{
                                width: '100%',
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '12px',
                                color: '#fff',
                                padding: '14px 16px',
                                fontSize: '14px',
                                fontFamily: 'inherit',
                                outline: 'none',
                            }}
                        />
                    </div>
                </div>

                <motion.button
                    onClick={handleFanvueConnect}
                    whileTap={{ scale: 0.97 }}
                    disabled={!clientId.trim() || !clientSecret.trim() || isSaving}
                    style={{
                        width: '100%',
                        padding: '16px',
                        background: (!clientId.trim() || !clientSecret.trim())
                            ? 'rgba(99,102,241,0.15)'
                            : 'linear-gradient(135deg, #6366f1, #a855f7)',
                        borderRadius: '14px',
                        color: '#fff',
                        fontWeight: '600',
                        fontSize: '15px',
                        border: 'none',
                        cursor: (!clientId.trim() || !clientSecret.trim()) ? 'default' : 'pointer',
                        opacity: (!clientId.trim() || !clientSecret.trim()) ? 0.5 : 1,
                    }}
                >
                    {isSaving ? 'Connecting...' : 'Connect to Fanvue'}
                </motion.button>

                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.15)', textAlign: 'center', marginTop: '16px', lineHeight: '1.5' }}>
                    Your credentials are stored locally and never shared. Get your API keys from the Fanvue Developer Portal.
                </p>
            </div>
        );
    }

    return (
        <div style={{ padding: '16px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#fff', marginBottom: '20px' }}>Settings</h2>

            <SettingGroup title="Platform Connections">
                <SettingRow
                    icon={<Zap size={18} color="#6366f1" />}
                    label="Fanvue"
                    value={fanvueStatus === 'connected' ? '● Connected' : 'Connect'}
                    valueColor={fanvueStatus === 'connected' ? '#22c55e' : '#6366f1'}
                    action={() => setShowFanvueSetup(true)}
                />
            </SettingGroup>

            <SettingGroup title="ComfyUI">
                <SettingRow icon={<Sliders size={18} />} label="Endpoint" value="127.0.0.1:8188" valueColor="rgba(255,255,255,0.3)" action={() => { }} />
                <SettingRow icon={<Layers size={18} />} label="Workflow" value="Z-Image V8" valueColor="rgba(255,255,255,0.3)" action={() => { }} />
            </SettingGroup>

            <div style={{ padding: '24px 0', textAlign: 'center' }}>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.15)' }}>Creator Studio Pro — v1.0.0</p>
            </div>
        </div>
    );
}


function SettingGroup({ title, children }: any) {
    return (
        <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', paddingLeft: '4px', fontWeight: '600' }}>{title}</h3>
            <div style={{
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)',
                overflow: 'hidden',
            }}>
                {children}
            </div>
        </div>
    );
}

function SettingRow({ icon, label, value, valueColor, action }: any) {
    return (
        <div
            onClick={action}
            style={{
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                cursor: 'pointer',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)' }}>
                    {icon}
                </div>
                <span style={{ fontSize: '15px', fontWeight: '500', color: '#fff' }}>{label}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '14px', color: valueColor || 'rgba(255,255,255,0.3)' }}>{value}</span>
                <ChevronLeft size={16} color="rgba(255,255,255,0.15)" style={{ transform: 'rotate(180deg)' }} />
            </div>
        </div>
    );
}

function ComingSoon({ name }: { name: string | null }) {
    return (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.15)',
            padding: '40px',
        }}>
            <div style={{
                width: '80px', height: '80px', borderRadius: '24px',
                background: 'rgba(255,255,255,0.04)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '20px',
            }}>
                <Maximize2 size={32} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>{name?.toUpperCase()}</h3>
            <p style={{ textAlign: 'center', fontSize: '14px', lineHeight: '1.5' }}>Integration arriving in v1.1</p>
        </div>
    );
}
