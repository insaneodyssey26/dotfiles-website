"use client";

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';

interface ConfigItem {
  id: string;
  name: string;
  category: string;
  repoPath: string;
  installPath: string;
  description: string;
}

const CONFIGS: ConfigItem[] = [
  { id: 'niri-config', name: 'Niri (Main Config)', category: 'Desktop', repoPath: 'niri/config.kdl', installPath: '~/.config/niri/config.kdl', description: 'Core compositor settings, outputs, gaps, shadows, and idle daemon.' },
  { id: 'niri-binds', name: 'Niri Keybinds', category: 'Desktop', repoPath: 'niri/binds.kdl', installPath: '~/.config/niri/binds.kdl', description: 'All keyboard shortcuts for window movements, column resizing, and app launching.' },
  { id: 'niri-rules', name: 'Niri Window Rules', category: 'Desktop', repoPath: 'niri/rules.kdl', installPath: '~/.config/niri/rules.kdl', description: 'Floating rules, size constraints, and application workspace behaviors.' },
  { id: 'hypr-lock', name: 'Hyprlock', category: 'Desktop', repoPath: 'hyprlock/hyprlock.conf', installPath: '~/.config/hyprlock/hyprlock.conf', description: 'Custom frosted glass lockscreen with clock, avatar, and battery info.' },
  { id: 'waybar', name: 'Waybar (Config)', category: 'UI Suite', repoPath: 'waybar/config.jsonc', installPath: '~/.config/waybar/config.jsonc', description: 'The top status bar with workspaces, clock, audio, battery, and tray.' },
  { id: 'waybar-css', name: 'Waybar (Style)', category: 'UI Suite', repoPath: 'waybar/style.css', installPath: '~/.config/waybar/style.css', description: 'CSS styling for Waybar components and dynamic Matugen colors.' },
  { id: 'fuzzel', name: 'Fuzzel (Launcher)', category: 'UI Suite', repoPath: 'fuzzel/fuzzel.ini', installPath: '~/.config/fuzzel/fuzzel.ini', description: 'Minimalist application launcher triggered by SUPER + D.' },
  { id: 'swaync', name: 'SwayNC (Notifications)', category: 'UI Suite', repoPath: 'swaync/config.json', installPath: '~/.config/swaync/config.json', description: 'The notification center and widget panel configuration.' },
  { id: 'swaync-css', name: 'SwayNC (Style)', category: 'UI Suite', repoPath: 'swaync/style.css', installPath: '~/.config/swaync/style.css', description: 'CSS styling for notification popups and control center.' },
  { id: 'zsh', name: 'Zsh Shell', category: 'Terminal', repoPath: '.zshrc', installPath: '~/.zshrc', description: 'Optimized Zsh configuration featuring fzf and zoxide.' },
  { id: 'fish', name: 'Fish Shell', category: 'Terminal', repoPath: 'fish/config.fish', installPath: '~/.config/fish/config.fish', description: 'Fish shell configuration with auto-suggestions and synced aliases.' },
  { id: 'kitty', name: 'Kitty Terminal', category: 'Terminal', repoPath: 'kitty/kitty.conf', installPath: '~/.config/kitty/kitty.conf', description: 'GPU-accelerated terminal configuration.' },
  { id: 'foot', name: 'Foot Terminal', category: 'Terminal', repoPath: 'foot/foot.ini', installPath: '~/.config/foot/foot.ini', description: 'Fast, lightweight Wayland terminal emulator.' },
  { id: 'fastfetch', name: 'Fastfetch', category: 'Terminal', repoPath: 'fastfetch/config.jsonc', installPath: '~/.config/fastfetch/config.jsonc', description: 'System information display shown on new terminal sessions.' },
  { id: 'cava', name: 'Cava (Visualizer)', category: 'Terminal', repoPath: 'cava/config', installPath: '~/.config/cava/config', description: 'Terminal audio spectrum visualizer configuration.' },
  { id: 'screenshot', name: 'Screenshot Tool', category: 'System', repoPath: 'scripts/screenshot.sh', installPath: '~/dotfiles/scripts/screenshot.sh', description: 'Grim + Slurp capture with clipboard copy and Satty annotation.' },
  { id: 'setup', name: 'Setup Script', category: 'System', repoPath: 'setup.sh', installPath: '~/dotfiles/setup.sh', description: 'Automated script to symlink dotfiles into ~/.config/.' }
];

