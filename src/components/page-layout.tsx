type Props = {
  children: React.ReactNode;
}

const PageLayout = ({ children }: Props) => (
  <div className="my-16">
    {children}
  </div>
);

export default PageLayout;
