import "./Landing.scss";
// company logos
import Google from "../assets/logos/google.png";
import GeeksforGeeks from "../assets/logos/GeeksForGeeks.png";
import echo3D from "../assets/logos/echo3D.png";
import KPMG from "../assets/logos/kpmg.png";
import EY from "../assets/logos/ey.png";
import Deloitte from "../assets/logos/deloitte.png";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import CIBC from "../assets/logos/CIBC.png";
import TD from "../assets/logos/TD.png";
import Scotiabank from "../assets/logos/scotiabank.png";

import Goose from "../assets/goose.png";

export default function Landing() {
  return (
    <div className="landing_container">
      <Navbar />
      <div className="p-4">
        <Header
          title="Ready Made Questions"
          subtitle="Prep for your dream company"
        />
      </div>

      <div className="landing">
        <div className="box_container">
          <div className="box">
            <p>Technology:</p>
            <div className="company">
              <img src={Google} alt="Google" />
              <div className="text_container">
                <p>Google</p>
              </div>
            </div>
            <div className="company">
              <img src={GeeksforGeeks} alt="GeeksforGeeks" />
              <div className="text_container">
                <p>GeeksforGeeks</p>
              </div>
            </div>
            <div className="company">
              <img src={echo3D} alt="echo3D" />
              <div className="text_container">
                <p>echo3D</p>
              </div>
            </div>
          </div>
          <div className="box">
            <p>Accounting and Consulting:</p>
            <div className="company">
              <img src={KPMG} alt="KPMG" />
              <div className="text_container">
                <p>KPMG</p>
              </div>
            </div>
            <div className="company">
              <img src={EY} alt="EY" />
              <div className="text_container">
                <p>Ernst & Young</p>
              </div>
            </div>
            <div className="company">
              <img src={Deloitte} alt="Deloitte" />
              <div className="text_container">
                <p>Deloitte</p>
              </div>
            </div>
          </div>
        </div>
        <div className="box_container">
          <div className="box_2">
            <a href="/customquestions">
              <div className="company">
                {/* fix button */}
                <div className="text_container">
                  <p>Make your own questions</p>
                </div>
              </div>
            </a>
            <div className="goose_container">
              <div className="dialogue-desktop">
                <img className="goose" src={Goose} alt="Goose" />
                <div className="dialogue-bubble">
                  <p>
                    Welcome to QuackPrep!
                    <br /> Choose a company to get started!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="box">
            <p>Bank:</p>
            <div className="company">
              <img src={CIBC} alt="CIBC" />
              <div className="text_container">
                <p>CIBC</p>
              </div>
            </div>
            <div className="company">
              <img src={TD} alt="TD" />
              <div className="text_container">
                <p>TD</p>
              </div>
            </div>
            <div className="company">
              <img src={Scotiabank} alt="Scotiabank" />
              <div className="text_container">
                <p>Scotiabank</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