export default function ConfigsPage() {
  const [activeId, setActiveId] = useState<string>("niri-config");
  const [fileContent, setFileContent] = useState<string>("Loading configuration...");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const activeConfig = CONFIGS.find(c => c.id === activeId) || CONFIGS[0];
  const repoUrl = "https://github.com/insaneodyssey26/dotfiles";

  useEffect(() => {
    setLoading(true);
    setFileContent("Fetching file from GitHub...");
    setCopied(false);
    
    fetch(`https://raw.githubusercontent.com/insaneodyssey26/dotfiles/main/${activeConfig.repoPath}`)
      .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.text();
      })
      .then(text => {
        setFileContent(text);
        setLoading(false);
      })
      .catch(() => {
        setFileContent(`404: Not Found\nThe file '${activeConfig.repoPath}' could not be fetched from GitHub.`);
        setLoading(false);
      });
  }, [activeConfig.repoPath]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dirPath = activeConfig.installPath.substring(0, activeConfig.installPath.lastIndexOf('/'));
  const installCommand = `mkdir -p ${dirPath} && curl -sL https://raw.githubusercontent.com/insaneodyssey26/dotfiles/main/${activeConfig.repoPath} > ${activeConfig.installPath}`;

  return (
    <main style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar currentPath="/configs" />

      <div className="explorer-container fade-up">
        
        <div className="explorer-sidebar">
          <h3>Tools & Software</h3>
          <div className="explorer-file-list" style={{ marginTop: '16px' }}>
            {['Desktop', 'UI Suite', 'Terminal', 'System'].map(category => (
              <div key={category} style={{ marginBottom: '16px' }}>
                <div style={{ padding: '0 16px', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '1px', marginBottom: '8px' }}>
                  {category}
                </div>
                {CONFIGS.filter(c => c.category === category).map(config => (
                  <button 
                    key={config.id} 
                    className={`explorer-file-btn ${activeId === config.id ? 'active' : ''}`}
                    onClick={() => setActiveId(config.id)}
                    style={{ display: 'block', width: '100%', padding: '10px 16px' }}
                  >
                    {config.name}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="explorer-viewer">
          <div className="explorer-info-header">
            <div style={{ flex: 1 }}>
              <h2>{activeConfig.name}</h2>
              <p>{activeConfig.description}</p>
              
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Manual Save Path:</span><br/>
                <code style={{ fontFamily: 'var(--font-geist-mono)', color: 'var(--text-primary)', fontSize: '0.9rem' }}>{activeConfig.installPath}</code>
              </div>

              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Quick Install via Terminal:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <code style={{ fontFamily: 'var(--font-geist-mono)', background: 'rgba(0,0,0,0.5)', padding: '8px 12px', borderRadius: '6px', fontSize: '0.8rem', color: '#10b981', flex: 1, overflowX: 'auto', whiteSpace: 'nowrap' }}>
                    {installCommand}
                  </code>
                  <button 
                    onClick={() => navigator.clipboard.writeText(installCommand)} 
                    style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                    title="Copy Command"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
            
            <div className="explorer-actions" style={{ marginTop: '8px' }}>
              <button className="primary copy-btn" onClick={handleCopy}>
                {copied ? 'File Copied!' : 'Copy Config'}
              </button>
              <a href={`${repoUrl}/blob/main/${activeConfig.repoPath}`} target="_blank" rel="noreferrer" className="secondary-btn">GitHub</a>
            </div>
          </div>

          <pre id="code-viewer-scroll" className="explorer-code" style={{ overflowY: 'auto' }}>
            <code style={{ fontFamily: 'var(--font-geist-mono)' }}>{fileContent}</code>
          </pre>
        </div>
      </div>
    </main>
  );
}
