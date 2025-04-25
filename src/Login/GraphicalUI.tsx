import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import "../css/GraphicalInterface.css";
import Carousel from "./Carousel";
const GraphicalUI = () => {
  return (
    <div style={{ width: "50%", backgroundColor: "#F8F8F7", height: "100vh" }}>
      <div className="Graphical-Layout">
        <div className="title">
          <div className="icon">
            <FontAwesomeIcon icon={faBriefcase} color="#C8161D" size={"xl"} />
          </div>
          <h2>SmartPOS</h2>
        </div>
        <div className="graphics">
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default GraphicalUI;
