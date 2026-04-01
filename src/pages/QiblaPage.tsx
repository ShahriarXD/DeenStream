import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '@/components/PageWrapper';
import { useAppStore } from '@/stores/useAppStore';

// Qibla direction from any point on Earth
function calculateQibla(lat: number, lng: number): number {
  const meccaLat = (21.4225 * Math.PI) / 180;
  const meccaLng = (39.8262 * Math.PI) / 180;
  const userLat = (lat * Math.PI) / 180;
  const userLng = (lng * Math.PI) / 180;

  const y = Math.sin(meccaLng - userLng);
  const x = Math.cos(userLat) * Math.tan(meccaLat) - Math.sin(userLat) * Math.cos(meccaLng - userLng);
  let qibla = (Math.atan2(y, x) * 180) / Math.PI;
  return (qibla + 360) % 360;
}

export default function QiblaPage() {
  const { location, setLocation } = useAppStore();
  const [heading, setHeading] = useState<number | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const prevHeading = useRef(0);

  const qiblaDirection = location ? calculateQibla(location.lat, location.lng) : 0;

  useEffect(() => {
    if (!location) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setLocation({ lat: 21.4225, lng: 39.8262 })
      );
    }
  }, [location, setLocation]);

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null) {
        // Smooth the heading
        let newHeading = e.alpha;
        const diff = newHeading - prevHeading.current;
        if (Math.abs(diff) > 180) {
          newHeading = prevHeading.current + (diff > 0 ? diff - 360 : diff + 360);
        }
        const smoothed = prevHeading.current + (newHeading - prevHeading.current) * 0.15;
        prevHeading.current = smoothed;
        setHeading(((smoothed % 360) + 360) % 360);
      }
    };

    // Try to request permission (iOS 13+)
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          } else {
            setPermissionDenied(true);
          }
        })
        .catch(() => setPermissionDenied(true));
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  const rotation = heading !== null ? qiblaDirection - heading : 0;
  const isAligned = heading !== null && Math.abs(((rotation + 180) % 360) - 180) < 10;

  return (
    <PageWrapper className="flex flex-col items-center justify-center text-center">
      <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2 font-medium">Qibla Direction</p>
      <p className="text-sm text-muted-foreground mb-10">
        {heading !== null ? `${Math.round(qiblaDirection)}° from North` : 'Calibrating...'}
      </p>

      {/* Compass */}
      <div className="relative w-64 h-64">
        {/* Outer ring */}
        <div className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${
          isAligned ? 'border-gold glow-gold' : 'border-border/40'
        }`} />

        {/* Cardinal markers */}
        {['N', 'E', 'S', 'W'].map((dir, i) => (
          <motion.div
            key={dir}
            animate={{ rotate: heading !== null ? -heading : 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 15 }}
            className="absolute inset-0"
            style={{ transformOrigin: 'center' }}
          >
            <span
              className={`absolute text-[10px] font-semibold ${dir === 'N' ? 'text-gold' : 'text-muted-foreground/50'}`}
              style={{
                top: i === 0 ? '8px' : i === 2 ? 'auto' : '50%',
                bottom: i === 2 ? '8px' : 'auto',
                left: i === 3 ? '8px' : i === 1 ? 'auto' : '50%',
                right: i === 1 ? '8px' : 'auto',
                transform: i === 0 || i === 2 ? 'translateX(-50%)' : 'translateY(-50%)',
              }}
            >
              {dir}
            </span>
          </motion.div>
        ))}

        {/* Qibla needle */}
        <motion.div
          animate={{ rotate: heading !== null ? rotation : 0 }}
          transition={{ type: 'spring', stiffness: 60, damping: 15 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Needle */}
          <div className="absolute top-4 w-0.5 h-[45%] rounded-full bg-gradient-to-b from-gold to-transparent" />
          {/* Kaaba icon */}
          <div className={`absolute top-2 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-500 ${
            isAligned ? 'gradient-gold glow-gold scale-110' : 'bg-secondary/80'
          }`}>
            <span className="text-sm">🕋</span>
          </div>
        </motion.div>

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${isAligned ? 'bg-gold' : 'bg-secondary'}`} />
        </div>
      </div>

      {/* Status */}
      <motion.p
        animate={{ opacity: 1 }}
        className={`mt-10 text-sm font-medium transition-colors duration-500 ${isAligned ? 'text-gold' : 'text-muted-foreground'}`}
      >
        {permissionDenied
          ? 'Compass access denied. Enable motion sensors in settings.'
          : heading === null
          ? 'Point your device forward and rotate slowly'
          : isAligned
          ? '✓ You are facing the Qibla'
          : 'Rotate to align with the Qibla'}
      </motion.p>

      {permissionDenied && (
        <p className="text-xs text-muted-foreground mt-4 max-w-[260px] leading-relaxed">
          Qibla direction is approximately {Math.round(qiblaDirection)}° from North based on your location.
        </p>
      )}
    </PageWrapper>
  );
}
