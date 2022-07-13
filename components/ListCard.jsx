import { useState, useEffect } from 'react';
import { Row, Col, Typography, Divider, Space } from 'antd';
import Image from 'next/image';
import * as Icon from '@ant-design/icons';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import ScrollAnimation from 'react-animate-on-scroll';

import { gradients } from '@/utils/contants';

const { Paragraph, Title } = Typography;

const ListCard = ({ data }) => {
  const [inProp, setInProp] = useState({});
  useEffect(() => {
    const inPropData = data?.map((_, idx) => ({
      idx,
      isIn: false,
    }));
    setInProp(inPropData);
  }, [data]);

  const isEven = (num) => num % 2 === 0;
  const handleClick = (idx) => {
    const hoverControl = inProp.map((item) => {
      return { ...item, isIn: item.idx === idx ? !item.isIn : item.isIn };
    });
    setInProp(hoverControl);
  };
  return data?.map((item, idx) => {
    const isOpen = inProp[idx]?.isIn;
    return (
      <>
        <ScrollAnimation
          animateIn={isEven(idx) ? 'fadeInRight' : 'fadeInLeft'}
          offset={40}
          duration={0.45}
          animateOnce={true}
        >
          <Card
            isEven={isEven(idx)}
            wrap={false}
            onClick={() => {
              handleClick(idx);
            }}
          >
            <ImageWrapper
              span={7}
              offset={isEven(idx) && 6}
              order={isEven(idx) ? 1 : 2}
              isOpen={isOpen}
            >
              <Image
                src="https://live.staticflickr.com/3716/11704689944_6ccf5eeabd_b.jpg"
                layout="fill"
                objectFit="cover"
              />
            </ImageWrapper>
            <ContentWrapper
              span={11}
              order={isEven(idx) ? 2 : 1}
              isOpen={isOpen}
            >
              <div style={{ textAlign: isEven(idx) ? 'left' : 'right' }}>
                <Title level={2} ellipsis={true}>
                  The standard Lorem Ipsum
                </Title>
                <Paragraph
                  ellipsis={{ rows: 3 }}
                  style={{ fontSize: 20, color: '#686868' }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Paragraph>
                <Row justify="space-between" align="middle">
                  <Col order={isEven(idx) ? 1 : 3}></Col>
                  <Col order={2}>
                    <Space>
                      <Image
                        src="https://live.staticflickr.com/3716/11704689944_6ccf5eeabd_b.jpg"
                        objectFit="cover"
                        style={{ borderRadius: 50 }}
                        width={40}
                        height={40}
                      />
                      <Paragraph style={{ fontSize: 16 }}>Hoonjo</Paragraph>
                    </Space>
                  </Col>
                </Row>
              </div>
            </ContentWrapper>
            <DetailWrapper isEven={isEven(idx)} span={24} isOpen={isOpen}>
              <DetailCol
                isOpen={isOpen}
                span={24}
                startBackground={gradients[idx]?.start}
                endBackground={gradients[idx]?.end}
                order={isEven(idx) ? 3 : 0}
              >
                <CSSTransition
                  in={isOpen}
                  timeout={700}
                  classNames="example"
                  unmountOnExit
                >
                  <div style={{ padding: 20 }}>
                    <Space
                      direction="vertical"
                      split={
                        <Divider style={{ margin: 0, padding: '0 25px' }} />
                      }
                    >
                      {Array(10)
                        .fill()
                        .map((item, idx) => (
                          <ListItem key={idx}>
                            <ListTitle ellipsis={{ rows: 2 }}>
                              <Icon.FileOutlined
                                style={{ fontSize: 16, marginRight: 8 }}
                              />
                              homepsdfsdfsdfsdfage
                            </ListTitle>

                            <ListDescription ellipsis={{ rows: 2 }}>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sedLorem ipsum dolor sit amet, consectetur
                              adipiscing elit, sedLorem ipsum dolor sit amet,
                              consectetur adipiscing elit, sedLorem ipsum dolor
                              sit amet, consectetur adipiscing elit, sed
                            </ListDescription>
                          </ListItem>
                        ))}
                    </Space>
                  </div>
                </CSSTransition>
              </DetailCol>
            </DetailWrapper>
          </Card>
        </ScrollAnimation>
        <Divider style={{ margin: '45px 0' }} />
        <style jsx>{`
          .example-enter {
            opacity: 0;
            transform: translateY(1%);
          }
          .example-enter-active {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 400ms, transform 400ms;
            transition-delay: 0.4s;
          }
          .example-exit {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 200ms, transform 200ms;
          }
          .example-exit-active {
            opacity: 0;
            transform: translateY(-1%);
          }
        `}</style>
      </>
    );
  });
};

export default ListCard;

const Card = styled(Row)`
  position: relative;
`;

const ImageWrapper = styled(Col)`
  transition: all 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
  border: 1px solid #ddd;
  min-height: 200px;
  transition-delay: ${({ isOpen }) => (isOpen ? '0s' : '0.4s')};
  opacity: ${({ isOpen }) => (isOpen ? '0' : '1')};
`;

const ContentWrapper = styled(Col)`
  transition: all 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
  padding: 20px 40px;
  border: 1px solid #ddd;
  opacity: ${({ isOpen }) => (isOpen ? '0' : '1')};
  transition-delay: ${({ isOpen }) => (isOpen ? '0s' : '0.4s')};
  height: auto;
`;

const DetailWrapper = styled(Col)`
  position: absolute;
  height: 100%;
  transition: all 0.5s;
  transition-delay: 0.2s;
  padding-right: ${({ isEven }) => (isEven ? '0%;' : '25%;')}
  padding-left: ${({ isEven }) => (isEven ? '25%;' : '0%')}
  width: ${({ isOpen }) => (isOpen ? '100%' : '0')};
  flex: ${({ isOpen }) => (isOpen ? '0 0 100%' : '0 0 0%')};

`;

const DetailCol = styled(Col)`
  flex: 0 0 0;
  transition: all 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
  min-height: 200px;
  width: ${({ isOpen }) => (isOpen ? '100%' : '0')};
  background: linear-gradient(
    135deg,
    ${({ startBackground }) => startBackground} 0%,
    ${({ endBackground }) => endBackground} 100%
  );
  overflow: scroll;
  height: 100%;
  border: 0;
`;
const ListItem = styled.div`
  margin-bottom: 18px;
`;
const ListTitle = styled(Paragraph)`
  color: #4b4b4b;
  margin-bottom: 2px !important;
  font-weight: bold;
  font-size: 18px;
  word-break: break-all;
`;
const ListDescription = styled(Paragraph)`
  margin-bottom: 8px !important;
  padding-left: 10px;
  font-size: 14px;
  color: #616161;
`;
