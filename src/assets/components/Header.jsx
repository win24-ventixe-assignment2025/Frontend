import { usePageTitle } from '../../contexts/PageTitleContext';


const Header = () => {
  const { title } = usePageTitle();

  return (
    <header>
      <h1 className="page-title">{title}</h1>
    </header>
  );
};

export default Header;
