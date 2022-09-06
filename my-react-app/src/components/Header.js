import PropTypes from "prop-types";

//Header of  page

const Header = ({ par }) => {
  return (
    <header>
      <h1>{par}</h1>
    </header>
  );
};

Header.defaultProps = {
  par: "Aircraft Performance",
};

Header.propTypes = {
  title: PropTypes.string,
};
export default Header;
