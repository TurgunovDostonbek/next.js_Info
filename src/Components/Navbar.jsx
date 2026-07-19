import { CiSearch } from "react-icons/ci";

function Navbar() {
  return (
    <div className="navbar container">
      <div className="navbar__links">
        <a href="">
          <img src="" alt="" />
          logo
        </a>

        <a href="">Phones</a>
        <a href="">Earbuds</a>
        <a href="">Watches</a>
        <a href="">Smart Home</a>
        <a href="">Laptops</a>
        <a href="">Accessories</a>
        <a href="">Subscriptions</a>
        <a href="">Offers</a>
      </div>

      <div className="navbar__icons">
        <p><CiSearch className='icons'/></p>
        <p><CiSearch className='icons'/></p>
        <p><CiSearch className='icons'/></p>
        <p><CiSearch className='icons'/></p>
      </div>
    </div>
  );
}

export default Navbar;
