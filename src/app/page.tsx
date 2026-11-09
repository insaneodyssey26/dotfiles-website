"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import CustomScrollbar from '../components/CustomScrollbar';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const repoUrl = "https://github.com/insaneodyssey26/dotfiles";

  return (
    <main>
      <CustomScrollbar />
      <Navbar currentPath="/" />

      <section className="hero">
        <h2 className="fade-up">Minimal. Fast.<br />Scrollable Tiling.</h2>
        <p className="fade-up delay-1">
          A personal Arch Linux desktop setup built for efficiency with Niri. Dynamic wallpaper colors, GPU terminals, and an infinite horizontal ribbon.
        </p>
        <div className="image-wrapper fade-up delay-2" onClick={() => setSelectedImage("/assets/desktop.png")}>
          <img src="/assets/desktop.png" alt="Desktop Screenshot" />
        </div>
        <p className="fade-up delay-2" style={{ fontSize: '0.85rem', opacity: 0.6, marginTop: '12px' }}>
          * Note: Screenshots here are from earlier desktop sessions and might slightly differ from the live Niri setup you install, though the overall look, bar, and theme styling remain the same.
        </p>
      </section>

      <section className="section-wide">
        <h3 className="fade-up">Overview</h3>
        <p className="fade-up">
          A clean, keyboard-focused setup for daily work. Everything is synced to wallpaper colors and stays out of your way.
        </p>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div className="card fade-up">
            <h4>Dynamic Theming</h4>
            <p>Colors are automatically generated from your active wallpaper using Matugen. The whole system updates instantly.</p>
          </div>
          <div className="card fade-up delay-1">
            <h4>Terminal Environment</h4>
            <p>Fast Zsh & Fish setup with fzf fuzzy finding, zoxide directory jumping, and syntax highlighting.</p>
          </div>
          <div className="card fade-up delay-2">
            <h4>Scrollable Ribbon</h4>
            <p>Infinite horizontal workspace flow powered natively by Niri. Windows never get cramped or squished.</p>
          </div>
          <div className="card fade-up delay-3">
            <h4>Window Management</h4>
            <p>Simple column navigation, smooth desktop overview on Alt+Tab, and zero lag.</p>
          </div>
        </div>
      </section>

      <section className="fade-up">
        <h3>UI Suite</h3>
        <p>A unified Wayland suite featuring Waybar, SwayNC, and Fuzzel. Everything strictly follows the system color scheme.</p>
        <div className="image-wrapper" onClick={() => setSelectedImage("/assets/ui_components.png")}>
          <img src="/assets/ui_components.png" alt="UI Components" />
        </div>
      </section>

      <section className="fade-up">
        <h3>Hardware Tips & Tweaks</h3>
        <p>Since these dotfiles are customized for my laptop, here are a few things you might want to adjust for yours:</p>
        
        <div className="alert">
          <h4>1. Dual-Boot Hard Drive Paths</h4>
          <p>My file search scripts check specific partition mount paths. If you do not have those, update them to your own folders.</p>
          <p><strong>Fix:</strong> Open <a href={`${repoUrl}/blob/main/scripts/project_launcher.sh`} target="_blank">project_launcher.sh</a> and <a href={`${repoUrl}/blob/main/scripts/file_search.sh`} target="_blank">file_search.sh</a> to set your paths.</p>
        </div>

        <div className="alert">
          <h4>2. Waybar Hardware Sensors</h4>
          <p>My Waybar setup uses direct sensor paths for CPU temps and battery status.</p>
          <p><strong>Fix:</strong> Open <a href={`${repoUrl}/blob/main/waybar/config.jsonc`} target="_blank">config.jsonc</a>. In the temperature module, remove <code>hwmon-path-abs</code> for auto-detection. Check if your battery is <code>BAT0</code> or <code>BAT1</code>.</p>
        </div>

        <div className="alert">
          <h4>3. Monitor Configuration</h4>
          <p>My configuration sets my internal display (<code>eDP-1</code>) to 144Hz.</p>
          <p><strong>Fix:</strong> Open <a href={`${repoUrl}/blob/main/niri/config.kdl`} target="_blank">config.kdl</a> and adjust the <code>output &quot;eDP-1&quot;</code> block for your display.</p>
        </div>
      </section>

      <section className="fade-up">
        <h3>Installation</h3>
        <p>Run the setup script on a fresh Arch Linux installation. It will symlink configurations directly to your <code>~/.config/</code> folder.</p>
        <pre>
{`git clone https://github.com/insaneodyssey26/dotfiles.git ~/dotfiles
cd ~/dotfiles
./setup.sh`}
        </pre>
      </section>

      <footer>
        <p>
          Created by <a href="https://github.com/insaneodyssey26" target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)' }}>Masum Ali</a>. 
          Licensed under MIT.
        </p>
      </footer>

      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <span className="image-modal-close">&times;</span>
          <img src={selectedImage} alt="Enlarged view" />
        </div>
      )}
    </main>
  );
}
