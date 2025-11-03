import React from 'react'
import CompanyLogo from '../../Assets/Images/company_logo.png';
import './footer.css'
export default function Footer() {
  return (

    <>
         <div className='section-full-w-row footer-section'>
            <div className='section-boxed-w-row'>

                <div className="footer-container">

                    <div className="footer-container-main">
                        <div className="footer-1">
                            <div className="footer-1-header">
                                <img src={CompanyLogo} alt="sponser"/>
                            </div>
                            <div className="footer-1-body">
                                <p>Shootin’ School Basketball’s mission is to teach and develop basketball players of all ages and skill levels offering them the opportunity to learn the skills necessary to take their basketball game to the next level, while instilling life-lessons and values such as character, teamwork, discipline, respect and sportsmanship.</p>
                                <p>We're at the cutting edge of basketball coaching since creating resources for the grassroots youth coach, following best practice from around the world and insights from the professional game.</p>
                            </div>
                        </div>
                        <div className="footer-2">
                            <div className="footer-2-header">
                                <p className='quick-link-heading'>QUICK LINKS</p>
                            </div>
                            <div className="footer-2-body">
                                <a href="#" className='quick-links-sub'>About</a>
                                <a href="#" className='quick-links-sub'>Online Course</a>
                                <a href="#" className='quick-links-sub'>Instruction</a>
                                <a href="#" className='quick-links-sub'>Programs</a>
                                <a href="#" className='quick-links-sub'>Birthday Parties</a>
                                <a href="#" className='quick-links-sub'>Blog</a>
                                <a href="#" className='quick-links-sub'>Privacy Policy</a>
                            </div>
                        </div>
                        <div className="footer-3">
                            <div className="footer-3-header">
                                <p  className='quick-link-heading'>SERVICES</p>
                            </div>
                            <div className="footer-3-body">
                                <a href="#" className='quick-links-sub'>Upcoming Events</a>
                                <a href="#" className='quick-links-sub'>Summer Camp</a>
                                <a href="#" className='quick-links-sub'>Clinics</a>
                                <a href="#" className='quick-links-sub'>Team Workouts</a>
                                <a href="#" className='quick-links-sub'>Contact</a>
                            </div>
                        </div>
                        <div className="footer-4">
                        <div className="footer-4-header">
                                <p  className='quick-link-heading'>CONTACT INFO</p>
                            </div>
                            <div className="footer-4-body">
                                <a href="#" className='quick-links-sub contact-info'><i className="ri-map-pin-2-fill"></i><span>Shootin' School 120 Androvette St Staten Island, NY 10309</span></a>
                                <a href="#" className='quick-links-sub contact-info'><i className="ri-phone-fill"></i><span>646-450-7572</span></a>
                                <a href="#" className='quick-links-sub contact-info'><i className="ri-mail-fill"></i><span>ShootinSchool@gmail.com</span></a>
                                
                            </div>
                        </div>
                        <div className="footer-5">
                            <div className="footer-5-header">
                                <p  className='quick-link-heading'>FOLLOW US ON</p>
                            </div>
                            <div className="footer-5-body">
                                <a href="#" className='social-links'><i className="ri-facebook-fill"></i></a>
                                <a href="#" className='social-links'><i className="ri-instagram-line"></i></a>
                                <a href="#" className='social-links'><i class="ri-twitter-x-line"></i></a>
                            </div>
                        </div>
                    </div>

                    

                </div>

            </div>
        </div>

        <div className='section-full-w-row footer-section-copyright'>
            <div className='section-boxed-w-row'>
                    <div className="footer-container-copyright">  
                        <p>Please be advised that all purchases are final. All sales are non-refundable and non-transferable</p>
                    </div>
            </div>
        </div>
    </>
   
  
  )
}
