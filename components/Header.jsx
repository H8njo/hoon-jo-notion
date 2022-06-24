import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import useSWR from 'swr';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css';

import styles from './Header.module.css';

import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from '@react-spring/web';

export default function HeaderLayout() {
  const { data: menu, error } = useSWR('/api/menu');
  const [open, set] = useState(false);
  const router = useRouter();
  const data = useMemo(
    () =>
      menu?.map((item) => ({
        route: `/blog/${item.title}`,
        height: 200,
        css: `linear-gradient(135deg, ${item.menuBackground[0]} 0%, ${item.menuBackground[1]} 100%)`,
        ...item,
      })) || [],
    [menu]
  );

  const springApi = useSpringRef();
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: { size: '0%', background: 'black' },
    to: {
      size: open ? '100%' : '0%',
      background: open ? '#ffffff0f' : 'black',
    },
  });

  const transApi = useSpringRef();
  const transition = useTransition(open ? data : [], {
    ref: transApi,
    trail: 400 / data.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });

  const closeBtnStyle = useSpring({
    opacity: open ? 1 : 0,
    delay: open ? 600 : 0,
  });
  const openBtnStyle = useSpring({
    opacity: open ? 0 : 1,
    delay: open ? 0 : 900,
  });

  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
  useChain(open ? [springApi, transApi] : [transApi, springApi], [
    0,
    open ? 0.1 : 0.6,
  ]);

  const handleClickItem = (route) => {
    router.push(route);
    set((open) => !open);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <animated.div style={{ ...closeBtnStyle, zIndex: 1 }}>
          <BtnContainer visible={open}>
            <CloseButton onClick={() => set(!open)}></CloseButton>
          </BtnContainer>
        </animated.div>

        <animated.div
          style={{
            ...rest,
            width: size,
            height: size,
          }}
          className={styles.container}
        >
          <animated.div style={{ ...openBtnStyle, position: 'absolute' }}>
            <span
              onClick={() => !open && set((open) => !open)}
              style={{ color: 'red' }}
            >
              Icon
            </span>
          </animated.div>

          {transition((style, item) => {
            return (
              <animated.div
                className={styles.item}
                style={{ ...style, background: item.css }}
                onClick={() => handleClickItem(item.route)}
              >
                <Item>
                  {/* {item.cover && (
                    <LazyLoadImage
                      placeholderSrc={styles.image}
                      className={styles.image}
                      alt={item.title}
                      effect="blur"
                      sizes="100px"
                      src={item.cover}
                      width="100%"
                      height="100%"
                    ></LazyLoadImage>
                  )} */}
                  <Title>{item.title}</Title>
                  {/* <Description>{item.description}</Description> */}
                </Item>
              </animated.div>
            );
          })}
        </animated.div>
      </div>
    </>
  );
}

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  color: #4b4b4b;
`;
const Description = styled.p`
  color: white;
  margin: 0;
`;

const Item = styled.div`
  height: 100%;
  opacity: 10;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .lazy-load-image-background {
    position: absolute;
    top: 0;
    z-index: -1;
    left: 0;
    opacity: 0.5;
  }
`;

const BtnContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  transition: all 0.5s ease-out;
  top: ${({ visible }) => (visible ? '5px' : '-50px')};
  justify-content: center;
`;

const CloseButton = styled.div`
  height: 100px;
  width: 100px;
  height: 40px;
  width: 41px;
  zindex: 1;
  background: blue;
`;
