import RouteAnimation from '@/components/RouteAnimation';

const BasicLayout = ({ children }) => {
  return (
    <>
      <RouteAnimation />
      <div style={{ padding: '0 200px' }}>{children}</div>
    </>
  );
};

export default BasicLayout;
