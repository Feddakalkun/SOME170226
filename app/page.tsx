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
    Sparkles
} from 'lucide-react';

// App Icons & Config
const apps = [
    { id: 'tiktok', name: 'TikTok', icon: <Share2 size={32} />, color: 'linear-gradient(135deg, #000, #333)', label: 'Social' },
    { id: 'instagram', name: 'Instagram', icon: <Instagram size={32} />, color: 'linear-gradient(135deg, #f9ce34, #ee2a7b, #6228d7)', label: 'Photos' },
    { id: 'reddit', name: 'Reddit', icon: <MessageSquare size={32} />, color: 'linear-gradient(135deg, #ff4500, #ff8717)', label: 'Community' },
    { id: 'x', name: 'X', icon: <Twitter size={32} />, color: 'linear-gradient(135deg, #000, #1da1f2)', label: 'Network' },
    { id: 'vault', name: 'Vault', icon: <ImageIcon size={32} />, color: 'linear-gradient(135deg, #3b82f6, #2dd4bf)', label: 'Library' },
];

const dockApps = [
    { id: 'fanvue', name: 'Fanvue', icon: <Zap size={32} fill="currentColor" />, color: 'linear-gradient(135deg, #6366f1, #a855f7)', label: 'Studio' },
    { id: 'messages', name: 'Chat', icon: <MessageSquare size={32} />, color: 'linear-gradient(135deg, #22c55e, #10b981)', label: 'Inbound' },
    { id: 'analytics', name: 'Stats', icon: <Maximize2 size={32} />, color: 'linear-gradient(135deg, #f59e0b, #ef4444)', label: 'Growth' },
    { id: 'settings', name: 'Settings', icon: <Settings size={32} />, color: 'linear-gradient(135deg, #94a3b8, #475569)', label: 'Config' },
];

const profiles = [
    { id: 'none', name: 'Select Profile', avatar: '👤', color: '#1e293b' },
    { id: 'thale', name: 'Thale', avatar: '🌊', color: '#0ea5e9' },
    { id: 'emmy', name: 'Emmy', avatar: '✨', color: '#ec4899' },
    { id: 'new', name: 'Add New', avatar: '➕', color: '#22c55e' },
];

