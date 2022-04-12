import React from 'react';
import playStore from '../../../images/playstore.png';
import appStore from '../../../images/Appstore.png';
import './footer.css';

const Footer = () => {
    return (
        <div>
            <footer id="footer">
                <div className="leftFooter">
                    <h4>DOWNLOAD OUR APP</h4>
                    <p>Download App Android and Ios mobile phone</p>
                    <img src={playStore} alt="playstore" />
                    <img src={appStore} alt="appstore" />
                </div>
                <div className="midFooter">
                    <h1>ECOMMERCE.</h1>
                    <p>High Quantity is our first pripority</p>
                    <p>Copyrights 2021 &copy; MeAbhiSingh</p>
                </div>
                <div className="rightFooter">
                    <h4>Follow Us</h4>
                    <a href="https://www.facebook.com/profile.php?id=100029553619771">
                        Instagram
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=100029553619771">
                        Youtube
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=100029553619771">
                        Facebook
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
