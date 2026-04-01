import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

type Mode = 'signin' | 'signup' | 'forgot';

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setSuccess('Check your email for a password reset link.');
      } else if (mode === 'signup') {
        // Check for valid email and password
        if (!email.includes('@')) {
          throw new Error('Please enter a valid email address');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        
        if (error) {
          // Improved error messages
          if (error.message.includes('Invalid API key')) {
            throw new Error('API configuration error. Please contact support. Error: Invalid Supabase API Key');
          } else if (error.message.includes('User already registered')) {
            throw new Error('This email is already registered. Try signing in instead.');
          } else if (error.message.includes('email')) {
            throw new Error('Email error: ' + error.message);
          } else {
            throw error;
          }
        }
        setSuccess('Account created! Check your email to verify.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            throw new Error('Invalid email or password');
          } else if (error.message.includes('Email not confirmed')) {
            throw new Error('Please verify your email first. Check your inbox for the verification link.');
          } else {
            throw error;
          }
        }
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'apple') => {
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-sm"
      >
        {/* Logo / Brand */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gold tracking-tight">DeenStream</h1>
          <p className="text-sm text-muted-foreground mt-2">
            {mode === 'signin' ? 'Welcome back' : mode === 'signup' ? 'Create your account' : 'Reset your password'}
          </p>
        </div>

        {/* OAuth Buttons */}
        {mode !== 'forgot' && (
          <div className="space-y-3 mb-8">
            <button
              onClick={() => handleOAuth('google')}
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-secondary/40 border border-border/30 text-sm font-medium text-foreground tap-scale hover:bg-secondary/60 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </button>
            <button
              onClick={() => handleOAuth('apple')}
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-secondary/40 border border-border/30 text-sm font-medium text-foreground tap-scale hover:bg-secondary/60 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              Continue with Apple
            </button>
          </div>
        )}

        {mode !== 'forgot' && (
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-border/40" />
            <span className="text-[11px] text-muted-foreground uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-border/40" />
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="w-full bg-secondary/30 border border-border/40 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
            />
          </div>

          <AnimatePresence>
            {mode !== 'forgot' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="relative"
              >
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  minLength={6}
                  className="w-full bg-secondary/30 border border-border/40 rounded-2xl pl-11 pr-12 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-xs bg-red-500/10 border border-red-500/30 text-red-500 px-3 py-2.5 rounded-xl"
            >
              <p className="font-semibold mb-1">❌ Error</p>
              <p className="text-red-400">{error}</p>
              {error.includes('Invalid API') && (
                <p className="text-red-400 text-[10px] mt-2 border-t border-red-500/20 pt-2">
                  💡 Tip: Check SUPABASE_SETUP.md for configuration instructions
                </p>
              )}
            </motion.div>
          )}
          {success && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 px-3 py-2.5 rounded-xl"
            >
              <p className="font-semibold mb-1">✅ Success</p>
              <p className="text-emerald-400">{success}</p>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl gradient-gold text-accent-foreground text-sm font-semibold tap-scale disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={15} className="animate-spin" />}
            {mode === 'signin' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
          </button>
        </form>

        {/* Footer links */}
        <div className="mt-6 text-center space-y-2">
          {mode === 'signin' && (
            <>
              <button onClick={() => { setMode('forgot'); setError(''); setSuccess(''); }} className="text-xs text-muted-foreground hover:text-gold transition-colors">
                Forgot password?
              </button>
              <p className="text-xs text-muted-foreground">
                Don't have an account?{' '}
                <button onClick={() => { setMode('signup'); setError(''); setSuccess(''); }} className="text-gold font-medium">
                  Sign up
                </button>
              </p>
            </>
          )}
          {mode === 'signup' && (
            <p className="text-xs text-muted-foreground">
              Already have an account?{' '}
              <button onClick={() => { setMode('signin'); setError(''); setSuccess(''); }} className="text-gold font-medium">
                Sign in
              </button>
            </p>
          )}
          {mode === 'forgot' && (
            <button onClick={() => { setMode('signin'); setError(''); setSuccess(''); }} className="text-xs text-gold font-medium">
              ← Back to sign in
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