export default function IOSDashboard() {
    const [openApp, setOpenApp] = useState<string | null>(null);
    const [activeProfile, setActiveProfile] = useState(profiles[1]); // Default to Thale
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isSwitching, setIsSwitching] = useState(false);
    const [currentTime, setCurrentTime] = useState('04:20');
    const [fanvueStatus, setFanvueStatus] = useState<'connected' | 'disconnected'>('disconnected');

    // Check connection status
    useEffect(() => {
        const checkConnection = async () => {
            try {
                const res = await fetch('/api/user/me');
                if (res.ok) setFanvueStatus('connected');
            } catch (e) {
                setFanvueStatus('disconnected');
            }
        };
        checkConnection();
    }, [activeProfile]);

    const switchProfile = (profile: any) => {
        if (profile.id === activeProfile.id) return;
        setIsSwitching(true);
        setIsProfileMenuOpen(false);
        setTimeout(() => {
            setActiveProfile(profile);
            setIsSwitching(false);
        }, 800);
    };

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
        };
        updateClock();
        const timer = setInterval(updateClock, 60000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            background: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            color: '#fff',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            userSelect: 'none'
        }}>
            {/* Status Bar */}
            <div style={{
                height: '44px',
                padding: '0 32px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '14px',
                fontWeight: '600',
                zIndex: 1000,
                background: openApp ? 'rgba(0,0,0,0.5)' : 'transparent',
                backdropFilter: openApp ? 'blur(10px)' : 'none'
            }}>
                <motion.div
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    whileTap={{ scale: 0.9 }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        background: 'rgba(255,255,255,0.1)',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}
                >
                    <span style={{ fontSize: '16px' }}>{activeProfile.avatar}</span>
                    <span style={{ fontSize: '12px', opacity: 0.8 }}>{activeProfile.name}</span>
                </motion.div>

                <span>{currentTime}</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Signal size={16} />
                    <span style={{ fontSize: '12px' }}>5G</span>
                    <Wifi size={16} />
                    <Battery size={20} />
                </div>
            </div>

            {/* Home Screen (Springboard) */}
            <AnimatePresence mode="wait">
                {!openApp ? (
                    <motion.div
                        key="home"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            flex: 1,
                            padding: '60px 32px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                    >
                        {/* Main App Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gridAutoRows: 'min-content',
                            gap: '32px 16px',
                            maxWidth: '500px',
                            margin: '0 auto'
                        }}>
                            {apps.map((app) => (
                                <AppIcon key={app.id} app={app} onClick={() => setOpenApp(app.id)} />
                            ))}
                        </div>

                        {/* The Dock */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(30px) saturate(180%)',
                            borderRadius: '36px',
                            padding: '16px',
                            display: 'flex',
                            justifyContent: 'space-around',
                            maxWidth: '500px',
                            width: '100%',
                            margin: '0 auto',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            marginBottom: '40px'
                        }}>
                            {dockApps.map((app) => (
                                <AppIcon key={app.id} app={app} onClick={() => setOpenApp(app.id)} hideLabel />
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    /* App Canvas */
                    <motion.div
                        key="app"
                        initial={{ opacity: 0, y: 100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.9 }}
                        style={{
                            flex: 1,
                            background: '#020617',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            zIndex: 100
                        }}
                    >
                        {/* App Toolbar */}
                        <div style={{
                            padding: '12px 20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                            background: 'rgba(2, 6, 23, 0.8)',
                            backdropFilter: 'blur(20px)'
                        }}>
                            <button
                                onClick={() => setOpenApp(null)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#6366f1',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontSize: '17px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    padding: '8px'
                                }}
                            >
                                <ChevronLeft size={24} /> Home
                            </button>
                            <span style={{ fontWeight: '600', fontSize: '17px' }}>
                                {apps.concat(dockApps).find(a => a.id === openApp)?.name}
                            </span>
                            <div style={{ width: '80px' }} />
                        </div>

                        {/* Dynamic App Content */}
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

            {/* Profile Switcher Overlay (Control Center Style) */}
            <AnimatePresence>
                {isProfileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsProfileMenuOpen(false)}
                            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', zIndex: 3000 }}
                        />
                        <motion.div
                            initial={{ y: -100, opacity: 0, scale: 0.95 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: -100, opacity: 0, scale: 0.95 }}
                            style={{
                                position: 'fixed',
                                top: '60px',
                                left: '20px',
                                right: '20px',
                                background: 'rgba(30, 41, 59, 0.7)',
                                backdropFilter: 'blur(30px)',
                                borderRadius: '32px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                padding: '24px',
                                zIndex: 3001,
                                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                            }}
                        >
                            <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '1px' }}>Switch Account</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                                {profiles.map((profile) => (
                                    <motion.div
                                        key={profile.id}
                                        onClick={() => switchProfile(profile)}
                                        whileTap={{ scale: 0.9 }}
                                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                                    >
                                        <div style={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '50%',
                                            background: profile.color,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '24px',
                                            border: activeProfile.id === profile.id ? '3px solid #6366f1' : 'none',
                                            boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                                        }}>
                                            {profile.avatar}
                                        </div>
                                        <span style={{ fontSize: '11px', fontWeight: '600' }}>{profile.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Switching Profile Overlay */}
            <AnimatePresence>
                {isSwitching && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: '#020617',
                            zIndex: 10000,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '20px'
                        }}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            style={{ width: '40px', height: '40px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#6366f1', borderRadius: '50%' }}
                        />
                        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', fontWeight: '500' }}>Syncing Vision for {activeProfile.name}...</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Global Gestures / Home Bar */}
            <div style={{
                height: '34px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: openApp ? 'rgba(2, 6, 23, 0.8)' : 'transparent',
                backdropFilter: openApp ? 'blur(20px)' : 'none',
                zIndex: 2000
            }}>
                <div style={{
                    width: '134px',
                    height: '5px',
                    background: '#fff',
                    borderRadius: '100px',
                    opacity: 0.4
                }} />
            </div>
        </div>
    );
}

// Sub-apps
function VaultApp() {
    const images = [
        'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80',
        'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80',
        'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80',
        'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&q=80',
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80'
    ];

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '800' }}>Library</h2>
                <div style={{ color: '#6366f1', fontWeight: '600' }}>Select</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
                {images.map((img, i) => (
                    <motion.div
                        key={i}
                        whileTap={{ scale: 0.95 }}
                        style={{ aspectRatio: '1/1', overflow: 'hidden' }}
                    >
                        <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
function AppIcon({ app, onClick, hideLabel }: any) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
            }}
        >
            <div style={{
                width: '100px',
                height: '100px',
                background: app.color,
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 12px 24px rgba(0,0,0,0.5)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Dynamically scale icon based on size */}
                {React.cloneElement(app.icon, { size: 48 })}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)',
                    opacity: 0.4
                }} />
            </div>
            {!hideLabel && (
                <span style={{
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: '500',
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                    letterSpacing: '0.2px'
                }}>{app.name}</span>
            )}
        </motion.div>
    );
}

