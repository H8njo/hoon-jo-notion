import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { gradients } from '@/utils/contants';

const RouteAnimation = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [backgroundColor, setBackgroundColor] = useState();
  const variants = {
    hidden: { top: '100%' },
    visible: { top: '0' },
  };
  const titleVariants = {
    hidden: { opacity: 0, top: 30 },
    visible: {
      opacity: 1,
      top: 0,
      transition: { delay: 0.5 },
    },
  };
  const contentVariants = {
    hidden: { opacity: 0, top: 30 },
    visible: {
      opacity: 1,
      top: 0,
      transition: { delay: 1 },
    },
  };
  useEffect;
  useEffect(() => {
    router.events.on('routeChangeError', (e) => setLoading(false));
    router.events.on('routeChangeStart', (e) => setLoading(true));
    router.events.on('routeChangeComplete', (e) =>
      setTimeout(() => {
        setLoading(false);
      }, 2200)
    );

    return () => {
      router.events.off('routeChangeError', (e) => setLoading(false));
      router.events.off('routeChangeStart', (e) => setLoading(true));
      router.events.off('routeChangeComplete', (e) =>
        setTimeout(() => {
          setLoading(false);
        }, 3000)
      );
    };
  }, [router.events]);
  useEffect(() => {
    const randomBackground = Math.floor(Math.random() * gradients.length);
    setBackgroundColor(randomBackground);
  }, [router]);

  return (
    <motion.div
      initial="hidden"
      animate={loading ? 'visible' : 'hidden'}
      variants={variants}
      style={{
        background: 'green',
        position: 'fixed',
        height: '100vh',
        width: '100%',
        background: `linear-gradient(135deg, ${gradients[backgroundColor]?.start} 0%, ${gradients[backgroundColor]?.end} 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
        padding: 200,
      }}
      transition={{ duration: 0.3, stiffness: 100 }}
    >
      <motion.div
        animate={loading ? 'visible' : 'hidden'}
        // animate={'visible'}
        initial="hidden"
        variants={titleVariants}
        style={{ position: 'relative' }}
      >
        <h1 style={{ fontSize: 60, fontWeight: 'bold' }}>Projects</h1>
      </motion.div>
      <motion.div
        animate={loading ? 'visible' : 'hidden'}
        initial="hidden"
        variants={contentVariants}
        style={{ position: 'relative' }}
      >
        <p style={{ fontSize: 35 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sedLorem
          ipsum dolor sit amet, consectetur adipiscing elit, sedLorem ipsum
        </p>
      </motion.div>
    </motion.div>
  );
};

export default RouteAnimation;
