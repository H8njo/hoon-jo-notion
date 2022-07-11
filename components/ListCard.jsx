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
          duration={0.3}
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
              style={{
                margin: isOpen && 0,
              }}
            >
              <Image
                src="https://live.staticflickr.com/3716/11704689944_6ccf5eeabd_b.jpg"
                layout="fill"
                objectFit="cover"
              />
            </ImageWrapper>
            <ContentWrapper span={11} order={isEven(idx) ? 2 : 1}>
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
            <HoverWrapper
              span={6}
              style={{
                background: `linear-gradient(135deg, ${gradients[idx]?.start} 0%, ${gradients[idx]?.end} 100%)`,
                flex: `0 0 ${isOpen ? '25%' : '0'}`,
              }}
              order={isEven(idx) ? 3 : 0}
            >
              <CSSTransition
                in={isOpen}
                timeout={700}
                classNames="example"
                unmountOnExit
              >
                <div style={{ position: 'absolute', padding: 20 }}>
                  <ListItem>
                    <ListTitle>
                      <Icon.FileOutlined
                        style={{ fontSize: 16, marginRight: 8 }}
                      />
                      homepsdfsdfsdfsdfage
                    </ListTitle>
                    <ListDescription>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sedLorem ipsum dolor sit amet, consectetur adipiscing
                      elit, sedLorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sedLorem ipsum dolor sit amet,
                      consectetur adipiscing elit, sed
                    </ListDescription>
                  </ListItem>
                  <ListItem>
                    <ListTitle>
                      <Icon.UnorderedListOutlined
                        style={{ fontSize: 16, marginRight: 8 }}
                      />
                      homepsdfsdfsdfsdfage
                    </ListTitle>
                    <ListDescription>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed
                    </ListDescription>
                  </ListItem>
                  <ListItem>
                    <ListTitle>
                      <Icon.FileOutlined
                        style={{ fontSize: 16, marginRight: 8 }}
                      />
                      homepsdfsdfsdfsdfage
                    </ListTitle>
                    <ListDescription>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed
                    </ListDescription>
                  </ListItem>
                  <ListItem>
                    <ListTitle>
                      <Icon.UnorderedListOutlined
                        style={{ fontSize: 16, marginRight: 8 }}
                      />
                      homepsdfsdfsdfsdfage
                    </ListTitle>
                    <ListDescription>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed
                    </ListDescription>
                  </ListItem>
                </div>
              </CSSTransition>
            </HoverWrapper>
          </Card>
        </ScrollAnimation>
        <Divider style={{ margin: '45px 0' }} />
        <style jsx>{`
          .example-enter {
            opacity: 0;
            transform: translateY(5%);
          }
          .example-enter-active {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 300ms, transform 300ms;
            transition-delay: 0.2s;
          }
          .example-exit {
            opacity: 1;
            transform: translateY(0);
          }
          .example-exit-active {
            opacity: 0;
            transform: translateY(5%);
            transition-delay: 3s;
          }
        `}</style>
      </>
    );
  });
};

export default ListCard;

const Card = styled(Row)`
  &:hover > div {
    box-shadow: rgba(0, 0, 0, 0.55) 0px 5px 15px;
  }
`;

const ImageWrapper = styled(Col)`
  transition: all 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
  border: 1px solid #ddd;
`;

const ContentWrapper = styled(ImageWrapper)`
  padding: 20px 40px;
  border-right: 0 !important;
  border-left: 0 !important;
`;

const HoverWrapper = styled(ImageWrapper)`
  flex: 0 0 0;
  position: relative;
  overflow: scroll;
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
  color: #4b4b4b;
  margin-bottom: 8px !important;
  padding-left: 10px;
  font-size: 14px;
  color: #616161;
`;
