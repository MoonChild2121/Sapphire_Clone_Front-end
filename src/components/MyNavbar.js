import React from 'react';
import logo from '../images/logo.png';
import newinnav from '../images/newin-nav.png';
import womannav from '../images/woman-nav.png';
import mannav from '../images/men-nav.png';
import kidsnav from '../images/kids-nav.png';
import beautynav from '../images/beauty-nav.png';
import accesorynav from '../images/accesories-nav.png';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import PersonIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import TruckIcon from '@mui/icons-material/LocalShippingOutlined';
import './MyNavbar.css';
import Cart from './Cart'
import {useState, useEffect } from 'react';
import Logout from './Logout';
import { Link } from 'react-router-dom';

function MyNavbar({ setSignInVisible, setSignUpVisible, user, setUser }) {
  const [isCartVisible, setIsCartVisible] = useState(false); // State for cart visibility
  const [cartItems, setCartItems] = useState([]); // State for cart items
  const [showLogout, setShowLogout] = useState(false); // State to show/hide logout component

  useEffect(() => {
    const storedUser = localStorage.getItem('name');
    if (storedUser) {
      setUser(storedUser);
    }

    // Fetch cart items based on login status
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:5000/api/cart', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const data = await response.json();
          setCartItems(data);
        } catch (err) {
          console.error(err);
        }
      } else {
        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(localCart);
      }
    };

    fetchCartItems();
  }, [user, setUser]);

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleProfileClick = () => {
    if (user) {
      setShowLogout(!showLogout);
    } else {
      setSignInVisible(true);
      setSignUpVisible(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setShowLogout(false);
  };

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className='header'>
      <div className="navbar">
      <div className="image"><Link to="/" className='links'><img src={logo} alt="sapphire" /></Link></div>
        <div className="search-container">
          <input type="text" className="search-input" placeholder="FIND YOUR FAVORITES" />
          <button type="submit" className="search-button"><SearchIcon className="search-icon" /></button>
        </div>
        <div className="icons">
          <TruckIcon />
                    {user ? (
                        <>
                            <PersonIcon onClick={handleProfileClick} />
                            <span style={{fontSize: '20px'}}>{user}</span>
                        </>
                    ) : (
                        <PersonIcon onClick={handleProfileClick} />
                    )}
          <ShoppingCartIcon style={{color: 'white'}}/>
        </div>
      </div>
      <hr />
      <div className='categories'>
        <div className='category'>
          <div className='categoryname'>NEW IN</div>
          <div className='dropdown'>
            <div className='navimage'><img src={newinnav} alt='new in collection' /></div>
            <div className='columns'>
              <div className='column'>
                <div className='column-title'>NEW IN</div>
                <hr/>
                <div className='list'>
                  <div>Unstitched</div>
                  <div>Ready to Wear</div>
                  <div>Man</div>
                  <div>WEST</div>
                  <div>Home</div>
                  <div>Kids</div>
                  <div>Accessories</div>
                  <div>Modest Wear</div>
                </div>
              </div>
              <div className='column'>
                <div className='column-title'>BY COLLECTION</div>
                <hr/>
                <div className='list'>
                  <div>Classic Chikankari</div>
                  <div>The 90s Edit</div>
                  <div>The Resort Edit</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='category'>
        <Link to="/women" className='links'><div className='categoryname'  >WOMAN</div></Link>
          <div className='dropdown'>
          <div className='navimage'><img src={womannav} alt='new in collection' /></div>
            <div className='columns'>
              <div className='column'>
                <div className='column-title'>READY TO WEAR</div>
                <hr/>
                <div className='list'>
                <div className='column-title'>Shop by Collection</div>
                <div>Summer '24</div>
                <div className='column-title'>Shop by Piece</div>
                <div>Shirts</div>
                <div>Dupattas</div>
                <div>Bottoms</div>
                <div>Matching Separates</div>
                <div className='column-title'>Shop by Type</div>
                <div>Printed</div>
                <div>Embroidered</div>
                <div>Solids</div>
                <div>Luxury</div>
                <div>Style Staples</div>
                </div>
              </div>
              <div className='column'>
                <div className='column-title'>UNSTITCHED</div>
                <hr/>
                <div className='list'>
                <div>Summer '24</div>
                <div>Day to Day V</div>
                <div>Stitched for You</div>
                <div>Lawn '24</div>
                <div>1 Piece</div>
                <div>2 Piece</div>
                <div>3 Piece</div>
                <div>Unstitched Bottoms</div>
                <div>Fabric Glossary</div>
                </div>
              </div>
              <div className='column'>
                <div className='column-title'>WEST</div>
                <hr/>
                <div className='list'>
                <div>Summer '24</div>
                <div>Tops</div>
                <div>T-Shirts</div>
                <div>Dresses</div>
                <div>Essentials</div>
                <div>Co-ord Sets</div>
                <div>Jeans</div>
                <div>Skirts</div>
                <div>Bottoms</div>
                <div>Accessories</div> 
                </div>
              </div>
              <div className='column'>
                <div className='column-title'>SLEEPWEAR</div>
                <hr/>
                <div className='list'>
                <div>Sets</div>
                <div>T-Shirts</div>
                <div>Pajamas</div>

                <div className='column-title'>MODEST WEAR</div>
                <hr/>
                <div>Abayas</div>
                <div>Hijabs</div>
                <div>Catalogue</div>
                <div>Day to Day V</div>
                <div>Unstitched Summer '24</div>
                <div>RTW Summer '24</div>

                <div className='column-title'>CATALOGUE</div>
                <hr/>
                <div>Day to Day V</div>
                <div>Unstitched Summer '24</div>
                <div>RTW Summer '24</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Add similar structure for other categories */}
        <div className='category'>
        <Link to="/man" className='links'  ><div className='categoryname'>MAN</div></Link>
          <div className='dropdown'>
              <div className='navimage'>
                <img src={mannav} alt='men collection' />
              </div>
              <div className='columns'>
                <div className='column'>
                  <div className='column-title'>MEN'S UNSTITCHED</div>
                  <hr />
                  <div className='list'>
                    <div>Summer ‘24</div>
                    <div>Fabric Glossary</div>
                  </div>
                </div>
                <div className='column'>
                  <div className='column-title'>MEN'S STITCHED</div>
                  <hr />
                  <div className='list'>
                    <div>Summer '24</div>
                    <div>Kurtas</div>
                    <div>Outfits</div>
                    <div>Waistcoats</div>
                    <div>Bottoms</div>
                  </div>
                </div>
              </div>
            </div>

        </div>
        <div className='category'>
        <Link to="/kids" className='links'  ><div className='categoryname'>KIDS</div></Link>
          <div className='dropdown'>
            <div className='navimage'>
              <img src={kidsnav} alt='kids collection' />
            </div>
            <div className='columns'>
              <div className='column'>
                <div className='column-title'>GIRLS</div>
                <hr />
                <div className='list'>
                  <div>Kurtas</div>
                  <div>Outfits</div>
                  <div>Fusion</div>
                  <div>Mommy & Me</div>
                  <div>Bottoms</div>
                </div>
              </div>
              <div className='column'>
                <div className='column-title' >BOYS</div>
                <hr />
                <div className='list'>
                  <div>Kurtas</div>
                  <div>Outfits</div>
                  <div>Waistcoats</div>
                  <div>Bottoms</div>
                </div>
              </div>
              <div className='column'>
                <div className='column-title'>KIDS BEDDING</div>
                <hr />
                <div className='list'>
                  <div>Boys</div>
                  <div>Girls</div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className='category'>
          <div className='categoryname'  ><Link to="/" className='links'>BEAUTY</Link></div>
          <div className='dropdown'>
            <div className='navimage'>
              <img src={beautynav} alt='cosmetics collection' />
            </div>
            <div className='columns'>
              <div className='column'>
                <div className='column-title'>COSMETICS</div>
                <hr />
                <div className='list'>
                  <div>Face</div>
                  <div>Lips</div>
                  <div>Eyes</div>
                  <div>Nails</div>
                  <div>Makeup Tools</div>
                  <div>All About Sapphire Cosmetics</div>
                </div>
              </div>
              <div className='column'>
                <div className='column-title'>FRAGRANCES</div>
                <hr />
                <div className='list'>
                  <div>Women's Fragrances</div>
                  <div>Men's Fragrances</div>
                  <div>Women's Body Mists</div>
                  <div>Men's Body Mists</div>
                </div>
              </div>
              <div className='column'>
                <div className='column-title'>SHOP BY SCENT</div>
                <hr />
                <div className='list'>
                  <div>Floral</div>
                  <div>Fruity</div>
                  <div>Oriental</div>
                  <div>Woody</div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className='category'>
          <div className='categoryname'>ACCESSORIES</div>
          <div className='dropdown'>
              <div className='navimage'>
                <img src={accesorynav} alt='womens collection'/>
                </div>
                <div className='columns'>
                  <div className='column'>
                    <div className='column-title'>WOMEN'S SHOES</div>
                    <hr />
                    <div className='list'>
                      <div>Flats</div>
                      <div>Traditional Flats</div>
                      <div>Heels</div>
                      <div>Comforts</div>
                    </div>
                  </div>
                  <div className='column'>
                    <div className='column-title'>WOMEN'S BAGS</div>
                    <hr />
                    <div className='list'>
                      <div>Mini Bags</div>
                      <div>Tote Bags</div>
                      <div>Cross Body Bags</div>
                      <div>Top Handle Bags</div>
                      <div>Shoulder Bags</div>
                      <div>Clutches</div>
                      <div>Wallets</div>
                    </div>
                  </div>
                  <div className='column'>
                    <div className='column-title'>WOMEN'S ACCESSORIES</div>
                    <hr />
                    <div className='list'>
                      <div>Scarves</div>
                    </div>
                  </div>
                </div>
              </div>

        </div>
        <div className='category'>
          <div className='categoryname'>HOME</div>
          <div className='dropdown'>
            <div className='columns'>
              <div className='column'>
                <div className='column-title'>BEDDING</div>
                <hr />
                <div className='list'>
                  <div>Bed Sheets</div>
                  <div>Fitted Sheets</div>
                  <div>Quilt Covers</div>
                  <div>Bed Spreads</div>
                  <div>Bed in a Bag</div>
                  <div>Pillowcases</div>
                  <div>Kids Bedding</div>
                </div>
              </div>
              <div className='column'>
                <div className='column-title'>BATH LINEN</div>
                <hr />
                <div className='list'>
                  <div>Towels</div>
                </div>
              </div>
              <div className='column'>
                <div className='column-title'>LIVING</div>
                <hr />
                <div className='list'>
                  <div>Cushion Covers</div>
                </div>
              </div>
              <div className='column'>
                <div className='column-title'>TABLE & KITCHEN LINEN</div>
                <hr />
                <div className='list'>
                  <div>Table Runner</div>
                  <div>Placemats</div>
                  <div>Napkins</div>
                </div>
              </div>
              <div className='column'>
                <div className='column-title'>SHOP BY TYPE</div>
                <hr />
                <div className='list'>
                  <div>Printed</div>
                  <div>Luxury Embroidered</div>
                  <div>Designer's Corner</div>
                </div>
              </div>
              <div className='column'>
                <div className='column-title'>SHOP BY THEME</div>
                <hr />
                <div className='list'>
                  <div>Arts & Crafts</div>
                  <div>French Elegance</div>
                  <div>Spring Garden</div>
                  <div>Block Print</div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className='category'>
          <div className='specialoffers'>SPECIAL OFFERS</div>
        </div>
        <div className='category'>
          <div className='theedit'>THE EDIT</div>
        </div>
      </div>
      {isCartVisible && (
        <Cart cartItems={cartItems} setCartItems={setCartItems} toggleCart={toggleCart} />
      )}
      {showLogout && <Logout user={{ name: user }} onLogout={handleLogout} />}

    </div>
  );
}

export default MyNavbar;