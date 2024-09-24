import './Footer.css';

const Footer = () => {
    return (
        <div>
            <div className='footer-container'>
                <div>
                    <h6>Download Our App</h6>
                    <div className='container-for-svg-h6'>
                        <div className='popcorn-svg'></div>
                        <p className='movie-svg'>
                            M<span className="outstanding-letters">oo</span>vie
                        </p>
                    </div>
                    <div className='instal-btns'>
                        <button className='app-btn'>App store</button>
                        <button className='gp-btn'></button>
                    </div>
                </div>

                <div>
                    <h6>Navigation</h6>
                    <ul>
                        <li>Home</li>
                        <li>My list</li>
                        <li>About Us</li>
                    </ul>
                </div>

                <div>
                    <h6>Legal</h6>
                    <ul>
                        <li>General Info</li>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                    </ul>
                </div>

                <div>
                    <h6>Contact Us</h6>
                    <ul>
                        <li>support@ourmovies.com</li>
                        <li>Tel: +7(999) 888-77-66</li>
                        <li>OR By Using:</li>
                    </ul>
                    <div className='smedia-box'>
                        <div className='vk'></div>
                        <div className='ig'></div>
                        <div className='wp'></div>
                    </div>
                </div>

                <div>
                    <h6>Share Website Via:</h6>
                    <ul>
                        <li className='li-space'><span className='fb-logo'></span> Facebook</li>
                        <li className='li-space'><span className='ig-logo'></span> Instagram</li>
                    </ul>
                </div>
            </div>
            <div className='f-bottom'>
                <hr className='line'/>
                <div className='date'>2024 Movies. All Rights Reserved</div>
            </div>
        </div>
    );
};

export default Footer;