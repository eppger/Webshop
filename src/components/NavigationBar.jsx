import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n'
import logoLight from '../assets/Haapsalu light.svg'
import english from '../assets/eng.png'
import estonian from '../assets/est.png'
import { CartSumContext } from '../context/CartSumContext'
import { AuthContext } from '../context/AuthContext'

function NavigationBar() {
  const { totalItems } = useCart()
  const { t } = useTranslation()
  const [adminOpen, setAdminOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const {cartSum} = useContext (CartSumContext);
  const {isLoggedIn, logout} = useContext(AuthContext);

  const closeAll = () => {
    setMenuOpen(false)
    setAdminOpen(false)
  }

  const muudaKeel = (newLang) => {
    i18n.changeLanguage(newLang)
    localStorage.setItem('keel', newLang)
  }
  const logoutHandler = () => {
    logout();
  }

  return (
    <nav className="navbar-custom">

      {/* Brand */}
      <NavLink to="/" className="navbar-brand-custom" onClick={closeAll}>
        <img src={logoLight} alt="WebShop" height={36} />
      </NavLink>

      {/* Hamburger nupp — nähtav ainult mobiilis */}
      <button
        className="navbar-hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Lingid */}
      <div className={`navbar-links${menuOpen ? ' navbar-links--open' : ''}`}>
        <NavLink to="/" className="nav-link-custom" end onClick={closeAll}>
          {t('nav.home')}
        </NavLink>
        <NavLink to="/shops" className="nav-link-custom" onClick={closeAll}>
          {t('nav.shops')}
        </NavLink>
        <span className="nav-link-custom" >{cartSum}€</span>
        <NavLink to="/cart" className="nav-link-custom" onClick={closeAll}>
          {t('nav.cart')}
          {totalItems > 0 && <span className="nav-badge">{totalItems}</span>}
        </NavLink>
        <NavLink to="/contact" className="nav-link-custom" onClick={closeAll}>
          {t('nav.contact')}
        </NavLink>

        {/* Admin dropdown */}
        { isLoggedIn === true &&
        <div style={{ position: 'relative' }}>
          <button
            className="nav-dropdown-btn"
            onClick={() => setAdminOpen(!adminOpen)}
            onBlur={() => setTimeout(() => setAdminOpen(false), 150)}
          >
            {t('nav.admin')} {adminOpen ? '▲' : '▼'}
          </button>
          {adminOpen && (
            <div className="nav-dropdown-menu">
              <NavLink to="/admin" className="nav-dropdown-item" onClick={closeAll}>{t('nav.adminHome')}</NavLink>
              <NavLink to="/admin/add-product" className="nav-dropdown-item" onClick={closeAll}>{t('nav.addProduct')}</NavLink>
              <NavLink to="/admin/maintain-products" className="nav-dropdown-item" onClick={closeAll}>{t('nav.manageProducts')}</NavLink>
              <NavLink to="/admin/maintain-categories" className="nav-dropdown-item" onClick={closeAll}>{t('nav.manageCategories')}</NavLink>
              <NavLink to="/admin/maintain-shops" className="nav-dropdown-item" onClick={closeAll}>{t('nav.manageShops')}</NavLink>
            </div>
          )}
        </div>}

        <div className="nav-divider" />

        {/* Keelevahetuse lipud */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img
            src={estonian}
            alt="ET"
            className="icon"
            style={{ cursor: 'pointer', height: '20px' }}
            onClick={() => muudaKeel('et')}
          />
          <img
            src={english}
            alt="EN"
            className="icon"
            style={{ cursor: 'pointer', height: '20px' }}
            onClick={() => muudaKeel('en')}
          />
        </div>
        

        <div className="nav-divider" />

        {isLoggedIn === false ?
        <>
        <NavLink to="/login" className="nav-link-custom" onClick={closeAll}>
          {t('nav.login')}
        </NavLink>
        <NavLink to="/signup" className="nav-btn-register" onClick={closeAll}>
          {t('nav.register')}
        </NavLink>
        </> :
        <>
        <NavLink onClick={logoutHandler}>
          {t('nav.logout')}
        </NavLink>
        
        </>
      }
      </div>
    </nav>
  )
}

export default NavigationBar