// FANVUE STUDIO (ComfyUI Integrated)
function FanvueStudio({ isConnected }: any) {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    if (!isConnected) {
        return (
            <div style={{ padding: '40px', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Zap size={64} color="rgba(99,102,241,0.2)" style={{ marginBottom: '24px', marginInline: 'auto' }} />
                <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px' }}>Connection Required</h2>
                <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '32px' }}>Please connect your Fanvue account in Settings to enable the Creative Studio.</p>
                <button
                    onClick={() => window.location.href = '/api/auth/login'}
                    style={{
                        padding: '16px 32px',
                        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                        borderRadius: '100px',
                        color: '#fff',
                        fontWeight: '700',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Link Account Now
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: '24px' }}>
            {/* Creation Chamber */}
            <div style={{
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.05)',
                padding: '24px',
                marginBottom: '24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ padding: '8px', background: 'rgba(99,102,241,0.2)', borderRadius: '12px', color: '#6366f1' }}>
                            <Sparkles size={24} />
                        </div>
                        <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Creative Studio</h2>
                    </div>
                </div>

                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your next viral masterpiece..."
                    style={{
                        width: '100%',
                        height: '140px',
                        background: 'rgba(0,0,0,0.4)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '16px',
                        padding: '16px',
                        color: '#fff',
                        fontSize: '16px',
                        lineHeight: '1.5',
                        resize: 'none',
                        outline: 'none',
                        marginBottom: '20px'
                    }}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                    <StudioControl icon={<Layers size={18} />} label="LoRA Mix" value="Elite V2" />
                    <StudioControl icon={<Sliders size={18} />} label="Model" value="Vision Pro" />
                </div>

                <button
                    onClick={() => setIsGenerating(true)}
                    disabled={isGenerating}
                    style={{
                        width: '100%',
                        padding: '18px',
                        borderRadius: '100px',
                        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                        color: '#fff',
                        fontWeight: '700',
                        fontSize: '16px',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)'
                    }}
                >
                    {isGenerating ? <RefreshCw className="animate-spin" /> : <Play size={20} fill="currentColor" />}
                    {isGenerating ? 'Synthesizing...' : 'Ignite Generation'}
                </button>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <MiniStat icon={<Zap size={14} />} label="Energy" value="84%" />
                <MiniStat icon={<Plus size={14} />} label="Queue" value="0" />
                <MiniStat icon={<Send size={14} />} label="Live" value="12" />
            </div>
        </div>
    );
}

function StudioControl({ icon, label, value }: any) {
    return (
        <div style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '12px 16px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        }}>
            <div style={{ color: 'rgba(255,255,255,0.4)' }}>{icon}</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{label}</span>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>{value}</span>
            </div>
        </div>
    );
}

function MiniStat({ icon, label, value }: any) {
    return (
        <div style={{
            background: 'rgba(255,255,255,0.02)',
            padding: '12px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>
                {icon} {label}
            </div>
            <div style={{ fontSize: '16px', fontWeight: '700' }}>{value}</div>
        </div>
    );
}

// SETTINGS MENU
function SettingsMenu({ fanvueStatus, onConnectFanvue }: any) {
    return (
        <div style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '24px' }}>Settings</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <SettingGroup title="Platform Connections">
                    <SettingRow
                        icon={<Zap size={20} color="#6366f1" />}
                        label="Fanvue"
                        value={fanvueStatus === 'connected' ? 'Connected' : 'Disconnected'}
                        action={onConnectFanvue}
                    />
                    <SettingRow icon={<Share2 size={20} color="#000" />} label="TikTok" value="Setup Required" action={() => alert('TikTok OAuth integration coming in v1.1')} />
                    <SettingRow icon={<Instagram size={20} color="#ee2a7b" />} label="Instagram" value="Not Linked" action={() => { }} />
                </SettingGroup>

                <SettingGroup title="Technical Specs">
                    <SettingRow icon={<Sliders size={20} color="#94a3b8" />} label="ComfyUI Endpoint" value="127.0.0.1:8188" action={() => { }} />
                    <SettingRow icon={<Layers size={20} color="#94a3b8" />} label="Default Workflow" value="Universal-V8" action={() => { }} />
                </SettingGroup>

                <div style={{ padding: '0 8px', marginTop: '12px' }}>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', textAlign: 'center' }}>
                        Fanvue Creator Hub Pro — Version 1.0.0 Build 2026
                    </p>
                </div>
            </div>
        </div>
    );
}

function SettingGroup({ title, children }: any) {
    return (
        <div style={{ marginBottom: '8px' }}>
            <h3 style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', paddingLeft: '8px' }}>{title}</h3>
            <div style={{
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.05)',
                overflow: 'hidden'
            }}>
                {children}
            </div>
        </div>
    );
}

function SettingRow({ icon, label, value, action }: any) {
    return (
        <div
            onClick={action}
            style={{
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                cursor: 'pointer'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {icon}
                </div>
                <span style={{ fontSize: '16px', fontWeight: '500' }}>{label}</span>
            </div>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>{value}</span>
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
            color: 'rgba(255,255,255,0.2)',
            padding: '40px'
        }}>
            <Maximize2 size={64} style={{ marginBottom: '24px' }} />
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>{name?.toUpperCase()} MODULE</h3>
            <p style={{ textAlign: 'center' }}>This module is currently in development. Full integration arriving in v1.1</p>
        </div>
    );
}

// Utility Components
function RefreshCw(props: any) {
    return (
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
            <Zap size={20} {...props} />
        </motion.div>
    );
}
