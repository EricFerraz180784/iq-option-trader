import React, { useEffect, useRef } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalProps {
  logs: string[];
}

const Terminal: React.FC<TerminalProps> = ({ logs }) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = 0;
    }
  }, [logs]);

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <TerminalIcon size={16} />
        <span>TELEMETRIA AO VIVO</span>
        <div className="terminal-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
      <div className="terminal-body" ref={terminalRef}>
        <AnimatePresence mode="popLayout">
          {logs.slice(0, 12).map((log, index) => (
            <motion.div
              key={`${log}-${index}`}
              className="terminal-line"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1 - (index * 0.08), x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <span className="terminal-prompt">&gt;</span>
              <span className="terminal-text">{log}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="terminal-footer">
        <span className="terminal-cursor">█</span>
      </div>
    </div>
  );
};

export default Terminal;