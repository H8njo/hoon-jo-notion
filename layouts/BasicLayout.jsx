import RouteAnimation from '@/components/RouteAnimation';

const BasicLayout = ({ children }) => {
  return (
    <>
      <RouteAnimation />
      <div style={{ padding: '100px 200px' }}>{children}</div>
    </>
  );
};

export default BasicLayout;
