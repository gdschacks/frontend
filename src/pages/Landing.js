import "./Landing.scss";
import Google from "../assets/logos/google.png";
import GeeksforGeeks from "../assets/logos/GeeksForGeeks.png";
import echo3D from "../assets/logos/echo3D.png";

import KPMG from "../assets/logos/kpmg.png";
import EY from "../assets/logos/ey.png";
import Deloitte from "../assets/logos/deloitte.png";
import Navbar from "../components/Navbar";

export default function Landing() {
  return (
    <div>
      <Navbar />
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
          <div className="box">
            <p>Technology:</p>
          </div>
          <div>
            <p>Technology:</p>
          </div>
        </div>
      </div>
    </div>
  );
}
