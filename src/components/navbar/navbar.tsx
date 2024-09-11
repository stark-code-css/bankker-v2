import NavbarSearch from './navbar-search';
import Title from './navbar-title';

const Navbar = () => {
  return (
    <div className="bg-transparent w-full flex flex-col gap-4 justify-between items-center p-8 md:flex-row md:h-[100px]">
      <Title />
      <NavbarSearch />
    </div>
  );
};

export default Navbar;
